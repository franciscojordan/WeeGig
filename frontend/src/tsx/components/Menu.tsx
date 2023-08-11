import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import "../../css/components/Menu.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useCookies } from 'react-cookie';

const pages = ["Ofertas", "Nosotros", "Contactanos"];
const pageLinks = {
  Ofertas: "/ofertas",
  Nosotros: "/nosotros",
  Contáctanos: "/contactanos",
};

const settings = ["Perfil", "Cuenta", "Trabajos", "Cerrar Sesión"];
const settingsLinks = {
  Perfil: "/perfil",
  Cuenta: "/cuenta",
  Trabajos: "/ofertas",
  "Cerrar Sesión": "/logout",
};


const Bar = ({ user }) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <a href="/">
        <img className="menuimg" src="./src/assets/img/logo_small_full.png" />
      </a>
      {/* This is the logo */}
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "white",
          textDecoration: "none",
        }}
      >
        WEE GIG
      </Typography>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          // id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {pages.map((page) => (
            <MenuItem key={page} onClick={handleCloseNavMenu}>
              <Typography
                textAlign="center"
                component={Link} // Utilizar el componente Link aquí
                to={pageLinks[page]}
              >
                {page}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      {/* Aqui inicia el mobile */}
            {/*           <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
       */}{" "}
      <Typography
        variant="h5"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "white",
          textDecoration: "none",
          "&:hover": {
            color: "#FFFFFF",
          },
        }}
      >
        WEE GIGm
      </Typography>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {pages.map(
          (
            page // Enlaces del menu
          ) => (
            <Link to={pageLinks[page]} key={page}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  "&:hover": {
                    color: "#FFFFFF ",
                    backgroundColor: "#9CC3A8",
                  },
                }}
              >
                {page}
              </Button>
            </Link>
          )
        )}
      </Box>
      {/* Desplegable */}
      {user && (
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Vemy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <Link to={settingsLinks[setting]} key={setting}>
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                
                <Typography
                  textAlign="center"
                >
                  {setting}
                </Typography>
                
              </MenuItem>
              </Link>
            ))}
          </Menu>
        </Box>
      )}
      {!user && (
        <>
        <Button
          color="inherit"
          href="/login"
          sx={{
            color: "#ffffff",
            "&:hover": {
              color: "white",
              backgroundColor: "#9CC3A8",
            },
          }}
        >
          Iniciar Sesion
        </Button>
        <Button
          color="inherit"
          href="/registrar"
          sx={{
            color: "#ffffff",
            "&:hover": {
              color: "white",
              backgroundColor: "#9CC3A8",
            },
          }}
        >
          Registrarse
        </Button>
        </>
      )}
    </>
  );
}


const theme = createTheme({
  palette: {
    primary: {
      main: "#72B89C",
    },
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#ffffff",
        },
      },
    },
  },
});


function ResponsiveAppBar() {
  const [cookies] = useCookies(['user']);
  const user = cookies.user;

  return (
    <ThemeProvider theme={theme}>
        <AppBar position="static">
        <Container  maxWidth="xl">
          <Toolbar disableGutters>
            <Bar user={user}/>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default ResponsiveAppBar;
