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
import   BookmarksIcon                                     from '@mui/icons-material/Bookmarks';
import { Link         , Link as RouterLink }               from "react-router-dom"                 ;
import { List         , ListItemButton, ListItemIcon }     from '@mui/material'  
import FeedbackRoundedIcon from '@mui/icons-material/FeedbackRounded';  
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import ReviewsIcon from '@mui/icons-material/Reviews';
import PaidIcon from '@mui/icons-material/Paid';
const drawerWidth = 250;



const menu = [
  { name: "หน้าแรก", icon: <HomeIcon color= "secondary"/>, path: "/"         },
  { name: "นิยาย"  , icon: <AutoStoriesRoundedIcon color= "secondary"/>, path: "/fictions" },
  { name: "ชั้นหนังสือของฉัน"  , icon: <BookmarksIcon color= "secondary"/>, path: "/bookshelf_create" },
  { name: "รายงานปัญหาที่พบ", icon: <FeedbackRoundedIcon color= "secondary"/>, path: "/feedback-create"},
  { name: "ประวัติการรายงานปัญหาของฉัน", icon: <FeedbackRoundedIcon color= "secondary"/>, path: "/feedbacks"},
  { name: "ประวัติการเขียนรีวิว", icon: <ReviewsIcon color= "secondary"/>, path: "/reviews" },
  { name: "ประวัติการเติมเหรียญ", icon: <PaidIcon color= "secondary"/>, path: "/top_ups" },
  { name: "ทดสอบหน้าสร้างUser", icon: <PaidIcon color= "secondary"/>, path: "/reader-create" },

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

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
  marginLeft: theme.spacing(3),
  width: 'auto',
  },
  }));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
  padding: theme.spacing(1, 1, 1, 0),
  // vertical padding + font size from searchIcon
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  transition: theme.transitions.create('width'),
  width: '100%',
  [theme.breakpoints.up('md')]: {
  width: '20ch',
  },
  },
  }));

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
      <MenuItem onClick={handleMenuClose} disabled >
        Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
      <Link to="/reader-profile" className="btn btn-primary">My account</Link>
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
            <Search>
                <SearchIconWrapper>
                <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
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