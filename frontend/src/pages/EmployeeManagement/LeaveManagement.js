import React, { useState, useMemo } from "react";
import {
    Search,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Filter,
    MoreVertical,
    CheckCircle2,
    XCircle,
    Clock,
    Plus,
    FileText,
    Users,
    TrendingUp,
    AlertCircle,
    Download,
    History,
    Settings,
    User
} from "lucide-react";

// --- Mock Data Generation ---

const leaveTypes = ["Casual Leave", "Sick Leave", "Privilege Leave", "Maternity", "Paternity"];
const statuses = ["Approved", "Pending", "Rejected"];
const departments = ["Administration", "Teaching", "Support Staff", "Library", "Science Dept"];

const generateMockLeaves = (count) => {
    return Array.from({ length: count }).map((_, i) => ({
        id: `LV-${1000 + i}`,
        employee: {
            name: ["Rahul Verma", "Sneha Patil", "Aman Singh", "Neha Sharma", "Priya Desai", "Arjun Kapoor", "Sunita Verma", "Vikram Singh"][i % 8],
            id: `EMP-${2000 + i}`,
            role: i % 2 === 0 ? "Admin" : "Teaching",
            avatar: `https://i.pravatar.cc/150?u=${i}`
        },
        type: leaveTypes[i % leaveTypes.length],
        duration: `${(i % 5) + 1} Days`,
        dates: {
            start: `${10 + (i % 20)} Jun, 2024`,
            end: `${12 + (i % 20)} Jun, 2024`
        },
        reason: ["Attending family function", "Severe headache and fever", "Planned vacation", "Medical checkup", "Personal work"][i % 5],
        status: statuses[i % 3],
        appliedOn: `${5 + (i % 20)} Jun, 2024`
    }));
};

const generateMockBalances = (count) => {
    return Array.from({ length: count }).map((_, i) => ({
        id: `BAL-${1000 + i}`,
        employee: {
            name: ["Rahul Verma", "Sneha Patil", "Aman Singh", "Neha Sharma", "Priya Desai", "Arjun Kapoor", "Sunita Verma", "Vikram Singh"][i % 8],
            id: `EMP-${2000 + i}`,
            department: departments[i % departments.length],
            avatar: `https://i.pravatar.cc/150?u=${i + 50}`
        },
        balances: {
            casual: { used: i % 12, total: 12 },
            sick: { used: i % 10, total: 10 },
            privilege: { used: i % 15, total: 15 }
        }
    }));
};

const mockApplications = generateMockLeaves(30);
const mockApprovals = generateMockLeaves(35);
const mockBalances = generateMockBalances(32);

// --- Components ---

const StatCard = ({ title, count, subtitle, icon: Icon, colorClass, iconBg }) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start justify-between group hover:border-[#C29543]/30 transition-all duration-300">
        <div className="space-y-2">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">{title}</p>
            <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-black text-gray-900">{count}</h3>
            </div>
            <p className="text-gray-400 text-xs font-medium">{subtitle}</p>
        </div>
        <div className={`p-3 rounded-xl ${iconBg} ${colorClass} group-hover:scale-110 transition-transform`}>
            <Icon size={20} />
        </div>
    </div>
);

const Pagination = ({ currentPage, totalPages, totalItems, onPageChange }) => (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2">
        <p className="text-sm font-bold text-gray-400">
            Showing <span className="text-gray-900">{(currentPage - 1) * 10 + 1}-{Math.min(currentPage * 10, totalItems)}</span> of <span className="text-gray-900">{totalItems}</span> records
        </p>
        <div className="flex items-center gap-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronLeft size={20} />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                const pageNum = i + 1;
                return (
                    <button
                        key={pageNum}
                        onClick={() => onPageChange(pageNum)}
                        className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${currentPage === pageNum ? 'bg-[#C29543] text-white shadow-md shadow-[#C29543]/20' : 'text-gray-500 hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}
                    >
                        {pageNum}
                    </button>
                );
            })}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    </div>
);

