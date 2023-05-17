// import React from "react";

// const NavBar = () => {
//     return (
//         <nav className="navbar navbar-expand-lg navbar-dark bg-transparent fs-3">
//             <div className="navbarEl container-fluid">
//                 <a className="navbar-brand fs-1" href="#">Jefi Wash</a>
//                 <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse" id="navbarNav">
//                 <ul className="navbar-nav">
//                     <li className="nav-item">
//                         <a className="nav-link" href="/packages">Packages</a>
//                     </li>
//                     <li className="nav-item">
//                         <a className="nav-link" href="/about">About</a>
//                     </li>
//                 </ul>
//                 </div>
//                 <button className="login">Login</button>
//             </div>
//         </nav>
//         )
//     };

// export default NavBar

import * as React from "react";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

import setAuth from "../App.jsx";
import { toast } from "react-toastify";

import UserInfo from "../apis/UserInfo";

const pages = ["Packages", "About"];
const settings = ["Profile", "Orders", "Dashboard", "Logout"];




function ResponsiveAppBar({ setAuth, isAuthenticated }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userName, setUserName] = useState("")
  
  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    // setAuth(false);
    toast.success("Logged out successfully!");
    // const navigate = useNavigate()
    // navigate("/")
    window.location.href = "/";
  };
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
      getUserName();
    }, [isAuthenticated])

  const getUserName = async () => {
    const userName = await UserInfo.getUserName();
    setUserName(userName);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "transparent" }}>
      <Toolbar disableGutters>
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
            color: "inherit",
            textDecoration: "none",
            paddingLeft: "20px",
          }}
        >
          Jefi Wash
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
            id="menu-appbar"
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
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
        <Typography
          variant="h5"
          noWrap
          component="a"
          href=""
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Jefi Wash
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <Button
              key={page}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block", }}
            >
              {page}
            </Button>
          ))}
        </Box>

        
        
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <div className="navUser">
                {isAuthenticated ? <span> {userName} </span> : <span> Login </span>}
              </div>
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
              setting = "Logout" ? (
                <MenuItem key={setting} onClick={logOut}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ) : (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              )
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default ResponsiveAppBar;
