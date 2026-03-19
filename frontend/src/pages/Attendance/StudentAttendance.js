import React, { useState, useMemo } from 'react';
import {
    UserCheck, Calendar, Clock, BookOpen, Search,
    Filter, CheckCircle, XCircle, ChevronLeft,
    ChevronRight, Save, Download, RefreshCw, User
} from 'lucide-react';

// --- MOCK DATA ---
const CLASSES = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10'];
const SECTIONS = ['A', 'B', 'C'];
const LECTURES = [
    { id: 1, name: 'Mathematics', time: '08:30 AM - 09:20 AM' },
    { id: 2, name: 'English', time: '09:20 AM - 10:10 AM' },
    { id: 3, name: 'Science', time: '10:10 AM - 11:00 AM' },
    { id: 4, name: 'History', time: '11:20 AM - 12:10 PM' },
    { id: 5, name: 'Physical Education', time: '12:10 PM - 01:00 PM' },
];

const mockStudents = [
    { id: 'ADM-2023-001', name: 'Aarav Sharma', roll: '01', status: 'Present' },
    { id: 'ADM-2023-002', name: 'Priya Verma', roll: '02', status: 'Present' },
    { id: 'ADM-2023-003', name: 'Rohan Gupta', roll: '03', status: 'Absent' },
    { id: 'ADM-2023-004', name: 'Sneha Patel', roll: '04', status: 'Late' },
    { id: 'ADM-2023-005', name: 'Kabir Singh', roll: '05', status: 'Present' },
    { id: 'ADM-2023-006', name: 'Ananya Desai', roll: '06', status: 'Half Day' },
    { id: 'ADM-2023-007', name: 'Ravi Kumar', roll: '07', status: 'Present' },
    { id: 'ADM-2023-008', name: 'Meera Reddy', roll: '08', status: 'Present' },
    { id: 'ADM-2023-009', name: 'Arjun Das', roll: '09', status: 'Absent' },
    { id: 'ADM-2023-010', name: 'Neha Sharma', roll: '10', status: 'Present' },
];

