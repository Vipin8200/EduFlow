import React, { useState, useMemo } from 'react';
import {
    Settings, CheckCircle, Search, RefreshCw,
    Download, Upload, Printer, ChevronLeft, ChevronRight
} from 'lucide-react';

const mockEmployees = [
    { id: 'EMP-2023-045', name: 'Priya Desai', role: 'Teacher', dept: 'Teaching Staff', status: 'Generated', checked: false, avatar: 'https://i.pravatar.cc/150?u=priya', dob: '12/04/1988', bloodGroup: 'B+', contact: '+91 9876543211' },
    { id: 'EMP-2023-046', name: 'Vikram Singh', role: 'Senior Administrator', dept: 'Administration', status: 'Pending', checked: true, avatar: 'https://i.pravatar.cc/150?u=vikram', dob: '15/08/1990', bloodGroup: 'O+', contact: '+91 9876543210' },
    { id: 'EMP-2023-047', name: 'Anita Menon', role: 'Teacher', dept: 'Teaching Staff', status: 'Generated', checked: false, avatar: 'https://i.pravatar.cc/150?u=anita', dob: '05/11/1992', bloodGroup: 'A+', contact: '+91 9876543212' },
    { id: 'EMP-2023-048', name: 'Sanjay Verma', role: 'Security Staff', dept: 'Support Staff', status: 'Generated', checked: false, avatar: 'https://i.pravatar.cc/150?u=sanjay', dob: '22/01/1985', bloodGroup: 'O-', contact: '+91 9876543213' },
    { id: 'EMP-2023-049', name: 'Neha Kapoor', role: 'Accountant', dept: 'Accounts', status: 'Pending', checked: false, avatar: 'https://i.pravatar.cc/150?u=neha', dob: '30/09/1993', bloodGroup: 'AB+', contact: '+91 9876543214' },
    { id: 'EMP-2023-050', name: 'Rahul Sharma', role: 'Librarian', dept: 'Library', status: 'Pending', checked: false, avatar: 'https://i.pravatar.cc/150?u=rahul', dob: '10/06/1989', bloodGroup: 'B-', contact: '+91 9876543215' }
];

