import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LanguageIcon from '@mui/icons-material/Language';

const pages = ['Devices state'];

type NavbarProps = {
  className?: string;
};

function Navbar({ className }: NavbarProps) {
   const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
       setAnchorElNav(event.currentTarget);
   };

   const handleCloseNavMenu = () => {
       setAnchorElNav(null);
   };

   return (
       <AppBar position="static" className={className}>
           <Container maxWidth={false} sx={{backgroundColor: 'black'}}>
               <Toolbar disableGutters>

                   <Typography
                       variant="h6"
                       noWrap
                       sx={{
                           mr: 2,
                           display: {xs: 'none', md: 'flex'},
                           alignItems: 'center',
                           fontFamily: 'monospace',
                           fontWeight: 700,
                           letterSpacing: '.3rem',
                           color: 'inherit',
                           textDecoration: 'none',
                       }}
                   >
                       <LanguageIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                       IoT Dashboard
                   </Typography>

                   <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                       <IconButton
                           size="large"
                           aria-label="account of current user"
                           aria-controls="menu-appbar"
                           aria-haspopup="true"
                           onClick={handleOpenNavMenu}
                           color="inherit"
                       >
                           <MenuIcon/>
                       </IconButton>
                       <Menu
                           id="menu-appbar"
                           anchorEl={anchorElNav}
                           anchorOrigin={{
                               vertical: 'bottom',
                               horizontal: 'left',
                           }}
                           keepMounted
                           transformOrigin={{
                               vertical: 'top',
                               horizontal: 'left',
                           }}
                           open={Boolean(anchorElNav)}
                           onClose={handleCloseNavMenu}
                           sx={{
                               display: {xs: 'block', md: 'none'},
                           }}
                       >
                           {pages.map((page) => (
                               <MenuItem key={page} onClick={handleCloseNavMenu}>
                                   <Typography textAlign="center">{page}</Typography>
                               </MenuItem>
                           ))}
                       </Menu>
                   </Box>
                   <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                       {pages.map((page) => (
                           <Button
                               key={page}
                               onClick={handleCloseNavMenu}
                               sx={{my: 2, color: 'white', display: 'block'}}
                           >
                               {page}
                           </Button>
                       ))}
                   </Box>

                   <div className="logo"></div>

               </Toolbar>
           </Container>
       </AppBar>
   );
}

export default Navbar;



