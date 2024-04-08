import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useAuth } from '../../hooks/useAuth';
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, Divider,  IconButton,  Menu, MenuItem } from '@mui/material';

const AppNav = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const auth = useAuth()
    return (
    <AppBar
        color='default'
        position='sticky'
        sx={{
            backgroundColor: 'background.paper',
        }}
        >
        <Toolbar
            sx={{
            justifyContent: 'space-between',
            }}
        >
            <Typography >
                Flights App
            </Typography>
            <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
                {auth.user ? <Box>
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32, mr: 2 }}></Avatar>{auth.user.username}
                    </IconButton>
                    <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                        },
                        '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                        },
                    },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <Divider />
                    <MenuItem onClick={auth.logout}>
                    Logout
                    </MenuItem>
                </Menu>

                </Box> : (
                    <Fragment>
                        <Button variant='contained' sx={{mx: 2}}>
                            <Link color='#fff' to='/login' style={{color:'white'}}>Login</Link> 
                        </Button>
                        <Button variant='contained'>
                            <Link color='#fff' to='/register' style={{color:'white'}}>Register</Link>
                        </Button>
                    </Fragment>
                )}
            </Box>
        </Toolbar>
        </AppBar>
  );
}
export default AppNav