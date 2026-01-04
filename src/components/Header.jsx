import "../styles/Header.css";
import { useNavigate, useLocation } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (id) => {
   
    if (location.pathname === "/" || location.pathname === "") {
      
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      
      if (id === "home") {
        navigate("/");
      } else {
        navigate(`/#${id}`);
      }
    }
  };

  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          &lt; University Management System
        </div>

        <nav className="nav">
          <span className="nav-item" onClick={() => handleNavigation("home")}>Home</span>
          <span className="nav-item" onClick={() => handleNavigation("students")}>Students</span>
          {}
          <span className="nav-item" onClick={() => handleNavigation("contact")}>Contact Us</span>
        </nav>

        <button className="login-btn">Login →</button>
      </div>
    </header>
  );
}

export default Header;