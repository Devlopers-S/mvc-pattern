import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import UserSignUp from "./pages/UserSignUp";
import AdminLogin from "./pages/AdminLogin";
import AdminSignUp from "./pages/AdminSignUp";
import UpdateUserLogin from "./pages/UpdateUserLogin";
import AdminUpdate from "./components/admin/AdminUpdate.jsx";
import AllCourses from "./components/user/AllCourses.jsx";
import AddCourse from "./components/admin/AddCourse.jsx";
import AllUsers from "./components/admin/AllUsers.jsx";
import AdminAllCourses from "./components/admin/AdminAllCourses.jsx";
import UpdateCourse from "./components/admin/UpdateCourse.jsx";
function App() {
  return (
    <Routes>
      <Route path="/" element={<UserSignUp />} />
      <Route path="/admin/updateCourse/:id" element={<UpdateCourse />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="login/updateLogin" element={<UpdateUserLogin />} />
      <Route path="/admin/adminUpdate" element={<AdminUpdate />} />
      <Route path="/user/allCourses" element={<AllCourses />} />
      <Route path="/admin/allCourses" element={<AdminAllCourses />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/signup" element={<AdminSignUp />} />
      <Route path="/admin/AddCourse" element={<AddCourse />} />
      <Route path="/allUsers" element={<AllUsers />} />
    </Routes>
  );
}

export default App;
