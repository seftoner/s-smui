/**
 * Custom hook for managing file attachments
 * Handles file state, validation, upload simulation, and error notifications
 */

import { useState, useCallback } from 'react';
import type { AttachedFile } from '../components/ai-chat/types';
import { validateFiles, simulateFileUpload } from '../components/ai-chat/fileUploadUtils';
import { useNotification } from '../contexts';

export interface UseFileAttachmentsReturn {
    attachedFiles: AttachedFile[];
    addFiles: (files: File[]) => Promise<void>;
    removeFile: (fileId: string) => void;
    clearAll: () => void;
    hasUploadingFiles: boolean;
    hasFailedFiles: boolean;
    totalFiles: number;
}

/**
 * Hook to manage file attachments with upload state and error handling
 */
export const useFileAttachments = (): UseFileAttachmentsReturn => {
    const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
    const { showNotification } = useNotification();

    // Helper function to create AttachedFile from File
    const createAttachedFile = async (file: File): Promise<AttachedFile> => {
        const attachedFile: AttachedFile = {
            id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            file,
            fileName: file.name,
            fileSize: file.size,
            mimeType: file.type,
            uploadStatus: 'uploading',
            uploadProgress: 0,
        };

        // Generate image preview for image files
        if (file.type.startsWith('image/')) {
            try {
                const imagePreview = await new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = (e) => resolve(e.target?.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
                attachedFile.imagePreview = imagePreview;
            } catch (error) {
                console.warn('Failed to generate image preview:', error);
            }
        }

        return attachedFile;
    };

    // Update file upload progress
    const updateFileProgress = useCallback((fileId: string, progress: number) => {
        setAttachedFiles(prev =>
            prev.map(file =>
                file.id === fileId
                    ? { ...file, uploadProgress: progress }
                    : file
            )
        );
    }, []);

    // Mark file upload as successful
    const markFileSuccess = useCallback((fileId: string, uploadedUrl?: string) => {
        setAttachedFiles(prev =>
            prev.map(file =>
                file.id === fileId
                    ? { ...file, uploadStatus: 'completed' as const, uploadProgress: 100, uploadedUrl }
                    : file
            )
        );
    }, []);

    // Mark file upload as failed
    const markFileError = useCallback((fileId: string, error: string) => {
        setAttachedFiles(prev =>
            prev.map(file =>
                file.id === fileId
                    ? { ...file, uploadStatus: 'error' as const, error }
                    : file
            )
        );
    }, []);

    // Add files with validation and upload simulation
    const addFiles = useCallback(async (files: File[]) => {
        const { validFiles, errors } = validateFiles(files, attachedFiles.length);

        if (validFiles.length > 0) {
            // Convert to AttachedFile objects with image previews
            const newAttachedFiles = await Promise.all(validFiles.map(createAttachedFile));

            setAttachedFiles(prev => [...prev, ...newAttachedFiles]);

            // Start upload simulation for each file
            newAttachedFiles.forEach(attachedFile => {
                simulateFileUpload(
                    attachedFile.id,
                    updateFileProgress,
                    markFileSuccess,
                    markFileError
                );
            });
        }

        // Show errors if any
        if (errors.length > 0) {
            console.error('File validation errors:', errors);
            errors.forEach(error => showNotification(error, 'error'));
        }
    }, [attachedFiles.length, updateFileProgress, markFileSuccess, markFileError, showNotification]);

    // Remove a file by ID
    const removeFile = useCallback((fileId: string) => {
        setAttachedFiles(prev => prev.filter(file => file.id !== fileId));
    }, []);

    // Clear all files
    const clearAll = useCallback(() => {
        setAttachedFiles([]);
    }, []);

    // Computed values
    const hasUploadingFiles = attachedFiles.some(file => file.uploadStatus === 'uploading');
    const hasFailedFiles = attachedFiles.some(file => file.uploadStatus === 'error');
    const totalFiles = attachedFiles.length;

    return {
        attachedFiles,
        addFiles,
        removeFile,
        clearAll,
        hasUploadingFiles,
        hasFailedFiles,
        totalFiles,
    };
};
