import React, { useState } from 'react';
import {
    Search, Download, Users, CheckCircle, Clock, AlertCircle,
    Printer, FileText, ChevronLeft, ChevronRight, Edit2, Plus,
    Percent, DollarSign, Mail, Eye, Calendar, X
} from 'lucide-react';

const Payroll = () => {
    const [activeTab, setActiveTab] = useState('structure');

    // Tab Definitions
    const tabs = [
        { id: 'structure', label: 'Salary Structure' },
        { id: 'processing', label: 'Salary Processing' },
        { id: 'payslip', label: 'Payslip Generation' },
        { id: 'reports', label: 'Payroll Reports' },
        { id: 'settings', label: 'Payroll Settings' }
    ];

    // --- Mock Data ---

    // Salary Structure
    const [salaryStructures, setSalaryStructures] = useState([
        { id: 1, name: 'Senior Teacher Grade', code: 'TCH-SG', basicPay: '50%', allowances: 'HRA, DA, TA, Medical', deductions: 'PF, PT, TDS', totalEarnings: '₹60,000 - ₹80,000', status: 'Active' },
        { id: 2, name: 'Junior Teacher Grade', code: 'TCH-JG', basicPay: '45%', allowances: 'HRA, DA, Medical', deductions: 'PF, PT', totalEarnings: '₹35,000 - ₹50,000', status: 'Active' },
        { id: 3, name: 'Support Staff Grade', code: 'SUP-G1', basicPay: '60%', allowances: 'DA, TA', deductions: 'PF', totalEarnings: '₹15,000 - ₹25,000', status: 'Active' }
    ]);
    const [structureQuery, setStructureQuery] = useState('');

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStruct, setEditingStruct] = useState(null);
    const [structForm, setStructForm] = useState({ name: '', code: '', basicPay: '', allowances: '', deductions: '', totalEarnings: '', status: 'Active' });

    // Format Settings Modal State
    const [isFormatModalOpen, setIsFormatModalOpen] = useState(false);
    const [formatModalType, setFormatModalType] = useState(null); // 'payslip' or 'report'
    const [tempSettings, setTempSettings] = useState({});

    // Salary Processing
    const [processingEmployees, setProcessingEmployees] = useState([
        { id: 'EMP-1088', name: 'Rajesh Kumar', role: 'Senior Teacher', dept: 'Teaching Staff', gross: '₹65,000', deductions: '-₹4,500', net: '₹60,500', status: 'Processed', image: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
        { id: 'EMP-2033', name: 'Priya Singh', role: 'HR Executive', dept: 'Administration', gross: '₹45,000', deductions: '-₹2,100', net: '₹42,900', status: 'Pending', image: 'https://i.pravatar.cc/150?u=a042581f4e29026704e' },
        { id: 'EMP-3044', name: 'Arjun Das', role: 'Security Guard', dept: 'Support Staff', gross: '₹22,000', deductions: '-₹1,200', net: '₹20,800', status: 'On Hold', image: 'https://i.pravatar.cc/150?u=a042581f4e29026704f' }
    ]);
    const [processingQuery, setProcessingQuery] = useState('');

    // Payslips
    const [payslipEmployees, setPayslipEmployees] = useState([
        { id: 'EMP-1002', name: 'Anita Gupta', role: 'Senior Teacher', dept: 'Teaching Staff', gross: '₹68,500', net: '₹62,450', status: 'Generated', checked: false, avatarInitials: 'AG' },
        { id: 'EMP-1015', name: 'Rahul Kumar', role: 'Accountant', dept: 'Administration', gross: '₹45,000', net: '₹41,200', status: 'Generated', checked: false, avatarInitials: 'RK' },
        { id: 'EMP-1042', name: 'Sneha Mishra', role: 'Junior Teacher', dept: 'Teaching Staff', gross: '₹35,000', net: '₹32,100', status: 'Pending', checked: false, avatarInitials: 'SM' },
        { id: 'EMP-1055', name: 'Vikram Joshi', role: 'Driver', dept: 'Support Staff', gross: '₹22,000', net: '₹20,500', status: 'Pending', checked: false, avatarInitials: 'VJ' }
    ]);
    const [payslipQuery, setPayslipQuery] = useState('');

    // Reports
    const [reportDepartments] = useState([
        { dept: 'Teaching Staff', employees: 85, gross: '₹ 21,50,000', allowances: '₹ 2,50,000', deductions: '₹ 1,20,000', net: '₹ 22,80,000' },
        { dept: 'Administration', employees: 25, gross: '₹ 8,50,000', allowances: '₹ 1,10,000', deductions: '₹ 65,000', net: '₹ 8,95,000' },
        { dept: 'Support Staff', employees: 35, gross: '₹ 4,50,000', allowances: '₹ 60,000', deductions: '₹ 30,000', net: '₹ 4,80,000' }
    ]);

    // Settings
    const [settingsConfig, setSettingsConfig] = useState({
        instituteName: 'EduFlow International School',
        address: '123 Education Lane, Knowledge City',
        currency: 'INR (₹)',
        showLeaveBalance: true,
        showYTD: true,
        authorizedSignatory: 'Principal / Admin'
    });

    // --- Action Handlers ---

    // Structure Actions
    const handleOpenModal = (struct = null) => {
        if (struct) {
            setEditingStruct(struct);
            setStructForm(struct);
        } else {
            setEditingStruct(null);
            setStructForm({ name: '', code: '', basicPay: '', allowances: '', deductions: '', totalEarnings: '', status: 'Active' });
        }
        setIsModalOpen(true);
    };

    const handleSaveStructure = () => {
        if (editingStruct) {
            setSalaryStructures(salaryStructures.map(s => s.id === editingStruct.id ? { ...structForm, id: s.id } : s));
            alert('Structure updated successfully!');
        } else {
            setSalaryStructures([...salaryStructures, { ...structForm, id: Date.now() }]);
            alert('New Structure created successfully!');
        }
        setIsModalOpen(false);
    };

    // Processing Actions
    const handleProcessEmployee = (id) => {
        setProcessingEmployees(processingEmployees.map(emp => emp.id === id ? { ...emp, status: 'Processed' } : emp));
        alert('Employee Salary Processed!');
    };

    const handleProcessAll = () => {
        setProcessingEmployees(processingEmployees.map(emp => ({ ...emp, status: 'Processed' })));
        alert('All Pending Salaries Processed Successfully!');
    };

    // Payslip Actions
    const togglePayslipCheck = (id) => {
        setPayslipEmployees(payslipEmployees.map(emp => emp.id === id ? { ...emp, checked: !emp.checked } : emp));
    };

    const handleGeneratePayslip = (id) => {
        setPayslipEmployees(payslipEmployees.map(emp => emp.id === id ? { ...emp, status: 'Generated' } : emp));
        alert('Payslip Generated Successfully!');
    };

    const handleGenerateAll = () => {
        setPayslipEmployees(payslipEmployees.map(emp => ({ ...emp, status: 'Generated' })));
        alert('All Payslips Generated Successfully!');
    };

    const handlePrintSelected = () => {
        const selectedCount = payslipEmployees.filter(e => e.checked).length;
        if (selectedCount > 0) alert(`Printing ${selectedCount} Payslips...`);
        else alert('Please select at least one payslip to print.');
    };

    // Format Settings Actions
    const handleOpenFormatModal = (type) => {
        setFormatModalType(type);
        setTempSettings({ ...settingsConfig });
        setIsFormatModalOpen(true);
    };

    const handleSaveFormatSettings = () => {
        setSettingsConfig(tempSettings);
        setIsFormatModalOpen(false);
        alert(`${formatModalType === 'payslip' ? 'Payslip' : 'Report'} Format Saved Successfully!`);
    };

    const handleGenericAction = (actionName) => {
        alert(`${actionName} action triggered successfully!`);
    };

    // --- Render Methods ---

    const renderHeaderActions = () => {
        switch (activeTab) {
            case 'structure':
                return (
                    <button onClick={() => handleOpenModal()} className="flex items-center gap-2 px-4 py-2 bg-[#C29543] text-white rounded-lg text-sm font-bold hover:bg-[#A67D35] transition-colors shadow-sm">
                        <Plus size={16} /> Create Structure
                    </button>
                );
            case 'processing':
                return (
                    <div className="flex gap-3">
                        <button onClick={() => handleGenericAction('Export Processed Data')} className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors shadow-sm">
                            <Download size={16} /> Export Data
                        </button>
                        <button onClick={handleProcessAll} className="flex items-center gap-2 px-4 py-2 bg-[#C29543] text-white rounded-lg text-sm font-bold hover:bg-[#A67D35] transition-colors shadow-sm">
                            <Plus size={16} /> Process Payroll
                        </button>
                    </div>
                );
            case 'payslip':
                return (
                    <div className="flex gap-3">
                        <button onClick={handlePrintSelected} className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors shadow-sm">
                            <Printer size={16} /> Print Selected
                        </button>
                        <button onClick={handleGenerateAll} className="flex items-center gap-2 px-4 py-2 bg-[#C29543] text-white rounded-lg text-sm font-bold hover:bg-[#A67D35] transition-colors shadow-sm">
                            <FileText size={16} /> Generate All Payslips
                        </button>
                    </div>
                );
            case 'reports':
                return (
                    <div className="flex gap-3">
                        <button onClick={() => handleGenericAction('Schedule Report Delivery')} className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors shadow-sm">
                            <Calendar size={16} /> Schedule Report
                        </button>
                        <button onClick={() => handleGenericAction('Export Accounting Reports')} className="flex items-center gap-2 px-4 py-2 bg-[#C29543] text-white rounded-lg text-sm font-bold hover:bg-[#A67D35] transition-colors shadow-sm">
                            <Download size={16} /> Export Reports
                        </button>
                    </div>
                );
            case 'settings':
                return (
                    <button onClick={() => alert('All settings are up to date.')} className="flex items-center gap-2 px-6 py-2 bg-gray-100 text-gray-400 rounded-lg text-sm font-bold shadow-sm" disabled>
                        <CheckCircle size={16} /> Saved
                    </button>
                );
            default: return null;
        }
    }

    const renderSalaryStructure = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <div className="flex flex-col lg:flex-row items-center gap-4">
                    <div className="w-full lg:w-48 space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Department</label>
                        <select className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-lg text-sm font-medium focus:bg-white focus:border-gray-200 outline-none transition-all">
                            <option>All Departments</option>
                        </select>
                    </div>
                    <div className="w-full lg:w-48 space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</label>
                        <select className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-lg text-sm font-medium focus:bg-white focus:border-gray-200 outline-none transition-all">
                            <option>All</option>
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </div>
                    <div className="flex-1 w-full space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Search Structure</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by Grade or Name..."
                                value={structureQuery}
                                onChange={(e) => setStructureQuery(e.target.value)}
                                className="w-full px-10 py-2 bg-gray-50 border border-transparent rounded-lg text-sm focus:bg-white focus:border-gray-200 outline-none transition-all"
                            />
                            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Structure Name</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Basic Pay %</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Allowances</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Deductions</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Total Earnings</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {salaryStructures.filter(s => s.name.toLowerCase().includes(structureQuery.toLowerCase())).map((struct, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold text-gray-900">{struct.name}</p>
                                        <p className="text-[11px] text-gray-400 font-medium">{struct.code}</p>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-600">{struct.basicPay}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-600">{struct.allowances}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-600">{struct.deductions}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{struct.totalEarnings}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-[10px] font-bold">
                                            {struct.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleOpenModal(struct)}
                                            className="px-3.5 py-1.5 border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded-lg transition-colors ml-auto"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-gray-50 flex items-center justify-between">
                    <p className="text-xs text-gray-400 font-medium">Showing 1 to 3 of 12 structures</p>
                    <div className="flex items-center gap-1">
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:bg-gray-50 transition-colors"><ChevronLeft size={16} /></button>
                        <button className="w-8 h-8 text-xs font-bold rounded-lg transition-colors bg-[#C29543] text-white">1</button>
                        <button className="w-8 h-8 text-xs font-bold rounded-lg transition-colors text-gray-500 hover:bg-gray-50">2</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:bg-gray-50 transition-colors"><ChevronRight size={16} /></button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderSalaryProcessing = () => (
        <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-sm text-blue-800 tracking-tight leading-relaxed shadow-sm">
                <AlertCircle size={20} className="shrink-0 text-blue-500 mt-0.5" />
                <div>
                    <span className="font-bold block mb-0.5">Why perform Salary Processing?</span>
                    Salary Processing merges the baseline <span className="font-medium">Salary Structure</span> with the employee's actual <span className="font-medium">Monthly Attendance & Leaves</span> (e.g., Unpaid Leaves, Half-days). This step calculates the final "Net Payable" payout. You must process salaries before you can generate their accurate Payslips.
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <div className="flex flex-col lg:flex-row items-center gap-4">
                    <div className="w-full lg:w-48 space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Month / Year</label>
                        <div className="relative">
                            <input
                                type="text"
                                defaultValue="October 2023"
                                className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-lg text-sm font-medium focus:bg-white focus:border-gray-200 outline-none transition-all"
                            />
                            <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                    <div className="w-full lg:w-48 space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Department</label>
                        <select className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-lg text-sm font-medium focus:bg-white focus:border-gray-200 outline-none transition-all">
                            <option>All Departments</option>
                        </select>
                    </div>
                    <div className="flex-1 w-full space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Search Employee</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by Name or ID..."
                                value={processingQuery}
                                onChange={(e) => setProcessingQuery(e.target.value)}
                                className="w-full px-10 py-2 bg-gray-50 border border-transparent rounded-lg text-sm focus:bg-white focus:border-gray-200 outline-none transition-all"
                            />
                            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                        <p className="text-gray-400 text-sm font-medium">Total Employees</p>
                        <div className="p-2 bg-blue-50 text-blue-500 rounded-lg"><Users size={16} /></div>
                    </div>
                    <div>
                        <h4 className="text-2xl font-bold text-gray-900">145</h4>
                        <p className="text-[10px] text-gray-400 mt-1">132 Processed / 13 Pending</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                        <p className="text-gray-400 text-sm font-medium">Total Gross Salary</p>
                        <div className="p-2 bg-emerald-50 text-emerald-500 rounded-lg"><DollarSign size={16} /></div>
                    </div>
                    <div>
                        <h4 className="text-2xl font-bold text-gray-900">₹45,20,500</h4>
                        <p className="text-[10px] text-gray-400 mt-1">For Oct 2023</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                        <p className="text-gray-400 text-sm font-medium">Total Deductions</p>
                        <div className="p-2 bg-red-50 text-red-500 rounded-lg"><DollarSign size={16} /></div>
                    </div>
                    <div>
                        <h4 className="text-2xl font-bold text-gray-900">₹4,15,300</h4>
                        <p className="text-[10px] text-gray-400 mt-1">PF, Tax, Leaves</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                        <p className="text-gray-400 text-sm font-medium">Net Payable Amount</p>
                        <div className="p-2 bg-purple-50 text-purple-500 rounded-lg"><FileText size={16} /></div>
                    </div>
                    <div>
                        <h4 className="text-2xl font-bold text-gray-900">₹41,05,200</h4>
                        <p className="text-[10px] text-gray-400 mt-1">Ready to disburse</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Employee</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Gross Pay</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Deductions</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Net Salary</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {processingEmployees.filter(e => e.name.toLowerCase().includes(processingQuery.toLowerCase())).map((emp, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={emp.image} alt={emp.name} className="w-9 h-9 rounded-full object-cover border border-gray-200" />
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{emp.name}</p>
                                                <p className="text-[11px] text-gray-400 font-medium">{emp.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold text-gray-900">{emp.dept}</p>
                                        <p className="text-[11px] text-gray-400 font-medium">{emp.role}</p>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-600">{emp.gross}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-red-500">{emp.deductions}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{emp.net}</td>
                                    <td className="px-6 py-4">
                                        {emp.status === 'Processed' && <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{emp.status}</span>}
                                        {emp.status === 'Pending' && <span className="text-[10px] font-bold text-[#C29543] bg-orange-50 px-2 py-1 rounded-full">{emp.status}</span>}
                                        {emp.status === 'On Hold' && <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">{emp.status}</span>}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => emp.status === 'Pending' ? handleProcessEmployee(emp.id) : handleGenericAction(`Viewing/Reviewing ${emp.name}`)}
                                            className="px-3.5 py-1.5 border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded-lg transition-colors ml-auto"
                                        >
                                            {emp.status === 'Pending' ? 'Process' : emp.status === 'On Hold' ? 'Review' : 'View'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-gray-50 flex items-center justify-between">
                    <p className="text-xs text-gray-400 font-medium">Showing 1 to 3 of 145 employees</p>
                    <div className="flex items-center gap-1">
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:bg-gray-50 transition-colors"><ChevronLeft size={16} /></button>
                        <button className="w-8 h-8 text-xs font-bold rounded-lg transition-colors bg-[#C29543] text-white">1</button>
                        <button className="w-8 h-8 text-xs font-bold rounded-lg transition-colors text-gray-500 hover:bg-gray-50">2</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:bg-gray-50 transition-colors"><ChevronRight size={16} /></button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderPayslipGeneration = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <div className="flex flex-col lg:flex-row items-center gap-4">
                    <div className="w-full lg:w-48 space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Salary Month</label>
                        <select className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-lg text-sm font-medium focus:bg-white focus:border-gray-200 outline-none transition-all">
                            <option>October 2023</option>
                        </select>
                    </div>
                    <div className="w-full lg:w-48 space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Department</label>
                        <select className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-lg text-sm font-medium focus:bg-white focus:border-gray-200 outline-none transition-all">
                            <option>All Departments</option>
                        </select>
                    </div>
                    <div className="w-full lg:w-48 space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</label>
                        <select className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-lg text-sm font-medium focus:bg-white focus:border-gray-200 outline-none transition-all">
                            <option>All</option>
                            <option>Generated</option>
                            <option>Pending</option>
                        </select>
                    </div>
                    <div className="flex-1 w-full space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Search Employee</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by ID or Name..."
                                value={payslipQuery}
                                onChange={(e) => setPayslipQuery(e.target.value)}
                                className="w-full px-10 py-2 bg-gray-50 border border-transparent rounded-lg text-sm focus:bg-white focus:border-gray-200 outline-none transition-all"
                            />
                            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 w-10">
                                    <input type="checkbox" className="rounded text-[#C29543] focus:ring-[#C29543] border-gray-300" />
                                </th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Employee Details</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Gross Pay</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Net Pay</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {payslipEmployees.filter(e => e.name.toLowerCase().includes(payslipQuery.toLowerCase())).map((emp, idx) => (
                                <tr key={idx} className={`hover:bg-gray-50 transition-colors ${emp.checked ? 'bg-orange-50/30' : ''}`}>
                                    <td className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            checked={emp.checked}
                                            onChange={() => togglePayslipCheck(emp.id)}
                                            className="rounded text-[#C29543] focus:ring-[#C29543] border-gray-300"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs">{emp.avatarInitials}</div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{emp.name}</p>
                                                <p className="text-[11px] text-gray-400 font-medium">{emp.id} • {emp.role}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{emp.dept}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{emp.gross}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-[#C29543]">{emp.net}</td>
                                    <td className="px-6 py-4">
                                        {emp.status === 'Generated' && <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{emp.status}</span>}
                                        {emp.status === 'Pending' && <span className="text-[10px] font-bold text-[#C29543] bg-orange-50 px-2 py-1 rounded-full">{emp.status}</span>}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {emp.status === 'Generated' ? (
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => handleGenericAction('View Payslip')} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"><Eye size={16} /></button>
                                                <button onClick={() => handleGenericAction('Download Payslip PDF')} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"><Download size={16} /></button>
                                                <button onClick={() => handleGenericAction('Email Payslip')} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"><Mail size={16} /></button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => handleGeneratePayslip(emp.id)}
                                                className="px-3.5 py-1.5 border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded-lg transition-colors ml-auto"
                                            >
                                                Generate
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-gray-50 flex items-center justify-between">
                    <p className="text-xs text-gray-400 font-medium">Showing 1 to 4 of 145 employees</p>
                    <div className="flex items-center gap-1">
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:bg-gray-50 transition-colors"><ChevronLeft size={16} /></button>
                        <button className="w-8 h-8 text-xs font-bold rounded-lg transition-colors bg-[#C29543] text-white">1</button>
                        <button className="w-8 h-8 text-xs font-bold rounded-lg transition-colors text-gray-500 hover:bg-gray-50">2</button>
                        <button className="w-8 h-8 text-xs font-bold rounded-lg transition-colors text-gray-500 hover:bg-gray-50">3</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:bg-gray-50 transition-colors"><ChevronRight size={16} /></button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderPayrollReports = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center">
                    <p className="text-gray-400 text-xs font-bold tracking-wider mb-2">Total Net Payout</p>
                    <h4 className="text-3xl font-bold text-gray-900">₹ 34,50,000</h4>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center">
                    <p className="text-gray-400 text-xs font-bold tracking-wider mb-2">Total Allowances</p>
                    <h4 className="text-3xl font-bold text-gray-900">₹ 4,20,000</h4>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center">
                    <p className="text-gray-400 text-xs font-bold tracking-wider mb-2">Total Deductions</p>
                    <h4 className="text-3xl font-bold text-gray-900">₹ 2,15,000</h4>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center">
                    <p className="text-gray-400 text-xs font-bold tracking-wider mb-2">Employees Processed</p>
                    <h4 className="text-3xl font-bold text-gray-900">145 <span className="text-xl text-gray-400 font-medium">/ 150</span></h4>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <div className="flex flex-col lg:flex-row items-center gap-4">
                    <div className="w-full lg:w-48 space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Report Type</label>
                        <select className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-lg text-sm font-medium focus:bg-white focus:border-gray-200 outline-none transition-all">
                            <option>Monthly Payroll Summary</option>
                        </select>
                    </div>
                    <div className="w-full lg:w-32 space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Month</label>
                        <select className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-lg text-sm font-medium focus:bg-white focus:border-gray-200 outline-none transition-all">
                            <option>October</option>
                        </select>
                    </div>
                    <div className="w-full lg:w-32 space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Year</label>
                        <select className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-lg text-sm font-medium focus:bg-white focus:border-gray-200 outline-none transition-all">
                            <option>2023</option>
                        </select>
                    </div>
                    <div className="w-full lg:w-48 space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Department</label>
                        <select className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-lg text-sm font-medium focus:bg-white focus:border-gray-200 outline-none transition-all">
                            <option>All Departments</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Total Employees</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Gross Pay</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Allowances</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Deductions</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Net Pay</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {reportDepartments.map((dept, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{dept.dept}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-600">{dept.employees}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{dept.gross}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-600">{dept.allowances}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-600">{dept.deductions}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-[#C29543]">{dept.net}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => handleGenericAction('View Department Report')} className="p-1.5 border border-gray-200 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded transition-colors"><Eye size={14} /></button>
                                            <button onClick={() => handleGenericAction('Download Department Breakdown')} className="p-1.5 border border-gray-200 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded transition-colors"><Download size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderPayrollSettings = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Payslip Format Card */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col h-full transform transition-transform hover:-translate-y-1 hover:shadow-md">
                    <div className="flex items-start justify-between mb-6 border-b border-gray-100 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-[#C29543]/10 text-[#C29543] rounded-xl flex items-center justify-center">
                                <FileText size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Payslip Format</h3>
                                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest mt-0.5">Customization Template</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 mb-8 flex-1">
                        <div className="flex justify-between items-center py-2.5 bg-gray-50/50 px-3 rounded-lg border border-gray-100">
                            <span className="text-sm font-bold text-gray-600">Institute Name</span>
                            <span className="text-sm font-bold text-gray-900 truncate max-w-[150px]">{settingsConfig.instituteName}</span>
                        </div>
                        <div className="flex justify-between items-center py-2.5 bg-gray-50/50 px-3 rounded-lg border border-gray-100">
                            <span className="text-sm font-bold text-gray-600">Currency Mode</span>
                            <span className="text-sm font-bold text-gray-900">{settingsConfig.currency}</span>
                        </div>
                        <div className="flex justify-between items-center py-2.5 bg-gray-50/50 px-3 rounded-lg border border-gray-100">
                            <span className="text-sm font-bold text-gray-600">Authorized Signatory</span>
                            <span className="text-sm font-bold text-gray-900 truncate max-w-[130px]">{settingsConfig.authorizedSignatory}</span>
                        </div>
                        <div className="flex justify-between items-center py-2.5 bg-gray-50/50 px-3 rounded-lg border border-gray-100">
                            <span className="text-sm font-bold text-gray-600">Display Leave Balance</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${settingsConfig.showLeaveBalance ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{settingsConfig.showLeaveBalance ? 'Visible' : 'Hidden'}</span>
                        </div>
                    </div>

                    <button onClick={() => handleOpenFormatModal('payslip')} className="w-full flex items-center justify-center gap-2 py-3 bg-[#C29543] hover:bg-[#A67D35] text-white shadow-sm shadow-[#C29543]/20 font-bold rounded-lg transition-colors">
                        <Edit2 size={16} /> Customize Format
                    </button>
                </div>

                {/* Payroll Report Format Card */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col h-full transform transition-transform hover:-translate-y-1 hover:shadow-md">
                    <div className="flex items-start justify-between mb-6 border-b border-gray-100 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
                                <Calendar size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Payroll Report Format</h3>
                                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest mt-0.5">Data Configuration</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 mb-8 flex-1">
                        <div className="flex justify-between items-center py-2.5 bg-gray-50/50 px-3 rounded-lg border border-gray-100">
                            <span className="text-sm font-bold text-gray-600">Data Grouping</span>
                            <span className="text-sm font-bold text-gray-900">Department</span>
                        </div>
                        <div className="flex justify-between items-center py-2.5 bg-gray-50/50 px-3 rounded-lg border border-gray-100">
                            <span className="text-sm font-bold text-gray-600">Breakdown Allowances</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-600">Yes</span>
                        </div>
                        <div className="flex justify-between items-center py-2.5 bg-gray-50/50 px-3 rounded-lg border border-gray-100">
                            <span className="text-sm font-bold text-gray-600">Breakdown Deductions</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-600">Yes</span>
                        </div>
                        <div className="flex justify-between items-center py-2.5 bg-gray-50/50 px-3 rounded-lg border border-gray-100">
                            <span className="text-sm font-bold text-gray-600">Export Detail Level</span>
                            <span className="text-sm font-bold text-gray-900">Detailed</span>
                        </div>
                    </div>

                    <button onClick={() => handleOpenFormatModal('report')} className="w-full flex items-center justify-center gap-2 py-3 bg-gray-50 hover:bg-gray-100 text-blue-600 font-bold rounded-lg transition-colors border border-gray-200">
                        <Edit2 size={16} /> Setup Report View
                    </button>
                </div>
            </div>
        </div>
    );

    // -- Modal Render --
    const renderModal = () => (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <h3 className="text-lg font-bold text-gray-900">{editingStruct ? 'Edit Salary Structure' : 'Create New Structure'}</h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1 space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-700">Structure Name</label>
                        <input type="text" value={structForm.name} onChange={e => setStructForm({ ...structForm, name: e.target.value })} className="w-full px-4 py-2 bg-gray-50 border border-transparent rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50" placeholder="e.g. Senior Teacher Grade" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-700">Code</label>
                        <input type="text" value={structForm.code} onChange={e => setStructForm({ ...structForm, code: e.target.value })} className="w-full px-4 py-2 bg-gray-50 border border-transparent rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50" placeholder="e.g. TCH-SG" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-gray-700">Basic Pay %</label>
                            <input type="text" value={structForm.basicPay} onChange={e => setStructForm({ ...structForm, basicPay: e.target.value })} className="w-full px-4 py-2 bg-gray-50 border border-transparent rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50" placeholder="e.g. 50%" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-gray-700">Status</label>
                            <select value={structForm.status} onChange={e => setStructForm({ ...structForm, status: e.target.value })} className="w-full px-4 py-2 bg-gray-50 border border-transparent rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50">
                                <option>Active</option>
                                <option>Inactive</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-700">Allowances</label>
                        <input type="text" value={structForm.allowances} onChange={e => setStructForm({ ...structForm, allowances: e.target.value })} className="w-full px-4 py-2 bg-gray-50 border border-transparent rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50" placeholder="e.g. HRA, DA, TA" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-700">Deductions</label>
                        <input type="text" value={structForm.deductions} onChange={e => setStructForm({ ...structForm, deductions: e.target.value })} className="w-full px-4 py-2 bg-gray-50 border border-transparent rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50" placeholder="e.g. PF, PT, TDS" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-700">Total Earnings Range</label>
                        <input type="text" value={structForm.totalEarnings} onChange={e => setStructForm({ ...structForm, totalEarnings: e.target.value })} className="w-full px-4 py-2 bg-gray-50 border border-transparent rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50" placeholder="e.g. ₹60,000 - ₹80,000" />
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
                    <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-bold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                        Cancel
                    </button>
                    <button onClick={handleSaveStructure} className="px-4 py-2 text-sm font-bold text-white bg-[#C29543] rounded-lg hover:bg-[#A67D35] transition-colors shadow-sm focus:ring-2 focus:ring-[#C29543]/50 outline-none">
                        {editingStruct ? 'Update Structure' : 'Create Structure'}
                    </button>
                </div>
            </div>
        </div>
    );

    const renderFormatModal = () => {
        if (!isFormatModalOpen) return null;

        const isPayslip = formatModalType === 'payslip';

        return (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
                <div className="bg-gray-50 rounded-2xl shadow-2xl w-full max-w-7xl overflow-hidden flex flex-col h-[90vh]">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white z-10 shrink-0">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">
                                Customize {isPayslip ? 'Payslip' : 'Report'} Format
                            </h3>
                            <p className="text-sm text-gray-500">Live preview matches exactly what will be generated.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={() => setIsFormatModalOpen(false)} className="px-4 py-2 border border-gray-200 bg-white text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                                Cancel
                            </button>
                            <button onClick={handleSaveFormatSettings} className="px-5 py-2 bg-[#C29543] text-white font-bold rounded-lg hover:bg-[#A67D35] transition-colors shadow-md shadow-[#C29543]/20 flex items-center gap-2">
                                <CheckCircle size={18} /> Save Format
                            </button>
                        </div>
                    </div>

                    {/* Split View */}
                    <div className="flex flex-col lg:flex-row flex-1 overflow-hidden min-h-0">

                        {/* LEFT: Controls */}
                        <div className="w-full lg:w-[400px] border-r border-gray-200 bg-white overflow-y-auto p-6 space-y-6 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] z-10 shrink-0">
                            {isPayslip ? (
                                <>
                                    {/* Payslip Controls */}
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Header Branding</h4>
                                        <div className="space-y-4">
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-bold text-gray-700">Institute Name</label>
                                                <input type="text" value={tempSettings.instituteName || ''} onChange={(e) => setTempSettings({ ...tempSettings, instituteName: e.target.value })} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 transition-all font-medium text-gray-900" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-bold text-gray-700">Official Address</label>
                                                <textarea value={tempSettings.address || ''} onChange={(e) => setTempSettings({ ...tempSettings, address: e.target.value })} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg h-20 resize-none flex-shrink-0 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 transition-all font-medium text-gray-900"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="border-gray-100" />
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Preferences & Toggles</h4>
                                        <div className="space-y-4">
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-bold text-gray-700">Currency Mode</label>
                                                <select value={tempSettings.currency || ''} onChange={(e) => setTempSettings({ ...tempSettings, currency: e.target.value })} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 transition-all font-medium text-gray-900">
                                                    <option>INR (₹)</option>
                                                    <option>USD ($)</option>
                                                    <option>GBP (£)</option>
                                                </select>
                                            </div>
                                            <label className="flex items-center justify-between cursor-pointer p-4 border border-gray-200 rounded-lg hover:border-[#C29543]/50 transition-all group bg-gray-50">
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">Show Leave Balance</p>
                                                    <p className="text-[11px] text-gray-500 mt-0.5">Include a leave summary block</p>
                                                </div>
                                                <div className="relative">
                                                    <input type="checkbox" className="sr-only" checked={tempSettings.showLeaveBalance || false} onChange={(e) => setTempSettings({ ...tempSettings, showLeaveBalance: e.target.checked })} />
                                                    <div className={`w-10 h-5 rounded-full transition-colors ${tempSettings.showLeaveBalance ? 'bg-[#C29543]' : 'bg-gray-300'}`}></div>
                                                    <div className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform ${tempSettings.showLeaveBalance ? 'translate-x-5' : ''}`}></div>
                                                </div>
                                            </label>
                                            <label className="flex items-center justify-between cursor-pointer p-4 border border-gray-200 rounded-lg hover:border-[#C29543]/50 transition-all group bg-gray-50">
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">Show YTD Earnings</p>
                                                    <p className="text-[11px] text-gray-500 mt-0.5">Year to Date totals footer</p>
                                                </div>
                                                <div className="relative">
                                                    <input type="checkbox" className="sr-only" checked={tempSettings.showYTD || false} onChange={(e) => setTempSettings({ ...tempSettings, showYTD: e.target.checked })} />
                                                    <div className={`w-10 h-5 rounded-full transition-colors ${tempSettings.showYTD ? 'bg-[#C29543]' : 'bg-gray-300'}`}></div>
                                                    <div className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform ${tempSettings.showYTD ? 'translate-x-5' : ''}`}></div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <hr className="border-gray-100" />
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Footer Validation</h4>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-gray-700">Signatory Title</label>
                                            <input type="text" value={tempSettings.authorizedSignatory || ''} onChange={(e) => setTempSettings({ ...tempSettings, authorizedSignatory: e.target.value })} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 transition-all font-medium text-gray-900" />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* Report Controls */}
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Report Structure</h4>
                                        <div className="space-y-4">
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-bold text-gray-700">Group Row Data By</label>
                                                <select className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all font-medium text-gray-900">
                                                    <option>Department</option>
                                                    <option>Individual Employee</option>
                                                    <option>Salary Grade</option>
                                                </select>
                                            </div>
                                            <hr className="border-gray-100" />
                                            <label className="flex items-center justify-between cursor-pointer p-4 border border-gray-200 rounded-lg hover:border-blue-500/50 transition-all group bg-gray-50">
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">Include Base Salary</p>
                                                    <p className="text-[11px] text-gray-500">Shows fixed basic column</p>
                                                </div>
                                                <div className="relative">
                                                    <input type="checkbox" className="sr-only" checked={true} readOnly />
                                                    <div className="w-10 h-5 rounded-full transition-colors bg-blue-500"></div>
                                                    <div className="absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform translate-x-5"></div>
                                                </div>
                                            </label>
                                            <label className="flex items-center justify-between cursor-pointer p-4 border border-gray-200 rounded-lg hover:border-blue-500/50 transition-all group bg-gray-50">
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">Include Allowances Breakdown</p>
                                                    <p className="text-[11px] text-gray-500">Shows granular extras</p>
                                                </div>
                                                <div className="relative">
                                                    <input type="checkbox" className="sr-only" checked={true} readOnly />
                                                    <div className="w-10 h-5 rounded-full transition-colors bg-blue-500"></div>
                                                    <div className="absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform translate-x-5"></div>
                                                </div>
                                            </label>
                                            <label className="flex items-center justify-between cursor-pointer p-4 border border-gray-200 rounded-lg hover:border-blue-500/50 transition-all group bg-gray-50">
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">Include Deductions Breakdown</p>
                                                    <p className="text-[11px] text-gray-500">Tax, PF, PT specifics</p>
                                                </div>
                                                <div className="relative">
                                                    <input type="checkbox" className="sr-only" checked={true} readOnly />
                                                    <div className="w-10 h-5 rounded-full transition-colors bg-blue-500"></div>
                                                    <div className="absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform translate-x-5"></div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* RIGHT: Live Preview Interface */}
                        <div className="flex-1 bg-gray-200 border-l border-gray-300 overflow-y-auto p-4 sm:p-8 flex items-start justify-center shadow-inner" style={{ backgroundImage: 'radial-gradient(#d1d5db 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
                            {isPayslip ? (
                                /* Payslip Document UI Mock */
                                <div className="bg-white shadow-2xl w-full max-w-2xl rounded-sm border border-gray-300 transform transition-all duration-300">
                                    <div className="p-8 border-b-4 border-gray-900 text-center bg-gray-50">
                                        <h1 className="text-2xl font-black tracking-tight uppercase text-gray-900 mb-2">
                                            {tempSettings.instituteName || 'Institute Name Here'}
                                        </h1>
                                        <p className="text-sm font-medium text-gray-600 max-w-lg mx-auto whitespace-pre-line leading-relaxed">
                                            {tempSettings.address || '123 Empty Address Lane, City'}
                                        </p>
                                        <div className="mt-6 inline-block bg-white border border-gray-300 text-gray-800 font-bold px-6 py-2 tracking-widest text-xs rounded shadow-sm">
                                            CONFIDENTIAL PAYSLIP: OCTOBER 2023
                                        </div>
                                    </div>

                                    <div className="p-6 sm:p-8 space-y-6">
                                        <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-xs border border-gray-200 rounded-lg p-5 bg-gray-50/50">
                                            <div className="flex justify-between border-b border-gray-100 pb-2"><span className="text-gray-500 font-medium">Employee Name</span> <span className="font-bold text-gray-900">Arjun Singh</span></div>
                                            <div className="flex justify-between border-b border-gray-100 pb-2"><span className="text-gray-500 font-medium">Employee ID</span> <span className="font-bold text-gray-900">EMP-8022</span></div>
                                            <div className="flex justify-between border-b border-gray-100 pb-2"><span className="text-gray-500 font-medium">Designation</span> <span className="font-bold text-gray-900">Senior Staff</span></div>
                                            <div className="flex justify-between border-b border-gray-100 pb-2"><span className="text-gray-500 font-medium">Department</span> <span className="font-bold text-gray-900">Administration</span></div>
                                            <div className="flex justify-between pt-1"><span className="text-gray-500 font-medium">Bank A/C</span> <span className="font-bold text-gray-900">XXXX-XXXX-1234</span></div>
                                            <div className="flex justify-between pt-1"><span className="text-gray-500 font-medium">PAN ID</span> <span className="font-bold text-gray-900">ABCDE1234F</span></div>
                                        </div>

                                        <div className="border border-gray-300 rounded overflow-hidden mt-6 shadow-sm text-sm">
                                            <div className="flex border-b border-gray-300 font-bold bg-gray-100 text-[11px] uppercase tracking-wider text-gray-600">
                                                <div className="w-1/2 p-3 border-r border-gray-300">Earnings Components</div>
                                                <div className="w-1/2 p-3">Deduction Components</div>
                                            </div>
                                            <div className="flex border-b border-gray-300 font-medium">
                                                <div className="w-1/2 border-r border-gray-300 p-0 text-gray-700">
                                                    <div className="flex justify-between p-3 border-b border-gray-100 hover:bg-gray-50">
                                                        <span>Basic Remuneration</span>
                                                        <span className="text-gray-900 font-bold">{tempSettings.currency?.split(' ')[1] || '₹'} 40,000</span>
                                                    </div>
                                                    <div className="flex justify-between p-3 border-b border-gray-100 hover:bg-gray-50">
                                                        <span>House Rent Allowance (HRA)</span>
                                                        <span className="text-gray-900 font-bold">{tempSettings.currency?.split(' ')[1] || '₹'} 15,000</span>
                                                    </div>
                                                    <div className="flex justify-between p-3 hover:bg-gray-50">
                                                        <span>Transport Allowance</span>
                                                        <span className="text-gray-900 font-bold">{tempSettings.currency?.split(' ')[1] || '₹'} 5,000</span>
                                                    </div>
                                                </div>
                                                <div className="w-1/2 p-0 text-gray-700">
                                                    <div className="flex justify-between p-3 border-b border-gray-100 hover:bg-gray-50">
                                                        <span>Provident Fund (PF)</span>
                                                        <span className="text-gray-900 font-bold">{tempSettings.currency?.split(' ')[1] || '₹'} 4,800</span>
                                                    </div>
                                                    <div className="flex justify-between p-3 hover:bg-gray-50">
                                                        <span>Professional Tax (PT)</span>
                                                        <span className="text-gray-900 font-bold">{tempSettings.currency?.split(' ')[1] || '₹'} 200</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex font-bold bg-gray-50">
                                                <div className="w-1/2 p-3 border-r border-gray-300 flex justify-between text-gray-800 border-b border-gray-200">
                                                    <span>Gross Earnings</span>
                                                    <span>{tempSettings.currency?.split(' ')[1] || '₹'} 60,000</span>
                                                </div>
                                                <div className="w-1/2 p-3 flex justify-between text-red-600 border-b border-gray-200">
                                                    <span>Total Deductions</span>
                                                    <span>{tempSettings.currency?.split(' ')[1] || '₹'} 5,000</span>
                                                </div>
                                            </div>
                                            <div className="p-5 bg-gray-800 text-white flex justify-between items-center rounded-b-sm">
                                                <span className="font-bold uppercase tracking-wider text-xs text-gray-300">Net Salary Transferred</span>
                                                <span className="text-2xl font-black tabular-nums">{tempSettings.currency?.split(' ')[1] || '₹'} 55,000</span>
                                            </div>
                                        </div>

                                        {/* Toggled Footer Sections */}
                                        <div className="grid grid-cols-2 gap-6 mt-6">
                                            {/* Leave Balance Box */}
                                            <div className={`border border-blue-100 bg-blue-50/50 rounded-lg p-4 transition-all duration-500 ease-in-out ${tempSettings.showLeaveBalance ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 invisible h-0 overflow-hidden'}`}>
                                                <h5 className="font-bold text-[10px] uppercase tracking-wider text-blue-800 mb-3 border-b border-blue-200 pb-2">Leave Summary (Remaining)</h5>
                                                <div className="space-y-2 text-xs">
                                                    <div className="flex justify-between text-gray-600"><span className="font-medium">Casual Leave (CL)</span><span className="font-bold text-gray-900">4.5</span></div>
                                                    <div className="flex justify-between text-gray-600"><span className="font-medium">Sick Leave (SL)</span><span className="font-bold text-gray-900">12.0</span></div>
                                                    <div className="flex justify-between text-gray-600"><span className="font-medium">Earned Leave (EL)</span><span className="font-bold text-gray-900">2.0</span></div>
                                                </div>
                                            </div>

                                            {/* YTD Box */}
                                            <div className={`border border-purple-100 bg-purple-50/50 rounded-lg p-4 transition-all duration-500 ease-in-out ${tempSettings.showYTD ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 invisible h-0 overflow-hidden'}`}>
                                                <h5 className="font-bold text-[10px] uppercase tracking-wider text-purple-800 mb-3 border-b border-purple-200 pb-2">YTD Financials FY 2023-24</h5>
                                                <div className="space-y-2 text-xs">
                                                    <div className="flex justify-between text-gray-600"><span className="font-medium">Gross Earnings YTD</span><span className="font-bold text-gray-900">{tempSettings.currency?.split(' ')[1] || '₹'} 4,20,000</span></div>
                                                    <div className="flex justify-between text-gray-600"><span className="font-medium">Deductions YTD</span><span className="font-bold text-gray-900">{tempSettings.currency?.split(' ')[1] || '₹'} 35,000</span></div>
                                                    <div className="flex justify-between text-gray-600 pt-1 border-t border-purple-100 mt-1"><span className="font-bold">Net Paid YTD</span><span className="font-bold text-purple-900">{tempSettings.currency?.split(' ')[1] || '₹'} 3,85,000</span></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-16 pt-8 flex justify-between items-end">
                                            <div className="text-[10px] uppercase text-gray-400 font-bold max-w-[200px]">
                                                This is a computer generated document. Physical signature is not mandatory.
                                            </div>
                                            <div className="text-center">
                                                <div className="w-48 border-b-2 border-gray-900 mb-2 mt-8 mx-auto"></div>
                                                <p className="font-bold text-gray-900 text-sm">
                                                    {tempSettings.authorizedSignatory || 'Signatory Name Here'}
                                                </p>
                                                <p className="text-[10px] text-gray-500 uppercase font-bold mt-0.5">Authorized Signatory</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                /* Report Preview UI Mock */
                                <div className="bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] w-full max-w-4xl rounded border border-gray-300 overflow-hidden p-8 font-mono">
                                    <div className="text-center mb-8 border-b-2 border-dashed border-gray-300 pb-6">
                                        <h2 className="text-2xl font-black tracking-tight uppercase text-gray-900">{tempSettings.instituteName || settingsConfig.instituteName}</h2>
                                        <p className="text-sm font-bold text-gray-600 mt-2 bg-gray-100 inline-block px-4 py-1 rounded">PAYROLL MASTER REPORT</p>
                                        <p className="text-xs text-gray-500 mt-3 font-medium">Period: October-2023 | Grouping Pivot: Department</p>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-xs border border-gray-300">
                                            <thead>
                                                <tr className="bg-gray-800 text-white border-b-2 border-gray-800">
                                                    <th className="p-3 border-r border-gray-700">Department Name</th>
                                                    <th className="p-3 border-r border-gray-700 text-right">Headcount</th>
                                                    <th className="p-3 border-r border-gray-700 text-right">Basic + DA</th>
                                                    <th className="p-3 border-r border-gray-700 text-right text-blue-300">Allowances</th>
                                                    <th className="p-3 border-r border-gray-700 text-right text-red-300">Deductions</th>
                                                    <th className="p-3 text-right bg-black text-green-400 font-bold tracking-wider">Final Disbursed</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                                    <td className="p-3 border-r border-gray-200 font-bold text-gray-800">Teaching Staff</td>
                                                    <td className="p-3 border-r border-gray-200 text-right">85</td>
                                                    <td className="p-3 border-r border-gray-200 text-right text-gray-600">21,50,000</td>
                                                    <td className="p-3 border-r border-gray-200 text-right text-blue-600 font-medium">2,50,000</td>
                                                    <td className="p-3 border-r border-gray-200 text-right text-red-600 font-medium">1,20,000</td>
                                                    <td className="p-3 text-right font-black text-gray-900 bg-gray-50/50">22,80,000</td>
                                                </tr>
                                                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                                    <td className="p-3 border-r border-gray-200 font-bold text-gray-800">Administration Support</td>
                                                    <td className="p-3 border-r border-gray-200 text-right">25</td>
                                                    <td className="p-3 border-r border-gray-200 text-right text-gray-600">8,50,000</td>
                                                    <td className="p-3 border-r border-gray-200 text-right text-blue-600 font-medium">1,10,000</td>
                                                    <td className="p-3 border-r border-gray-200 text-right text-red-600 font-medium">65,000</td>
                                                    <td className="p-3 text-right font-black text-gray-900 bg-gray-50/50">8,95,000</td>
                                                </tr>
                                                <tr className="border-b border-gray-400 bg-gray-100">
                                                    <td colSpan="6" className="p-2 text-center text-[10px] text-gray-500 uppercase font-bold tracking-widest">••• Additional Groups Truncated •••</td>
                                                </tr>
                                                <tr className="bg-gray-900 text-white font-bold border-t-4 border-double border-gray-500">
                                                    <td className="p-4 border-r border-gray-700 uppercase tracking-widest">Enterprise Total</td>
                                                    <td className="p-4 border-r border-gray-700 text-right">145</td>
                                                    <td className="p-4 border-r border-gray-700 text-right">34,50,000</td>
                                                    <td className="p-4 border-r border-gray-700 text-right text-blue-400">4,20,000</td>
                                                    <td className="p-4 border-r border-gray-700 text-right text-red-400">2,15,000</td>
                                                    <td className="p-4 text-right text-green-400 text-lg">36,55,000</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-dashed border-gray-300 flex justify-between items-center text-[10px] text-gray-500 font-medium">
                                        <span>Generated on: 15-Mar-2023 10:14:02 IST</span>
                                        <span>Export Profile: {tempSettings.authorizedSignatory || 'Auto_System'}</span>
                                        <span>Page 1 of 1</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="p-4 sm:p-6 max-w-[1400px] mx-auto w-full min-h-screen bg-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Payroll Management</h1>
                <div className="flex gap-3">
                    {renderHeaderActions()}
                </div>
            </div>

            <div className="flex items-center gap-8 border-b border-gray-100 mb-6 overflow-x-auto no-scrollbar">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-4 text-sm font-bold whitespace-nowrap transition-all border-b-2 ${activeTab === tab.id
                            ? 'border-[#C29543] text-[#C29543]'
                            : 'border-transparent text-gray-400 hover:text-gray-700'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="min-h-[500px]">
                {activeTab === 'structure' && renderSalaryStructure()}
                {activeTab === 'processing' && renderSalaryProcessing()}
                {activeTab === 'payslip' && renderPayslipGeneration()}
                {activeTab === 'reports' && renderPayrollReports()}
                {activeTab === 'settings' && renderPayrollSettings()}
            </div>

            {isModalOpen && renderModal()}
            {renderFormatModal()}
        </div>
    );
};

export default Payroll;