export default function LeaveManagement() {
    const [activeTab, setActiveTab] = useState("application");
    const [searchQuery, setSearchQuery] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [typeFilter, setTypeFilter] = useState("All Types");
    const [deptFilter, setDeptFilter] = useState("All Departments");
    const [currentPage, setCurrentPage] = useState(1);

    // --- Reset pagination on tab/filter change ---
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1);
        setSearchQuery("");
    };

    // --- Filtering Logic ---
    const filteredData = useMemo(() => {
        let baseData = activeTab === "application" ? mockApprovals : activeTab === "approval" ? mockApprovals : mockBalances;

        return baseData.filter(item => {
            const matchesSearch = item.employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.employee.id.toLowerCase().includes(searchQuery.toLowerCase());

            if (!matchesSearch) return false;

            if (activeTab === "balance") {
                const matchesDept = deptFilter === "All Departments" || item.employee.department === deptFilter;
                return matchesDept;
            } else if (activeTab === "application") {
                // Show ONLY Pending requests for the "Application" (Active) tab
                const matchesStatus = item.status === "Pending";
                const matchesType = typeFilter === "All Types" || item.type === typeFilter;
                return matchesStatus && matchesType;
            } else if (activeTab === "approval") {
                // Show Approved/Rejected for the "Approval" (History) tab
                const matchesStatus = statusFilter === "All" || (statusFilter === "Pending" ? item.status === "Pending" : item.status === statusFilter);
                // By default in history, we don't usually see "Pending" unless "All" is selected
                const isHistory = statusFilter === "All" ? (item.status !== "Pending") : (item.status === statusFilter);
                const matchesType = typeFilter === "All Types" || item.type === typeFilter;
                return isHistory && matchesType;
            }
            return true;
        });
    }, [activeTab, searchQuery, statusFilter, typeFilter, deptFilter]);

    const totalPages = Math.ceil(filteredData.length / 10);
    const paginatedData = filteredData.slice((currentPage - 1) * 10, currentPage * 10);

    return (
        <div className="max-w-[1400px] mx-auto p-4 md:p-8 space-y-8 bg-gray-50/30 min-h-screen">
            {/* --- Header --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Leave Management</h1>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-gray-200 bg-white font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
                        <FileText size={18} className="text-[#C29543]" />
                        Leave Policies
                    </button>
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#C29543] text-white font-bold hover:bg-[#A88039] transition-all shadow-md shadow-[#C29543]/20">
                        <Plus size={18} />
                        Apply Leave
                    </button>
                </div>
            </div>

            {/* --- Navigation Tabs --- */}
            <div className="flex border-b border-gray-200 overflow-x-auto no-scrollbar">
                {[
                    { label: "Leave Application", id: "application" },
                    { label: "Leave Approval (History)", id: "approval" },
                    { label: "Leave Balance Tracking", id: "balance" }
                ].map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)}
                            className={`px-8 py-4 text-sm font-black whitespace-nowrap transition-all border-b-2 ${isActive ? 'border-[#C29543] text-[#A88039]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* --- Filter Bar --- */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                {activeTab === 'application' ? (
                    <>
                        <div className="md:col-span-3 space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Leave Type</label>
                            <div className="relative">
                                <select
                                    value={typeFilter}
                                    onChange={(e) => setTypeFilter(e.target.value)}
                                    className="w-full pl-4 pr-10 py-3 appearance-none rounded-xl border border-gray-100 bg-white text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C29543]/10 focus:border-[#C29543]/50 transition-all shadow-sm"
                                >
                                    <option>All Types</option>
                                    {leaveTypes.map(type => <option key={type}>{type}</option>)}
                                </select>
                                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div className="md:col-span-4 space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Search Employee</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search by Name or ID..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-100 bg-white text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C29543]/10 focus:border-[#C29543]/50 transition-all shadow-sm"
                                />
                                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>
                    </>
                ) : activeTab === 'approval' ? (
                    <>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Status</label>
                            <div className="relative">
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="w-full pl-4 pr-10 py-3 appearance-none rounded-xl border border-gray-100 bg-white text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C29543]/10 focus:border-[#C29543]/50 transition-all shadow-sm"
                                >
                                    <option>All</option>
                                    <option>Approved</option>
                                    <option>Rejected</option>
                                </select>
                                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div className="md:col-span-3 space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Date Range</label>
                            <div className="relative">
                                <input
                                    type="date"
                                    value={dateFilter}
                                    onChange={(e) => setDateFilter(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-white text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C29543]/10 focus:border-[#C29543]/50 transition-all shadow-sm"
                                />
                                <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div className="md:col-span-4 space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Search Employee</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search History..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-100 bg-white text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C29543]/10 focus:border-[#C29543]/50 transition-all shadow-sm"
                                />
                                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="md:col-span-3 space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Department</label>
                            <div className="relative">
                                <select
                                    value={deptFilter}
                                    onChange={(e) => setDeptFilter(e.target.value)}
                                    className="w-full pl-4 pr-10 py-3 appearance-none rounded-xl border border-gray-100 bg-white text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C29543]/10 focus:border-[#C29543]/50 transition-all shadow-sm"
                                >
                                    <option>All Departments</option>
                                    {departments.map(d => <option key={d}>{d}</option>)}
                                </select>
                                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div className="md:col-span-3 space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Leave Year</label>
                            <div className="relative">
                                <select className="w-full pl-4 pr-10 py-3 appearance-none rounded-xl border border-gray-100 bg-white text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C29543]/10 focus:border-[#C29543]/50 transition-all shadow-sm">
                                    <option>2024-2025</option>
                                    <option>2023-2024</option>
                                </select>
                                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div className="md:col-span-4 space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Search Employee</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search Balance..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-100 bg-white text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C29543]/10 focus:border-[#C29543]/50 transition-all shadow-sm"
                                />
                                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>
                    </>
                )}

                {(activeTab === 'balance' || activeTab === 'approval') && (
                    <div className="md:col-span-2">
                        <button className="w-full flex items-center justify-center gap-2 py-3 border border-gray-200 bg-white rounded-xl text-xs font-black text-gray-700 hover:bg-gray-50 transition-all shadow-sm uppercase tracking-wider">
                            <Download size={16} />
                            {activeTab === 'balance' ? 'Export Report' : 'Download'}
                        </button>
                    </div>
                )}
            </div>

            {/* --- Stat Cards --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {activeTab !== 'balance' ? (
                    <>
                        <StatCard title="Pending Requests" count="12" subtitle="Awaiting approval" icon={Clock} colorClass="text-orange-600" iconBg="bg-orange-50" />
                        <StatCard title="Approved" count="45" subtitle="This month" icon={CheckCircle2} colorClass="text-green-600" iconBg="bg-green-50" />
                        <StatCard title="On Leave Today" count="8" subtitle="Out of 124 employees" icon={Users} colorClass="text-blue-600" iconBg="bg-blue-50" />
                        <StatCard title="Rejected" count="3" subtitle="This month" icon={XCircle} colorClass="text-red-600" iconBg="bg-red-50" />
                    </>
                ) : (
                    <>
                        <StatCard title="Total Employees" count="124" subtitle="Active staffs" icon={Users} colorClass="text-blue-600" iconBg="bg-blue-50" />
                        <StatCard title="Average Leaves Taken" count="4.5" subtitle="Days per employee" icon={TrendingUp} colorClass="text-[#C29543]" iconBg="bg-[#C29543]/10" />
                        <StatCard title="Low Balance Alerts" count="12" subtitle="Employees < 3 days left" icon={AlertCircle} colorClass="text-red-600" iconBg="bg-red-50" />
                        <StatCard title="Leave Encashment" count="5" subtitle="Pending requests" icon={TrendingUp} colorClass="text-green-600" iconBg="bg-green-50" />
                    </>
                )}
            </div>

            {/* --- Table Section --- */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                <div className="overflow-x-auto h-[500px] no-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead className="sticky top-0 z-10">
                            <tr className="bg-gray-50/80 backdrop-blur-sm border-b border-gray-100">
                                <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Employee</th>
                                {activeTab !== 'balance' ? (
                                    <>
                                        <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Leave Type</th>
                                        <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Duration</th>
                                        <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Dates</th>
                                        <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Reason</th>
                                        <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                        <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                    </>
                                ) : (
                                    <>
                                        <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Department</th>
                                        <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Casual (CL)</th>
                                        <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Sick (SL)</th>
                                        <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Privilege (PL)</th>
                                        <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Available</th>
                                        <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {paginatedData.map((item, idx) => (
                                <tr key={item.id} className="group hover:bg-gray-50/50 transition-all">
                                    <td className="p-5">
                                        <div className="flex items-center gap-3">
                                            <img src={item.employee.avatar} alt="" className="w-10 h-10 rounded-full border border-gray-100 object-cover" />
                                            <div>
                                                <p className="font-bold text-gray-900 text-sm leading-tight">{item.employee.name}</p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.employee.id} • {item.employee.role || item.employee.department}</p>
                                            </div>
                                        </div>
                                    </td>
                                    {activeTab !== 'balance' ? (
                                        <>
                                            <td className="p-5 font-bold text-gray-700 text-sm">{item.type}</td>
                                            <td className="p-5 font-bold text-gray-700 text-sm">{item.duration}</td>
                                            <td className="p-5">
                                                <div className="space-y-0.5">
                                                    <p className="font-bold text-gray-900 text-sm">{item.dates.start}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">to {item.dates.end}</p>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <p className="text-sm font-medium text-gray-500 max-w-[200px] truncate group-hover:whitespace-normal group-hover:overflow-visible transition-all">
                                                    {item.reason}
                                                </p>
                                            </td>
                                            <td className="p-5">
                                                <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase border ${item.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-100' :
                                                    item.status === 'Pending' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                                                        'bg-red-50 text-red-700 border-red-100'
                                                    }`}>
                                                    {item.status === 'Approved' ? <CheckCircle2 size={12} /> :
                                                        item.status === 'Pending' ? <Clock size={12} /> :
                                                            <XCircle size={12} />}
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="p-5 text-right">
                                                {activeTab === 'application' ? (
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button className="px-4 py-1.5 rounded-lg border border-green-200 text-green-600 text-[10px] font-black uppercase tracking-widest hover:bg-green-50 transition-all">Approve</button>
                                                        <button className="px-4 py-1.5 rounded-lg border border-red-200 text-red-600 text-[10px] font-black uppercase tracking-widest hover:bg-red-50 transition-all">Reject</button>
                                                    </div>
                                                ) : (
                                                    <button className="text-gray-400 hover:text-gray-900 transition-colors">
                                                        <MoreVertical size={18} />
                                                    </button>
                                                )}
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="p-5 font-bold text-gray-700 text-sm">{item.employee.department}</td>
                                            <td className="p-5">
                                                <div className="space-y-1">
                                                    <p className="text-sm font-black text-gray-900">{item.balances.casual.total - item.balances.casual.used} <span className="text-[10px] text-gray-400 font-bold uppercase">/ {item.balances.casual.total}</span></p>
                                                    <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                        <div className="h-full bg-[#C29543]/60 rounded-full" style={{ width: `${((item.balances.casual.total - item.balances.casual.used) / item.balances.casual.total) * 100}%` }} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <div className="space-y-1">
                                                    <p className="text-sm font-black text-gray-900">{item.balances.sick.total - item.balances.sick.used} <span className="text-[10px] text-gray-400 font-bold uppercase">/ {item.balances.sick.total}</span></p>
                                                    <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                        <div className="h-full bg-blue-400 rounded-full" style={{ width: `${((item.balances.sick.total - item.balances.sick.used) / item.balances.sick.total) * 100}%` }} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <div className="space-y-1">
                                                    <p className="text-sm font-black text-gray-900">{item.balances.privilege.total - item.balances.privilege.used} <span className="text-[10px] text-gray-400 font-bold uppercase">/ {item.balances.privilege.total}</span></p>
                                                    <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                        <div className="h-full bg-green-400 rounded-full" style={{ width: `${((item.balances.privilege.total - item.balances.privilege.used) / item.balances.privilege.total) * 100}%` }} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <p className="text-lg font-black text-[#C29543]">
                                                    {(item.balances.casual.total - item.balances.casual.used) + (item.balances.sick.total - item.balances.sick.used) + (item.balances.privilege.total - item.balances.privilege.used)} Days
                                                </p>
                                            </td>
                                            <td className="p-5 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-400 text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all">
                                                        <History size={12} />
                                                        History
                                                    </button>
                                                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#C29543]/20 text-[#C29543] text-[10px] font-black uppercase tracking-widest hover:bg-[#C29543]/5 transition-all">
                                                        <Settings size={12} />
                                                        Adjust
                                                    </button>
                                                </div>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* --- Pagination --- */}
                <div className="border-t border-gray-100 bg-white">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={filteredData.length}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>

            {/* Dynamic Styles */}
            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
}

const ChevronDown = ({ size, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6" /></svg>
);
