import React, { useState } from "react";
import {
  styled,
  alpha,
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Outlet, Link, useNavigate } from "react-router-dom";

const AppLayout = () => {
  // const pages = ["Home", "Movies"];
  const [keyword, setKeyword] = useState("");
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const navigate = useNavigate();
  const searchByKeyword = (e) => {
    e.preventDefault();
    console.log("/movie?q=${keyword} ", keyword);
    navigate(`/movie?q=${keyword}`);
    //setKeyword[""];
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    ></Menu>
  );

  const Search = styled("div")(({ theme }) => ({
    display: "flex",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  // const SearchIconWrapper = styled("div")(({ theme }) => ({
  //   //    padding: theme.spacing(0, 2),
  //   height: "100%",
  //   position: "absolute",
  //   pointerEvents: "none",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  // }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(${theme.spacing(0)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  return (
    <div>
      <ThemeProvider
        theme={createTheme({
          palette: {
            mode: "dark",
          },
        })}
      >
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Container maxWidth="xl">
              <Toolbar
                disableGutters
                sx={{
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h3"
                  noWrap
                  component="a"
                  href="#"
                  sx={{
                    mr: 2,
                    display: { xs: "block", sm: "block", md: "flex" },
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "red",
                    textDecoration: "none",
                  }}
                >
                  N
                </Typography>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                  sx={{
                    display: { xs: "block", sm: "none", md: "none" },
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
                  <Link to="/">
                    <Button
                      key="Home"
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      Home
                    </Button>
                  </Link>
                  <Link to="/movie">
                    <Button
                      key="Movies"
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      Movies
                    </Button>
                  </Link>
                </Box>
                <Box component="form" onSubmit={searchByKeyword}>
                  <Search>
                    <Button type="submit">
                      <SearchIcon />
                    </Button>
                    {/* <SearchIconWrapper></SearchIconWrapper> */}
                    <StyledInputBase
                      // type="search"
                      placeholder="Search…"
                      inputProps={{ "aria-label": "search" }}
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      // value={keyword}
                      // onChange={(e) => setKeyword(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          console.log("keyword :", keyword);
                          e.preventDefault();
                        }
                      }}
                    />
                  </Search>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
          {renderMobileMenu}
        </Box>
      </ThemeProvider>
      <Outlet />
    </div>
  );
};

export default AppLayout;
