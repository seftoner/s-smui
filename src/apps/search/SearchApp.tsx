import React, { useState } from 'react';
import {
    Box,
    TextField,
    InputAdornment,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
    Chip,
    Paper,
} from '@mui/material';
import { MagnifyingGlass, ClipboardText, File, ChatCircle } from '@phosphor-icons/react';
import { AppCard, EmptyState } from '../../components';
import type { SearchResult } from '../../types';

// Mock search results
const mockSearchResults: SearchResult[] = [
    {
        id: '1',
        title: 'Project Planning Document',
        description: 'Comprehensive planning document for the new feature implementation',
        type: 'document',
        relevance: 0.95,
    },
    {
        id: '2',
        title: 'Complete user authentication',
        description: 'Task to implement OAuth integration and user management system',
        type: 'task',
        relevance: 0.88,
    },
    {
        id: '3',
        title: 'AI Chat: How to implement search functionality',
        description: 'Discussion about implementing full-text search with Elasticsearch',
        type: 'chat',
        relevance: 0.82,
    },
];

const getTypeIcon = (type: SearchResult['type']) => {
    switch (type) {
        case 'task':
            return <ClipboardText />;
        case 'document':
            return <File />;
        case 'chat':
            return <ChatCircle />;
        default:
            return <MagnifyingGlass />;
    }
};

const getTypeColor = (type: SearchResult['type']) => {
    switch (type) {
        case 'task':
            return 'primary';
        case 'document':
            return 'secondary';
        case 'chat':
            return 'success';
        default:
            return 'default';
    }
};

export const SearchApp: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        // Simulate API call delay
        setTimeout(() => {
            const filteredResults = mockSearchResults.filter((result) =>
                result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                result.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setResults(filteredResults);
            setIsSearching(false);
        }, 500);
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Search
            </Typography>

            <Box sx={{ mb: 3 }}>
                <AppCard title="Search Across All Apps" description="Find tasks, documents, and chat conversations">
                    <TextField
                        fullWidth
                        placeholder="Search for anything..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isSearching}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleSearch} disabled={isSearching || !searchQuery.trim()}>
                                        <MagnifyingGlass />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </AppCard>
            </Box>

            {results.length > 0 && (
                <AppCard title={`Search Results (${results.length})`}>
                    <List>
                        {results.map((result, index) => (
                            <React.Fragment key={result.id}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                                            {getTypeIcon(result.type)}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography variant="subtitle1">{result.title}</Typography>
                                                <Chip
                                                    label={result.type}
                                                    size="small"
                                                    color={getTypeColor(result.type) as any}
                                                    variant="outlined"
                                                />
                                                {result.relevance && (
                                                    <Chip
                                                        label={`${Math.round(result.relevance * 100)}% match`}
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                )}
                                            </Box>
                                        }
                                        secondary={result.description}
                                    />
                                </ListItem>
                                {index < results.length - 1 && (
                                    <Box sx={{ mx: 2 }}>
                                        <Paper variant="outlined" sx={{ height: 1, bgcolor: 'divider' }} />
                                    </Box>
                                )}
                            </React.Fragment>
                        ))}
                    </List>
                </AppCard>
            )}

            {searchQuery && results.length === 0 && !isSearching && (
                <EmptyState
                    icon={<MagnifyingGlass size={64} />}
                    title="No results found"
                    description={`No results were found for "${searchQuery}". Try different keywords or check your spelling.`}
                />
            )}

            {!searchQuery && results.length === 0 && (
                <EmptyState
                    icon={<MagnifyingGlass size={64} />}
                    title="Start searching"
                    description="Enter keywords to search across tasks, documents, and chat conversations."
                />
            )}
        </Box>
    );
};

export default SearchApp;