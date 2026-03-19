import EduConnectLogin from "./pages/auth/InstituteLogin";
import InstituteDashboard from "./pages/Dashboard/InstituteDashboard";

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
import StudentBulkUpload from "./pages/StudentManagement/StudentBulkUpload";
import StudentAttendance from "./pages/Attendance/StudentAttendance";
import AttendanceReports from "./pages/Attendance/AttendanceReports";
import FeeStructure from "./pages/FeesAndAccount/Feestructure";
import FeeCollection from "./pages/FeesAndAccount/FeeCollection";
import Concession from "./pages/FeesAndAccount/Concession";
import RefundManagement from "./pages/FeesAndAccount/RefundManagement";
import OnlinePayments from "./pages/FeesAndAccount/OnlinePayments";
import FeeReports from "./pages/FeesAndAccount/FeeReports";
import ExamSetup from "./pages/ExamAndResults/ExamSetup";
import ExamScheduling from "./pages/ExamAndResults/ExamScheduling";
import MarksManagement from "./pages/ExamAndResults/MarksManagement";
import Results from "./pages/ExamAndResults/Results";
import StudyMaterials from "./pages/StudyManagement/StudyMaterials";
import HomeworkManagement from "./pages/StudyManagement/HomeworkManagement";
import OnlineLearning from "./pages/StudyManagement/OnlineLearning";
import PeriodSetup from "./pages/TimeTables/PeriodSetup";
import TimetableManagement from "./pages/TimeTables/TimetableManagement";
import Notices from "./pages/Communications/Notices";
import News from "./pages/Communications/News";
import Events from "./pages/CalendarAndScheduling/Events";
import Holidays from "./pages/CalendarAndScheduling/Holidays";
import AcademicCalendar from "./pages/CalendarAndScheduling/AcademicCalendar";
import VehicalManagement from "./pages/TransportManagement/VehicalManagement";
import RouteManagement from "./pages/TransportManagement/RouteManagement";
import PickupPoints from "./pages/TransportManagement/PickupPoints";
import TransportAttendance from "./pages/TransportManagement/TransportAttendance";
import TransportReports from "./pages/TransportManagement/TransportReports";
import RoomAllocation from "./pages/HostelManagement/RoomAllocation";
import HostelAttendance from "./pages/HostelManagement/HostelAttendance";
import LeaveManagement from "./pages/HostelManagement/LeaveManagement";
import HostelReports from "./pages/HostelManagement/HostelReports";
import CategoryManagement from "./pages/InventoryManagement/CategoryManagement";
import ProductManagement from "./pages/InventoryManagement/ProductManagement";
import StockEntry from "./pages/InventoryManagement/StockEntry";
import StockAllocation from "./pages/InventoryManagement/StockAllocation";
import InventoryReports from "./pages/InventoryManagement/InventoryReports";
import RoleManagement from "./pages/RoleManagement/RoleManagement";
import PermissionManagement from "./pages/RoleManagement/PermissionManagement";
import CourseAndSectionSetup from "./pages/RoleManagement/CourseAndSectionSetup";
import IdCardConfiguration from "./pages/RoleManagement/IdCardConfiguration";
import AcademicSettings from "./pages/RoleManagement/AcademicSetting";

export const publicRoutes = [
    { path: "/", component: EduConnectLogin },
];

export const protectedRoutes = [
    { path: "/dashboard", component: InstituteDashboard },
    { path: "/profile", component: Profile },
    { path: "/switch-user", component: SwitchUser },
    { path: "/employee-master", component: EmployeeMaster },
    { path: "/employee-attendance", component: EmployeeAttendance },
    { path: "/employee-leave", component: EmployeeLeave },
    { path: "/shift-management", component: ShiftManagement },
    { path: "/payroll", component: Payroll },
    { path: "/id-card-management", component: IdcardManagement },
    { path: "/recruitment", component: Recruitment },
    { path: "/admission-enquiry", component: AdmissionEnquiry },
    { path: "/reception-feedback", component: ReceptionFeedback },
    { path: "/student-master", component: StudentMaster },
    { path: "/student-documents", component: StudentDocuments },
    { path: "/student-leave", component: StudentLeaves },
    { path: "/student-id-card", component: StudentIdCard },
    { path: "/exit-management", component: ExitManagement },
    { path: "/bulk-import", component: StudentBulkUpload },
    { path: "/student-attendance", component: StudentAttendance },
    { path: "/attendance-reports", component: AttendanceReports },
    { path: "/fee-structure", component: FeeStructure },
    { path: "/fee-collection", component: FeeCollection },
    { path: "/concessions", component: Concession },
    { path: "/refund-management", component: RefundManagement },
    { path: "/online-payments", component: OnlinePayments },
    { path: "/fee-reports", component: FeeReports },
    { path: "/exam-setup", component: ExamSetup },
    { path: "/exam-scheduling", component: ExamScheduling },
    { path: "/marks-management", component: MarksManagement },
    { path: "/results", component: Results },
    { path: "/study-materials", component: StudyMaterials },
    { path: "/homework-management", component: HomeworkManagement },
    { path: "/online-learning", component: OnlineLearning },
    { path: "/period-setup", component: PeriodSetup },
    { path: "/timetable-management", component: TimetableManagement },
    { path: "/notices", component: Notices },
    { path: "/news", component: News },
    { path: "/events", component: Events },
    { path: "/holidays", component: Holidays },
    { path: "/academic-calendar", component: AcademicCalendar },
    { path: "/vehicle-management", component: VehicalManagement },
    { path: "/route-management", component: RouteManagement },
    { path: "/pickup-points", component: PickupPoints },
    { path: "/transport-attendance", component: TransportAttendance },
    { path: "/transport-reports", component: TransportReports },
    { path: "/room-allocation", component: RoomAllocation },
    { path: "/hostel-attendance", component: HostelAttendance },
    { path: "/hostel-leave", component: LeaveManagement },
    { path: "/hostel-reports", component: HostelReports },
    { path: "/category-management", component: CategoryManagement },
    { path: "/product-management", component: ProductManagement },
    { path: "/stock-entry", component: StockEntry },
    { path: "/stock-allocation", component: StockAllocation },
    { path: "/inventory-reports", component: InventoryReports },
    { path: "/role-management", component: RoleManagement },
    { path: "/permission-management", component: PermissionManagement },
    { path: "/course-setup", component: CourseAndSectionSetup },
    { path: "/id-card-configuration", component: IdCardConfiguration },
    { path: "/academic-settings", component: AcademicSettings },
];