const IdcardManagement = () => {
    const [employees, setEmployees] = useState(mockEmployees);
    const [searchQuery, setSearchQuery] = useState('');
    const [deptFilter, setDeptFilter] = useState('All Departments');
    const [statusFilter, setStatusFilter] = useState('All Status');

    // Default preview to the checked one or the first one
    const [previewEmpId, setPreviewEmpId] = useState(
        mockEmployees.find(e => e.checked)?.id || mockEmployees[0].id
    );

    // Filter Logic
    const filteredEmployees = useMemo(() => {
        return employees.filter(emp => {
            const matchSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                emp.id.toLowerCase().includes(searchQuery.toLowerCase());
            const matchDept = deptFilter === 'All Departments' || emp.dept === deptFilter;
            const matchStatus = statusFilter === 'All Status' || emp.status === statusFilter;
            return matchSearch && matchDept && matchStatus;
        });
    }, [employees, searchQuery, deptFilter, statusFilter]);

    // Derived States
    const selectedCount = employees.filter(e => e.checked).length;
    const allFilteredChecked = filteredEmployees.length > 0 && filteredEmployees.every(e => e.checked);
    const activePreviewEmp = employees.find(e => e.id === previewEmpId) || employees[0];

    // Actions
    const toggleAllChecks = () => {
        const newState = !allFilteredChecked;
        const filteredIds = new Set(filteredEmployees.map(e => e.id));
        setEmployees(employees.map(emp =>
            filteredIds.has(emp.id) ? { ...emp, checked: newState } : emp
        ));
    };

    const toggleSingleCheck = (id) => {
        setEmployees(employees.map(emp =>
            emp.id === id ? { ...emp, checked: !emp.checked } : emp
        ));
    };

    const handlePreview = (id) => {
        setPreviewEmpId(id);
    };

    const handleGenerateSingle = (id) => {
        setEmployees(employees.map(emp =>
            emp.id === id ? { ...emp, status: 'Generated' } : emp
        ));
        setPreviewEmpId(id);
        alert('ID Card Generated successfully for this employee.');
    };

    const handleGenerateSelected = () => {
        if (selectedCount === 0) return alert('Please select at least one employee.');
        setEmployees(employees.map(emp =>
            emp.checked ? { ...emp, status: 'Generated', checked: false } : emp
        ));
        alert(`${selectedCount} ID Cards Generated successfully.`);
    };

    const handleGenericAction = (name) => {
        alert(`${name} action triggered.`);
    };

    return (
        <div className="p-4 sm:p-6 max-w-[1600px] mx-auto w-full min-h-screen bg-white font-sans">

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">ID Card Management</h1>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                        onClick={() => handleGenericAction('Card Settings')}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors shadow-sm flex-1 sm:flex-none"
                    >
                        <Settings size={16} /> Card Settings
                    </button>
                    <button
                        onClick={handleGenerateSelected}
                        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm flex-1 sm:flex-none ${selectedCount > 0
                                ? 'bg-[#C29543] text-white hover:bg-[#A67D35] hover:shadow-md'
                                : 'bg-[#C29543]/60 text-white cursor-not-allowed'
                            }`}
                        disabled={selectedCount === 0}
                    >
                        <CheckCircle size={16} /> Generate Selected ({selectedCount})
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
                <button className="px-1 py-3 border-b-2 border-[#C29543] text-[#C29543] font-bold text-sm">
                    Generate Employee ID Card
                </button>
            </div>

            <div className="flex flex-col xl:flex-row gap-6">

                {/* Left Column: Data Table & Filters */}
                <div className="flex-1 min-w-0">

                    {/* Filters */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Department</label>
                            <select
                                value={deptFilter}
                                onChange={(e) => setDeptFilter(e.target.value)}
                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 transition-all text-gray-700"
                            >
                                <option>All Departments</option>
                                <option>Teaching Staff</option>
                                <option>Administration</option>
                                <option>Support Staff</option>
                                <option>Accounts</option>
                                <option>Library</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Card Status</label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 transition-all text-gray-700"
                            >
                                <option>All Status</option>
                                <option>Generated</option>
                                <option>Pending</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest opacity-0 hidden sm:block">Search</label>
                            <div className="relative">
                                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search employee by name or ID..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 transition-all text-gray-900 placeholder-gray-400"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white border text-left border-gray-100 rounded-xl overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[700px]">
                                <thead>
                                    <tr className="bg-gray-50/80 border-b border-gray-100">
                                        <th className="px-5 py-4 w-12">
                                            <div className="flex items-center justify-center">
                                                <input
                                                    type="checkbox"
                                                    checked={allFilteredChecked}
                                                    onChange={toggleAllChecks}
                                                    className="w-4 h-4 rounded text-[#C29543] border-gray-300 focus:ring-[#C29543] cursor-pointer"
                                                />
                                            </div>
                                        </th>
                                        <th className="px-4 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Employee Details</th>
                                        <th className="px-4 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Department</th>
                                        <th className="px-4 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                        <th className="px-4 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredEmployees.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500">
                                                No employees found matching the current filters.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredEmployees.map((emp) => (
                                            <tr
                                                key={emp.id}
                                                className={`transition-colors group ${emp.id === previewEmpId ? "bg-orange-50/40" : "hover:bg-gray-50"
                                                    } ${emp.checked ? "bg-orange-50/30" : ""}`}
                                            >
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center justify-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={emp.checked}
                                                            onChange={() => toggleSingleCheck(emp.id)}
                                                            className="w-4 h-4 rounded text-[#C29543] border-gray-300 focus:ring-[#C29543] cursor-pointer"
                                                        />
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 cursor-pointer" onClick={() => handlePreview(emp.id)}>
                                                    <div className="flex items-center gap-3">
                                                        <img src={emp.avatar} alt={emp.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                                                        <div>
                                                            <p className="text-sm font-bold text-gray-900">{emp.name}</p>
                                                            <p className="text-[11px] font-medium text-gray-400">{emp.id}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 cursor-pointer" onClick={() => handlePreview(emp.id)}>
                                                    <span className="text-sm font-bold text-gray-700">{emp.dept}</span>
                                                </td>
                                                <td className="px-4 py-4 cursor-pointer" onClick={() => handlePreview(emp.id)}>
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold ${emp.status === 'Generated'
                                                            ? 'bg-green-50 text-green-600'
                                                            : 'bg-orange-50 text-[#C29543]'
                                                        }`}>
                                                        {emp.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4 text-right">
                                                    {emp.status === 'Generated' ? (
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handlePreview(emp.id); }}
                                                            className="px-4 py-1.5 border border-gray-200 text-gray-600 font-bold text-xs rounded-lg hover:bg-gray-50 transition-colors shadow-sm bg-white"
                                                        >
                                                            Preview
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleGenerateSingle(emp.id); }}
                                                            className="px-4 py-1.5 bg-[#C29543] text-white font-bold text-xs rounded-lg hover:bg-[#A67D35] transition-colors shadow-sm"
                                                        >
                                                            Generate
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Footer */}
                        <div className="px-6 py-4 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-b-xl">
                            <p className="text-sm text-gray-500 font-medium">
                                Showing <span className="font-bold text-gray-900">1-{filteredEmployees.length}</span> of <span className="font-bold text-gray-900">{employees.length}</span> employees
                            </p>
                            <div className="flex items-center gap-1">
                                <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"><ChevronLeft size={16} /></button>
                                <button className="w-8 h-8 flex items-center justify-center rounded text-sm font-bold bg-[#C29543] text-white shadow-sm">1</button>
                                <button className="w-8 h-8 flex items-center justify-center rounded text-sm font-bold border border-transparent text-gray-500 hover:bg-gray-50 transition-colors">2</button>
                                <button className="w-8 h-8 flex items-center justify-center rounded text-sm font-bold border border-transparent text-gray-500 hover:bg-gray-50 transition-colors">3</button>
                                <button className="w-8 h-8 flex items-center justify-center rounded text-sm font-bold border border-transparent text-gray-500 hover:bg-gray-50 transition-colors">4</button>
                                <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"><ChevronRight size={16} /></button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Dynamic Preview Area */}
                <div className="w-full xl:w-[400px] flex-shrink-0">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden sticky top-6">

                        {/* Box Header */}
                        <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100 bg-white z-10 relative">
                            <h3 className="font-bold text-gray-900">ID Card Preview</h3>
                            <button
                                onClick={() => handleGenericAction('Refresh Preview')}
                                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors bg-gray-50"
                            >
                                <RefreshCw size={16} />
                            </button>
                        </div>

                        {/* ID Template Visualizer */}
                        <div className="bg-gray-50 p-6 sm:p-8 border-b border-gray-100 flex items-center justify-center min-h-[480px]">
                            {activePreviewEmp ? (
                                <div className="bg-white rounded-[16px] shadow-[0_12px_24px_-8px_rgba(0,0,0,0.15)] w-[260px] flex flex-col overflow-hidden relative border border-gray-200/60 transition-all duration-300 hover:shadow-[0_16px_32px_-8px_rgba(0,0,0,0.2)]">
                                    {/* Card Top (Dark) */}
                                    <div className="bg-[#1a1a1a] text-center pt-6 pb-12 relative z-0">
                                        <h3 className="text-white font-bold text-[15px] tracking-wide">EduConnect Institute</h3>
                                        <p className="text-gray-400 text-[9px] mt-0.5 tracking-wider">Excellence in Education</p>
                                    </div>

                                    {/* Card Bottom (Light) */}
                                    <div className="bg-white flex flex-col items-center pt-12 pb-6 px-5 relative z-10 w-full -mt-4 rounded-t-xl shrink-0">

                                        {/* Avatar */}
                                        <div className="absolute -top-[40px] left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-4 border-white overflow-hidden bg-gray-100 shadow-sm">
                                            <img src={activePreviewEmp.avatar} alt={activePreviewEmp.name} className="w-full h-full object-cover" />
                                        </div>

                                        {/* Identity Info */}
                                        <h4 className="text-lg font-bold text-gray-900 tracking-tight text-center w-full truncate">{activePreviewEmp.name}</h4>
                                        <p className="text-[#C29543] text-xs font-bold mt-1 text-center w-full truncate">{activePreviewEmp.role}</p>

                                        {/* Details Grid */}
                                        <div className="w-full mt-6 space-y-2.5 text-[10px] leading-none mb-2">
                                            <div className="flex">
                                                <span className="w-[72px] text-gray-400 font-bold uppercase tracking-wider shrink-0">ID NO</span>
                                                <span className="font-bold text-gray-900 truncate">{activePreviewEmp.id}</span>
                                            </div>
                                            <div className="flex">
                                                <span className="w-[72px] text-gray-400 font-bold uppercase tracking-wider shrink-0">D.O.B</span>
                                                <span className="font-bold text-gray-900">{activePreviewEmp.dob}</span>
                                            </div>
                                            <div className="flex">
                                                <span className="w-[72px] text-gray-400 font-bold uppercase tracking-wider shrink-0">BLOOD G.</span>
                                                <span className="font-bold text-red-600">{activePreviewEmp.bloodGroup}</span>
                                            </div>
                                            <div className="flex">
                                                <span className="w-[72px] text-gray-400 font-bold uppercase tracking-wider shrink-0">CONTACT</span>
                                                <span className="font-bold text-gray-900">{activePreviewEmp.contact}</span>
                                            </div>
                                        </div>

                                        {/* Signature */}
                                        <div className="mt-7 w-full flex flex-col items-center justify-center text-center pb-2">
                                            <div className="w-24 border-b border-gray-300 pb-1.5 mb-1 text-center flex justify-center">
                                                <span className="text-gray-300 italic text-[9px]">Signature Image</span>
                                            </div>
                                            <span className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">Auth. Signatory</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-400 font-medium text-sm">Select an employee to see preview</p>
                            )}
                        </div>

                        {/* Box Footer Actions */}
                        <div className="p-4 bg-white border-t border-gray-100 grid grid-cols-3 gap-2">
                            <button
                                onClick={() => handleGenericAction('Download Template')}
                                className="flex items-center justify-center gap-1.5 py-2 border border-gray-200 text-gray-700 bg-white font-bold text-xs rounded hover:bg-gray-50 shadow-sm transition-colors"
                            >
                                <Download size={14} /> Download
                            </button>
                            <button
                                onClick={() => handleGenericAction('Upload Signature')}
                                className="flex items-center justify-center gap-1.5 py-2 border border-gray-200 text-gray-700 bg-white font-bold text-xs rounded hover:bg-gray-50 shadow-sm transition-colors"
                            >
                                <Upload size={14} /> Upload Sign
                            </button>
                            <button
                                onClick={() => handleGenericAction('Print Single Card')}
                                className="flex items-center justify-center gap-1.5 py-2 bg-[#C29543] text-white font-bold text-xs rounded hover:bg-[#A67D35] shadow-sm transition-colors"
                            >
                                <Printer size={14} /> Print Single
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default IdcardManagement;
