import React, { useState, useMemo } from "react";
import {
    Shield,
    Users,
    User,
    LayoutDashboard,
    BookOpen,
    Wallet,
    ClipboardCheck,
    Bus,
    Search,
    ChevronRight,
    ChevronDown,
    Info,
    Save,
    Lock,
    Eye,
    Settings,
    MoreVertical,
    Circle,
    CheckCircle2,
    XCircle,
    ToggleLeft,
    ToggleRight,
    GraduationCap,
    MessageSquare,
    Activity,
    UserPlus
} from "lucide-react";

// --- Constants & Configuration ---

const ACCESS_LEVELS = [
    { id: 'full', label: 'Full Access', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
    { id: 'read', label: 'Read Only', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
    { id: 'none', label: 'No Access', color: 'text-gray-400', bg: 'bg-gray-50', border: 'border-gray-200' }
];

const MODULES = [
    {
        id: 'dashboard',
        name: 'Dashboard',
        icon: LayoutDashboard,
        features: ['Activity Stream', 'Quick Actions', 'System Stats', 'Notifications']
    },
    {
        id: 'students',
        name: 'Student Management',
        icon: Users,
        features: ['Add Student', 'Edit Profiles', 'Assign Classes', 'Delete Records', 'Bulk Import']
    },
    {
        id: 'academics',
        name: 'Academics & LMS',
        icon: BookOpen,
        features: ['Create Course', 'Upload Material', 'Assign Homework', 'Online Exams', 'Library Access']
    },
    {
        id: 'finance',
        name: 'Fees & Accounts',
        icon: Wallet,
        features: ['Collect Fees', 'Generate Receipt', 'Payroll Management', 'Expense Tracking', 'Tax Reports']
    },
    {
        id: 'exams',
        name: 'Exams & Results',
        icon: ClipboardCheck,
        features: ['Schedule Exam', 'Mark Submission', 'Result Processing', 'Grade Analysis', 'Publish Cards']
    },
    {
        id: 'transport',
        name: 'Transport & Fleet',
        icon: Bus,
        features: ['Route Planning', 'Driver Tracking', 'Vehicle Maintenance', 'Stoppage Management']
    }
];

const INITIAL_ROLES = {
    Admin: {
        dashboard: 'full',
        students: 'full',
        academics: 'full',
        finance: 'full',
        exams: 'full',
        transport: 'full',
        featureFlags: ['bulk_import', 'tax_reports', 'delete_records']
    },
    Teacher: {
        dashboard: 'full',
        students: 'read',
        academics: 'full',
        finance: 'none',
        exams: 'full',
        transport: 'none',
        featureFlags: ['mark_submission', 'upload_material']
    },
    Parent: {
        dashboard: 'full',
        students: 'none',
        academics: 'read',
        finance: 'read',
        exams: 'read',
        transport: 'read',
        featureFlags: ['pay_fees', 'view_attendance']
    },
    Student: {
        dashboard: 'full',
        students: 'none',
        academics: 'read',
        finance: 'none',
        exams: 'read',
        transport: 'none',
        featureFlags: ['submit_homework', 'view_grades']
    }
};

const MOCK_USERS = [
    { id: 'USR001', name: 'Priya Desai', role: 'Teacher', avatar: 'https://i.pravatar.cc/150?u=priya', specialization: 'Class Teacher (10-A)' },
    { id: 'USR002', name: 'Amit Shah', role: 'Parent', avatar: 'https://i.pravatar.cc/150?u=amit', specialization: 'Parent of Rahul (8-B)' },
    { id: 'USR003', name: 'Vikram Singh', role: 'Teacher', avatar: 'https://i.pravatar.cc/150?u=vikram', specialization: 'Math HOD' },
    { id: 'USR004', name: 'Neha Gupta', role: 'Admin', avatar: 'https://i.pravatar.cc/150?u=neha', specialization: 'System Admin' },
];

export default function AccessControl() {
    const [activeView, setActiveView] = useState('roles'); // 'roles' or 'users'
    const [selectedRole, setSelectedRole] = useState('Teacher');
    const [selectedUser, setSelectedUser] = useState(null);
    const [rolePermissions, setRolePermissions] = useState(INITIAL_ROLES);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedModule, setExpandedModule] = useState('dashboard');

    // --- Handlers ---

    const handlePermissionChange = (role, moduleId, level) => {
        setRolePermissions(prev => ({
            ...prev,
            [role]: {
                ...prev[role],
                [moduleId]: level
            }
        }));
    };

    const handleFeatureToggle = (role, feature) => {
        setRolePermissions(prev => {
            const currentFlags = prev[role].featureFlags;
            const newFlags = currentFlags.includes(feature)
                ? currentFlags.filter(f => f !== feature)
                : [...currentFlags, feature];
            return {
                ...prev[role],
                [role]: { ...prev[role], featureFlags: newFlags }
            };
        });
    };

    // --- Computed Data ---

    const filteredUsers = useMemo(() => {
        return MOCK_USERS.filter(u =>
            u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.role.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    const currentPermissions = activeView === 'roles'
        ? rolePermissions[selectedRole]
        : (selectedUser ? rolePermissions[selectedUser.role] : null);

    // --- UI Components ---

    const LevelBadge = ({ levelId }) => {
        const level = ACCESS_LEVELS.find(l => l.id === levelId);
        return (
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${level.bg} ${level.color} border ${level.border}`}>
                {level.label}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 font-sans text-gray-900">
            {/* Header */}
            <div className="max-w-[1400px] mx-auto mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-black rounded-2xl shadow-lg">
                            <Shield className="text-white" size={28} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
                                Access Control
                                <span className="text-[10px] bg-[#C29543]/10 text-[#C29543] px-2 py-0.5 rounded-full border border-[#C29543]/20">PRO ENGIN</span>
                            </h1>
                            <p className="text-gray-500 text-sm font-medium">Manage granular permissions and user visibility.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-600 rounded-full border border-green-100">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Cloud Optimized</span>
                        </div>
                        <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all shadow-sm active:scale-95">
                            <Activity size={18} className="text-gray-400" />
                            Logs
                        </button>
                        <button className="flex items-center gap-2 px-6 py-2.5 bg-[#C29543] text-white rounded-xl font-bold text-sm hover:bg-[#A88039] transition-all shadow-md shadow-[#C29543]/20 active:scale-95">
                            <Save size={18} />
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Sidebar / Left Column */}
                <div className="lg:col-span-3 space-y-6">
                    {/* View Toggler */}
                    <div className="bg-white p-1.5 rounded-2xl border border-gray-200 shadow-sm flex">
                        <button
                            onClick={() => setActiveView('roles')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs transition-all ${activeView === 'roles' ? 'bg-[#C29543] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <Settings size={16} />
                            Roles
                        </button>
                        <button
                            onClick={() => setActiveView('users')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs transition-all ${activeView === 'users' ? 'bg-[#C29543] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <Users size={16} />
                            Users
                        </button>
                    </div>

                    {activeView === 'roles' ? (
                        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
                            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select Role</span>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {Object.keys(INITIAL_ROLES).map(role => (
                                    <button
                                        key={role}
                                        onClick={() => setSelectedRole(role)}
                                        className={`w-full flex items-center justify-between p-4 transition-all hover:bg-gray-50 group ${selectedRole === role ? 'bg-gray-50' : ''}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-xl transition-all ${selectedRole === role ? 'bg-[#C29543] text-white' : 'bg-gray-100 text-gray-400 group-hover:text-gray-600'}`}>
                                                {role === 'Admin' ? <Shield size={18} /> : role === 'Teacher' ? <GraduationCap size={18} /> : role === 'Parent' ? <MessageSquare size={18} /> : <User size={18} />}
                                            </div>
                                            <span className={`text-sm font-bold ${selectedRole === role ? 'text-gray-900' : 'text-gray-500'}`}>{role}</span>
                                        </div>
                                        {selectedRole === role && <ChevronRight size={16} className="text-[#C29543]" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
                            <div className="p-4 border-b border-gray-100 bg-gray-50/50 relative">
                                <input
                                    type="text"
                                    placeholder="Search user..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#C29543]/20"
                                />
                                <Search size={14} className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                            <div className="max-h-[500px] overflow-y-auto divide-y divide-gray-50 no-scrollbar">
                                {filteredUsers.map(user => (
                                    <button
                                        key={user.id}
                                        onClick={() => setSelectedUser(user)}
                                        className={`w-full p-4 flex items-center gap-3 transition-all hover:bg-gray-50 ${selectedUser?.id === user.id ? 'bg-gray-50 border-r-4 border-[#C29543]' : ''}`}
                                    >
                                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border border-gray-100" />
                                        <div className="text-left">
                                            <div className="text-sm font-bold text-gray-900 leading-tight">{user.name}</div>
                                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{user.role}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                            <div className="p-4 bg-gray-50/80 border-t border-gray-100">
                                <button className="w-full flex items-center justify-center gap-2 py-2 bg-[#0a0a0a] text-white rounded-xl text-xs font-bold hover:bg-black transition-colors">
                                    <UserPlus size={14} />
                                    Add Custom Override
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Quick Stats / Info */}
                    <div className="bg-[#0a0a0a] rounded-3xl p-6 text-white shadow-xl shadow-black/10">
                        <h4 className="text-xs font-black uppercase text-gray-400 mb-4 tracking-widest">Policy Overview</h4>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-400 font-medium">Active Roles</span>
                                <span className="font-mono text-[#C29543]">04</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-400 font-medium">Custom User Flags</span>
                                <span className="font-mono text-[#C29543]">12</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-400 font-medium">Last Audit</span>
                                <span className="font-mono text-[#C29543]">2h ago</span>
                            </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-white/10">
                            <button className="text-[10px] font-bold text-[#C29543] uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                                Download Policy PDF <ChevronRight size={12} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-9 space-y-8">

                    {/* Active Context Bar */}
                    <div className="bg-white px-6 py-4 rounded-3xl border border-gray-200 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-1.5 h-10 bg-[#C29543] rounded-full" />
                            <div>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Configuring {activeView === 'roles' ? 'Role' : 'Specific User'}</span>
                                <h3 className="text-xl font-black text-gray-900 leading-tight">
                                    {activeView === 'roles' ? selectedRole : (selectedUser ? selectedUser.name : 'Select a user')}
                                </h3>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 transition-colors">
                                <MoreVertical size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Permissions Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {MODULES.map(module => {
                            const Icon = module.icon;
                            const levelId = currentPermissions?.[module.id] || 'none';
                            const isExpanded = expandedModule === module.id;

                            return (
                                <div
                                    key={module.id}
                                    className={`bg-white rounded-3xl border transition-all duration-300 ${isExpanded ? 'border-[#C29543] shadow-lg md:col-span-2 ring-4 ring-[#C29543]/5' : 'border-gray-200 shadow-sm hover:border-gray-300'}`}
                                >
                                    <div className="p-6 cursor-pointer" onClick={() => setExpandedModule(isExpanded ? null : module.id)}>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-4">
                                                <div className={`p-3 rounded-2xl ${isExpanded ? 'bg-[#C29543] text-white' : 'bg-gray-50 text-gray-400'}`}>
                                                    <Icon size={24} />
                                                </div>
                                                <div>
                                                    <h4 className="font-black text-gray-900">{module.name}</h4>
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{module.features.length} sub-features detected</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <LevelBadge levelId={levelId} />
                                                <ChevronDown size={18} className={`text-gray-300 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                                            </div>
                                        </div>

                                        {isExpanded && (
                                            <div className="pt-6 border-t border-gray-100 mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-top-4">
                                                {/* Access Level Selector */}
                                                <div className="space-y-4">
                                                    <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Base Access Level</h5>
                                                    <div className="grid grid-cols-1 gap-2">
                                                        {ACCESS_LEVELS.map(level => (
                                                            <button
                                                                key={level.id}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handlePermissionChange(selectedRole, module.id, level.id);
                                                                }}
                                                                className={`flex items-center gap-3 p-3 rounded-xl border text-sm font-bold transition-all ${levelId === level.id
                                                                        ? `${level.bg} ${level.color} ${level.border} scale-102 shadow-sm`
                                                                        : 'bg-white border-transparent text-gray-400 hover:bg-gray-50 hover:text-gray-600'
                                                                    }`}
                                                            >
                                                                {levelId === level.id ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                                                                {level.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Feature Toggles */}
                                                <div className="lg:col-span-2 space-y-4">
                                                    <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Granular Controls</h5>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                        {module.features.map(feature => {
                                                            const featureSlug = feature.toLowerCase().replace(/ /g, '_');
                                                            const isEnabled = currentPermissions?.featureFlags?.includes(featureSlug);
                                                            return (
                                                                <div
                                                                    key={feature}
                                                                    className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl border border-gray-100 hover:border-gray-200 transition-all cursor-default group"
                                                                >
                                                                    <div className="flex items-center gap-3">
                                                                        <span className="text-xs font-bold text-gray-700">{feature}</span>
                                                                        <Info size={12} className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                                    </div>
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleFeatureToggle(selectedRole, featureSlug);
                                                                        }}
                                                                        className={`transition-colors ${isEnabled ? 'text-[#C29543]' : 'text-gray-300'}`}
                                                                    >
                                                                        {isEnabled ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                                                                    </button>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* User Details / Override Mode specific info */}
                    {activeView === 'users' && selectedUser && (
                        <div className="bg-[#C29543]/5 border-2 border-dashed border-[#C29543]/20 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8">
                            <div className="relative">
                                <img src={selectedUser.avatar} className="w-24 h-24 rounded-3xl object-cover ring-4 ring-white shadow-xl" alt="" />
                                <div className="absolute -bottom-2 -right-2 bg-black p-2 rounded-xl text-white shadow-lg">
                                    <User size={16} />
                                </div>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <div className="flex flex-wrap items-center gap-3 mb-2 justify-center md:justify-start">
                                    <h4 className="text-2xl font-black text-gray-900">{selectedUser.name}</h4>
                                    <span className="px-3 py-1 bg-black text-white text-[10px] font-black uppercase rounded-full tracking-widest">Override active</span>
                                </div>
                                <p className="text-gray-500 font-medium mb-4">{selectedUser.specialization} • Inherits permissions from <span className="text-gray-900 font-bold">{selectedUser.role}</span></p>
                                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                    <div className="bg-white px-3 py-1.5 rounded-lg border border-gray-100 text-[10px] font-bold text-gray-600 flex items-center gap-2">
                                        <Lock size={12} className="text-[#C29543]" />
                                        Individual ID Card Access
                                    </div>
                                    <div className="bg-white px-3 py-1.5 rounded-lg border border-gray-100 text-[10px] font-bold text-gray-600 flex items-center gap-2">
                                        <Eye size={12} className="text-[#C29543]" />
                                        Advanced Report Viewer
                                    </div>
                                </div>
                            </div>
                            <button className="px-8 py-3 bg-[#0a0a0a] text-white font-bold rounded-2xl hover:bg-black transition-all shadow-xl active:scale-95 text-sm">
                                Clear All Overrides
                            </button>
                        </div>
                    )}

                    {/* Dashboard Preview Section (Visual Feedback) */}
                    <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <div>
                                <h4 className="font-black text-gray-900">Live Dashboard Preview</h4>
                                <p className="text-xs text-gray-400 font-medium">Visualizing the interface {activeView === 'roles' ? `baseline for ${selectedRole}` : `as seen by ${selectedUser?.name || '...'}`}</p>
                            </div>
                            <button className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:bg-gray-100 transition-colors">
                                <Eye size={18} />
                            </button>
                        </div>
                        <div className="p-8 bg-gray-50/30">
                            <div className="flex gap-4 mb-8 overflow-x-auto no-scrollbar pb-2">
                                {MODULES.map(m => {
                                    const level = currentPermissions?.[m.id] || 'none';
                                    if (level === 'none') return null;
                                    return (
                                        <div key={m.id} className="flex flex-col items-center gap-2 min-w-[80px] group transition-all">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-sm transition-all group-hover:-translate-y-1 ${level === 'full' ? 'bg-white border-gray-200 text-[#C29543]' : 'bg-gray-100 border-gray-100 text-gray-400'}`}>
                                                <m.icon size={22} />
                                            </div>
                                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-tight text-center whitespace-nowrap">{m.name.split(' ')[0]}</span>
                                        </div>
                                    )
                                })}
                                <div className="flex flex-col items-center gap-2 opacity-20 cursor-not-allowed">
                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center border border-dashed border-gray-300 text-gray-400">
                                        <Plus size={20} />
                                    </div>
                                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-tight">Hidden</span>
                                </div>
                            </div>

                            {/* Mock Content Layout */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-40 select-none grayscale pointer-events-none">
                                <div className="h-32 bg-white rounded-2xl shadow-sm border border-gray-200" />
                                <div className="h-32 bg-white rounded-2xl shadow-sm border border-gray-200" />
                                <div className="h-32 bg-white rounded-2xl shadow-sm border border-gray-200" />
                                <div className="md:col-span-2 h-64 bg-white rounded-2xl shadow-sm border border-gray-200" />
                                <div className="h-64 bg-white rounded-2xl shadow-sm border border-gray-200" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Dynamic Styles */}
            <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .scale-102 { transform: scale(1.02); }
      `}</style>

        </div>
    );
}

// Minimal Plus icon for the preview section
const Plus = ({ size, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
