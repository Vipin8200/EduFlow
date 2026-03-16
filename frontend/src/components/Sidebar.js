import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  LayoutDashboard,
  UserCog,
  ArrowLeftRight,
  Briefcase,
  Contact,
  UserCheck,
  Plane,
  Clock,
  Banknote,
  BadgeCheck,
  UserPlus,
  PhoneCall,
  MessagesSquare,
  LogOut,
  ChevronDown,
  LayoutGrid,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  FileText,
  UploadCloud,
  CheckSquare,
  FileBarChart,
  Coins,
  ListTree,
  ReceiptIndianRupee,
  Tag,
  Undo2,
  CreditCard,
  FileSignature,
  Settings2,
  CalendarClock,
  Pencil,
  Award,
  BookOpen,
  Library,
  BookText,
  Laptop,
  Table2,
  CalendarDays,
  MessageSquareText,
  BellRing,
  Newspaper,
  Calendar,
  PartyPopper,
  CalendarOff,
  Bus,
  Car,
  MapPin,
  MapPinHouse,
  ClipboardCheck,
  BedDouble,
  KeySquare,
  Package,
  Folders,
  Box,
  ArrowDownToLine,
  Share2,
  Settings,
  UsersRound,
  ShieldCheck
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// Menu configuration moved outside component for easy management
const MENU_ITEMS = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutGrid,
    subItems: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
      { id: "profile", label: "Profile Management", icon: UserCog, path: "/profile" },
      { id: "switch", label: "Switch Role", icon: ArrowLeftRight, path: "/switch-user" },
    ]
  },
  {
    id: "employee",
    label: "Employee / HR Management",
    icon: Briefcase,
    subItems: [
      { id: "emp-master", label: "Employee Master", icon: Contact, path: "/employee-master" },
      { id: "emp-attendance", label: "Employee Attendance", icon: UserCheck, path: "/employee-attendance" },
      { id: "leave", label: "Leave Management", icon: Plane, path: "/employee-leave" },
      { id: "shift", label: "Shift & Duty Management", icon: Clock, path: "/shift-management" },
      { id: "payroll", label: "Payroll", icon: Banknote, path: "/payroll" },
      { id: "id-card", label: "ID Card Management", icon: BadgeCheck, path: "/id-card-management" },
      { id: "recruitment", label: "Recruitment", icon: UserPlus, path: "/recruitment" },
    ]
  },
  {
    id: "inquiry",
    label: "Inquiry & Reception",
    icon: PhoneCall,
    subItems: [
      { id: "admission", label: "Admission Enquiry", icon: UserPlus, path: "/admission-enquiry" },
      { id: "reception", label: "Reception Feedback", icon: MessagesSquare, path: "/reception-feedback" }
    ]
  },
  {
    id: "student",
    label: "Student Management",
    icon: GraduationCap,
    subItems: [
      { id: "student-master", label: "Student Master", icon: Contact, path: "/student-master" },
      { id: "student-docs", label: "Student Documents", icon: FileText, path: "/student-documents" },
      { id: "student-leave", label: "Student Leave", icon: Plane, path: "/student-leave" },
      { id: "student-id", label: "Student ID Cards", icon: BadgeCheck, path: "/student-id-card" },
      { id: "exit-management", label: "Exit Management", icon: LogOut, path: "/exit-management" },
      { id: "bulk-Upload", label: "Bulk Import", icon: UploadCloud, path: "/bulk-import" }
    ]
  },
  {
    id: "attendance",
    label: "Attendance",
    icon: CheckSquare,
    subItems: [
      { id: "student-attendance", label: "Student Attendance", icon: UserCheck, path: "/student-attendance" },
      { id: "attendance-reports", label: "Attendance Reports", icon: FileBarChart, path: "/attendance-reports" }
    ]
  },
  {
    id: "fees",
    label: "Fees & Accounts",
    icon: Coins,
    subItems: [
      { id: "fee-structure", label: "Fee Structure", icon: ListTree, path: "/fee-structure" },
      { id: "fee-collection", label: "Fee Collection", icon: ReceiptIndianRupee, path: "/fee-collection" },
      { id: "concessions", label: "Concessions", icon: Tag, path: "/concessions" },
      { id: "refund-management", label: "Refund Management", icon: Undo2, path: "/refund-management" },
      { id: "online-payments", label: "Online Payments", icon: CreditCard, path: "/online-payments" },
      { id: "fee-reports", label: "Fee Reports", icon: FileBarChart, path: "/fee-reports" }
    ]
  },
  {
    id: "exams",
    label: "Exams & Results",
    icon: FileSignature,
    subItems: [
      { id: "exam-setup", label: "Exam Setup", icon: Settings2, path: "/exam-setup" },
      { id: "exam-scheduling", label: "Exam Scheduling", icon: CalendarClock, path: "/exam-scheduling" },
      { id: "marks-management", label: "Marks Management", icon: Pencil, path: "/marks-management" },
      { id: "results", label: "Results", icon: Award, path: "/results" }
    ]
  },
  {
    id: "lms",
    label: "LMS / Study Management",
    icon: BookOpen,
    subItems: [
      { id: "study-materials", label: "Study Materials", icon: Library, path: "/study-materials" },
      { id: "homework", label: "Homework Management", icon: BookText, path: "/homework-management" },
      { id: "online-learning", label: "Online Learning", icon: Laptop, path: "/online-learning" }
    ]
  },
  {
    id: "timetable",
    label: "Timetable",
    icon: Table2,
    subItems: [
      { id: "period-setup", label: "Period Setup", icon: Clock, path: "/period-setup" },
      { id: "timetable-management", label: "Timetable Management", icon: CalendarDays, path: "/timetable-management" }
    ]
  },
  {
    id: "communication",
    label: "Communication",
    icon: MessageSquareText,
    subItems: [
      { id: "notices", label: "Notices", icon: BellRing, path: "/notices" },
      { id: "news", label: "News", icon: Newspaper, path: "/news" }
    ]
  },
  {
    id: "calendar",
    label: "Calendar & Scheduling",
    icon: Calendar,
    subItems: [
      { id: "events", label: "Events", icon: PartyPopper, path: "/events" },
      { id: "holidays", label: "Holidays", icon: CalendarOff, path: "/holidays" },
      { id: "academic-calendar", label: "Academic Calendar", icon: CalendarDays, path: "/academic-calendar" }
    ]
  },
  {
    id: "transport",
    label: "Transport Management",
    icon: Bus,
    subItems: [
      { id: "vehicle-management", label: "Vehicle Management", icon: Car, path: "/vehicle-management" },
      { id: "route-management", label: "Route Management", icon: MapPin, path: "/route-management" },
      { id: "pickup-points", label: "Pickup Points", icon: MapPinHouse, path: "/pickup-points" },
      { id: "transport-attendance", label: "Transport Attendance", icon: ClipboardCheck, path: "/transport-attendance" },
      { id: "transport-reports", label: "Transport Reports", icon: FileBarChart, path: "/transport-reports" }
    ]
  },
  {
    id: "hostel",
    label: "Hostel Management",
    icon: BedDouble,
    subItems: [
      { id: "room-allocation", label: "Room Allocation", icon: KeySquare, path: "/room-allocation" },
      { id: "hostel-attendance", label: "Hostel Attendance", icon: UserCheck, path: "/hostel-attendance" },
      { id: "hostel-leave", label: "Leave Management", icon: Plane, path: "/hostel-leave" },
      { id: "hostel-reports", label: "Hostel Reports", icon: FileBarChart, path: "/hostel-reports" }
    ]
  },
  {
    id: "inventory",
    label: "Inventory Management",
    icon: Package,
    subItems: [
      { id: "category-management", label: "Category Management", icon: Folders, path: "/category-management" },
      { id: "product-management", label: "Product Management", icon: Box, path: "/product-management" },
      { id: "stock-entry", label: "Stock Entry", icon: ArrowDownToLine, path: "/stock-entry" },
      { id: "stock-allocation", label: "Stock Allocation", icon: Share2, path: "/stock-allocation" },
      { id: "inventory-reports", label: "Inventory Reports", icon: FileBarChart, path: "/inventory-reports" }
    ]
  },
  {
    id: "reports",
    label: "Reports",
    icon: FileText,
    subItems: [
      { id: "report-student", label: "Student Reports", icon: FileBarChart, path: "/student-reports" },
      { id: "report-attendance", label: "Attendance Reports", icon: FileBarChart, path: "/overall-attendance-reports" },
      { id: "report-fee", label: "Fee Reports", icon: FileBarChart, path: "/overall-fee-reports" },
      { id: "report-exam", label: "Exam Reports", icon: FileBarChart, path: "/exam-reports" },
      { id: "report-payroll", label: "Payroll Reports", icon: FileBarChart, path: "/payroll-reports" },
      { id: "report-transport", label: "Transport Reports", icon: FileBarChart, path: "/overall-transport-reports" },
      { id: "report-hostel", label: "Hostel Reports", icon: FileBarChart, path: "/overall-hostel-reports" }
    ]
  },
  {
    id: "configuration",
    label: "Configuration & Role",
    icon: Settings,
    subItems: [
      { id: "role-management", label: "Role Management", icon: UsersRound, path: "/role-management" },
      { id: "permission-management", label: "Permission Management", icon: ShieldCheck, path: "/permission-management" },
      { id: "course-setup", label: "Course & Section Setup", icon: Library, path: "/course-setup" },
      { id: "id-config", label: "ID Card Configuration", icon: BadgeCheck, path: "/id-card-configuration" },
      { id: "academic-settings", label: "Academic Settings", icon: Settings2, path: "/academic-settings" }
    ]
  }
];

