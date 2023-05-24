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

import { toast } from "react-toastify";

import UserInfo from "../apis/UserInfo";

const isAdmin = await UserInfo.isAdmin();

function ResponsiveAppBar({ isAuthenticated,  }) {
  console.log(isAdmin);
  const pages = ["Packages", "About"];
  const settings = ["Profile", "Orders", "Logout"];

  const adminSettings = ["Profile", "Orders", "Dashboard", "Logout"];

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userName, setUserName] = useState("")

  const navigate = useNavigate();
  
  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
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
    if (isAuthenticated) {
      const userName = await UserInfo.getUserName();
      setUserName(userName);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "transparent" }}>
      <Toolbar disableGutters>
        <Typography
          variant="h6"
          noWrap
          component="a"
          onClick={() => navigate("/")}
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".15rem",
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
              <MenuItem key={page} onClick ={() => navigate(`/${page.toLowerCase()}`)}>
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Typography
          variant="h5"
          noWrap
          component="a"
          onClick={() => navigate("/")}
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
              onClick ={() => navigate(`/${page.toLowerCase()}`)}
              sx={{ my: 2, color: "white", display: "block" }}            >
              {page}
            </Button>
          ))}
        </Box>
        
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip>
          {isAuthenticated ? (
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <div className="navUser">
                <span> {userName} </span>
              </div>
            </IconButton>
          ) : (
            <IconButton component="a" href="/login" sx={{ p: 0 }}>
              <div className="navUser"> 
              <span>Login</span> 
              </div>
            </IconButton>
            )}
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
            {isAdmin ? (
              adminSettings.map((setting) => (
                setting === "Logout" ? (
                  <MenuItem key={setting} onClick={handleLogOut}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ) : (
                  <MenuItem key={setting} onClick ={() => navigate(`/${setting.toLowerCase()}`)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                )
              ))
             ) : (
            
            settings.map((setting) => (
              setting === "Logout" ? (
                <MenuItem key={setting} onClick={handleLogOut}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ) : (
                <MenuItem key={setting} onClick ={() => navigate(`/${setting.toLowerCase()}`)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              )
            )))
              }
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default ResponsiveAppBar;
