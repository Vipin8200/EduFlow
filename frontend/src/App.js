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
import ShiftManagement from "./pages/EmployeeManagement/ShiftManagement";
import Payroll from "./pages/EmployeeManagement/Payroll";
import IdcardManagement from "./pages/EmployeeManagement/IdcardManagement";
import Recruitment from "./pages/EmployeeManagement/Recruitment";
import AdmissionEnquiry from "./pages/InquiryReception/AdmissionEnquiry";
import ReceptionFeedback from "./pages/InquiryReception/ReceptionFeedback";
import StudentMaster from "./pages/StudentManagement/StudentMaster";
import StudentDocuments from "./pages/StudentManagement/StudentDocuments";
import StudentLeaves from "./pages/StudentManagement/StudentLeaves";
import StudentIdCard from "./pages/StudentManagement/StudentIdCard";
import ExitManagement from "./pages/StudentManagement/ExitManagement";

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

        <Route
          path="/shift-management"
          element={
            <MainLayout>
              <ShiftManagement />
            </MainLayout>
          }
        />

        <Route
          path="/payroll"
          element={
            <MainLayout>
              <Payroll />
            </MainLayout>
          }
        />

        <Route
          path="/id-card-management"
          element={
            <MainLayout>
              <IdcardManagement />
            </MainLayout>
          }
        />

        <Route
          path="/recruitment"
          element={
            <MainLayout>
              <Recruitment />
            </MainLayout>
          }
        />

        <Route
          path="/admission-enquiry"
          element={
            <MainLayout>
              <AdmissionEnquiry />
            </MainLayout>
          }
        />

        <Route
          path="/reception-feedback"
          element={
            <MainLayout>
              <ReceptionFeedback />
            </MainLayout>
          }
        />

        <Route
          path="/student-master"
          element={
            <MainLayout>
              <StudentMaster />
            </MainLayout>
          }
        />

        <Route
          path="/student-documents"
          element={
            <MainLayout>
              <StudentDocuments />
            </MainLayout>
          }
        />

        <Route
          path="/student-leave"
          element={
            <MainLayout>
              <StudentLeaves />
            </MainLayout>
          }
        />



        <Route
          path="/student-id-card"
          element={
            <MainLayout>
              <StudentIdCard />
            </MainLayout>
          }
        />

        <Route
          path="/exit-management"
          element={
            <MainLayout>
              <ExitManagement />
            </MainLayout>
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;