import React, { useState, useMemo } from 'react';
import {
    FileBarChart, Search, Calendar, User,
    Filter, Download, ChevronLeft, ChevronRight,
    CheckCircle, XCircle, Clock, PieChart,
    BarChart3, FileSpreadsheet, AlertCircle, RefreshCw
} from 'lucide-react';

// --- MOCK DATA ---
const CLASSES = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10'];
const SECTIONS = ['A', 'B', 'C'];

const mockStudentData = [
    { date: '2024-03-01', status: 'Present', note: '-' },
    { date: '2024-03-02', status: 'Present', note: '-' },
    { date: '2024-03-03', status: 'Sunday', note: 'Weekend' },
    { date: '2024-03-04', status: 'Present', note: '-' },
    { date: '2024-03-05', status: 'Absent', note: 'Medical' },
    { date: '2024-03-06', status: 'Late', note: 'Bus delay' },
    { date: '2024-03-07', status: 'Present', note: '-' },
    { date: '2024-03-08', status: 'Half Day', note: 'Family event' },
    { date: '2024-03-09', status: 'Present', note: '-' },
    { date: '2024-03-10', status: 'Sunday', note: 'Weekend' },
    { date: '2024-03-11', status: 'Present', note: '-' },
    { date: '2024-03-12', status: 'Present', note: '-' },
    { date: '2024-03-13', status: 'Present', note: '-' },
    { date: '2024-03-14', status: 'Present', note: '-' },
    { date: '2024-03-15', status: 'Present', note: '-' },
    { date: '2024-03-16', status: 'Sunday', note: 'Weekend' },
    { date: '2024-03-17', status: 'Absent', note: '-' },
    { date: '2024-03-18', status: 'Present', note: '-' },
    { date: '2024-03-19', status: 'Present', note: '-' },
    { date: '2024-03-20', status: 'Present', note: '-' },
    { date: '2024-03-21', status: 'Present', note: '-' },
    { date: '2024-03-22', status: 'Sunday', note: 'Weekend' },
    { date: '2024-03-23', status: 'Present', note: '-' },
    { date: '2024-03-24', status: 'Late', note: 'Traffic' },
    { date: '2024-03-25', status: 'Present', note: '-' },
    { date: '2024-03-26', status: 'Present', note: '-' },
    { date: '2024-03-27', status: 'Present', note: '-' },
    { date: '2024-03-28', status: 'Present', note: '-' },
    { date: '2024-03-29', status: 'Present', note: '-' },
    { date: '2024-03-30', status: 'Sunday', note: 'Weekend' },
    { date: '2024-03-31', status: 'Present', note: '-' },
];

const mockClassSummary = [
    { id: 'ADM-001', name: 'Aarav Sharma', present: 22, absent: 2, late: 1, percent: 88 },
    { id: 'ADM-002', name: 'Priya Verma', present: 24, absent: 0, late: 1, percent: 96 },
    { id: 'ADM-003', name: 'Rohan Gupta', present: 18, absent: 5, late: 2, percent: 72 },
    { id: 'ADM-004', name: 'Sneha Patel', present: 25, absent: 0, late: 0, percent: 100 },
    { id: 'ADM-005', name: 'Kabir Singh', present: 21, absent: 3, late: 1, percent: 84 },
    { id: 'ADM-006', name: 'Ananya Desai', present: 23, absent: 1, late: 1, percent: 92 },
    { id: 'ADM-007', name: 'Ravi Kumar', present: 20, absent: 4, late: 1, percent: 80 },
    { id: 'ADM-008', name: 'Meera Reddy', present: 25, absent: 0, late: 0, percent: 100 },
    { id: 'ADM-009', name: 'Arjun Das', present: 19, absent: 5, late: 1, percent: 76 },
    { id: 'ADM-010', name: 'Neha Sharma', present: 24, absent: 1, late: 0, percent: 96 },
];

