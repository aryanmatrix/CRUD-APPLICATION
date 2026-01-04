import "../styles/Body.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

function Body() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);


  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.substring(1); 
      const element = document.getElementById(sectionId);
      
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location.hash]);

  const handleAction = (type, action) => {
    
    if (type === "Students") {
      if (action === "Add NeW Student") {
        navigate("/student-management#add");
      } else if (action === "Update Student By Id") {
        navigate("/student-management#update");
      } else if (action === "Delete Student By Id") {
        navigate("/student-management#delete");
      } else if (action === "Get Student By Id") {
        navigate("/student-management#get");
      } else if (action === "Get All Students") {
        navigate("/student-management#all");
      }
    } else if (type === "Teachers") {
      if (action === "Add New Teacher") {
        navigate("/teacher-management#add");
      } else if (action === "Update Teacher By Id") {
        navigate("/teacher-management#update");
      } else if (action === "Delete Teacher By Id") {
        navigate("/teacher-management#delete");
      } else if (action === "Get Teacher By Id") {
        navigate("/teacher-management#get");
      } else if (action === "Get All Teacher") {
        navigate("/teacher-management#all");
      }
    }
  };

  return (
    <main className="body">
      {}
      <section className="hero" id="home">
        <div className="hero-text">
          <h1>University Management System</h1>
          <p>
            A centralized platform to manage students and teachers.
            Perform create, update, delete, and view operations efficiently
            using a clean and scalable system.
          </p>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
            height="400px"
            width="200px"
            alt="College"
          />
        </div>
      </section>

      <section className="section" id="students">
        <h2 className="section-title">Students</h2>

        <div className="card single-card">
          <p>Manage student records and details.</p>

          <div className="button-group">
            <button onClick={() => handleAction("Students", "Add NeW Student")}>
              Add New Student
            </button>
            <button onClick={() => handleAction("Students", "Update Student By Id")}>
              Update Student By Id
            </button>
            <button onClick={() => handleAction("Students", "Delete Student By Id")}>
              Delete Student By Id
            </button>
            <button onClick={() => handleAction("Students", "Get Student By Id")}>
              Get Student By Id
            </button>
            <button onClick={() => handleAction("Students", "Get All Students")}>
              Get All Students
            </button>
          </div>
        </div>
      </section>
{}

      <section className="section contact" id="contact">
        <h2 className="section-title">Contact Us</h2>
        <p>Email: aryancodewizard@gmail.com</p>
        <p>Phone: +91 9950253996</p>
      </section>
    </main>
  );
}

export default Body;