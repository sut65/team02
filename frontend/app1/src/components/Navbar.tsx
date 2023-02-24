import * as React from 'react';
import { createTheme, ThemeProvider} from '@mui/material/styles'        ;
import   AppBar                                           from '@mui/material/AppBar'        ;
import   Box                                              from '@mui/material/Box'           ;
import   Toolbar                                          from '@mui/material/Toolbar'       ;
import   IconButton                                       from '@mui/material/IconButton'    ;
import   Typography                                       from '@mui/material/Typography'    ;
import   MenuItem                                         from '@mui/material/MenuItem'      ;
import   Menu                                             from '@mui/material/Menu'          ;
import   MenuIcon                                         from "@mui/icons-material/Menu"    ;
import   MenuBookIcon                                     from "@mui/icons-material/MenuBook";
import AccountCircle from '@mui/icons-material/AccountCircle';
import CssBaseline   from '@mui/material/CssBaseline'        ;
import Drawer        from '@mui/material/Drawer'             ;
import ListItem      from '@mui/material/ListItem'           ;

import ListItemText from '@mui/material/ListItemText';

import MoreIcon from '@mui/icons-material/MoreVert';
import Divider  from "@mui/material/Divider"       ;
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ReportIcon from '@mui/icons-material/Report';
import AdUnitsIcon from '@mui/icons-material/AdUnits';
import ArticleIcon from '@mui/icons-material/Article';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

import { Link, Link           as RouterLink   } from "react-router-dom";
import { List, ListItemIcon } from '@mui/material'   ;



const drawerWidth = 200;

const menu = [
  { name: "แดชบอร์ด", icon: <DashboardIcon color= "secondary"/>, path: "/" , role:0},
  { name: "การจัดการผู้ดูแลระบบ", icon: <SupervisorAccountIcon color= "secondary"/>, path: "/admins" , role:2},
  { name: "เพิ่มผู้ดูแลระบบ", icon: <PersonAddIcon color= "secondary"/>, path: "/admin_create" , role:2},
  { name: "รายชื่อผู้ดูแลระบบ", icon: <SupervisorAccountIcon color= "secondary"/>, path: "/adminslist" , role:1},
  { name: "รายการการรายงานนิยาย", icon: <ReportProblemIcon color= "secondary"/>, path: "/report-fiction-list" , role:0},
  { name: "สร้างแบนเนอร์", icon: <AdUnitsIcon color= "secondary"/>, path: "/banner_c" , role:1},
  { name: "การจัดการแบนเนอร์", icon: <ArticleIcon color= "secondary"/>, path: "/banner_list" , role:1},
  { name: "รายการแบนเนอร์", icon: <ArticleIcon color= "secondary"/>, path: "/banner_lists" , role:2},
  { name: "รายงานปัญหาของนักอ่าน", icon: <ReportIcon color= "secondary"/>, path: "/feedbacks-list" , role:0},
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

export default function Navbar() {
  const role = localStorage.getItem("role")
const signout = () => {
  localStorage.clear();
  window.location.href = "/";
  };

const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
  React.useState<null | HTMLElement>(null);

const isMenuOpen = Boolean(anchorEl);
const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorEl(event.currentTarget);
};

const handleMobileMenuClose = () => {
  setMobileMoreAnchorEl(null);
};

const handleMenuClose = () => {
  setAnchorEl(null);
  handleMobileMenuClose();
};

const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
  setMobileMoreAnchorEl(event.currentTarget);
};

const menuId = 'primary-search-account-menu';
const renderMenu = (
  <Menu
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    id={menuId}
    keepMounted
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    open={isMenuOpen}
    onClose={handleMenuClose}
  >
    <MenuItem onClick={handleMenuClose} component={RouterLink} to="/profile">
      โปรไฟล์
    </MenuItem>
    <MenuItem onClick={signout} component={RouterLink} to="/" > 
      ออกจากระบบ 
    </MenuItem>
  </Menu>
);

const mobileMenuId = 'primary-search-account-menu-mobile';
const renderMobileMenu = (
  <Menu
    anchorEl={mobileMoreAnchorEl}
    id={mobileMenuId}
    keepMounted
    open={isMobileMenuOpen}
    onClose={handleMobileMenuClose}
  >
    <Divider />
    <MenuItem onClick={handleProfileMenuOpen}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="primary-search-account-menu"
        aria-haspopup="true"
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <p>โปรไฟล์</p>
    </MenuItem>
  </Menu>
);


return (
  <ThemeProvider theme={theme}>
    <Box sx={{ display: '1' }}>
    <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setIsDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer 
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}

            open={isDrawerOpen} 
            onClose={() => setIsDrawerOpen(false)}>
            <List>
              {menu.map((item, index) => {
                if((item.role ===  Number(role)) || item.role === 0) {
                  return (
                <Link
                  to={item.path}
                  key={item.name}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem button>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
                </Link>
              )}
              
              })}
            </List>
          </Drawer>
          <Typography 
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block'} ,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: '#fff',
              textDecoration: "none",
              cursor: "pointer",
              }}
          >
              Dek-Read Phuyai-Write
          </Typography>
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuBookIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              >
              <AccountCircle />
          </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
              >
              <MoreIcon />
              </IconButton>
          </Box>
          </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

      
      </Box>
      
  </ThemeProvider>
);
}