const Attendance = () => {
    const [activeTab, setActiveTab] = useState('daily'); // 'daily' | 'lecture'
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedClass, setSelectedClass] = useState('Grade 5');
    const [selectedSection, setSelectedSection] = useState('A');
    const [selectedLecture, setSelectedLecture] = useState(LECTURES[0].id);
    const [searchQuery, setSearchQuery] = useState('');
    const [students, setStudents] = useState(mockStudents);

    const stats = useMemo(() => {
        return {
            total: students.length,
            present: students.filter(s => s.status === 'Present').length,
            absent: students.filter(s => s.status === 'Absent').length,
            late: students.filter(s => s.status === 'Late').length,
            halfDay: students.filter(s => s.status === 'Half Day').length,
        };
    }, [students]);

    const handleStatusChange = (id, newStatus) => {
        setStudents(students.map(s => s.id === id ? { ...s, status: newStatus } : s));
    };

    const handleMarkAll = (status) => {
        setStudents(students.map(s => ({ ...s, status })));
    };

    const handleSave = () => {
        alert(`${activeTab === 'daily' ? 'Daily' : 'Lecture-wise'} attendance saved for ${selectedDate}!`);
    };

    const handleExport = () => {
        const headers = ["Student ID", "Roll Number", "Name", "Status", "Date", "Mode"];
        const rows = students.map(s => [
            s.id,
            s.roll,
            s.name,
            s.status,
            selectedDate,
            activeTab === 'daily' ? 'Daily' : `Lecture: ${LECTURES.find(l => l.id === selectedLecture)?.name}`
        ]);

        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `Attendance_${selectedClass}_${selectedSection}_${selectedDate}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Present': return 'bg-green-100 text-green-700 border-green-200';
            case 'Absent': return 'bg-red-100 text-red-700 border-red-200';
            case 'Late': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'Half Day': return 'bg-blue-100 text-blue-700 border-blue-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="p-4 sm:p-6 max-w-[1600px] mx-auto w-full min-h-screen bg-gray-50 font-sans">
            {/* Header Area */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">Student Attendance</h1>
                    <p className="text-sm text-gray-500 font-medium">Manage daily and period-wise presence records.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all shadow-sm">
                        <Download size={16} /> Export Report
                    </button>
                    <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-[#C29543] text-white rounded-xl font-bold text-sm hover:bg-[#A67D35] transition-all shadow-lg shadow-orange-100">
                        <Save size={16} /> Save Attendance
                    </button>
                </div>
            </div>

            {/* Main Tabs */}
            <div className="flex bg-white p-1.5 border border-gray-100 rounded-2xl shadow-sm mb-6 w-fit">
                <button
                    onClick={() => setActiveTab('daily')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${activeTab === 'daily' ? 'bg-[#C29543] text-white shadow-md' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}
                >
                    <UserCheck size={18} /> Daily Attendance
                </button>
                <button
                    onClick={() => setActiveTab('lecture')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${activeTab === 'lecture' ? 'bg-[#C29543] text-white shadow-md' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}
                >
                    <Clock size={18} /> Lecture-wise
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left: Filters & Stats */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Filter Card */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-5">
                        <h3 className="font-black text-gray-900 text-sm flex items-center gap-2">
                            <Filter size={16} className="text-[#C29543]" /> Attendance Filters
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Select Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-700 focus:outline-none focus:border-[#C29543] transition-colors" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Class</label>
                                    <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-700 focus:outline-none focus:border-[#C29543] appearance-none">
                                        {CLASSES.map(c => <option key={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Section</label>
                                    <select value={selectedSection} onChange={e => setSelectedSection(e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-700 focus:outline-none focus:border-[#C29543]">
                                        {SECTIONS.map(s => <option key={s}>{s}</option>)}
                                    </select>
                                </div>
                            </div>

                            {activeTab === 'lecture' && (
                                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Select Lecture</label>
                                    <div className="relative">
                                        <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <select value={selectedLecture} onChange={e => setSelectedLecture(parseInt(e.target.value))} className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-700 focus:outline-none focus:border-[#C29543]">
                                            {LECTURES.map(l => <option key={l.id} value={l.id}>{l.name} ({l.id})</option>)}
                                        </select>
                                    </div>
                                    <p className="text-[10px] text-gray-400 font-bold mt-2 ml-1">
                                        {LECTURES.find(l => l.id === selectedLecture)?.time}
                                    </p>
                                </div>
                            )}

                            <button className="w-full py-2.5 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-all flex items-center justify-center gap-2">
                                <RefreshCw size={16} /> Load Student List
                            </button>
                        </div>
                    </div>

                    {/* Stats Card */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="font-black text-gray-900 text-sm mb-4">Live Summary</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <User size={16} className="text-gray-400" />
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total Students</span>
                                </div>
                                <span className="text-lg font-black text-gray-900">{stats.total}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 bg-green-50 rounded-xl border border-green-100 text-center">
                                    <p className="text-xl font-black text-green-700">{stats.present}</p>
                                    <p className="text-[10px] font-black text-green-600 uppercase">Present</p>
                                </div>
                                <div className="p-3 bg-red-50 rounded-xl border border-red-100 text-center">
                                    <p className="text-xl font-black text-red-700">{stats.absent}</p>
                                    <p className="text-[10px] font-black text-red-600 uppercase">Absent</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 bg-orange-50 rounded-xl border border-orange-100 text-center">
                                    <p className="text-lg font-black text-orange-700">{stats.late}</p>
                                    <p className="text-[10px] font-black text-orange-600 uppercase">Late</p>
                                </div>
                                <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-center">
                                    <p className="text-lg font-black text-blue-700">{stats.halfDay}</p>
                                    <p className="text-[10px] font-black text-blue-600 uppercase">Half Day</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Student List */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
                        {/* List Header */}
                        <div className="px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="relative w-full sm:w-64">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by name/roll..."
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-[#C29543]"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest mr-2">Mark All:</span>
                                <button onClick={() => handleMarkAll('Present')} className="px-3 py-1.5 bg-green-50 text-green-600 text-[10px] font-black rounded-lg hover:bg-green-100 uppercase transition-colors">Present</button>
                                <button onClick={() => handleMarkAll('Absent')} className="px-3 py-1.5 bg-red-50 text-red-600 text-[10px] font-black rounded-lg hover:bg-red-100 uppercase transition-colors">Absent</button>
                                <button onClick={() => handleMarkAll('Late')} className="px-3 py-1.5 bg-orange-50 text-orange-600 text-[10px] font-black rounded-lg hover:bg-orange-100 uppercase transition-colors">Late</button>
                            </div>
                        </div>

                        {/* List Content */}
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
                                {students.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.roll.includes(searchQuery)).map((student) => (
                                    <div key={student.id} className={`p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between group ${student.status === 'Absent' ? 'bg-red-50/10 border-red-100' : 'bg-white border-gray-100 shadow-sm hover:border-gray-200'}`}>
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm ring-2 ring-gray-100">
                                                    <img src={`https://i.pravatar.cc/150?u=${student.id}`} alt={student.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-black uppercase text-white ${student.status === 'Present' ? 'bg-green-500' : student.status === 'Absent' ? 'bg-red-500' : 'bg-orange-500'}`}>
                                                    {student.status.charAt(0)}
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-gray-900 tracking-tight group-hover:text-[#C29543] transition-colors">{student.name}</p>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-100 px-1.5 py-0.5 rounded">Roll: {student.roll}</span>
                                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{student.id}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center bg-gray-50/80 p-1 rounded-xl gap-0.5">
                                            {[
                                                { label: 'P', val: 'Present', color: 'hover:bg-green-500 hover:text-white text-green-600' },
                                                { label: 'A', val: 'Absent', color: 'hover:bg-red-500 hover:text-white text-red-600' },
                                                { label: 'L', val: 'Late', color: 'hover:bg-orange-500 hover:text-white text-orange-600' },
                                                { label: 'H', val: 'Half Day', color: 'hover:bg-blue-500 hover:text-white text-blue-600 text-xs' },
                                            ].map((btn) => (
                                                <button
                                                    key={btn.label}
                                                    onClick={() => handleStatusChange(student.id, btn.val)}
                                                    className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-black transition-all ${student.status === btn.val ? btn.color.split(' ')[0].replace('hover:', '') + ' text-white ring-2 ring-white shadow-sm transform scale-110' : btn.color.split(' ')[0] + ' ' + btn.color.split(' ')[2]}`}
                                                    title={btn.val}
                                                >
                                                    {btn.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer Info */}
                        <div className="mt-auto px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    {students.slice(0, 5).map(s => (
                                        <img key={s.id} className="w-7 h-7 rounded-full border-2 border-white grayscale hover:grayscale-0 transition-all cursor-pointer" src={`https://i.pravatar.cc/100?u=${s.id}`} alt="" />
                                    ))}
                                    <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500">+{students.length - 5}</div>
                                </div>
                                <span className="text-xs font-bold text-gray-500 ml-2">Attendance currently being marked by Admin User</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-white hover:text-[#C29543] transition-colors"><ChevronLeft size={18} /></button>
                                <span className="text-xs font-black text-gray-900 px-3">Page 1 of 1</span>
                                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-white hover:text-[#C29543] transition-colors"><ChevronRight size={18} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Attendance;
