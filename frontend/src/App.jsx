import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { AdminDashboard } from "./pages/AdminDashboard";
import { Employee_dashboard } from "./pages/Employee_dashboard";
import { PrivateRoute } from "./utils/PrivateRoute";
import { RoleBaseRoute } from "./utils/RoleBaseRoute";
import { AdminSummary } from "./components/DahsBoard/AdminSummary";
import { DepartmentList } from "./components/Department/DepartmentList";
import { AddDepartment } from "./components/Department/AddDepartment";
import { EditDepartment } from "./components/Department/EditDepartment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/admin-dashboard"} />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute>
              <RoleBaseRoute requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoute>
            </PrivateRoute>
          }>
          <Route index element={<AdminSummary />}></Route>
          <Route
            path="/admin-dashboard/departments"
            element={<DepartmentList />}></Route>
          <Route
            path="/admin-dashboard/add-department"
            element={<AddDepartment />}></Route>
          <Route
            path="/admin-dashboard/department/:id"
            element={<EditDepartment />}></Route>
        </Route>
        {/* This the parent component for outlet child component */}
        <Route
          path="/employee-dashboard"
          element={<Employee_dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
