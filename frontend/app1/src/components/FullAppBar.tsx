import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
// import { makeStyles } from "@material-ui/core/styles";


import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ReportIcon from '@mui/icons-material/Report';

import { Link, Link as RouterLink } from "react-router-dom";
import { ListItemIcon } from '@mui/material';

const menu = [
    { name: "หน้าแรก", icon: <HomeIcon color= "secondary"/>, path: "/" },
    { name: "ข้อมูลส่วนตัว", icon: <AdminPanelSettingsIcon color= "secondary"/>, path: "/" },
    { name: "รายงานนิยาย", icon: <ReportIcon color= "secondary"/>, path: "/reports" },
  ];

const theme = createTheme({
    palette: {
      primary: {
        main: '#94618e',
      },
      secondary: {
        main: '#49274a',
      },
      error: {
        main: '#e74c3c',
      },
      background: {
        default: '#fff',
      },
    },
  });

function FullAppBar() {
  const signout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ flexGrow: 1 }}>

      <AppBar position="static">
        <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setIsDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>

        <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>

        <MenuBookRoundedIcon color="primary" sx={{ fontSize: 50, margin: 1, padding: 1 }} /> 



          {menu.map((item, index) => (
                <Link
                  to={item.path}
                  key={item.name}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem button>
                    <ListItemIcon>{item.icon} </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
                </Link>
              ))}
        </Drawer>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                นิยายออนไลน์
        </Typography>

          {auth && (                                                                               /* รูป Icon Profild */
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
              <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {/* <MenuItem onClick={handleClose}>{localStorage.getItem("id")}</MenuItem>  --id user*/}
                      
                <MenuItem onClick={signout} component={RouterLink} to="/" > ออกจากระบบ </MenuItem>
              </Menu>
            </div>
          )}

        </Toolbar>
      </AppBar>

    </Box>
    </ThemeProvider>
  );
}

export default FullAppBar;