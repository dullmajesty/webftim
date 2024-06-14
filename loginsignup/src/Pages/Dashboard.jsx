import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { mainListItems } from '../Components/NavList';
import { Outlet, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import backgroundImage from '../assets/bg.jpg';
import Copyright from '../Components/Copyright';
import AddPatientDialog from '../Components/wellmeadows/AddPatientDialog';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const defaultTheme = createTheme();

export default function Dashboard() {
    const [open, setOpen] = React.useState(false);
    const [anchorElPatients, setAnchorElPatients] = React.useState(null);
    const [anchorElWards, setAnchorElWards] = React.useState(null);
    const [anchorElStocks, setAnchorElStocks] = React.useState(null);
    const [anchorElPrescription, setAnchorElPrescription] = React.useState(null);
    const [anchorElOthers, setAnchorElOthers] = React.useState(null);
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const navigate = useNavigate();

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleMenuClick = (event, setter) => {
        setter(event.currentTarget);
    };

    const handleMenuClose = (setter) => {
        setter(null);
    };

    const handleMenuItemClick = (path) => {
        navigate(path);
        setAnchorElPatients(null);
        setAnchorElWards(null);
        setAnchorElStocks(null);
        setAnchorElPrescription(null);
        setAnchorElOthers(null);
    };

    const handleAddPatientClick = () => {
        setDialogOpen(true);
    };

    const logout = () => {
        navigate("/", { state: { value: "value" } });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                            justifyContent: 'space-between', // Align items in the middle
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={toggleDrawer}
                                sx={{
                                    marginRight: '36px',
                                    ...(open && { display: 'none' }),
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <img src={Logo} alt="Logo" style={{ height: 40, marginRight: 10 }} />
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                sx={{ flexGrow: 1 }}
                            >
                                Wellmeadows Hospital
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '15vh' }}>
                            <MenuItem onClick={(e) => handleMenuClick(e, setAnchorElPatients)}>Patients</MenuItem>
                            <Menu
                                anchorEl={anchorElPatients}
                                open={Boolean(anchorElPatients)}
                                onClose={() => handleMenuClose(setAnchorElPatients)}
                            >
                                <MenuItem onClick={handleAddPatientClick}>Add new patient</MenuItem>
                                <MenuItem onClick={() => handleMenuItemClick('/patients/patient information')}>Patients Information</MenuItem>
                                <MenuItem onClick={() => handleMenuItemClick('/patients/schedule an appointment')}>Schedule an appointment</MenuItem>

                            </Menu>
                            <MenuItem onClick={(e) => handleMenuClick(e, setAnchorElWards)}>Wards</MenuItem>
                            <Menu
                                anchorEl={anchorElWards}
                                open={Boolean(anchorElWards)}
                                onClose={() => handleMenuClose(setAnchorElWards)}
                            >
                                <MenuItem onClick={() => handleMenuItemClick('/wards/overview')}>Overview</MenuItem>
                                <MenuItem onClick={() => handleMenuItemClick('/wards/add')}>Add Ward</MenuItem>
                            </Menu>
                            <MenuItem onClick={(e) => handleMenuClick(e, setAnchorElStocks)}>Stocks</MenuItem>
                            <Menu
                                anchorEl={anchorElStocks}
                                open={Boolean(anchorElStocks)}
                                onClose={() => handleMenuClose(setAnchorElStocks)}
                            >
                                <MenuItem onClick={() => handleMenuItemClick('/stocks/overview')}>Overview</MenuItem>
                                <MenuItem onClick={() => handleMenuItemClick('/stocks/add')}>Add Stock</MenuItem>
                            </Menu>
                            <MenuItem onClick={(e) => handleMenuClick(e, setAnchorElPrescription)}>Prescription</MenuItem>
                            <Menu
                                anchorEl={anchorElPrescription}
                                open={Boolean(anchorElPrescription)}
                                onClose={() => handleMenuClose(setAnchorElPrescription)}
                            >
                                <MenuItem onClick={() => handleMenuItemClick('/prescription/overview')}>Overview</MenuItem>
                                <MenuItem onClick={() => handleMenuItemClick('/prescription/add')}>Add Prescription</MenuItem>
                            </Menu>
                            <MenuItem onClick={(e) => handleMenuClick(e, setAnchorElOthers)}>Others</MenuItem>
                            <Menu
                                anchorEl={anchorElOthers}
                                open={Boolean(anchorElOthers)}
                                onClose={() => handleMenuClose(setAnchorElOthers)}
                            >
                                <MenuItem onClick={() => handleMenuItemClick('/others/overview')}>Overview</MenuItem>
                                <MenuItem onClick={() => handleMenuItemClick('/others/add')}>Add Other</MenuItem>
                            </Menu>
                        </Box>
                        <IconButton color="inherit" onClick={logout}>
                            <LogoutIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        {mainListItems}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        height: '105vh',
                        width: '189vh',
                        overflow: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundImage: `url(${backgroundImage})`, // Set background image
                        backgroundSize: 'cover',
                    }}
                >
                    <Toolbar />
                    {/* Main Content */}
                    <Box sx={{ flexGrow: 1 }}>
                        <Outlet />
                    </Box>
                    {/* End of Main Content */}
                    <Box component="footer" sx={{ p: 2, bgcolor: 'background.paper' }}>
                        <Typography variant="body2" color="textSecondary" align="center">
                            {'© '}
                            {new Date().getFullYear()}
                            {' Wellmeadow Hospital. All rights reserved.'}
                        </Typography>
                    </Box>
                </Box>
                <AddPatientDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
            </Box>
        </ThemeProvider>
    );
}
