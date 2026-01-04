import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">

        <div className="footer-col">
          <h2 className="brand">University Management</h2>
          <p>
           University Management system implementing CRUD operations to add, update, delete, and retrieve students and teachers.
          </p>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>Students</li>
            <li>Teachers</li>
            <li>Contact Us</li>
          </ul>
        </div>

        
      </div>

      <div className="footer-bottom">
        Copyright © 2025 by UniversityManagement | All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
