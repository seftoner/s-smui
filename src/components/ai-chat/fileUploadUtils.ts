/**
 * File upload utilities for the PromptInput component
 */

import { FILE_UPLOAD_CONSTANTS } from './types';

export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validate a single file against size and type constraints
 */
export const validateFile = (file: File): FileValidationResult => {
  // Check file size (20MB limit)
  if (file.size > FILE_UPLOAD_CONSTANTS.MAX_FILE_SIZE) {
    const sizeMB = Math.round(file.size / 1024 / 1024);
    return { 
      valid: false, 
      error: `File "${file.name}" is ${sizeMB}MB. Maximum size is 20MB.` 
    };
  }

  // Check file type
  const isAllowedType = FILE_UPLOAD_CONSTANTS.ALLOWED_TYPES.some(type => 
    file.type.startsWith(type) || file.type === type
  );

  if (!isAllowedType) {
    return { 
      valid: false, 
      error: `File type "${file.type || 'unknown'}" is not supported.` 
    };
  }

  return { valid: true };
};

/**
 * Validate multiple files and return results
 */
export const validateFiles = (files: File[], currentFileCount: number = 0): {
  validFiles: File[];
  errors: string[];
} => {
  const validFiles: File[] = [];
  const errors: string[] = [];

  // Check if adding these files would exceed the limit
  if (currentFileCount + files.length > FILE_UPLOAD_CONSTANTS.MAX_FILES) {
    errors.push(`Cannot add ${files.length} files. Maximum is ${FILE_UPLOAD_CONSTANTS.MAX_FILES} files total.`);
    return { validFiles: [], errors };
  }

  // Validate each file
  files.forEach(file => {
    const validation = validateFile(file);
    if (validation.valid) {
      validFiles.push(file);
    } else if (validation.error) {
      errors.push(validation.error);
    }
  });

  return { validFiles, errors };
};

/**
 * Simulate file upload with progress updates
 */
export const simulateFileUpload = (
  fileId: string,
  onProgress: (fileId: string, progress: number) => void,
  onSuccess: (fileId: string, uploadedUrl?: string) => void,
  onError: (fileId: string, error: string) => void
): void => {
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 20; // Random progress increment

    if (progress >= 100) {
      clearInterval(interval);
      // Simulate random success/failure (90% success rate)
      if (Math.random() > 0.1) {
        onSuccess(fileId, `https://example.com/uploads/${fileId}`);
      } else {
        onError(fileId, 'Upload failed due to network error');
      }
    } else {
      onProgress(fileId, Math.min(progress, 95)); // Cap at 95% until completion
    }
  }, 200 + Math.random() * 300); // Random interval between 200-500ms
};

/**
 * Format file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Get file extension from filename
 */
export const getFileExtension = (filename: string): string => {
  const parts = filename.split('.');
  return parts.length > 1 ? `.${parts[parts.length - 1]}` : '';
};

/**
 * Convert FileList to File array
 */
export const fileListToArray = (fileList: FileList): File[] => {
  return Array.from(fileList);
};