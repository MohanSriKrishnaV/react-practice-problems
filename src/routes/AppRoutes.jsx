
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Search from "../pages/Search";
import Counter from "../pages/Counter";
import Toggler from "../pages/Toggle";
import CharacterCount from "../pages/CharacterCount";
import { NavLink } from "react-router-dom";
import ToDo from "../pages/ToDo";
import Scroll from "../pages/Scroll";
import Products from "../pages/Products";
import Cart from "../pages/Cart/Cart";
import ThemeToggler from "../pages/ThemeToggler";
import Login from "../pages/Login";
import { useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import Unauthorized from "../pages/Unauthorized";

import ProtectedRoute from "../pages/ProtectedRoute";
import { useState } from "react";
import { Button } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import IconButton from '@mui/material/IconButton';
// import DrawerList from "../pages/DrawerList";
import LogoutIcon from '@mui/icons-material/Logout';

import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';

const navItems = [
  { path: "/Home", label: "Home", roles: ["admin", "user"] },
  { path: "/Search", label: "Search", roles: ["user"] },
  { path: "/Counter", label: "Counter", roles: ["user"] },
  { path: "/Toggler", label: "Toggler", roles: ["user"] },
  { path: "/CharacterCount", label: "CharacterCount", roles: ["user"] },
  { path: "/Scroll", label: "Scroll", roles: ["admin"] },
  { path: "/Products", label: "Products", roles: ["admin"] },
  { path: "/Cart", label: "Cart", roles: ["admin"] },
  { path: "/ToDo", label: "ToDo", roles: ["admin", "user"] }
];




function NavBar() {
  const navigate = useNavigate();
  const userRole = JSON.parse(localStorage.getItem("user") || "{}")?.role;
  const isuservalid = JSON.parse(localStorage.getItem("user") || "{}")?.isLoggedIn
  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(userRole)
  );


  if (!isuservalid) {
    navigate("/");
    return null;
  }

  return (
    <>
      <nav >
        <ul style={{ display: "flex", gap: "20px", listStyle: "none" }}>
          {filteredNavItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                style={({ isActive }) => ({
                  color: isActive ? "#61dafb" : "#000",
                  fontWeight: isActive ? "bold" : "normal",
                  textDecoration: "none"
                })}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}


function Layout() {
  const location = useLocation();
  const hideNav = location.pathname === "/"; // Hide NavBar on Login page

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };


  const handleLogout=()=>{
    localStorage.removeItem("user");
    window.location.href="/";
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>

        
        ))}
      </List>
        {/* <ListItem>
            <ThemeToggler />
          </ListItem> */}


          <ListItem>
                        <ListItemButton>
                         
    <IconButton onClick={handleLogout} color="primary">
            <LogoutIcon />
</IconButton> 

                          <ListItemIcon>
              </ListItemIcon>

</ListItemButton>
          
          </ListItem>
    </Box>
  );
  return (
    <>


    <div>


<div style={{ display: 'flex' }}>
  <div>
         <Button onClick={toggleDrawer(true)}>  <MenuIcon />
      </Button>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div> 
    <div>
      {!hideNav && <NavBar />}

    </div>

    <div>
            <ThemeToggler />

    </div>
 

    </div>


      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<ProtectedRoute element={<Home />} allowedRoles={["admin", "user"]} />} />
        <Route path="/Search" element={<ProtectedRoute element={<Search />} allowedRoles={["user"]} />} />
        <Route path="/Counter" element={<ProtectedRoute element={<Counter />} allowedRoles={["user"]} />} />
        <Route path="/Toggler" element={<ProtectedRoute element={<Toggler />} allowedRoles={["user"]} />} />
        <Route path="/CharacterCount" element={<ProtectedRoute element={<CharacterCount />} allowedRoles={["user"]} />} />
        <Route path="/ToDo" element={<ProtectedRoute element={<ToDo />} allowedRoles={["admin", "user"]} />} />
        <Route path="/Scroll" element={<ProtectedRoute element={<Scroll />} allowedRoles={["admin"]} />} />
        <Route path="/Products" element={<ProtectedRoute element={<Products />} allowedRoles={["admin"]} />} />
        <Route path="/Cart" element={<ProtectedRoute element={<Cart />} allowedRoles={["admin"]} />} />
        <Route path="/Unauthorized" element={<Unauthorized />} />
      </Routes>

      </div>
    </>
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
