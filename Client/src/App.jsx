import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddCourse from "./pages/admin/AddCourse";
import ScheduleLecture from "./pages/admin/ScheduleLecture";
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route
  path="/admin"
  element={
    <ProtectedRoute allowedRole="admin">
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

        <Route path="/admin/courses/add" element={<AddCourse />} />

        <Route path="/admin/lectures/schedule" element={<ScheduleLecture />} />
        
        <Route path="/instructor" element={<InstructorDashboard />} />

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
