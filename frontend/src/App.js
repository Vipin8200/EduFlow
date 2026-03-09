import { BrowserRouter, Routes, Route } from "react-router-dom";

import EduConnectLogin from "./pages/auth/InstituteLogin";
import InstituteDashboard from "./pages/Dashboard/InstituteDashboard";

import MainLayout from "./layouts/MainLayout";

// future pages
import Profile from "./pages/Profile/Profile";
import SwitchUser from "./pages/SwitchUser/SwitchUser";
import EmployeeMaster from "./pages/EmployeeManagement/EmployeeMaster";
import EmployeeAttendance from "./pages/EmployeeManagement/EmployeeAttendance";
import EmployeeLeave from "./pages/EmployeeManagement/LeaveManagement";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Login route (NO sidebar) */}
        <Route path="/" element={<EduConnectLogin />} />

        {/* Protected routes WITH sidebar */}
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <InstituteDashboard />
            </MainLayout>
          }
        />

        <Route
          path="/profile"
          element={
            <MainLayout>
              <Profile />
            </MainLayout>
          }
        />

        <Route
          path="/switch-user"
          element={
            <MainLayout>
              <SwitchUser />
            </MainLayout>
          }
        />

        <Route
          path="/employee-master"
          element={
            <MainLayout>
              <EmployeeMaster />
            </MainLayout>
          }
        />

        <Route
          path="/employee-attendance"
          element={
            <MainLayout>
              <EmployeeAttendance />
            </MainLayout>
          }
        />

        <Route
          path="/employee-leave"
          element={
            <MainLayout>
              <EmployeeLeave />
            </MainLayout>
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;