export default function Sidebar() {
  const location = useLocation();

  // Find which menu group the current path belongs to
  const getActiveMenuId = (pathname) => {
    const activeMenu = MENU_ITEMS.find(menu =>
      menu.subItems?.some(item => item.path === pathname)
    );
    return activeMenu ? activeMenu.id : null;
  };

  const [openMenus, setOpenMenus] = useState(() => {
    const activeId = getActiveMenuId(location.pathname);
    return activeId ? [activeId] : ['overview']; // Default to overview
  });
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // When route changes (navigation), auto-open the relevant menu
  useEffect(() => {
    setIsMobileOpen(false);
    const activeId = getActiveMenuId(location.pathname);
    if (activeId) {
      setOpenMenus([activeId]);
    }
  }, [location.pathname]);

  const toggleMenu = (menuId) => {
    // If exact same menu is clicked, toggle it closed, otherwise open ONLY this menu
    if (openMenus.includes(menuId)) {
      setOpenMenus([]);
    } else {
      setOpenMenus([menuId]);
    }

    // Auto-open sidebar if toggling menus while collapsed
    if (isCollapsed) {
      setIsCollapsed(false);
    }
  };

  const activeColor = "bg-[#C29543] text-white shadow-sm shadow-[#C29543]/20";
  const nonActiveColor = "text-gray-400 hover:text-gray-200 hover:bg-[#1a1a1a]";

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 right-4 z-[60] p-2 bg-[#161616] text-white rounded-lg border border-[#262626]"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[45] lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed lg:static top-0 left-0 z-50
        ${isCollapsed ? 'lg:w-[88px] w-[280px]' : 'w-[280px]'} h-screen bg-[#0a0a0a] text-white flex flex-col font-sans border-r border-[#1f1f1f]
        transition-all duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <style>{`
          .sidebar-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .sidebar-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .sidebar-scrollbar::-webkit-scrollbar-thumb {
            background-color: #C29543;
            border-radius: 10px;
          }
          .sidebar-scrollbar:hover::-webkit-scrollbar-thumb {
            background-color: #dcb362;
          }
        `}</style>

        {/* Header Logo */}
        <div className={`flex items-center ${isCollapsed ? 'justify-center px-4' : 'gap-3 px-6'} py-6 lg:mt-0 relative transition-all duration-300`}>
          <div className="bg-white text-black p-1 rounded-full flex items-center justify-center shrink-0">
            <GraduationCap size={22} strokeWidth={2} />
          </div>
          <span className={`font-bold text-xl tracking-wide whitespace-nowrap overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
            EduConnect
          </span>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 bg-[#161616] border border-[#262626] rounded-full p-1 text-gray-400 hover:text-white hover:bg-[#262626] transition-colors z-50"
          >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* User Info Card */}
        <div className={`mx-4 mb-6 p-3 bg-[#161616] rounded-xl flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} border border-[#262626] transition-all duration-300`}>
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Rakesh Sharma"
            className="w-10 h-10 rounded-full object-cover shrink-0"
          />
          <div className={`flex flex-col whitespace-nowrap overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
            <span className="text-sm font-semibold text-gray-200">Rakesh Sharma</span>
            <span className="text-[12px] text-gray-400 mt-0.5">Institute Admin</span>
          </div>
        </div>

        {/* Navigation Menus */}
        <div className="flex-1 overflow-y-auto px-3 sidebar-scrollbar space-y-2 pb-4">
          {MENU_ITEMS.map((menu) => {
            const isOpen = openMenus.includes(menu.id) && !isCollapsed;
            const hasSub = menu.subItems && menu.subItems.length > 0;
            return (
              <div key={menu.id} className="mb-1">
                {/* Parent Menu */}
                <div
                  onClick={() => hasSub && toggleMenu(menu.id)}
                  className={`flex items-center ${isCollapsed ? 'justify-center py-3' : 'justify-between px-3 py-3'} rounded-xl cursor-pointer transition-colors hover:bg-[#161616] text-gray-200 group relative`}
                  title={isCollapsed ? menu.label : ""}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <menu.icon size={18} className={`text-gray-400 shrink-0 ${isCollapsed ? 'group-hover:text-white' : ''}`} />
                    <span
                      className={`text-[14px] font-semibold tracking-wide truncate transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}
                      title={menu.label}
                    >
                      {menu.label}
                    </span>
                  </div>
                  {!isCollapsed && hasSub && (
                    <ChevronDown
                      size={16}
                      className={`text-gray-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  )}
                </div>

                {/* Submenus with CSS transition */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <div className="pl-6 pr-1 mt-1 mb-2 space-y-1">
                      {menu.subItems?.map((sub) => {
                        const isActive = location.pathname === sub.path || (sub.path === "/dashboard" && location.pathname === "/");

                        return (
                          <Link
                            key={sub.id}
                            to={sub.path}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 ${isActive ? activeColor : nonActiveColor}`}
                          >
                            <sub.icon size={16} className={isActive ? "text-white shrink-0" : "text-gray-500 shrink-0"} />
                            <span
                              className="text-[13px] font-medium truncate"
                              title={sub.label}
                            >
                              {sub.label}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer / Logout */}
        <div className="p-4 mt-auto border-t border-[#1f1f1f]">
          <button
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-4'} w-full py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-[#161616] transition-colors`}
            title={isCollapsed ? "Logout" : ""}
          >
            <LogOut size={18} className="shrink-0" />
            <span className={`text-sm font-medium tracking-wide whitespace-nowrap overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
              Logout
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
