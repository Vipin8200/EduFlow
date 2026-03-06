import React, { useState } from "react";
import {
    RefreshCcw,
    User,
    ChevronDown,
    LayoutDashboard,
    Users,
    BookOpen,
    Wallet,
    ClipboardCheck,
    Bus,
    CheckCircle2,
    XCircle
} from "lucide-react";

const roleData = {
    Teacher: {
        accessModules: [
            { name: "Dashboard", icon: LayoutDashboard, status: "Full Access", statusColor: "bg-green-100 text-green-700" },
            { name: "Student Management", icon: Users, status: "Read Only", statusColor: "bg-orange-100 text-orange-700" },
            { name: "Homework & LMS", icon: BookOpen, status: "Full Access", statusColor: "bg-green-100 text-green-700" },
            { name: "Fees & Accounts", icon: Wallet, status: "No Access", statusColor: "bg-gray-100 text-gray-500" },
            { name: "Exams & Results", icon: ClipboardCheck, status: "Full Access", statusColor: "bg-green-100 text-green-700" },
            { name: "Transport", icon: Bus, status: "No Access", statusColor: "bg-gray-100 text-gray-500" },
        ],
        permissions: [
            { key: "can_create_exams", desc: "Allows creating and scheduling new exams", value: true },
            { key: "can_delete_students", desc: "Allows removing students from the system", value: false },
            { key: "can_view_payroll", desc: "Allows viewing salary and payroll information", value: false },
            { key: "can_take_attendance", desc: "Allows marking daily student attendance", value: true },
        ],
        activities: [
            { user: "Priya Desai", avatar: "https://i.pravatar.cc/150?u=priya", action: "Marked attendance for Class 10-A", time: "Today, 08:30 AM", ip: "192.168.1.104" },
            { user: "Vikram Singh", avatar: "https://i.pravatar.cc/150?u=vikram", action: "Uploaded Mid-Term Exam Results", time: "Yesterday, 04:15 PM", ip: "192.168.1.112" },
            { user: "Neha Sharma", avatar: "https://i.pravatar.cc/150?u=neha", action: "Created new Homework assignment", time: "Yesterday, 02:00 PM", ip: "192.168.1.109" },
        ]
    },
    Student: {
        accessModules: [
            { name: "Dashboard", icon: LayoutDashboard, status: "Full Access", statusColor: "bg-green-100 text-green-700" },
            { name: "Student Management", icon: Users, status: "No Access", statusColor: "bg-gray-100 text-gray-500" },
            { name: "Homework & LMS", icon: BookOpen, status: "Read Only", statusColor: "bg-orange-100 text-orange-700" },
            { name: "Fees & Accounts", icon: Wallet, status: "No Access", statusColor: "bg-gray-100 text-gray-500" },
            { name: "Exams & Results", icon: ClipboardCheck, status: "Read Only", statusColor: "bg-orange-100 text-orange-700" },
            { name: "Transport", icon: Bus, status: "Read Only", statusColor: "bg-orange-100 text-orange-700" },
        ],
        permissions: [
            { key: "can_submit_homework", desc: "Allows submitting completed assignments", value: true },
            { key: "can_view_grades", desc: "Allows viewing own exam results and grades", value: true },
            { key: "can_pay_fees", desc: "Allows online fee payment", value: false },
            { key: "can_message_teachers", desc: "Allows sending messages to assigned teachers", value: true },
        ],
        activities: [
            { user: "Rahul Kumar", avatar: "https://i.pravatar.cc/150?u=rahul", action: "Submitted Math Homework", time: "Today, 10:15 AM", ip: "192.168.1.120" },
            { user: "Anita Patel", avatar: "https://i.pravatar.cc/150?u=anita", action: "Viewed Science Results", time: "Yesterday, 06:45 PM", ip: "192.168.1.135" },
        ]
    },
    Parent: {
        accessModules: [
            { name: "Dashboard", icon: LayoutDashboard, status: "Full Access", statusColor: "bg-green-100 text-green-700" },
            { name: "Student Management", icon: Users, status: "No Access", statusColor: "bg-gray-100 text-gray-500" },
            { name: "Homework & LMS", icon: BookOpen, status: "Read Only", statusColor: "bg-orange-100 text-orange-700" },
            { name: "Fees & Accounts", icon: Wallet, status: "Full Access", statusColor: "bg-green-100 text-green-700" },
            { name: "Exams & Results", icon: ClipboardCheck, status: "Read Only", statusColor: "bg-orange-100 text-orange-700" },
            { name: "Transport", icon: Bus, status: "Read Only", statusColor: "bg-orange-100 text-orange-700" },
        ],
        permissions: [
            { key: "can_view_attendance", desc: "Allows viewing child's attendance records", value: true },
            { key: "can_pay_fees", desc: "Allows online fee payment", value: true },
            { key: "can_message_teachers", desc: "Allows sending messages to teachers", value: true },
            { key: "can_apply_leave", desc: "Allows applying for child's leave", value: true },
        ],
        activities: [
            { user: "Amit Shah", avatar: "https://i.pravatar.cc/150?u=amit", action: "Paid Term 2 Fees", time: "Today, 11:30 AM", ip: "192.168.1.200" },
            { user: "Sunita Verma", avatar: "https://i.pravatar.cc/150?u=sunita", action: "Applied Medical Leave", time: "Yesterday, 09:00 AM", ip: "192.168.1.205" },
        ]
    },
    Admin: {
        accessModules: [
            { name: "Dashboard", icon: LayoutDashboard, status: "Full Access", statusColor: "bg-green-100 text-green-700" },
            { name: "Student Management", icon: Users, status: "Full Access", statusColor: "bg-green-100 text-green-700" },
            { name: "Homework & LMS", icon: BookOpen, status: "Full Access", statusColor: "bg-green-100 text-green-700" },
            { name: "Fees & Accounts", icon: Wallet, status: "Full Access", statusColor: "bg-green-100 text-green-700" },
            { name: "Exams & Results", icon: ClipboardCheck, status: "Full Access", statusColor: "bg-green-100 text-green-700" },
            { name: "Transport", icon: Bus, status: "Full Access", statusColor: "bg-green-100 text-green-700" },
        ],
        permissions: [
            { key: "can_manage_users", desc: "Allows adding, editing, or deleting users", value: true },
            { key: "can_modify_roles", desc: "Allows changing user roles and permissions", value: true },
            { key: "can_view_system_logs", desc: "Allows viewing system audit logs", value: true },
            { key: "can_configure_settings", desc: "Allows changing global system settings", value: true },
        ],
        activities: [
            { user: "Super Admin", avatar: "https://i.pravatar.cc/150?u=admin1", action: "Changed Academic Year Settings", time: "Today, 10:00 AM", ip: "10.0.0.1" },
            { user: "System Admin", avatar: "https://i.pravatar.cc/150?u=admin2", action: "Created backup of database", time: "Yesterday, 11:55 PM", ip: "10.0.0.5" },
        ]
    },
    Accountant: {
        accessModules: [
            { name: "Dashboard", icon: LayoutDashboard, status: "Read Only", statusColor: "bg-orange-100 text-orange-700" },
            { name: "Student Management", icon: Users, status: "No Access", statusColor: "bg-gray-100 text-gray-500" },
            { name: "Homework & LMS", icon: BookOpen, status: "No Access", statusColor: "bg-gray-100 text-gray-500" },
            { name: "Fees & Accounts", icon: Wallet, status: "Full Access", statusColor: "bg-green-100 text-green-700" },
            { name: "Exams & Results", icon: ClipboardCheck, status: "No Access", statusColor: "bg-gray-100 text-gray-500" },
            { name: "Transport", icon: Bus, status: "No Access", statusColor: "bg-gray-100 text-gray-500" },
        ],
        permissions: [
            { key: "can_collect_fees", desc: "Allows processing incoming fee payments", value: true },
            { key: "can_generate_invoices", desc: "Allows generating and printing fee receipts", value: true },
            { key: "can_view_payroll", desc: "Allows viewing staff salary details", value: true },
            { key: "can_modify_marks", desc: "Allows modifying student exam marks", value: false },
        ],
        activities: [
            { user: "Ritu Desai", avatar: "https://i.pravatar.cc/150?u=ritu", action: "Generated Fee Defaulters Report", time: "Today, 12:45 PM", ip: "192.168.1.150" },
            { user: "Ritu Desai", avatar: "https://i.pravatar.cc/150?u=ritu", action: "Processed Staff Salaries", time: "Yesterday, 05:30 PM", ip: "192.168.1.150" },
        ]
    }
};

