import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEye } from '@fortawesome/free-solid-svg-icons';
//import CustomerBooking from './CustomerBooking';

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useContext } from 'react';
import { ValueContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ViewBooking from './ViewBooking';


const AdminDashboard = () => {

  const { usernameLocalState, adminSideBarValue, setAdminSideBarValue, setCustomerDetails } = useContext(ValueContext);

  const apiUrl = import.meta.env.VITE_BE_URL; // Ensure the correct backend URL

  const username = localStorage.getItem("username");
  const phonenumber = localStorage.getItem("phonenumber");

  setUsernameLocalState(username);
  setPhoneNumberLocalState(phonenumber);



  const navigate = useNavigate();
  

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const drawerWidth = 240;

  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
  );

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  const handleClick = async (text) => {
    setAdminSideBarValue(text.target.innerText);
    if (text.target.innerText) {
      const response = await axios.get(`${apiUrl}/getAllBookingDetails?username=${usernameLocalState}`);
      setCustomerDetails(response.data);
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <Toolbar>


          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >

            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" className='float-start'>
            Gas Booking
          </Typography>
          <div style={{ marginLeft: 'auto' }}>
            {/* <button className='float-end btn btn-warning text-white' >Log Out</button> */}
            <div>
              <Button className='float-end btn btn-outline-warning text-white border border-white'
                onClick={handleOpen}>
                Log Out</Button>
              <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <div className='text-center'>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Do you want to logout { usernameLocalState }
                  </Typography>
                  </div> <br />
                 <div className='d-flex justify-content-around'>
                  <button className='btn btn-primary' onClick={() => {
                    setOpenModal(false)
                  }}>Cancel</button>
                  <button className='btn btn-primary' onClick={() => {
                    localStorage.clear();
                    navigate("/login")
                    setCustomerDetails([])
                  }} >&nbsp; Ok &nbsp;</button>
                 </div>
                </Box>
              </Modal>
            </div>
          </div>
        </Toolbar>

      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['View Booking'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={(text) => handleClick(text)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <FontAwesomeIcon icon={faPlus} /> : <FontAwesomeIcon icon={faEye} />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>

        <DrawerHeader />
        { adminSideBarValue === "" && <div className='text-center'><h3>Welcome to Admin Page ! Please select your page</h3></div> }
        { adminSideBarValue === "View Booking" && <ViewBooking /> }
      </Main>

    </Box>

  )
}

export default AdminDashboard