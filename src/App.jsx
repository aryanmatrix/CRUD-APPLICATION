import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import StudentManagement from "./pages/StudentManagement";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/student-management" element={<StudentManagement />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
