import { BrowserRouter, Routes, Route } from "react-router-dom";

import EduConnectLogin from "./pages/auth/InstituteLogin";
import InstituteDashboard from "./pages/Dashboard/InstituteDashboard";

import MainLayout from "./layouts/MainLayout";

// future pages
import Profile from "./pages/Profile/Profile";
import SwitchUser from "./pages/SwitchUser/SwitchUser";
// import EmployeeMaster from "./pages/Employee/EmployeeMaster";
// import EmployeeList from "./pages/Employee/EmployeeList";

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
              {/* <EmployeeMaster /> */}
            </MainLayout>
          }
        />

        <Route
          path="/employee-list"
          element={
            <MainLayout>
              {/* <EmployeeList /> */}
            </MainLayout>
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;