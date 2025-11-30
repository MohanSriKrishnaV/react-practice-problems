
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

const navItems = [
  { path: "/", label: "Home" },
  { path: "/Search", label: "Search" },
  { path: "/Counter", label: "Counter" },
  { path: "/Toggler", label: "Toggler" },
  { path: "/CharacterCount", label: "CharacterCount" },
  { path: "/Scroll", label: "Scroll" },
    { path: "/Products", label: "Products" },
    { path: "/Cart", label: "Cart" },


  







  //   { path: "/about", label: "About" },
  //   { path: "/contact", label: "Contact" }
];



function NavBar() {
  return (
    <nav>
      <ul style={{ display: "flex", gap: "20px", listStyle: "none" }}>
        {navItems.map((item) => (
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
  );
}


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Counter" element={<Counter />} />
        <Route path="/Toggler" element={<Toggler />} />
              <Route path="/CharacterCount" element={<CharacterCount />} />
<Route path="/ToDo" element={<ToDo />} />

<Route path="/Scroll" element={<Scroll />} />  


<Route path="/Products" element={<Products />} /> 
<Route path="/Cart" element={<Cart />} />











      </Routes>
    </BrowserRouter>
  );
}