export default function InstituteRoleSwitch() {
    const [selectedRole, setSelectedRole] = useState("Teacher");

    const { accessModules, permissions, activities } = roleData[selectedRole] || roleData["Teacher"];

    return (
        <div className="max-w-[1200px] mx-auto p-4 md:p-8 space-y-12">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-gray-200">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Switch User</h1>
                    <p className="text-gray-500 mt-2 text-sm md:text-base">Preview portal access from different user perspectives and monitor role activity.</p>
                </div>
                <div className="mt-2 md:mt-0 w-full md:w-auto shrink-0">
                    <button className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#0a0a0a] text-white font-semibold hover:bg-black transition-colors">
                        <RefreshCcw size={18} />
                        Switch to Selected Role
                    </button>
                </div>
            </div>

            {/* --- Section 1: Role Selector --- */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                <div className="lg:w-1/3">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Role Selector</h2>
                    <p className="text-gray-500 text-sm">Choose a role to view its active permissions and interface layout.</p>
                </div>
                <div className="lg:w-2/3 bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
                    <div className="relative mb-4 inline-block w-full md:w-auto">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <User size={18} className="text-gray-500" />
                        </div>
                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="w-full md:w-[320px] pl-11 pr-10 py-3 appearance-none rounded-lg border border-gray-200 bg-white font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50"
                        >
                            <option value="Teacher">Teacher</option>
                            <option value="Student">Student</option>
                            <option value="Parent">Parent</option>
                            <option value="Admin">Admin</option>
                            <option value="Accountant">Accountant</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                            <ChevronDown size={18} className="text-gray-400" />
                        </div>
                    </div>
                    <p className="text-sm text-gray-400 font-medium">Currently previewing as {selectedRole}. Real-time access privileges shown below.</p>
                </div>
            </div>

            <div className="w-full h-px bg-gray-200"></div>

            {/* --- Section 2: Role Access Preview --- */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                <div className="lg:w-1/3">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedRole} Access Preview</h2>
                    <p className="text-gray-500 text-sm">Overview of accessible modules and features for the selected role.</p>
                </div>
                <div className="lg:w-2/3 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {accessModules.map((module, idx) => {
                            const Icon = module.icon;
                            return (
                                <div key={idx} className="border border-gray-100 rounded-xl p-5 hover:border-gray-200 transition-colors bg-white shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] flex flex-col items-start gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                                            <Icon size={18} className="text-gray-600" />
                                        </div>
                                        <h3 className="font-bold text-gray-800 text-[15px]">{module.name}</h3>
                                    </div>
                                    <span className={`px-2.5 py-1 text-xs font-bold rounded ${module.statusColor}`}>
                                        {module.status}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="w-full h-px bg-gray-200"></div>

            {/* --- Section 3: Permission Debug Mode --- */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                <div className="lg:w-1/3">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Permission Debug Mode</h2>
                    <p className="text-gray-500 text-sm">Detailed view of true/false boolean flags controlling interface rendering.</p>
                </div>
                <div className="lg:w-2/3 bg-white border border-gray-200 rounded-2xl p-4 md:p-6 shadow-sm overflow-x-auto">
                    <table className="w-full min-w-[500px] text-left">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="pb-3 text-xs font-bold text-gray-400 uppercase tracking-wider w-1/3">Permission Key</th>
                                <th className="pb-3 text-xs font-bold text-gray-400 uppercase tracking-wider w-1/2">Description</th>
                                <th className="pb-3 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Value</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {permissions.map((perm, idx) => (
                                <tr key={idx} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4">
                                        <code className="text-[13px] font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded">
                                            {perm.key}
                                        </code>
                                    </td>
                                    <td className="py-4 text-[14px] text-gray-600 font-medium pr-4">
                                        {perm.desc}
                                    </td>
                                    <td className="py-4 text-right pr-2">
                                        {perm.value ? (
                                            <CheckCircle2 size={18} className="text-green-500 inline-block opacity-60" />
                                        ) : (
                                            <XCircle size={18} className="text-red-500 inline-block opacity-80" />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="w-full h-px bg-gray-200"></div>

            {/* --- Section 4: Activity Monitoring --- */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                <div className="lg:w-1/3">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Activity Monitoring</h2>
                    <p className="text-gray-500 text-sm">Recent system actions performed by users with the selected role.</p>
                </div>
                <div className="lg:w-2/3 bg-white border border-gray-200 rounded-2xl p-4 md:p-6 shadow-sm overflow-x-auto">
                    <table className="w-full min-w-[700px] text-left">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="pb-3 text-xs font-bold text-gray-400 uppercase tracking-wider w-1/4">User</th>
                                <th className="pb-3 text-xs font-bold text-gray-400 uppercase tracking-wider w-2/5">Action Performed</th>
                                <th className="pb-3 text-xs font-bold text-gray-400 uppercase tracking-wider w-1/4">Timestamp</th>
                                <th className="pb-3 text-xs font-bold text-gray-400 uppercase tracking-wider flex-1">IP Address</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {activities.map((act, idx) => (
                                <tr key={idx} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={act.avatar} alt={act.user} className="w-8 h-8 rounded-full object-cover border border-gray-200" />
                                            <span className="font-bold text-sm text-gray-800">{act.user}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 text-sm font-semibold text-gray-700 pr-4">
                                        {act.action}
                                    </td>
                                    <td className="py-4 text-sm font-semibold text-gray-600">
                                        {act.time}
                                    </td>
                                    <td className="py-4 text-xs font-medium text-gray-400 font-mono">
                                        {act.ip}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
