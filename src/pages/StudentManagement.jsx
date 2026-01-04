import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { 
  getAllStudents, 
  getStudentById, 
  addStudent, 
  updateStudent, 
  deleteStudent 
} from "../Api/StudentApi";
import "../styles/StudentManagement.css";

function StudentManagement() {
  const location = useLocation();

 
  const [students, setStudents] = useState([]);
  const [singleStudent, setSingleStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

 
  const [addForm, setAddForm] = useState({
    name: "",
    branch: "",
    emailId: "",
    phoneNo: "",
    semester: "",
    cgpa: "",
    rollNumber: "",
    gender: "",
    dateOfBirth: ""
  });

  
  const [updateForm, setUpdateForm] = useState({
    id: "",
    name: "",
    branch: "",
    emailId: "",
    phoneNo: "",
    semester: "",
    cgpa: ""
  });

 
  const [studentId, setStudentId] = useState("");
  const [deleteId, setDeleteId] = useState("");

 
  const parseErrorMessage = (err) => {
    let errorMessage = "";
    
    if (err.response?.data?.errors) {
      const validationErrors = err.response.data.errors;
      
      if (Array.isArray(validationErrors)) {
        
        errorMessage = validationErrors.join(", ");
      } else if (typeof validationErrors === 'object') {
        
        errorMessage = Object.entries(validationErrors)
          .map(([field, message]) => `${field}: ${message}`)
          .join(", ");
      } else {
        
        errorMessage = String(validationErrors);
      }
    } else if (err.response?.data?.message) {
      errorMessage = String(err.response.data.message);
    } else if (err.response?.data) {
      
      errorMessage = typeof err.response.data === 'string' 
        ? err.response.data 
        : JSON.stringify(err.response.data);
    } else if (err.message) {
      errorMessage = err.message;
    } else {
      errorMessage = "An unexpected error occurred";
    }
    
    return errorMessage;
  };

  
  useEffect(() => {
    if (successMessage || error) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, error]);

  
  const handleAddStudent = async () => {
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await addStudent(addForm);
      setSuccessMessage("Student added successfully!");
      
      
      setAddForm({
        name: "",
        branch: "",
        emailId: "",
        phoneNo: "",
        semester: "",
        cgpa: "",
        rollNumber: "",
        gender: "",
        dateOfBirth: ""
      });

      
      setSingleStudent(response.data);
      setStudents([]);
      
    } catch (err) {
      setError(parseErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

 
  const handleUpdateStudent = async () => {
    if (!updateForm.id) {
      setError("Please enter Student ID");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const { id, ...updateData } = updateForm;
      const response = await updateStudent(id, updateData);
      setSuccessMessage("Student updated successfully!");
      
      
      setSingleStudent(response.data);
      setStudents([]);
      
    } catch (err) {
      setError(parseErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGetStudentById = async () => {
    if (!studentId) {
      setError("Please enter Student ID");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");
    setSingleStudent(null);
    setStudents([]);

    try {
      const response = await getStudentById(studentId);
      setSingleStudent(response.data);
      setSuccessMessage("Student found!");
    } catch (err) {
      setError(parseErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

 
  const handleGetAllStudents = async () => {
    setLoading(true);
    setError("");
    setSuccessMessage("");
    setStudents([]);
    setSingleStudent(null);

    try {
      const response = await getAllStudents();
      setStudents(response.data);
      setSuccessMessage(`Found ${response.data.length} students`);
    } catch (err) {
      setError(parseErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };


  const handleDeleteStudent = async () => {
    if (!deleteId) {
      setError("Please enter Student ID");
      return;
    }

    if (!window.confirm(`Are you sure you want to delete student with ID: ${deleteId}?`)) {
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      await deleteStudent(deleteId);
      setSuccessMessage(`Student with ID ${deleteId} deleted successfully!`);
      setDeleteId("");
      setSingleStudent(null);
      setStudents([]);
    } catch (err) {
      setError(parseErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };


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
  }, [location]);

  return (
    <div className="student-page">
      <div className="student-layout">

        {/* LEFT PANEL  */}
        <div className="left-panel">
          <h1>Student Management</h1>

          {/* ADD STUDENT */}
          <div className="section-box" id="add">
            <h3>Add Student</h3>
            <div className="form-box">
              <input 
                placeholder="Name" 
                value={addForm.name}
                onChange={(e) => setAddForm({...addForm, name: e.target.value})}
              />
              <input 
                placeholder="Branch" 
                value={addForm.branch}
                onChange={(e) => setAddForm({...addForm, branch: e.target.value})}
              />
              <input 
                placeholder="Email" 
                value={addForm.emailId}
                onChange={(e) => setAddForm({...addForm, emailId: e.target.value})}
              />
              <input 
                placeholder="Phone" 
                value={addForm.phoneNo}
                onChange={(e) => setAddForm({...addForm, phoneNo: e.target.value})}
              />
              <input 
                placeholder="Semester" 
                type="number"
                value={addForm.semester}
                onChange={(e) => setAddForm({...addForm, semester: e.target.value})}
              />
              <input 
                placeholder="CGPA" 
                type="number"
                step="0.01"
                value={addForm.cgpa}
                onChange={(e) => setAddForm({...addForm, cgpa: e.target.value})}
              />
              <input 
                placeholder="Roll Number" 
                type="number"
                value={addForm.rollNumber}
                onChange={(e) => setAddForm({...addForm, rollNumber: e.target.value})}
              />
              <select 
                value={addForm.gender}
                onChange={(e) => setAddForm({...addForm, gender: e.target.value})}
              >
                <option value="">Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
              <input 
                type="date" 
                value={addForm.dateOfBirth}
                onChange={(e) => setAddForm({...addForm, dateOfBirth: e.target.value})}
              />
              <button onClick={handleAddStudent} disabled={loading}>
                {loading ? "Adding..." : "Add Student"}
              </button>
            </div>
          </div>

          {}
          <div className="section-box" id="update">
            <h3>Update Student</h3>
            <div className="form-box">
              <input 
                placeholder="Student ID" 
                type="number"
                value={updateForm.id}
                onChange={(e) => setUpdateForm({...updateForm, id: e.target.value})}
              />
              <input 
                placeholder="Name" 
                value={updateForm.name}
                onChange={(e) => setUpdateForm({...updateForm, name: e.target.value})}
              />
              <input 
                placeholder="Branch" 
                value={updateForm.branch}
                onChange={(e) => setUpdateForm({...updateForm, branch: e.target.value})}
              />
              <input 
                placeholder="Email" 
                value={updateForm.emailId}
                onChange={(e) => setUpdateForm({...updateForm, emailId: e.target.value})}
              />
              <input 
                placeholder="Phone" 
                value={updateForm.phoneNo}
                onChange={(e) => setUpdateForm({...updateForm, phoneNo: e.target.value})}
              />
              <input 
                placeholder="Semester" 
                type="number"
                value={updateForm.semester}
                onChange={(e) => setUpdateForm({...updateForm, semester: e.target.value})}
              />
              <input 
                placeholder="CGPA" 
                type="number"
                step="0.01"
                value={updateForm.cgpa}
                onChange={(e) => setUpdateForm({...updateForm, cgpa: e.target.value})}
              />
              <button onClick={handleUpdateStudent} disabled={loading}>
                {loading ? "Updating..." : "Update Student"}
              </button>
            </div>
          </div>

          {}
          <div className="section-box" id="get">
            <h3>Get Student by ID</h3>
            <div className="form-box">
              <input 
                placeholder="Student ID" 
                type="number"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
              <button onClick={handleGetStudentById} disabled={loading}>
                {loading ? "Fetching..." : "Get Student"}
              </button>
            </div>
          </div>

          {}
          <div className="section-box" id="all">
            <h3>Get All Students</h3>
            <div className="form-box">
              <button onClick={handleGetAllStudents} disabled={loading}>
                {loading ? "Fetching..." : "Fetch All Students"}
              </button>
            </div>
          </div>

          {}
          <div className="section-box" id="delete">
            <h3>Delete Student</h3>
            <div className="form-box">
              <input 
                placeholder="Student ID" 
                type="number"
                value={deleteId}
                onChange={(e) => setDeleteId(e.target.value)}
              />
              <button 
                className="danger" 
                onClick={handleDeleteStudent} 
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete Student"}
              </button>
            </div>
          </div>
        </div>

        {/*  RIGHT PANEL */}
        <div className="right-panel">
          <h2>Response</h2>

          <div className="response-box">

            {}
            {successMessage && (
              <div style={{ 
                color: "#4ade80", 
                background: "rgba(74, 222, 128, 0.1)", 
                padding: "10px", 
                borderRadius: "8px", 
                marginBottom: "15px",
                border: "1px solid rgba(74, 222, 128, 0.3)"
              }}>
                ✅ {successMessage}
              </div>
            )}

            {/* LOADING */}
            {loading && <p>Loading...</p>}

            {/* ERROR */}
            {!loading && error && (
              <div style={{ 
                color: "#f87171", 
                background: "rgba(248, 113, 113, 0.1)", 
                padding: "15px", 
                borderRadius: "8px",
                border: "1px solid rgba(248, 113, 113, 0.3)",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word"
              }}>
                <div style={{ fontWeight: "bold", marginBottom: "8px" }}>❌ Error</div>
                <div>{error}</div>
              </div>
            )}

            {/* SINGLE STUDENT CARD */}
            {!loading && !error && singleStudent && (
              <div style={{
                background: "rgba(102, 126, 234, 0.1)",
                borderRadius: "12px",
                padding: "20px",
                border: "1px solid rgba(102, 126, 234, 0.3)"
              }}>
                <h3 style={{ color: "#667eea", marginBottom: "15px" }}>Student Details</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <p><strong>ID:</strong> {singleStudent.id}</p>
                  <p><strong>Name:</strong> {singleStudent.name}</p>
                  <p><strong>Branch:</strong> {singleStudent.branch}</p>
                  <p><strong>Email:</strong> {singleStudent.emailId}</p>
                  <p><strong>Phone:</strong> {singleStudent.phoneNo}</p>
                  <p><strong>Semester:</strong> {singleStudent.semester}</p>
                  <p><strong>CGPA:</strong> {singleStudent.cgpa}</p>
                  <p><strong>Roll No:</strong> {singleStudent.rollNumber}</p>
                  <p><strong>Gender:</strong> {singleStudent.gender}</p>
                  <p><strong>DOB:</strong> {singleStudent.dateOfBirth}</p>
                </div>
              </div>
            )}

            {/* TABLE FOR ALL STUDENTS */}
            {!loading && !error && students.length > 0 && (
              <table className="response-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Branch</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Semester</th>
                    <th>CGPA</th>
                    <th>Roll No</th>
                    <th>Gender</th>
                    <th>DOB</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <tr key={s.id}>
                      <td>{s.id}</td>
                      <td>{s.name}</td>
                      <td>{s.branch}</td>
                      <td>{s.emailId}</td>
                      <td>{s.phoneNo}</td>
                      <td>{s.semester}</td>
                      <td>{s.cgpa}</td>
                      <td>{s.rollNumber}</td>
                      <td>{s.gender}</td>
                      <td>{s.dateOfBirth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* EMPTY STATE */}
            {!loading && !error && !singleStudent && students.length === 0 && !successMessage && (
              <p>No data loaded yet.</p>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

export default StudentManagement;