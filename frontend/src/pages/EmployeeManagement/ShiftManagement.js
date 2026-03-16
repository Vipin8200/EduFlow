import React, { useState } from 'react';
import {
    Clock,
    Calendar,
    Search,
    Users,
    MapPin,
    AlertCircle,
    Moon,
    Layout,
    CheckCircle,
    Edit2,
    ChevronLeft,
    ChevronRight,
    MoreHorizontal,
    Plus,
    Download,
    Printer,
    FileText,
    Filter,
    ArrowRight,
    X
} from 'lucide-react';

const ShiftManagement = () => {
    const [activeTab, setActiveTab] = useState('create');
    const [selectedOffDays, setSelectedOffDays] = useState(['Sunday']);

    const tabs = [
        { id: 'create', label: 'Create Shift' },
        { id: 'assign', label: 'Assign Shift' },
        { id: 'allocation', label: 'Duty Allocation' }
    ];

    // Sample Data
    const initialEmployees = [
        { id: 'EMP-3012', name: 'Aman Singh', dept: 'Support Staff', shift: 'Night Shift', timing: '08:00 PM - 04:00 AM', off: 'Monday', type: 'night' },
        { id: 'EMP-2089', name: 'Neha Sharma', dept: 'Teaching', shift: 'General Shift', timing: '09:00 AM - 05:00 PM', off: 'Sunday', type: 'general' },
        { id: 'EMP-1055', name: 'Vikram Joshi', dept: 'HR', shift: 'Unassigned', timing: 'Not scheduled', off: '-', type: 'none' },
        { id: 'EMP-1056', name: 'Priya Verma', dept: 'Admin', shift: 'Morning Shift', timing: '08:00 AM - 02:00 PM', off: 'Saturday', type: 'general' },
        { id: 'EMP-1057', name: 'Rahul Dev', dept: 'Teaching', shift: 'General Shift', timing: '09:00 AM - 05:00 PM', off: 'Sunday', type: 'general' },
        { id: 'EMP-1058', name: 'Sonia Khan', dept: 'Support Staff', shift: 'Unassigned', timing: 'Not scheduled', off: '-', type: 'none' },
    ];

    const initialDuties = [
        { id: 'EMP-2033', name: 'Priya Singh', location: 'Library Supervision', zone: 'Central Library', timing: '10:00 AM - 02:00 PM', shift: 'General Shift', status: 'Assigned', type: 'general' },
        { id: 'EMP-3044', name: 'Arjun Das', location: 'Corridor Monitoring', zone: 'First Floor, Science Wing', timing: '12:00 PM - 04:00 PM', shift: 'General Shift', status: 'Pending Confirm', type: 'pending' },
        { id: 'EMP-3045', name: 'Unassigned', location: 'Playground Duty', zone: 'Sports Arena', timing: '03:00 PM - 05:00 PM', shift: 'Afternoon Slot', status: 'Unallocated', type: 'unallocated' },
        { id: 'EMP-3046', name: 'Karan Mehra', location: 'Gate Security', zone: 'Main Gate', timing: '08:00 AM - 04:00 PM', shift: 'Morning Shift', status: 'Assigned', type: 'general' },
    ];

    const [employees, setEmployees] = useState(initialEmployees);
    const [duties, setDuties] = useState(initialDuties);

    // Filter States
    const [searchQuery, setSearchQuery] = useState('');
    const [assignDept, setAssignDept] = useState('All Departments');
    const [assignShiftType, setAssignShiftType] = useState('All Shifts');

    const [dutyDate, setDutyDate] = useState('10/25/2023');
    const [dutyZone, setDutyZone] = useState('All Zones');
    const [dutySearch, setDutySearch] = useState('');

    // Create Shift Form State
    const [shiftForm, setShiftForm] = useState({
        name: '',
        code: '',
        startTime: '09:00 AM',
        endTime: '05:00 PM',
        gracePeriod: '15',
        halfDayMark: '01:30 PM',
        description: ''
    });

    // Pagination
    const [assignPage, setAssignPage] = useState(1);
    const [dutyPage, setDutyPage] = useState(1);
    const itemsPerPage = 3;

    const toggleOffDay = (day) => {
        setSelectedOffDays(prev =>
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
        );
    };

    const handleAssignStatus = (id) => {
        setEmployees(prev => prev.map(emp => {
            if (emp.id === id) {
                return {
                    ...emp,
                    shift: emp.type === 'none' ? 'General Shift' : 'Unassigned',
                    timing: emp.type === 'none' ? '09:00 AM - 05:00 PM' : 'Not scheduled',
                    type: emp.type === 'none' ? 'general' : 'none'
                };
            }
            return emp;
        }));
    };

    const handleDutyAllocation = (id) => {
        setDuties(prev => prev.map(duty => {
            if (duty.id === id || (id === '-' && duty.name === 'Unassigned')) {
                return {
                    ...duty,
                    status: duty.type === 'unallocated' ? 'Assigned' : 'Unallocated',
                    type: duty.type === 'unallocated' ? 'general' : 'unallocated',
                    name: duty.name === 'Unassigned' ? 'New Assignee' : duty.name
                };
            }
            return duty;
        }));
    };

    const handleSaveShiftPolicy = () => {
        console.log('Saving Shift Policy:', { ...shiftForm, offDays: selectedOffDays });
        alert('Shift Policy Saved Successfully!');
        // Reset form or redirect
        setActiveTab('assign');
    };

    // Filtered Data
    const filteredEmployees = employees.filter(emp => {
        const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) || emp.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDept = assignDept === 'All Departments' || emp.dept === assignDept;
        const matchesShift = assignShiftType === 'All Shifts' ||
            (assignShiftType === 'Night Shift' && emp.type === 'night') ||
            (assignShiftType === 'General Shift' && emp.type === 'general') ||
            (assignShiftType === 'Unassigned' && emp.type === 'none');
        return matchesSearch && matchesDept && matchesShift;
    });

    const filteredDuties = duties.filter(duty => {
        const matchesSearch = duty.name.toLowerCase().includes(dutySearch.toLowerCase()) || duty.id.toLowerCase().includes(dutySearch.toLowerCase());
        const matchesZone = dutyZone === 'All Zones' || duty.zone === dutyZone;
        return matchesSearch && matchesZone;
    });

    // Pagination Logic
    const paginatedEmployees = filteredEmployees.slice((assignPage - 1) * itemsPerPage, assignPage * itemsPerPage);
    const totalAssignPages = Math.ceil(filteredEmployees.length / itemsPerPage);

    const paginatedDuties = filteredDuties.slice((dutyPage - 1) * itemsPerPage, dutyPage * itemsPerPage);
    const totalDutyPages = Math.ceil(filteredDuties.length / itemsPerPage);

    // Real-time Stats
    const stats = {
        activeShifts: employees.filter(e => e.type !== 'none').length,
        assignedEmployees: employees.filter(e => e.type !== 'none').length,
        unassignedAlert: employees.filter(e => e.type === 'none').length,
        nightShifts: employees.filter(e => e.type === 'night').length,
        totalDuties: duties.length,
        allocatedDuties: duties.filter(d => d.type !== 'unallocated').length,
        pendingAllocation: duties.filter(d => d.type === 'pending').length,
        criticalUncovered: duties.filter(d => d.type === 'unallocated').length
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'create':
                return renderCreateShift();
            case 'assign':
                return renderAssignShift();
            case 'allocation':
                return renderDutyAllocation();
            default:
                return renderCreateShift();
        }
    };

    const renderCreateShift = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Shift Details Configuration</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-700">Shift Name</label>
                        <input
                            type="text"
                            placeholder="e.g., Morning Shift, General Duty"
                            value={shiftForm.name}
                            onChange={(e) => setShiftForm({ ...shiftForm, name: e.target.value })}
                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 transition-all"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-700">Shift Code / Short Name</label>
                        <input
                            type="text"
                            placeholder="e.g., MORN, GEN-01"
                            value={shiftForm.code}
                            onChange={(e) => setShiftForm({ ...shiftForm, code: e.target.value })}
                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 transition-all"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-700">Start Time</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={shiftForm.startTime}
                                onChange={(e) => setShiftForm({ ...shiftForm, startTime: e.target.value })}
                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 transition-all"
                            />
                            <Clock size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-700">End Time</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={shiftForm.endTime}
                                onChange={(e) => setShiftForm({ ...shiftForm, endTime: e.target.value })}
                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 transition-all"
                            />
                            <Clock size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-700">Late Grace Period (Minutes)</label>
                        <input
                            type="text"
                            placeholder="e.g., 15"
                            value={shiftForm.gracePeriod}
                            onChange={(e) => setShiftForm({ ...shiftForm, gracePeriod: e.target.value })}
                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 transition-all"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-700">Half Day Mark After</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={shiftForm.halfDayMark}
                                onChange={(e) => setShiftForm({ ...shiftForm, halfDayMark: e.target.value })}
                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 transition-all"
                            />
                            <Clock size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <label className="text-sm font-bold text-gray-700 block mb-3">Default Weekly Off Days</label>
                    <div className="flex flex-wrap gap-4">
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                            <label key={day} className="flex items-center gap-2 cursor-pointer group">
                                <div
                                    onClick={() => toggleOffDay(day)}
                                    className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${selectedOffDays.includes(day)
                                        ? 'bg-[#C29543] border-[#C29543]'
                                        : 'bg-white border-gray-300 group-hover:border-[#C29543]'
                                        }`}
                                >
                                    {selectedOffDays.includes(day) && <CheckCircle size={14} className="text-white" />}
                                </div>
                                <span className={`text-sm ${selectedOffDays.includes(day) ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>{day}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mt-8 space-y-2">
                    <label className="text-sm font-bold text-gray-700">Shift Description / Notes</label>
                    <textarea
                        placeholder="Enter any additional details about this shift..."
                        value={shiftForm.description}
                        onChange={(e) => setShiftForm({ ...shiftForm, description: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 transition-all resize-none"
                    ></textarea>
                </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4">
                <button
                    onClick={() => setActiveTab('assign')}
                    className="px-8 py-2.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSaveShiftPolicy}
                    className="px-8 py-2.5 bg-[#C29543] text-white rounded-lg text-sm font-bold hover:bg-[#A67D35] transition-colors shadow-md shadow-[#C29543]/20"
                >
                    Save Shift Policy
                </button>
            </div>
        </div>
    );

    const renderAssignShift = () => (
        <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <div className="flex flex-col lg:flex-row items-center gap-4">
                    <div className="w-full lg:w-48 space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Department</label>
                        <select
                            value={assignDept}
                            onChange={(e) => setAssignDept(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-lg text-sm font-medium focus:bg-white focus:border-gray-200 outline-none transition-all"
                        >
                            <option>All Departments</option>
                            <option>Support Staff</option>
                            <option>Teaching</option>
                            <option>HR</option>
                            <option>Admin</option>
                        </select>
                    </div>
                    <div className="w-full lg:w-48 space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Shift Type</label>
                        <select
                            value={assignShiftType}
                            onChange={(e) => setAssignShiftType(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-lg text-sm font-medium focus:bg-white focus:border-gray-200 outline-none transition-all"
                        >
                            <option>All Shifts</option>
                            <option>Night Shift</option>
                            <option>General Shift</option>
                            <option>Unassigned</option>
                        </select>
                    </div>
                    <div className="flex-1 w-full space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Search Employee</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by Name or ID..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-10 py-2 bg-gray-50 border border-transparent rounded-lg text-sm focus:bg-white focus:border-gray-200 outline-none transition-all"
                            />
                            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                    <div className="pt-5 shrink-0">
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                            <Download size={16} />
                            Export Report
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
                    <div>
                        <p className="text-gray-400 text-sm font-medium mb-1">Active Shifts</p>
                        <h4 className="text-2xl font-bold text-gray-900">{stats.activeShifts}</h4>
                        <p className="text-[10px] text-gray-400 mt-1">Currently active policies</p>
                    </div>
                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
                        <Clock size={20} />
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
                    <div>
                        <p className="text-gray-400 text-sm font-medium mb-1">Assigned Employees</p>
                        <h4 className="text-2xl font-bold text-gray-900">{stats.assignedEmployees}</h4>
                        <p className="text-[10px] text-gray-400 mt-1">Staff with shift mapped</p>
                    </div>
                    <div className="p-2.5 bg-green-50 text-green-600 rounded-lg">
                        <Users size={20} />
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
                    <div>
                        <p className="text-gray-400 text-sm font-medium mb-1">Unassigned Alert</p>
                        <h4 className="text-2xl font-bold text-gray-900">{stats.unassignedAlert}</h4>
                        <p className="text-[10px] text-gray-400 mt-1">Require immediate allocation</p>
                    </div>
                    <div className="p-2.5 bg-red-50 text-red-600 rounded-lg">
                        <AlertCircle size={20} />
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
                    <div>
                        <p className="text-gray-400 text-sm font-medium mb-1">Night Shifts</p>
                        <h4 className="text-2xl font-bold text-gray-900">{stats.nightShifts}</h4>
                        <p className="text-[10px] text-gray-400 mt-1">Active night duty shifts</p>
                    </div>
                    <div className="p-2.5 bg-purple-50 text-purple-600 rounded-lg">
                        <Moon size={20} />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Employee</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Shift</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Timings</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Off Day</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {paginatedEmployees.map((emp, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                                <Users size={16} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{emp.name}</p>
                                                <p className="text-[11px] text-gray-400 font-medium">{emp.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-gray-600 font-medium">{emp.dept}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        {emp.type === 'night' && (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 text-purple-600 text-[10px] font-bold">
                                                <Moon size={10} /> Night Shift
                                            </span>
                                        )}
                                        {emp.type === 'general' && (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-[10px] font-bold">
                                                <Layout size={10} /> General Shift
                                            </span>
                                        )}
                                        {emp.type === 'none' && (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-bold">
                                                <AlertCircle size={10} /> Unassigned
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-medium text-gray-900">{emp.timing}</p>
                                        <p className="text-[10px] text-gray-400">8 hours duty</p>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-600">{emp.off}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleAssignStatus(emp.id)}
                                            className={`px-3.5 py-1.5 ${emp.type === 'none' ? 'bg-[#C29543] text-white shadow-[#C29543]/20' : 'border border-[#C29543] text-[#C29543] hover:bg-[#C29543]/5'} text-[11px] font-bold rounded-lg transition-colors shadow-sm flex items-center gap-1.5 ml-auto`}
                                        >
                                            {emp.type === 'none' ? 'Assign Now' : <><Edit2 size={10} /> Re-assign</>}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-50 flex items-center justify-between">
                    <p className="text-xs text-gray-400 font-medium">Showing {paginatedEmployees.length} of {filteredEmployees.length} employees</p>
                    <div className="flex items-center gap-1">
                        <button
                            disabled={assignPage === 1}
                            onClick={() => setAssignPage(prev => Math.max(1, prev - 1))}
                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        {[...Array(totalAssignPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setAssignPage(i + 1)}
                                className={`w-8 h-8 text-xs font-bold rounded-lg transition-colors ${assignPage === i + 1 ? 'bg-[#C29543] text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            disabled={assignPage === totalAssignPages}
                            onClick={() => setAssignPage(prev => Math.min(totalAssignPages, prev + 1))}
                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderDutyAllocation = () => (
        <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <div className="flex flex-col lg:flex-row items-center gap-4">
                    <div className="w-full lg:w-48 space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={dutyDate}
                                onChange={(e) => setDutyDate(e.target.value)}
                                className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-lg text-sm font-medium focus:bg-white focus:border-gray-200 outline-none transition-all"
                            />
                            <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                    <div className="w-full lg:w-48 space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Location / Zone</label>
                        <select
                            value={dutyZone}
                            onChange={(e) => setDutyZone(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-lg text-sm font-medium focus:bg-white focus:border-gray-200 outline-none transition-all"
                        >
                            <option>All Zones</option>
                            <option>Central Library</option>
                            <option>First Floor, Science Wing</option>
                            <option>Sports Arena</option>
                            <option>Main Gate</option>
                        </select>
                    </div>
                    <div className="flex-1 w-full space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Search Employee</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by Name or ID..."
                                value={dutySearch}
                                onChange={(e) => setDutySearch(e.target.value)}
                                className="w-full px-10 py-2 bg-gray-50 border border-transparent rounded-lg text-sm focus:bg-white focus:border-gray-200 outline-none transition-all"
                            />
                            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                    <div className="pt-5 shrink-0">
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                            <Printer size={16} />
                            Print Roster
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
                    <div>
                        <p className="text-gray-400 text-sm font-medium mb-1">Total Duties Today</p>
                        <h4 className="text-2xl font-bold text-gray-900">{stats.totalDuties}</h4>
                        <p className="text-[10px] text-gray-400 mt-1">Scheduled for selected date</p>
                    </div>
                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
                        <FileText size={20} />
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
                    <div>
                        <p className="text-gray-400 text-sm font-medium mb-1">Allocated</p>
                        <h4 className="text-2xl font-bold text-gray-900">{stats.allocatedDuties}</h4>
                        <p className="text-[10px] text-gray-400 mt-1">Staff successfully assigned</p>
                    </div>
                    <div className="p-2.5 bg-green-50 text-green-600 rounded-lg">
                        <CheckCircle size={20} />
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
                    <div>
                        <p className="text-gray-400 text-sm font-medium mb-1">Pending Allocation</p>
                        <h4 className="text-2xl font-bold text-gray-900">{stats.pendingAllocation}</h4>
                        <p className="text-[10px] text-gray-400 mt-1">Requires manual mapping</p>
                    </div>
                    <div className="p-2.5 bg-yellow-50 text-yellow-600 rounded-lg">
                        <Clock size={20} />
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
                    <div>
                        <p className="text-gray-400 text-sm font-medium mb-1">Critical Zones Uncovered</p>
                        <h4 className="text-2xl font-bold text-gray-900">{stats.criticalUncovered}</h4>
                        <p className="text-[10px] text-gray-400 mt-1">Main Gate (Afternoon)</p>
                    </div>
                    <div className="p-2.5 bg-red-50 text-red-600 rounded-lg">
                        <AlertCircle size={20} />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Employee</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Location / Zone</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Timings</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Shift</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {paginatedDuties.map((duty, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-9 h-9 rounded-full ${duty.name === 'Unassigned' ? 'bg-gray-100 text-gray-300' : 'bg-orange-50 text-orange-400'} flex items-center justify-center`}>
                                                <Users size={16} />
                                            </div>
                                            <div>
                                                <p className={`text-sm font-bold ${duty.name === 'Unassigned' ? 'text-gray-400 italic' : 'text-gray-900'}`}>{duty.name}</p>
                                                <p className="text-[11px] text-gray-400 font-medium">{duty.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-gray-900 font-bold">{duty.location}</p>
                                        <p className="text-[11px] text-gray-400 font-medium">{duty.zone}</p>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <p className="text-sm font-medium text-gray-900">{duty.timing}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${duty.shift === 'Afternoon Slot' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                                            }`}>
                                            {duty.shift}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {duty.type === 'general' && (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border border-green-100 bg-green-50 text-green-600 text-[10px] font-bold">
                                                Assigned
                                            </span>
                                        )}
                                        {duty.type === 'pending' && (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border border-orange-100 bg-orange-50 text-orange-600 text-[10px] font-bold">
                                                Pending Confirm
                                            </span>
                                        )}
                                        {duty.type === 'unallocated' && (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border border-red-100 bg-red-50 text-red-600 text-[10px] font-bold">
                                                Unallocated
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleDutyAllocation(duty.id)}
                                            className={`px-3.5 py-1.5 ${duty.type === 'unallocated' ? 'bg-[#C29543] text-white shadow-[#C29543]/20' : 'border border-gray-200 text-gray-700 hover:bg-gray-50'} text-[11px] font-bold rounded-lg transition-colors shadow-sm flex items-center gap-1.5 ml-auto`}
                                        >
                                            {duty.type === 'unallocated' ? 'Allocate Now' : <><Edit2 size={10} /> Edit</>}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-50 flex items-center justify-between">
                    <p className="text-xs text-gray-400 font-medium">Showing {paginatedDuties.length} of {filteredDuties.length} duty allocations</p>
                    <div className="flex items-center gap-1">
                        <button
                            disabled={dutyPage === 1}
                            onClick={() => setDutyPage(prev => Math.max(1, prev - 1))}
                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        {[...Array(totalDutyPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setDutyPage(i + 1)}
                                className={`w-8 h-8 text-xs font-bold rounded-lg transition-colors ${dutyPage === i + 1 ? 'bg-[#C29543] text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            disabled={dutyPage === totalDutyPages}
                            onClick={() => setDutyPage(prev => Math.min(totalDutyPages, prev + 1))}
                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FDFCF9] p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Shift & Duty Management</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                            <Calendar size={18} />
                            <span className="text-sm">Duty Roster</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#C29543] text-white font-bold rounded-lg hover:bg-[#A67D35] transition-colors shadow-md shadow-[#C29543]/20">
                            <Plus size={18} />
                            <span className="text-sm">{activeTab === 'allocation' ? 'Allocate New Duty' : 'Create Shift'}</span>
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <div className="flex gap-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`pb-4 text-sm font-bold transition-all relative ${activeTab === tab.id
                                    ? 'text-[#C29543]'
                                    : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C29543] rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="mt-8">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
};

export default ShiftManagement;
