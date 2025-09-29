import React, { useState } from 'react';
import {
    Box,
    Typography,
    Container,
    Paper,
    Button,
    TextField,
    Card,
    CardContent,
    CardActions,
    Alert,
    Chip,
    Switch,
    FormControlLabel,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Slider,
    Rating,
    Avatar,
    List,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Divider,
    LinearProgress,
    CircularProgress,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Tab,
    Tabs,
    Fab,
    IconButton,
    Tooltip,
    Badge,
    Stepper,
    Step,
    StepLabel,
    Breadcrumbs,
    Link,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Snackbar,
    ToggleButton,
    ToggleButtonGroup,
    Checkbox,
    Radio,
    RadioGroup,
    useTheme,
} from '@mui/material';
import {
    Home,
    Settings,
    Person,
    Add,
    Edit,
    Delete,
    Star,
    ExpandMore,
} from '@mui/icons-material';

export const PlaygroundApp: React.FC = () => {
    const theme = useTheme();
    const [tabValue, setTabValue] = useState(0);
    const [sliderValue, setSliderValue] = useState(30);
    const [ratingValue, setRatingValue] = useState(4);
    const [switchValue, setSwitchValue] = useState(false);
    const [selectValue, setSelectValue] = useState('option1');
    const [toggleValue, setToggleValue] = useState<string | null>('left');
    const [stepperValue, setStepperValue] = useState(1);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(theme.palette.mode === 'dark');

    const handleThemeToggle = () => {
        setIsDarkMode(!isDarkMode);
        // In a real app, this would trigger a theme context update
        console.log('Theme toggle clicked - would switch to', !isDarkMode ? 'dark' : 'light', 'mode');
    };

    const ComponentSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
        <Paper
            sx={{
                p: 3,
                mb: 3,
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Typography variant="h5" gutterBottom fontWeight="bold">
                {title}
            </Typography>
            <Box>{children}</Box>
        </Paper>
    );

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Header with Theme Toggle */}
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                    🎨 UI Component Playground
                </Typography>
                <Typography variant="h6" color="text.secondary" paragraph>
                    Explore all UI components with Figma design system colors
                </Typography>

                <FormControlLabel
                    control={
                        <Switch
                            checked={isDarkMode}
                            onChange={handleThemeToggle}
                            color="primary"
                        />
                    }
                    label={`${isDarkMode ? 'Dark' : 'Light'} Theme`}
                    sx={{ mt: 2 }}
                />
            </Box>

            {/* Layout using Box with flexbox */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

                {/* Row 1: Buttons and Form Controls */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                    <Box sx={{ flex: '1 1 500px', minWidth: '300px' }}>
                        <ComponentSection title="Buttons">
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                                <Button variant="contained" color="primary">Contained Primary</Button>
                                <Button variant="outlined" color="primary">Outlined Primary</Button>
                                <Button variant="text" color="primary">Text Primary</Button>
                            </Box>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                                <Button variant="contained" color="secondary">Secondary</Button>
                                <Button variant="contained" color="error">Error</Button>
                                <Button variant="contained" color="warning">Warning</Button>
                                <Button variant="contained" color="info">Info</Button>
                                <Button variant="contained" color="success">Success</Button>
                            </Box>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                <Button variant="contained" disabled>Disabled</Button>
                                <Button variant="outlined" disabled>Disabled Outlined</Button>
                                <IconButton color="primary"><Home /></IconButton>
                                <IconButton color="error"><Delete /></IconButton>
                            </Box>
                        </ComponentSection>
                    </Box>

                    <Box sx={{ flex: '1 1 500px', minWidth: '300px' }}>
                        <ComponentSection title="Form Controls">
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <TextField
                                    label="Standard Input"
                                    variant="outlined"
                                    placeholder="Enter text here..."
                                />
                                <TextField
                                    label="Error State"
                                    variant="outlined"
                                    error
                                    helperText="This field has an error"
                                />
                                <FormControl>
                                    <InputLabel>Select Option</InputLabel>
                                    <Select
                                        value={selectValue}
                                        onChange={(e) => setSelectValue(e.target.value)}
                                        label="Select Option"
                                    >
                                        <MenuItem value="option1">Option 1</MenuItem>
                                        <MenuItem value="option2">Option 2</MenuItem>
                                        <MenuItem value="option3">Option 3</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={switchValue}
                                            onChange={(e) => setSwitchValue(e.target.checked)}
                                            color="primary"
                                        />
                                    }
                                    label="Switch Control"
                                />

                                <FormControlLabel
                                    control={<Checkbox defaultChecked color="primary" />}
                                    label="Checkbox"
                                />

                                <RadioGroup value="option1">
                                    <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
                                    <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
                                </RadioGroup>
                            </Box>
                        </ComponentSection>
                    </Box>
                </Box>

                {/* Row 2: Cards and Alerts */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                    <Box sx={{ flex: '1 1 500px', minWidth: '300px' }}>
                        <ComponentSection title="Cards">
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                <Card sx={{ flex: '1 1 250px' }}>
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                            Sample Card
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            This is a sample card with some content to demonstrate the card component.
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Learn More</Button>
                                        <Button size="small" color="primary">Action</Button>
                                    </CardActions>
                                </Card>

                                <Card variant="outlined" sx={{ flex: '1 1 250px' }}>
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                            Outlined Card
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            This card uses the outlined variant.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        </ComponentSection>
                    </Box>

                    <Box sx={{ flex: '1 1 500px', minWidth: '300px' }}>
                        <ComponentSection title="Alerts">
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Alert severity="success">This is a success alert!</Alert>
                                <Alert severity="info">This is an info alert!</Alert>
                                <Alert severity="warning">This is a warning alert!</Alert>
                                <Alert severity="error">This is an error alert!</Alert>
                                <Alert severity="success" variant="outlined">Outlined success alert!</Alert>
                                <Alert severity="error" variant="filled">Filled error alert!</Alert>
                            </Box>
                        </ComponentSection>
                    </Box>
                </Box>

                {/* Row 3: Chips and Interactive Elements */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                    <Box sx={{ flex: '1 1 500px', minWidth: '300px' }}>
                        <ComponentSection title="Chips">
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                <Chip label="Default" />
                                <Chip label="Primary" color="primary" />
                                <Chip label="Secondary" color="secondary" />
                                <Chip label="Success" color="success" />
                                <Chip label="Error" color="error" />
                                <Chip label="Warning" color="warning" />
                                <Chip label="Info" color="info" />
                            </Box>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                <Chip label="Outlined" variant="outlined" />
                                <Chip label="Deletable" onDelete={() => { }} />
                                <Chip label="Clickable" onClick={() => { }} />
                                <Chip label="With Icon" icon={<Star />} />
                                <Chip label="With Avatar" avatar={<Avatar>A</Avatar>} />
                            </Box>
                        </ComponentSection>
                    </Box>

                    <Box sx={{ flex: '1 1 500px', minWidth: '300px' }}>
                        <ComponentSection title="Sliders & Ratings">
                            <Box sx={{ mb: 4 }}>
                                <Typography gutterBottom>Slider</Typography>
                                <Slider
                                    value={sliderValue}
                                    onChange={(_, newValue) => setSliderValue(newValue as number)}
                                    aria-labelledby="continuous-slider"
                                    min={0}
                                    max={10}
                                    marks
                                    valueLabelDisplay="auto"
                                />
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography gutterBottom>Rating</Typography>
                                <Rating
                                    value={ratingValue}
                                    onChange={(_, newValue) => setRatingValue(newValue as number)}
                                />
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography gutterBottom>Linear Progress</Typography>
                                <LinearProgress variant="determinate" value={sliderValue} />
                            </Box>

                            <Box>
                                <Typography gutterBottom>Circular Progress</Typography>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <CircularProgress />
                                    <CircularProgress color="secondary" />
                                    <CircularProgress color="success" />
                                </Box>
                            </Box>
                        </ComponentSection>
                    </Box>
                </Box>

                {/* Row 4: Lists and Interactive Elements */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                    <Box sx={{ flex: '1 1 500px', minWidth: '300px' }}>
                        <ComponentSection title="Lists">
                            <List>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Home />
                                    </ListItemIcon>
                                    <ListItemText primary="Home" secondary="Navigate to home page" />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Person />
                                    </ListItemIcon>
                                    <ListItemText primary="Profile" secondary="View profile settings" />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Settings />
                                    </ListItemIcon>
                                    <ListItemText primary="Settings" secondary="Application settings" />
                                </ListItemButton>
                                <Divider />
                            </List>
                        </ComponentSection>
                    </Box>

                    <Box sx={{ flex: '1 1 500px', minWidth: '300px' }}>
                        <ComponentSection title="Interactive Elements">
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <Box>
                                    <Typography gutterBottom>Toggle Button Group</Typography>
                                    <ToggleButtonGroup
                                        value={toggleValue}
                                        exclusive
                                        onChange={(_, newValue) => setToggleValue(newValue)}
                                    >
                                        <ToggleButton value="left">Left</ToggleButton>
                                        <ToggleButton value="center">Center</ToggleButton>
                                        <ToggleButton value="right">Right</ToggleButton>
                                    </ToggleButtonGroup>
                                </Box>

                                <Box>
                                    <Typography gutterBottom>Badges</Typography>
                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                        <Badge badgeContent={4} color="primary">
                                            <IconButton><Home /></IconButton>
                                        </Badge>
                                        <Badge badgeContent={99} color="error">
                                            <IconButton><Settings /></IconButton>
                                        </Badge>
                                        <Badge variant="dot" color="secondary">
                                            <IconButton><Person /></IconButton>
                                        </Badge>
                                    </Box>
                                </Box>

                                <Box>
                                    <Typography gutterBottom>Floating Action Buttons</Typography>
                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                        <Fab color="primary">
                                            <Add />
                                        </Fab>
                                        <Fab color="secondary">
                                            <Edit />
                                        </Fab>
                                        <Tooltip title="Delete">
                                            <Fab color="error" size="small">
                                                <Delete />
                                            </Fab>
                                        </Tooltip>
                                    </Box>
                                </Box>

                                <Box>
                                    <Typography gutterBottom>Dialogs & Snackbars</Typography>
                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                        <Button
                                            variant="outlined"
                                            onClick={() => setDialogOpen(true)}
                                        >
                                            Open Dialog
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            onClick={() => setSnackbarOpen(true)}
                                        >
                                            Show Snackbar
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </ComponentSection>
                    </Box>
                </Box>

                {/* Full Width Sections */}
                <ComponentSection title="Tabs & Navigation">
                    <Box sx={{ mb: 3 }}>
                        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
                            <Tab label="Tab One" />
                            <Tab label="Tab Two" />
                            <Tab label="Tab Three" />
                        </Tabs>
                        <Box sx={{ p: 3, backgroundColor: theme.palette.background.default, mt: 1, borderRadius: 1 }}>
                            {tabValue === 0 && <Typography>Content for Tab One</Typography>}
                            {tabValue === 1 && <Typography>Content for Tab Two</Typography>}
                            {tabValue === 2 && <Typography>Content for Tab Three</Typography>}
                        </Box>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <Typography gutterBottom variant="h6">Breadcrumbs</Typography>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link underline="hover" color="inherit" href="/">
                                Home
                            </Link>
                            <Link underline="hover" color="inherit" href="/apps">
                                Apps
                            </Link>
                            <Typography color="text.primary">Playground</Typography>
                        </Breadcrumbs>
                    </Box>

                    <Box>
                        <Typography gutterBottom variant="h6">Stepper</Typography>
                        <Stepper activeStep={stepperValue}>
                            <Step>
                                <StepLabel>Step 1</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>Step 2</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>Step 3</StepLabel>
                            </Step>
                        </Stepper>
                        <Box sx={{ mt: 2 }}>
                            <Button
                                onClick={() => setStepperValue(Math.max(0, stepperValue - 1))}
                                disabled={stepperValue === 0}
                            >
                                Back
                            </Button>
                            <Button
                                onClick={() => setStepperValue(Math.min(2, stepperValue + 1))}
                                disabled={stepperValue === 2}
                                sx={{ ml: 1 }}
                            >
                                Next
                            </Button>
                        </Box>
                    </Box>
                </ComponentSection>

                <ComponentSection title="Accordions">
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography>Accordion 1</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography>Accordion 2</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </ComponentSection>
            </Box>

            {/* Dialog */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Sample Dialog</DialogTitle>
                <DialogContent>
                    <Typography>
                        This is a sample dialog demonstrating the dialog component with proper theming.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button onClick={() => setDialogOpen(false)} variant="contained">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message="This is a snackbar notification!"
                action={
                    <Button color="inherit" size="small" onClick={() => setSnackbarOpen(false)}>
                        Close
                    </Button>
                }
            />
        </Container>
    );
};

export default PlaygroundApp;