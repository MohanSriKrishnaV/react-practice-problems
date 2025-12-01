import { useContext, useEffect } from "react";
import { ThemeContext } from "./themes/themeContext";
import '../pages/ThemeToggle.css';

export default function ThemeToggler() {
  const { theme, setTheme } = useContext(ThemeContext);

  // Load theme from storage on first mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme") || "light";
    setTheme(savedTheme);
    document.body.classList.add(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    localStorage.setItem("app-theme", newTheme);

    // Update body class
    document.body.classList.remove(theme);
    document.body.classList.add(newTheme);
  };

 return (
  <button className="theme-toggle-btn" onClick={toggleTheme}>
    {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
  </button>
);

}
