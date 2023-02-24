import * as React from 'react';
import { styled       , alpha, createTheme, ThemeProvider} from '@mui/material/styles'             ;
import   AppBar                                            from '@mui/material/AppBar'             ;
import   Box                                               from '@mui/material/Box'                ;
import   Toolbar                                           from '@mui/material/Toolbar'            ;
import   IconButton                                        from '@mui/material/IconButton'         ;
import   Typography                                        from '@mui/material/Typography'         ;
import   InputBase                                         from '@mui/material/InputBase'          ;
import   Badge                                             from '@mui/material/Badge'              ;
import   MenuItem                                          from '@mui/material/MenuItem'           ;
import   Menu                                              from '@mui/material/Menu'               ;
import   MenuIcon                                          from "@mui/icons-material/Menu"         ;
import   SearchIcon                                        from '@mui/icons-material/Search'       ;
import   AccountCircle                                     from '@mui/icons-material/AccountCircle';
import   CssBaseline                                       from '@mui/material/CssBaseline'        ;
import   Drawer                                            from '@mui/material/Drawer'             ;
import   ListItem                                          from '@mui/material/ListItem'           ;
import   ListItemText                                      from '@mui/material/ListItemText'       ;
import   MoreIcon                                          from '@mui/icons-material/MoreVert'     ;
import   Divider                                           from "@mui/material/Divider"            ;
import   HomeIcon                                          from '@mui/icons-material/Home'         ;
import   MenuBookIcon                                      from '@mui/icons-material/MenuBook'     ;
import { Link         , Link as RouterLink }               from "react-router-dom"                 ;
import { List         , ListItemButton, ListItemIcon }     from '@mui/material'                    ;
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import LibraryAddRoundedIcon from '@mui/icons-material/LibraryAddRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import PersonIcon from '@mui/icons-material/Person';
const drawerWidth = 200;



const menu = [
  { name: "หน้าแรก", icon: <HomeIcon color= "secondary"/>, path: "/"         },
  { name: "สร้างงานเขียน"  , icon: <DriveFileRenameOutlineRoundedIcon color= "secondary"/>, path: "/fiction-create" },
   { name: "เพิ่มเนื้อหา"  , icon: <LibraryAddRoundedIcon color= "secondary"/>, path: "/fiction-add" },
  { name: "นิยายของฉัน"  , icon: <LibraryBooksRoundedIcon color= "secondary"/>, path: "/fiction-show" },
  // { name: "ประวัติข้อมูลนักเขียน"  , icon: <PersonIcon color= "secondary"/>, path: "/writers" },
  // { name: "รายงานนิยาย", icon: <ReportIcon color= "secondary"/>, path: "/reports" },
  // { name: "Product", icon: <WidgetsIcon />, path: "/products" },
  // { name: "Stock", icon: <WarehouseIcon />, path: "/stocks" },
  // { name: "Cart", icon: <AddShoppingCartIcon />, path: "/cart" },  
  // { name: "Receipt Management", icon: <ReceiptIcon />, path: "/receipt/create" },
  //{ name: "Receipt records", icon: <FileCopyIcon />, path: "/receipts" },
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
  const signout = () => {
    localStorage.clear();
    window.location.href = "/";
    };

  // const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  // const classes = useStyles();

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
      <MenuItem 
      onClick={handleMenuClose} 
      component={RouterLink} 
      to="/writers" 
      >
        ข้อมูลของฉัน
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
      // anchorOrigin={{
      //   vertical: 'top',
      //   horizontal: 'right',
      // }}
      id={mobileMenuId}
      keepMounted
      // transformOrigin={{
      //   vertical: 'top',
      //   horizontal: 'right',
      // }}
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
        <p>Profile</p>
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
              <MenuBookIcon color="primary" sx={{ fontSize: 50, margin: 1, padding: 1 }} /> 
              <CssBaseline />
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
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' } ,
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
                {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                    <MailIcon />
                </Badge>
                </IconButton> */}
                <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                >
                <Badge
                    // badgeContent={calcCartItemSum(shoppingCart)}
                    color="error"
                    >
                    {/* <ShoppingCartCheckoutIcon /> */}
                    </Badge>
                </IconButton>
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