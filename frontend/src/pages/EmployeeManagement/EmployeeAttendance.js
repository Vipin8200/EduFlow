import React, { useState, useMemo } from 'react';
import {
    Settings,
    Download,
    Search,
    Calendar,
    ChevronDown,
    Printer,
    Save,
    RotateCcw,
    CheckCircle2,
    XCircle,
    Clock,
    UserCheck,
    Users,
    Eye,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

const EmployeeAttendance = () => {
    const [activeTab, setActiveTab] = useState('Mark Attendance');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter States
    const [markFilters, setMarkFilters] = useState({
        date: '2024-05-18',
        dept: 'All Departments',
        shift: 'Morning (08:00 - 15:00)'
    });

    const [logFilters, setLogFilters] = useState({
        fromDate: '2024-05-01',
        toDate: '2024-05-18',
        dept: 'All Departments',
        status: 'All'
    });

    const [reportFilters, setReportFilters] = useState({
        monthYear: 'May 2024',
        dept: 'All Departments',
        reportType: 'Consolidated Report'
    });

    // Constants for Dropdowns
    const departments = ['All Departments', 'Teaching Staff', 'Administration', 'Support Staff'];
    const shifts = ['Morning (08:00 - 15:00)', 'Afternoon (15:00 - 22:00)', 'Night (22:00 - 05:00)'];
    const logStatuses = ['All', 'Present', 'Absent', 'Late', 'Half Day'];

    // Interactive State for Employees (Mark Attendance)
    const [employees, setEmployees] = useState([
        { id: 'EMP-2031', name: 'Priya Desai', dept: 'Teaching Staff', shift: 'Morning (08:00 - 15:00)', status: 'Present', note: '', avatar: 'https://i.pravatar.cc/150?u=priya' },
        { id: 'EMP-1042', name: 'Arjun Kapoor', dept: 'Administration', shift: 'Morning (08:00 - 15:00)', status: 'Late', note: 'Arrived at 9:15 AM', avatar: 'https://i.pravatar.cc/150?u=arjun' },
        { id: 'EMP-2015', name: 'Sunita Verma', dept: 'Teaching Staff', shift: 'Morning (08:00 - 15:00)', status: 'Absent', note: 'Sick leave informed', avatar: 'https://i.pravatar.cc/150?u=sunita' },
        { id: 'EMP-3056', name: 'Vikram Singh', dept: 'Support Staff', shift: 'Morning (08:00 - 15:00)', status: 'Present', note: '', avatar: 'https://i.pravatar.cc/150?u=vikram' },
        { id: 'EMP-2088', name: 'Neha Gupta', dept: 'Teaching Staff', shift: 'Morning (08:00 - 15:00)', status: 'Half Day', note: 'Leaving early for doctor', avatar: 'https://i.pravatar.cc/150?u=neha' },
        { id: 'EMP-4001', name: 'Rahul Sharma', dept: 'Support Staff', shift: 'Afternoon (15:00 - 22:00)', status: 'Present', note: '', avatar: 'https://i.pravatar.cc/150?u=rahul' },
    ]);

    // Generate 35 mock records for Logs and Reports
    const logData = useMemo(() => {
        const names = ['Priya Desai', 'Arjun Kapoor', 'Sunita Verma', 'Vikram Singh', 'Neha Gupta', 'Rahul Sharma', 'Anjali Rao', 'Amit Patel', 'Suresh Kumar', 'Meena Kumari'];
        const depts = ['Teaching Staff', 'Administration', 'Support Staff'];
        const statuses = ['Present', 'Late', 'Absent', 'Half Day'];

        return Array.from({ length: 35 }, (_, i) => {
            const name = names[i % names.length];
            const id = `EMP-${1000 + i}`;
            return {
                date: `2024-05-${Math.max(1, 18 - Math.floor(i / 5))}`, // Proper YYYY-MM-DD for simpler comparison
                displayDate: `May ${Math.max(1, 18 - Math.floor(i / 5))}, 2024`,
                name,
                id,
                dept: depts[i % depts.length],
                inTime: i % 4 === 2 ? '-' : `0${7 + (i % 3)}: ${15 + (i % 40)} AM`,
                outTime: i % 4 === 2 ? '-' : `0${3 + (i % 3)}: ${10 + (i % 40)} PM`,
                totalHours: i % 4 === 2 ? '-' : `${7 + (i % 2)}h ${10 + (i % 30)}m`,
                status: statuses[i % 4]
            };
        });
    }, []);

    const reportData = useMemo(() => {
        const names = ['Priya Desai', 'Arjun Kapoor', 'Sunita Verma', 'Vikram Singh', 'Neha Gupta', 'Rahul Sharma', 'Anjali Rao', 'Amit Patel', 'Suresh Kumar', 'Meena Kumari'];
        const depts = ['Teaching Staff', 'Administration', 'Support Staff'];

        return Array.from({ length: 35 }, (_, i) => {
            const name = names[i % names.length];
            const id = `EMP-${1000 + i}`;
            return {
                name,
                id,
                dept: depts[i % depts.length],
                totalDays: 22,
                present: 20 - (i % 5),
                absent: i % 3,
                late: i % 4,
                halfDay: i % 2,
                payableDays: 20 - (i % 2) + 0.5
            };
        });
    }, []);

    // Filter Logic
    const filteredEmployees = employees.filter(emp => {
        const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) || emp.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDept = markFilters.dept === 'All Departments' || emp.dept === markFilters.dept;
        const matchesShift = emp.shift === markFilters.shift;
        return matchesSearch && matchesDept && matchesShift;
    });

    const filteredLogs = logData.filter(log => {
        const matchesSearch = log.name.toLowerCase().includes(searchQuery.toLowerCase()) || log.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDept = logFilters.dept === 'All Departments' || log.dept === logFilters.dept;
        const matchesStatus = logFilters.status === 'All' || log.status === logFilters.status;
        const logDate = new Date(log.date);
        const fromDate = new Date(logFilters.fromDate);
        const toDate = new Date(logFilters.toDate);
        const matchesDateRange = logDate >= fromDate && logDate <= toDate;
        return matchesSearch && matchesDept && matchesStatus && matchesDateRange;
    });

    const filteredReports = reportData.filter(rep => {
        const matchesSearch = rep.name.toLowerCase().includes(searchQuery.toLowerCase()) || rep.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDept = reportFilters.dept === 'All Departments' || rep.dept === reportFilters.dept;
        return matchesSearch && matchesDept;
    });

    // Pagination Logic
    const paginate = (data) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return data.slice(startIndex, startIndex + itemsPerPage);
    };

    const totalPages = (data) => Math.ceil(data.length / itemsPerPage);

    const handleStatusChange = (id, newStatus) => {
        setEmployees(prev => prev.map(emp =>
            emp.id === id ? { ...emp, status: emp.status === newStatus ? null : newStatus } : emp
        ));
    };

    const handleNoteChange = (id, newNote) => {
        setEmployees(prev => prev.map(emp =>
            emp.id === id ? { ...emp, note: newNote } : emp
        ));
    };

    const handleResetAll = () => {
        setEmployees(prev => prev.map(emp => ({ ...emp, status: null, note: '' })));
    };

    const handleSaveAttendance = () => {
        const markedCount = employees.filter(e => e.status).length;
        alert(`Attendance Saved Successfully!\n${markedCount} employees marked today.`);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSearchQuery('');
        setCurrentPage(1);
    };

    const tabs = ['Mark Attendance', 'Attendance Logs', 'Attendance Reports'];

    const stats = [
        { label: 'Total Employees', value: '124', sub: 'Selected period', icon: Users, color: 'blue' },
        { label: 'Avg Present', value: '112', sub: '90.3% Overall', icon: CheckCircle2, color: 'green' },
        { label: 'Avg Absent', value: '4', sub: '3.2% Overall', icon: XCircle, color: 'red' },
        { label: 'Avg Late', value: '6', sub: '4.8% Overall', icon: Clock, color: 'orange' },
        { label: 'Half Days', value: '2', sub: '1.6% Overall', icon: UserCheck, color: 'indigo' },
        { label: 'Working Days', value: '22', sub: 'Excluding Weekends', icon: Calendar, color: 'purple' },
    ];

    // Pagination Component
    const Pagination = ({ data }) => {
        const pages = totalPages(data);
        if (pages <= 1) return null;

        return (
            <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-100">
                <div className="text-sm text-gray-500">
                    Showing <span className="font-semibold">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-semibold">{Math.min(currentPage * itemsPerPage, data.length)}</span> of <span className="font-semibold">{data.length}</span> results
                </div>
                <div className="flex items-center gap-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft size={18} className="text-gray-600" />
                    </button>
                    {Array.from({ length: pages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${currentPage === page
                                    ? 'bg-[#C29543] text-white shadow-md'
                                    : 'text-gray-600 hover:bg-gray-50 border border-transparent'
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        disabled={currentPage === pages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight size={18} className="text-gray-600" />
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="p-4 sm:p-6 bg-gray-50/50 min-h-screen font-sans">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Employee Attendance</h1>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm">
                        <Settings size={18} />
                        <span className="hidden sm:inline">Settings</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#C29543] text-white font-medium rounded-lg hover:bg-[#A88039] transition-colors shadow-sm text-sm">
                        <Download size={18} />
                        {activeTab === 'Attendance Logs' ? 'Export Logs' : activeTab === 'Attendance Reports' ? 'Export Reports' : 'Export Report'}
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6 overflow-x-auto no-scrollbar">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => handleTabChange(tab)}
                        className={`px-4 sm:px-6 py-3 text-sm font-semibold transition-all relative truncate min-w-fit ${activeTab === tab ? 'text-[#C29543]' : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C29543]" />
                        )}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
                {activeTab === 'Mark Attendance' && (
                    <>
                        {/* Filters */}
                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-gray-400">Date</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={markFilters.date}
                                        onChange={(e) => setMarkFilters(prev => ({ ...prev, date: e.target.value }))}
                                        className="w-full pl-3 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C29543]/20"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-gray-400">Department</label>
                                <div className="relative">
                                    <select
                                        value={markFilters.dept}
                                        onChange={(e) => setMarkFilters(prev => ({ ...prev, dept: e.target.value }))}
                                        className="w-full pl-3 pr-10 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#C29543]/20"
                                    >
                                        {departments.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-gray-400">Shift</label>
                                <div className="relative">
                                    <select
                                        value={markFilters.shift}
                                        onChange={(e) => setMarkFilters(prev => ({ ...prev, shift: e.target.value }))}
                                        className="w-full pl-3 pr-10 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#C29543]/20"
                                    >
                                        {shifts.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-gray-400">Search Employee</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search by Name or ID..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C29543]/20"
                                    />
                                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-50/50 border-b border-gray-200">
                                            <th className="px-6 py-4 text-[11px] uppercase font-bold text-gray-400">Employee</th>
                                            <th className="px-6 py-4 text-[11px] uppercase font-bold text-gray-400">Department</th>
                                            <th className="px-6 py-4 text-[11px] uppercase font-bold text-gray-400">Shift</th>
                                            <th className="px-6 py-4 text-[11px] uppercase font-bold text-gray-400">Status</th>
                                            <th className="px-6 py-4 text-[11px] uppercase font-bold text-gray-400">Note (Optional)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredEmployees.map((emp, idx) => (
                                            <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/30 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img src={emp.avatar} alt={emp.name} className="w-10 h-10 rounded-full border border-gray-200" />
                                                        <div>
                                                            <div className="text-sm font-bold text-gray-900">{emp.name}</div>
                                                            <div className="text-xs text-gray-400 tracking-wider font-semibold">{emp.id}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600 font-medium">{emp.dept}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600 font-medium">{emp.shift}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        {['Present', 'Absent', 'Late', 'Half Day'].map((status) => (
                                                            <button
                                                                key={status}
                                                                onClick={() => handleStatusChange(emp.id, status)}
                                                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${emp.status === status
                                                                        ? status === 'Present' ? 'bg-green-100 text-green-600 border border-green-200 shadow-sm scale-105'
                                                                            : status === 'Absent' ? 'bg-red-100 text-red-600 border border-red-200 shadow-sm scale-105'
                                                                                : status === 'Late' ? 'bg-orange-100 text-orange-600 border border-orange-200 shadow-sm scale-105'
                                                                                    : 'bg-blue-100 text-blue-600 border border-blue-200 shadow-sm scale-105'
                                                                        : 'bg-white text-gray-300 border border-gray-100 hover:bg-gray-50 hover:text-gray-400'
                                                                    }`}
                                                            >
                                                                {status}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="text"
                                                        placeholder="Add note..."
                                                        value={emp.note}
                                                        onChange={(e) => handleNoteChange(emp.id, e.target.value)}
                                                        className="w-full px-3 py-2 bg-white border border-gray-100 rounded-lg text-xs text-gray-600 focus:outline-none focus:border-[#C29543]/50 transition-colors"
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                        {filteredEmployees.length === 0 && (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-12 text-center text-gray-400 font-medium">No results for the selected filters.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-end gap-3 pt-4 font-bold">
                            <button
                                onClick={handleResetAll}
                                className="px-6 py-2.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                            >
                                <RotateCcw size={16} />
                                Reset All
                            </button>
                            <button
                                onClick={handleSaveAttendance}
                                className="flex items-center gap-2 px-6 py-2.5 bg-[#C29543] text-white rounded-lg hover:bg-[#A88039] transition-colors shadow-md text-sm active:scale-95"
                            >
                                <Save size={18} />
                                Save Attendance
                            </button>
                        </div>
                    </>
                )}

                {activeTab === 'Attendance Logs' && (
                    <>
                        {/* Filters */}
                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-gray-400">From Date</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={logFilters.fromDate}
                                        onChange={(e) => { setLogFilters(prev => ({ ...prev, fromDate: e.target.value })); setCurrentPage(1); }}
                                        className="w-full pl-3 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C29543]/20"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-gray-400">To Date</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={logFilters.toDate}
                                        onChange={(e) => { setLogFilters(prev => ({ ...prev, toDate: e.target.value })); setCurrentPage(1); }}
                                        className="w-full pl-3 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C29543]/20"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-gray-400">Department</label>
                                <div className="relative">
                                    <select
                                        value={logFilters.dept}
                                        onChange={(e) => { setLogFilters(prev => ({ ...prev, dept: e.target.value })); setCurrentPage(1); }}
                                        className="w-full pl-3 pr-10 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#C29543]/20"
                                    >
                                        {departments.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-gray-400">Status</label>
                                <div className="relative">
                                    <select
                                        value={logFilters.status}
                                        onChange={(e) => { setLogFilters(prev => ({ ...prev, status: e.target.value })); setCurrentPage(1); }}
                                        className="w-full pl-3 pr-10 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#C29543]/20"
                                    >
                                        {logStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-gray-400">Search Employee</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search by Name or ID..."
                                        value={searchQuery}
                                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                        className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C29543]/20"
                                    />
                                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-50/50 border-b border-gray-200">
                                            <th className="px-6 py-4 text-[11px] uppercase font-bold text-gray-400">Date</th>
                                            <th className="px-6 py-4 text-[11px] uppercase font-bold text-gray-400">Employee</th>
                                            <th className="px-6 py-4 text-[11px] uppercase font-bold text-gray-400">Department</th>
                                            <th className="px-6 py-4 text-[11px] uppercase font-bold text-gray-400 text-center">In Time</th>
                                            <th className="px-6 py-4 text-[11px] uppercase font-bold text-gray-400 text-center">Out Time</th>
                                            <th className="px-6 py-4 text-[11px] uppercase font-bold text-gray-400">Total Hours</th>
                                            <th className="px-6 py-4 text-[11px] uppercase font-bold text-gray-400">Status</th>
                                            <th className="px-6 py-4 text-[11px] uppercase font-bold text-gray-400 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginate(filteredLogs).map((log, idx) => (
                                            <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/30 transition-colors">
                                                <td className="px-6 py-4 text-sm text-gray-900 font-medium whitespace-nowrap">{log.displayDate}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img src={`https://i.pravatar.cc/150?u=${log.name}`} alt={log.name} className="w-8 h-8 rounded-full border border-gray-200" />
                                                        <div>
                                                            <div className="text-sm font-bold text-gray-900">{log.name}</div>
                                                            <div className="text-[10px] text-gray-400 font-bold uppercase">{log.id}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600 font-medium whitespace-nowrap">{log.dept}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`px-2 py-1 rounded text-[11px] font-bold ${log.inTime === '-' ? 'text-gray-400' : 'bg-gray-100 text-gray-700 border border-gray-100'}`}>
                                                        {log.inTime}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`px-2 py-1 rounded text-[11px] font-bold ${log.outTime === '-' ? 'text-gray-400' : 'bg-gray-100 text-gray-700 border border-gray-100'}`}>
                                                        {log.outTime}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600 font-medium">{log.totalHours}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${log.status === 'Present' ? 'text-green-600 bg-green-50 border border-green-100' :
                                                            log.status === 'Late' ? 'text-orange-600 bg-orange-50 border border-orange-100' :
                                                                log.status === 'Absent' ? 'text-red-600 bg-red-50 border border-red-100' :
                                                                    'text-blue-600 bg-blue-50 border border-blue-100'
                                                        }`}>
                                                        {log.status === 'Present' && <CheckCircle2 size={12} />}
                                                        {log.status === 'Late' && <Clock size={12} />}
                                                        {log.status === 'Absent' && <XCircle size={12} />}
                                                        {log.status === 'Half Day' && <UserCheck size={12} />}
                                                        {log.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button className="px-3 py-1 text-xs font-bold text-gray-700 border border-gray-200 rounded hover:bg-gray-50">Edit</button>
                                                </td>
                                            </tr>
                                        ))}
                                        {filteredLogs.length === 0 && (
                                            <tr>
                                                <td colSpan="8" className="px-6 py-12 text-center text-gray-400 font-medium">No results for the selected filters.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination data={filteredLogs} />
                        </div>
                    </>
                )}

                {activeTab === 'Attendance Reports' && (
                    <>
                        {/* Filters */}
                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-gray-400">Month & Year</label>
                                <div className="relative">
                                    <select
                                        value={reportFilters.monthYear}
                                        onChange={(e) => { setReportFilters(prev => ({ ...prev, monthYear: e.target.value })); setCurrentPage(1); }}
                                        className="w-full pl-3 pr-10 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#C29543]/20"
                                    >
                                        <option>May 2024</option>
                                        <option>April 2024</option>
                                    </select>
                                    <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-gray-400">Department</label>
                                <div className="relative">
                                    <select
                                        value={reportFilters.dept}
                                        onChange={(e) => { setReportFilters(prev => ({ ...prev, dept: e.target.value })); setCurrentPage(1); }}
                                        className="w-full pl-3 pr-10 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#C29543]/20"
                                    >
                                        {departments.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-gray-400">Report Type</label>
                                <div className="relative">
                                    <select
                                        value={reportFilters.reportType}
                                        onChange={(e) => setReportFilters(prev => ({ ...prev, reportType: e.target.value }))}
                                        className="w-full pl-3 pr-10 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#C29543]/20"
                                    >
                                        <option>Consolidated Report</option>
                                        <option>Detail Report</option>
                                    </select>
                                    <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-gray-400">Search Employee</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search by Name or ID..."
                                        value={searchQuery}
                                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                        className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C29543]/20"
                                    />
                                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group hover:border-[#C29543]/30 transition-colors">
                                    <div className={`absolute top-4 right-4 p-1.5 rounded-lg opacity-20 bg-${stat.color}-500 text-${stat.color}-600 group-hover:opacity-40 transition-opacity`}>
                                        <stat.icon size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{stat.label}</span>
                                        <span className="text-xl font-bold text-gray-900 my-1">{stat.value}</span>
                                        <span className="text-[10px] text-gray-400 font-medium">{stat.sub}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Table */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden text-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-50/50 border-b border-gray-200">
                                            <th className="px-4 sm:px-6 py-4 text-[11px] uppercase font-bold text-gray-400">Employee</th>
                                            <th className="px-4 sm:px-6 py-4 text-[11px] uppercase font-bold text-gray-400">Department</th>
                                            <th className="px-4 sm:px-6 py-4 text-[11px] uppercase font-bold text-gray-400 text-center">Total Days</th>
                                            <th className="px-4 sm:px-6 py-4 text-[11px] uppercase font-bold text-gray-400 text-center">Present</th>
                                            <th className="px-4 sm:px-6 py-4 text-[11px] uppercase font-bold text-gray-400 text-center">Absent</th>
                                            <th className="px-4 sm:px-6 py-4 text-[11px] uppercase font-bold text-gray-400 text-center">Late</th>
                                            <th className="px-4 sm:px-6 py-4 text-[11px] uppercase font-bold text-gray-400 text-center">Half Day</th>
                                            <th className="px-4 sm:px-6 py-4 text-[11px] uppercase font-bold text-gray-400 text-center">Payable Days</th>
                                            <th className="px-4 sm:px-6 py-4 text-[11px] uppercase font-bold text-gray-400 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginate(filteredReports).map((row, idx) => (
                                            <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/30 transition-colors">
                                                <td className="px-4 sm:px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img src={`https://i.pravatar.cc/150?u=${row.name}`} alt={row.name} className="w-9 h-9 rounded-full border border-gray-100" />
                                                        <div>
                                                            <div className="text-sm font-bold text-gray-900">{row.name}</div>
                                                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{row.id}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 sm:px-6 py-4 text-sm text-gray-600 font-medium">{row.dept}</td>
                                                <td className="px-4 sm:px-6 py-4 text-center text-sm font-semibold text-gray-700">{row.totalDays}</td>
                                                <td className="px-4 sm:px-6 py-4 text-center text-sm font-bold text-green-600">{row.present}</td>
                                                <td className="px-4 sm:px-6 py-4 text-center text-sm font-bold text-red-600">{row.absent}</td>
                                                <td className="px-4 sm:px-6 py-4 text-center text-sm font-bold text-orange-600">{row.late}</td>
                                                <td className="px-4 sm:px-6 py-4 text-center text-sm font-bold text-blue-600">{row.halfDay}</td>
                                                <td className="px-4 sm:px-6 py-4 text-center text-sm font-bold text-gray-900">{row.payableDays.toFixed(1)}</td>
                                                <td className="px-4 sm:px-6 py-4 text-center">
                                                    <button className="px-3 py-1.5 text-[11px] font-bold text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-1.5 mx-auto transition-transform active:scale-95">
                                                        <Eye size={14} />
                                                        View Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {filteredReports.length === 0 && (
                                            <tr>
                                                <td colSpan="9" className="px-6 py-12 text-center text-gray-400 font-medium">No results for the selected filters.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination data={filteredReports} />
                        </div>

                        {/* Print Header for Reports */}
                        <div className="hidden print:block mb-8 border-b pb-4">
                            <h1 className="text-3xl font-bold text-center">Attendance Report</h1>
                            <p className="text-center text-gray-500">EduFlow Management System | Period: May 2024</p>
                        </div>
                    </>
                )}
            </div>

            <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </div>
    );
};

export default EmployeeAttendance;
