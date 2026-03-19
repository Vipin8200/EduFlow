import React, { useState, useMemo } from 'react';
import {
    Plus, Search,
    Edit2, Trash2, XCircle,
    Phone, Eye, Users, RefreshCw, User,
    ChevronLeft, ChevronRight
} from 'lucide-react';

// --- MOCK DATA ---
const mockStudents = [
    { id: 'ADM-2023-001', name: 'Aarav Sharma', class: 'Grade 5', section: 'A', rollNo: '01', dob: '14/05/2012', gender: 'Male', phone: '+91 9876543210', email: 'aarav@example.com', fatherName: 'Ramesh Sharma', address: '123 Main St, City', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: 'ADM-2023-002', name: 'Priya Verma', class: 'Grade 5', section: 'A', rollNo: '02', dob: '22/08/2012', gender: 'Female', phone: '+91 9876543211', email: 'priya@example.com', fatherName: 'Sanjay Verma', address: '456 Park Ave, City', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=2' },
    { id: 'ADM-2023-003', name: 'Rohan Gupta', class: 'Grade 8', section: 'B', rollNo: '15', dob: '10/11/2009', gender: 'Male', phone: '+91 9876543212', email: 'rohan@example.com', fatherName: 'Amit Gupta', address: '789 Elm St, City', status: 'Inactive', avatar: 'https://i.pravatar.cc/150?u=3' },
    { id: 'ADM-2023-004', name: 'Sneha Patel', class: 'Grade 10', section: 'C', rollNo: '30', dob: '05/02/2007', gender: 'Female', phone: '+91 9876543213', email: 'sneha@example.com', fatherName: 'Rahul Patel', address: '321 Pine St, City', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=4' },
    { id: 'ADM-2023-005', name: 'Kabir Singh', class: 'Grade 5', section: 'B', rollNo: '-', dob: '18/09/2012', gender: 'Male', phone: '+91 9876543214', email: 'kabir@example.com', fatherName: 'Vikram Singh', address: '654 Oak St, City', status: 'Pending', avatar: 'https://i.pravatar.cc/150?u=5' },
    // Adding more mock data for pagination
    { id: 'ADM-2023-006', name: 'Ananya Desai', class: 'Grade 1', section: 'A', rollNo: '05', dob: '12/03/2016', gender: 'Female', phone: '+91 9876543215', email: 'ananya@example.com', fatherName: 'Nitin Desai', address: '321 North St, City', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=6' },
    { id: 'ADM-2023-007', name: 'Ravi Kumar', class: 'Grade 8', section: 'A', rollNo: '12', dob: '25/07/2009', gender: 'Male', phone: '+91 9876543216', email: 'ravi@example.com', fatherName: 'Ashok Kumar', address: '456 South St, City', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=7' },
    { id: 'ADM-2023-008', name: 'Meera Reddy', class: 'Grade 10', section: 'A', rollNo: '08', dob: '08/11/2007', gender: 'Female', phone: '+91 9876543217', email: 'meera@example.com', fatherName: 'Prakash Reddy', address: '789 West St, City', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=8' },
    { id: 'ADM-2023-009', name: 'Arjun Das', class: 'Grade 5', section: 'C', rollNo: '22', dob: '19/01/2012', gender: 'Male', phone: '+91 9876543218', email: 'arjun@example.com', fatherName: 'Karan Das', address: '123 East St, City', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=9' },
    { id: 'ADM-2023-010', name: 'Neha Sharma', class: 'Grade 1', section: 'B', rollNo: '14', dob: '04/09/2016', gender: 'Female', phone: '+91 9876543219', email: 'neha@example.com', fatherName: 'Raj Sharma', address: '456 Central Ave, City', status: 'Inactive', avatar: 'https://i.pravatar.cc/150?u=10' },
    { id: 'ADM-2023-011', name: 'Vikram Joshi', class: 'Grade 8', section: 'C', rollNo: '33', dob: '30/04/2009', gender: 'Male', phone: '+91 9876543220', email: 'vikram@example.com', fatherName: 'Sunil Joshi', address: '789 Cross Rd, City', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=11' },
    { id: 'ADM-2023-012', name: 'Kavita Menon', class: 'Grade 10', section: 'B', rollNo: '19', dob: '15/12/2007', gender: 'Female', phone: '+91 9876543221', email: 'kavita@example.com', fatherName: 'Hari Menon', address: '123 Ring Rd, City', status: 'Pending', avatar: 'https://i.pravatar.cc/150?u=12' },
];

const StudentMaster = () => {
    const [students, setStudents] = useState(mockStudents);
    const [searchQuery, setSearchQuery] = useState('');
    const [classFilter, setClassFilter] = useState('All');
    const [sectionFilter, setSectionFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // UI States
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

    const [activeStudent, setActiveStudent] = useState(null); // For edit/view/assign
    const [editMode, setEditMode] = useState(false);

    // Form States
    const initialFormState = {
        name: '', class: 'Grade 5', section: 'A', dob: '', gender: 'Male', phone: '', email: '', fatherName: '', address: ''
    };
    const [formData, setFormData] = useState(initialFormState);
    const [assignmentData, setAssignmentData] = useState({ class: '', section: '', rollNo: '' });

    // --- ACTIONS ---

    const handleSaveStudent = () => {
        if (!formData.name) return alert("Student Name is required.");

        if (editMode) {
            setStudents(students.map(s => s.id === activeStudent.id ? { ...s, ...formData } : s));
            alert("Student updated successfully.");
        } else {
            const newId = `ADM-2023-${String(students.length + 1).padStart(3, '0')}`;
            const newStudent = {
                id: newId,
                ...formData,
                rollNo: '-', // Assigned later
                status: 'Active',
                avatar: `https://i.pravatar.cc/150?u=${Math.random()}`
            };
            setStudents([newStudent, ...students]);
            alert("New student added successfully.");
        }
        setIsAddEditModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this student record?")) {
            setStudents(students.filter(s => s.id !== id));
        }
    };

    const handleSaveAssignment = () => {
        setStudents(students.map(s => {
            if (s.id === activeStudent.id) {
                return {
                    ...s,
                    class: assignmentData.class || s.class,
                    section: assignmentData.section || s.section,
                    rollNo: assignmentData.rollNo || s.rollNo,
                    status: 'Active' // Making active if assigned roll no
                };
            }
            return s;
        }));
        setIsAssignModalOpen(false);
        alert("Assignment updated successfully.");
    };

    // --- OPENS MODALS ---
    const openAddModal = () => {
        setEditMode(false);
        setFormData(initialFormState);
        setIsAddEditModalOpen(true);
    };

    const openEditModal = (student) => {
        setEditMode(true);
        setActiveStudent(student);
        setFormData({
            name: student.name, class: student.class, section: student.section, dob: student.dob,
            gender: student.gender, phone: student.phone, email: student.email, fatherName: student.fatherName, address: student.address
        });
        setIsAddEditModalOpen(true);
    };

    const openProfileModal = (student) => {
        setActiveStudent(student);
        setIsProfileModalOpen(true);
    };

    const openAssignModal = (student) => {
        setActiveStudent(student);
        setAssignmentData({ class: student.class, section: student.section, rollNo: student.rollNo === '-' ? '' : student.rollNo });
        setIsAssignModalOpen(true);
    };

    // --- FILTERS & PAGINATION ---
    const filteredStudents = useMemo(() => {
        return students.filter(s => {
            const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.phone.includes(searchQuery);
            const matchClass = classFilter === 'All' || s.class === classFilter;
            const matchSection = sectionFilter === 'All' || s.section === sectionFilter;
            const matchStatus = statusFilter === 'All' || s.status === statusFilter;
            return matchSearch && matchClass && matchSection && matchStatus;
        });
    }, [students, searchQuery, classFilter, sectionFilter, statusFilter]);

    // Reset pagination when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, classFilter, sectionFilter, statusFilter]);

    // Calculate pagination slices
    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);

    // Unique options for filters
    const classes = ['All', ...new Set(students.map(s => s.class))];
    const sections = ['All', 'A', 'B', 'C', 'D']; // Mock sections

    // --- MODALS RENDERERS ---

    const renderAddEditModal = () => {
        if (!isAddEditModalOpen) return null;
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 shrink-0">
                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            {editMode ? <Edit2 className="text-[#C29543]" size={20} /> : <Plus className="text-[#C29543]" size={20} />}
                            {editMode ? 'Edit Student Details' : 'Register New Student'}
                        </h3>
                        <button onClick={() => setIsAddEditModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2">
                            <XCircle size={20} />
                        </button>
                    </div>

                    <div className="p-6 overflow-y-auto space-y-6 flex-1">
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-gray-900 border-b pb-2">Basic Info</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold tracking-wide text-gray-500 uppercase">Full Name <span className="text-red-500">*</span></label>
                                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#C29543]" placeholder="e.g. Ramesh" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold tracking-wide text-gray-500 uppercase">Date of Birth</label>
                                    <input type="text" value={formData.dob} onChange={(e) => setFormData({ ...formData, dob: e.target.value })} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#C29543]" placeholder="DD/MM/YYYY" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold tracking-wide text-gray-500 uppercase">Gender</label>
                                    <select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#C29543]">
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-gray-900 border-b pb-2">Contact & Family</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold tracking-wide text-gray-500 uppercase">Father's Name</label>
                                    <input type="text" value={formData.fatherName} onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#C29543]" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold tracking-wide text-gray-500 uppercase">Phone Number</label>
                                    <input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#C29543]" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold tracking-wide text-gray-500 uppercase">Email Address</label>
                                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#C29543]" />
                                </div>
                                <div className="space-y-1.5 sm:col-span-2">
                                    <label className="text-xs font-bold tracking-wide text-gray-500 uppercase">Residential Address</label>
                                    <textarea value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded text-sm h-20 resize-none focus:outline-none focus:border-[#C29543]"></textarea>
                                </div>
                            </div>
                        </div>

                        {!editMode && (
                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-gray-900 border-b pb-2">Initial Academic Assignment</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold tracking-wide text-gray-500 uppercase">Class</label>
                                        <select value={formData.class} onChange={(e) => setFormData({ ...formData, class: e.target.value })} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#C29543]">
                                            <option>Grade 1</option><option>Grade 5</option><option>Grade 8</option><option>Grade 10</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold tracking-wide text-gray-500 uppercase">Section</label>
                                        <select value={formData.section} onChange={(e) => setFormData({ ...formData, section: e.target.value })} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#C29543]">
                                            <option>A</option><option>B</option><option>C</option>
                                        </select>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400 italic">Roll Number can be assigned later.</p>
                            </div>
                        )}
                    </div>

                    <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
                        <button onClick={() => setIsAddEditModalOpen(false)} className="px-5 py-2 text-sm font-bold text-gray-600 border border-gray-200 bg-white rounded-lg hover:bg-gray-100">Cancel</button>
                        <button onClick={handleSaveStudent} className="px-5 py-2 text-sm font-bold text-white bg-[#C29543] rounded-lg hover:bg-[#A67D35]">Save Record</button>
                    </div>
                </div>
            </div>
        );
    };

    const renderAssignModal = () => {
        if (!isAssignModalOpen || !activeStudent) return null;
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <RefreshCw className="text-[#C29543]" size={18} /> Allocation
                        </h3>
                        <button onClick={() => setIsAssignModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2">
                            <XCircle size={18} />
                        </button>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <img src={activeStudent.avatar} alt="avatar" className="w-10 h-10 rounded-full border border-gray-200" />
                            <div>
                                <p className="text-sm font-bold">{activeStudent.name}</p>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{activeStudent.id}</p>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold tracking-wide text-gray-500 uppercase">Assign Class</label>
                            <select value={assignmentData.class} onChange={(e) => setAssignmentData({ ...assignmentData, class: e.target.value })} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#C29543]">
                                <option>Grade 1</option><option>Grade 5</option><option>Grade 8</option><option>Grade 10</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold tracking-wide text-gray-500 uppercase">Assign Section</label>
                            <select value={assignmentData.section} onChange={(e) => setAssignmentData({ ...assignmentData, section: e.target.value })} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#C29543]">
                                <option>A</option><option>B</option><option>C</option><option>D</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold tracking-wide text-gray-500 uppercase">Assign Roll No</label>
                            <input type="text" value={assignmentData.rollNo} onChange={(e) => setAssignmentData({ ...assignmentData, rollNo: e.target.value })} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#C29543]" placeholder="e.g. 15" />
                        </div>
                    </div>
                    <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                        <button onClick={() => setIsAssignModalOpen(false)} className="px-4 py-2 text-xs font-bold text-gray-600 bg-white border border-gray-200 rounded">Cancel</button>
                        <button onClick={handleSaveAssignment} className="px-4 py-2 text-xs font-bold text-white bg-[#C29543] rounded hover:bg-[#A67D35]">Update Allocation</button>
                    </div>
                </div>
            </div>
        );
    }

    const renderProfileModal = () => {
        if (!isProfileModalOpen || !activeStudent) return null;
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
                    <div className="bg-[#1a1a1a] h-32 relative shrink-0">
                        <button onClick={() => setIsProfileModalOpen(false)} className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/20 p-2 rounded-full backdrop-blur-md">
                            <XCircle size={20} />
                        </button>
                    </div>
                    <div className="px-8 pb-8 pt-0 relative overflow-y-auto flex-1">
                        {/* Avatar overlap */}
                        <div className="flex justify-between items-end -mt-12 mb-6">
                            <div className="flex items-end gap-5">
                                <img src={activeStudent.avatar} alt="Student" className="w-28 h-28 rounded-2xl border-4 border-white shadow-lg object-cover bg-white" />
                                <div className="pb-1">
                                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">{activeStudent.name}</h2>
                                    <p className="text-sm font-bold text-[#C29543] uppercase tracking-wider">{activeStudent.id} • {activeStudent.status}</p>
                                </div>
                            </div>
                            <div className="pb-1">
                                <button onClick={() => { setIsProfileModalOpen(false); openEditModal(activeStudent); }} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50">
                                    <Edit2 size={16} /> Edit Profile
                                </button>
                            </div>
                        </div>

                        {/* Badges / Quick Info */}
                        <div className="flex gap-4 mb-8">
                            <div className="flex-1 bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col items-center justify-center">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Class</p>
                                <p className="text-lg font-black text-gray-900">{activeStudent.class}</p>
                            </div>
                            <div className="flex-1 bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col items-center justify-center">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Section</p>
                                <p className="text-lg font-black text-gray-900">{activeStudent.section}</p>
                            </div>
                            <div className="flex-1 bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-8 h-8 bg-orange-100 rounded-bl-full"></div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Roll No</p>
                                <p className="text-lg font-black text-[#C29543]">{activeStudent.rollNo}</p>
                            </div>
                        </div>

                        {/* Detailed Tabs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900 border-b pb-2 mb-4 flex items-center gap-2"><User size={16} className="text-[#C29543]" /> Personal Details</h4>
                                    <div className="space-y-3 text-sm">
                                        <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">D.O.B:</span> <span className="col-span-2 font-bold text-gray-900">{activeStudent.dob}</span></div>
                                        <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Gender:</span> <span className="col-span-2 font-bold text-gray-900">{activeStudent.gender}</span></div>
                                        <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Father's Name:</span> <span className="col-span-2 font-bold text-gray-900">{activeStudent.fatherName}</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900 border-b pb-2 mb-4 flex items-center gap-2"><Phone size={16} className="text-[#C29543]" /> Contact Information</h4>
                                    <div className="space-y-3 text-sm">
                                        <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Phone:</span> <span className="col-span-2 font-bold text-gray-900">{activeStudent.phone}</span></div>
                                        <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Email:</span> <span className="col-span-2 font-bold text-gray-900">{activeStudent.email}</span></div>
                                        <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Address:</span> <span className="col-span-2 font-bold text-gray-900 leading-tight">{activeStudent.address}</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 max-w-[1600px] mx-auto w-full min-h-screen bg-white font-sans">

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Student Master</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage all student records, allocations, and profiles.</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={openAddModal} className="flex items-center gap-2 px-4 py-2 bg-[#C29543] text-white rounded-lg text-sm font-bold shadow-sm shadow-[#C29543]/20 hover:bg-[#A67D35] transition-colors">
                        <Plus size={16} /> Register Student
                    </button>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6 flex flex-col lg:flex-row gap-4 justify-between items-center shadow-sm">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto flex-1">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Class</label>
                        <select
                            value={classFilter} onChange={(e) => setClassFilter(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[#C29543] shadow-sm"
                        >
                            {classes.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Section</label>
                        <select
                            value={sectionFilter} onChange={(e) => setSectionFilter(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[#C29543] shadow-sm"
                        >
                            {sections.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Status</label>
                        <select
                            value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[#C29543] shadow-sm"
                        >
                            <option value="All">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Pending">Pending Assignment</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Search</label>
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Name, ID, Phone..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-8 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#C29543] shadow-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col relative z-0">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1100px] text-left">
                        <thead>
                            <tr className="bg-gray-50/80 border-b border-gray-100">
                                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Student Info</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Academic</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Contact</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {currentStudents.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                                            <div>
                                                <p className="text-sm font-bold text-gray-900 leading-tight group-hover:text-[#C29543] transition-colors cursor-pointer" onClick={() => openProfileModal(student)}>{student.name}</p>
                                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">{student.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-bold text-gray-800">{student.class} - {student.section}</span>
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Roll:</span>
                                                <span className={`text-[11px] font-black px-1.5 py-0.5 rounded ${student.rollNo === '-' ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-700'}`}>{student.rollNo}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-medium text-gray-700 flex items-center gap-2"><User size={13} className="text-gray-400" /> {student.fatherName}</p>
                                        <p className="text-[11px] font-medium text-gray-500 flex items-center gap-2 mt-1"><Phone size={13} className="text-[#C29543]" /> {student.phone}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${student.status === 'Active' ? 'bg-green-50 text-green-600 border border-green-100' :
                                            student.status === 'Inactive' ? 'bg-gray-100 text-gray-500 border border-gray-200' :
                                                'bg-orange-50 text-orange-600 border border-orange-100'
                                            }`}>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 isolate">
                                            <button
                                                onClick={() => openAssignModal(student)}
                                                className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 font-bold text-[11px] rounded hover:bg-gray-50 disabled:opacity-50"
                                                title="Assign Roll No / Section"
                                            >
                                                Allocate
                                            </button>
                                            <button onClick={() => openProfileModal(student)} className="p-1.5 text-gray-400 hover:text-[#C29543] bg-gray-50 rounded" title="View Profile"><Eye size={16} /></button>
                                            <button onClick={() => openEditModal(student)} className="p-1.5 text-gray-400 hover:text-blue-500 bg-gray-50 rounded" title="Edit"><Edit2 size={16} /></button>
                                            <button onClick={() => handleDelete(student.id)} className="p-1.5 text-gray-400 hover:text-red-500 bg-gray-50 rounded" title="Delete"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredStudents.length === 0 && (
                        <div className="p-12 text-center text-gray-500 bg-white">
                            <Users size={48} className="mx-auto text-gray-200 mb-4" />
                            <h3 className="text-lg font-bold text-gray-900 mb-1">No students found</h3>
                            <p className="text-sm">Try adjusting your filters or search query.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Pagination & Footer */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="text-sm text-gray-500 font-medium">
                    Showing <span className="font-bold text-gray-900">{filteredStudents.length > 0 ? indexOfFirstItem + 1 : 0}</span> to <span className="font-bold text-gray-900">{Math.min(indexOfLastItem, filteredStudents.length)}</span> of <span className="font-bold text-gray-900">{filteredStudents.length}</span> students
                </div>

                {totalPages > 1 && (
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-1 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white transition-colors"
                        >
                            <ChevronLeft size={18} />
                        </button>

                        <div className="flex items-center space-x-1 px-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-colors ${currentPage === page
                                        ? 'bg-[#C29543] text-white shadow-sm shadow-[#C29543]/20'
                                        : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="p-1 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white transition-colors"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                )}
            </div>

            {renderAddEditModal()}
            {renderAssignModal()}
            {renderProfileModal()}

        </div>
    );
};

export default StudentMaster;