const AttendanceReports = () => {
    const [activeTab, setActiveTab] = useState('student'); // 'student' | 'class'
    const [selectedMonth, setSelectedMonth] = useState('2024-03');
    const [selectedClass, setSelectedClass] = useState('Grade 5');
    const [selectedSection, setSelectedSection] = useState('A');
    const [studentSearch, setStudentSearch] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleStudentSearch = () => {
        // Mock finding a student
        if (studentSearch.trim()) {
            setSelectedStudent({
                id: 'ADM-2023-001',
                name: 'Aarav Sharma',
                class: 'Grade 5',
                section: 'A',
                roll: '01'
            });
        }
    };

    const handleExport = (type) => {
        alert(`Exporting ${type} report for ${selectedMonth}...`);
    };

    const MonthPicker = ({ value, onChange }) => {
        const [year, month] = value.split('-');
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const handlePrevMonth = () => {
            const m = parseInt(month);
            const y = parseInt(year);
            if (m === 1) onChange(`${y - 1}-12`);
            else onChange(`${y}-${String(m - 1).padStart(2, '0')}`);
        };

        const handleNextMonth = () => {
            const m = parseInt(month);
            const y = parseInt(year);
            if (m === 12) onChange(`${y + 1}-01`);
            else onChange(`${y}-${String(m + 1).padStart(2, '0')}`);
        };

        return (
            <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-xl p-1">
                <button onClick={handlePrevMonth} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-white rounded-lg transition-all"><ChevronLeft size={16} /></button>
                <div className="px-3 text-sm font-black text-gray-800 min-w-[100px] text-center uppercase tracking-widest">
                    {monthNames[parseInt(month) - 1]} {year}
                </div>
                <button onClick={handleNextMonth} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-white rounded-lg transition-all"><ChevronRight size={16} /></button>
            </div>
        );
    };

    return (
        <div className="p-4 sm:p-6 max-w-[1600px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">Attendance Reports</h1>
                <p className="text-sm text-gray-500 font-medium">Generate deep insights and summaries of student presence.</p>
            </div>

            {/* Tabs */}
            <div className="flex bg-white p-1.5 border border-gray-100 rounded-2xl shadow-sm mb-8 w-fit">
                <button
                    onClick={() => setActiveTab('student')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200 ${activeTab === 'student' ? 'bg-[#C29543] text-white shadow-md' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}
                >
                    <User size={16} /> Student Report
                </button>
                <button
                    onClick={() => setActiveTab('class')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200 ${activeTab === 'class' ? 'bg-[#C29543] text-white shadow-md' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}
                >
                    <BarChart3 size={16} /> Class-wise Report
                </button>
            </div>

            {/* ---- STUDENT REPORT TAB ---- */}
            {activeTab === 'student' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    {/* Search & Period Select */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-4 items-center">
                            <div className="flex-1 relative w-full">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search student by Name or ID..."
                                    value={studentSearch}
                                    onChange={e => setStudentSearch(e.target.value)}
                                    className="w-full pl-11 pr-4 h-10 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold focus:outline-none focus:border-[#C29543]"
                                />
                            </div>
                            <button onClick={handleStudentSearch} className="whitespace-nowrap px-6 h-10 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-all">
                                Generate Report
                            </button>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">Period Selection</label>
                                <MonthPicker value={selectedMonth} onChange={setSelectedMonth} />
                            </div>
                            <button onClick={() => handleExport('individual')} className="mt-4 p-2.5 bg-orange-50 text-[#C29543] rounded-xl hover:bg-orange-100 transition-colors border border-orange-100">
                                <Download size={18} />
                            </button>
                        </div>
                    </div>

                    {selectedStudent ? (
                        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                            {/* Student Info & Summary */}
                            <div className="xl:col-span-1 space-y-6">
                                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
                                    <div className="w-24 h-24 rounded-full mx-auto relative mb-4">
                                        <img src={`https://i.pravatar.cc/150?u=${selectedStudent.id}`} alt="" className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg ring-2 ring-gray-100" />
                                        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center text-white text-[10px] font-black">88%</div>
                                    </div>
                                    <h2 className="text-xl font-black text-gray-900">{selectedStudent.name}</h2>
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{selectedStudent.class} {selectedStudent.section} • Roll: {selectedStudent.roll}</p>

                                    <div className="mt-8 grid grid-cols-2 gap-3 text-left">
                                        <div className="p-3 bg-green-50 rounded-2xl border border-green-100">
                                            <p className="text-[10px] font-bold text-green-600 uppercase mb-1">Present</p>
                                            <p className="text-xl font-black text-green-700">22</p>
                                        </div>
                                        <div className="p-3 bg-red-50 rounded-2xl border border-red-100">
                                            <p className="text-[10px] font-bold text-red-500 uppercase mb-1">Absent</p>
                                            <p className="text-xl font-black text-red-600">02</p>
                                        </div>
                                        <div className="p-3 bg-orange-50 rounded-2xl border border-orange-100">
                                            <p className="text-[10px] font-bold text-orange-600 uppercase mb-1">Late</p>
                                            <p className="text-xl font-black text-orange-700">01</p>
                                        </div>
                                        <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100">
                                            <p className="text-[10px] font-bold text-blue-600 uppercase mb-1">Leaves</p>
                                            <p className="text-xl font-black text-blue-700">01</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Attendance Table */}
                            <div className="xl:col-span-3 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                                    <h3 className="font-black text-gray-900 text-sm">Individual Attendance Log — {selectedMonth}</h3>
                                    <div className="flex items-center gap-1">
                                        <button className="p-2 text-gray-400 hover:text-gray-900"><ChevronLeft size={16} /></button>
                                        <button className="p-2 text-gray-400 hover:text-gray-900"><ChevronRight size={16} /></button>
                                    </div>
                                </div>
                                <div className="overflow-x-auto flex-1">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-gray-100">
                                                <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                                                <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                                <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Status Icon</th>
                                                <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Remarks</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {mockStudentData.map((row, i) => (
                                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 font-bold text-gray-900">{row.date}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${row.status === 'Present' ? 'bg-green-100 text-green-700' :
                                                            row.status === 'Absent' ? 'bg-red-100 text-red-700' :
                                                                row.status === 'Sunday' ? 'bg-gray-100 text-gray-400' : 'bg-orange-100 text-orange-700'
                                                            }`}>
                                                            {row.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {row.status === 'Present' && <CheckCircle size={18} className="text-green-500" />}
                                                        {row.status === 'Absent' && <XCircle size={18} className="text-red-500" />}
                                                        {row.status === 'Late' && <Clock size={18} className="text-orange-500" />}
                                                        {row.status === 'Sunday' && <div className="w-4 h-4 rounded-full border-2 border-gray-200" />}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500 italic font-medium">{row.note}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="py-24 text-center bg-white rounded-3xl border border-gray-100 shadow-sm">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                                <User size={40} className="text-gray-300" />
                            </div>
                            <h3 className="text-lg font-black text-gray-900 italic">No Student Selected</h3>
                            <p className="text-gray-400 max-w-xs mx-auto mt-2 text-sm font-medium">Please search and select a student to see their detailed attendance history.</p>
                        </div>
                    )}
                </div>
            )}

            {/* ---- CLASS REPORT TAB ---- */}
            {activeTab === 'class' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    {/* Filters */}
                    <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col xl:flex-row xl:items-end justify-between gap-6">
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 ml-1">Academic Class</label>
                                <select
                                    value={selectedClass} onChange={e => setSelectedClass(e.target.value)}
                                    className="w-full sm:w-40 px-3 h-10 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-700 focus:outline-none focus:border-[#C29543]"
                                >
                                    {CLASSES.map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 ml-1">Section</label>
                                <select
                                    value={selectedSection} onChange={e => setSelectedSection(e.target.value)}
                                    className="w-full sm:w-24 px-3 h-10 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-700 focus:outline-none focus:border-[#C29543]"
                                >
                                    {SECTIONS.map(s => <option key={s}>{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Report Month</label>
                                <MonthPicker value={selectedMonth} onChange={setSelectedMonth} />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleExport('class')} className="flex-1 sm:w-auto flex items-center justify-center gap-2 px-6 h-10 bg-[#C29543] text-white rounded-xl font-bold text-xs hover:bg-[#A67D35] transition-all shadow-lg shadow-orange-100">
                                <FileSpreadsheet size={16} /> Export Excel
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center bg-gray-900 text-white rounded-xl hover:bg-black transition-all">
                                <RefreshCw size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Class Stats Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {[
                            { label: 'Avg Presence', val: '84.5%', icon: <PieChart />, color: 'text-blue-600', bg: 'bg-blue-50/50' },
                            { label: 'Most Regular', val: 'ADM-004', icon: <User />, color: 'text-green-600', bg: 'bg-green-50/50' },
                            { label: 'Highest Absents', val: 'ADM-003', icon: <AlertCircle />, color: 'text-red-500', bg: 'bg-red-50/50' },
                            { label: 'Working Days', val: '24 Days', icon: <Calendar />, color: 'text-orange-500', bg: 'bg-orange-50/50' },
                        ].map((stat, i) => (
                            <div key={i} className={`p-6 bg-white rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between`}>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                    <p className={`text-2xl font-black ${stat.color}`}>{stat.val}</p>
                                </div>
                                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                                    {React.cloneElement(stat.icon, { size: 24 })}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Main Class List Table */}
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-[500px] flex flex-col">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                            <h3 className="font-black text-gray-900 text-sm">Class Attendance Summary Report ({selectedClass}-{selectedSection})</h3>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter bg-white px-3 py-1 rounded-full border border-gray-100">
                                Total Records: {mockClassSummary.length}
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Roll & Student</th>
                                        <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Present</th>
                                        <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Absent</th>
                                        <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Late</th>
                                        <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Percentage</th>
                                        <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Activity</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {mockClassSummary.map((row, i) => (
                                        <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-400 text-xs border border-gray-200">{(i + 1).toString().padStart(2, '0')}</div>
                                                    <div>
                                                        <p className="text-sm font-black text-gray-900 leading-tight">{row.name}</p>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{row.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-green-600">{row.present}</td>
                                            <td className="px-6 py-4 text-sm font-bold text-red-500">{row.absent}</td>
                                            <td className="px-6 py-4 text-sm font-bold text-orange-500">{row.late}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3 w-32">
                                                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                        <div className={`h-full rounded-full ${row.percent > 85 ? 'bg-green-500' : row.percent > 75 ? 'bg-orange-400' : 'bg-red-500'}`} style={{ width: `${row.percent}%` }}></div>
                                                    </div>
                                                    <span className="text-xs font-black text-gray-900">{row.percent}%</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="px-4 py-1.5 bg-white border border-gray-200 text-[#C29543] font-bold text-[10px] rounded-lg border-b-2 hover:bg-gray-50 active:translate-y-px transition-all uppercase tracking-widest shadow-sm">View Chart</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AttendanceReports;
