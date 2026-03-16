import React, { useState } from 'react';
import {
    Briefcase, Users, CalendarDays, Plus, Search,
    MoreVertical, MapPin, Clock, Edit2, Trash2, CheckCircle, XCircle
} from 'lucide-react';

// --- MOCK DATA ---
const mockJobs = [
    { id: 'JOB-001', title: 'Senior Mathematics Teacher', department: 'Teaching Staff', type: 'Full-time', location: 'Main Campus', candidates: 12, status: 'Active', postedAt: '2 days ago' },
    { id: 'JOB-002', title: 'Administrative Officer', department: 'Administration', type: 'Full-time', location: 'Main Campus', candidates: 8, status: 'Active', postedAt: '5 days ago' },
    { id: 'JOB-003', title: 'Lab Assistant (Physics)', department: 'Support Staff', type: 'Part-time', location: 'Science Block', candidates: 4, status: 'Draft', postedAt: '1 week ago' },
    { id: 'JOB-004', title: 'IT Support Administrator', department: 'IT Department', type: 'Full-time', location: 'Main Campus', candidates: 25, status: 'Closed', postedAt: '1 month ago' },
];

const mockApplicants = [
    { id: 'APP-101', name: 'Rohan Sharma', role: 'Senior Mathematics Teacher', status: 'In Review', appliedOn: '12-Oct-2023', score: '85%', avatar: 'https://i.pravatar.cc/150?u=rohan' },
    { id: 'APP-102', name: 'Alia Bhatt', role: 'Administrative Officer', status: 'Interviewing', appliedOn: '10-Oct-2023', score: '92%', avatar: 'https://i.pravatar.cc/150?u=alia' },
    { id: 'APP-103', name: 'Kabir Singh', role: 'Lab Assistant (Physics)', status: 'New', appliedOn: '14-Oct-2023', score: '78%', avatar: 'https://i.pravatar.cc/150?u=kabir' },
    { id: 'APP-104', name: 'Sneha Patel', role: 'Senior Mathematics Teacher', status: 'Offered', appliedOn: '05-Oct-2023', score: '95%', avatar: 'https://i.pravatar.cc/150?u=sneha' },
    { id: 'APP-105', name: 'Vikram Malhotra', role: 'IT Support Administrator', status: 'Rejected', appliedOn: '20-Sep-2023', score: '45%', avatar: 'https://i.pravatar.cc/150?u=vikram' },
];

const mockInterviews = [
    { id: 'INT-501', applicant: 'Alia Bhatt', role: 'Administrative Officer', date: '18-Oct-2023', time: '10:30 AM', type: 'Video Call', interviewer: 'Priya Desai', status: 'Scheduled', avatar: 'https://i.pravatar.cc/150?u=alia' },
    { id: 'INT-502', applicant: 'Sneha Patel', role: 'Senior Mathematics Teacher', date: '20-Oct-2023', time: '02:00 PM', type: 'In-Person', interviewer: 'Principal Mr. Sharma', status: 'Completed', avatar: 'https://i.pravatar.cc/150?u=sneha' },
    { id: 'INT-503', applicant: 'Rohan Sharma', role: 'Senior Mathematics Teacher', date: '21-Oct-2023', time: '11:00 AM', type: 'Video Call', interviewer: 'HOD Mathematics', status: 'Pending', avatar: 'https://i.pravatar.cc/150?u=rohan' },
];

const Recruitment = () => {
    const [activeTab, setActiveTab] = useState('jobs'); // 'jobs', 'applicants', 'interviews'
    const [jobs, setJobs] = useState(mockJobs);
    const [applicants, setApplicants] = useState(mockApplicants);
    const [interviews, setInterviews] = useState(mockInterviews);

    const handleGenericAction = (action) => {
        alert(`${action} action triggered.`);
    };

    // --- RENDER METHODS ---

    const renderJobPostings = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="relative w-72">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search jobs..." className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:bg-white transition-all text-gray-700" />
                </div>
                <button onClick={() => handleGenericAction('Create New Job')} className="flex items-center gap-2 px-4 py-2 bg-[#C29543] text-white rounded-lg text-sm font-bold shadow-sm shadow-[#C29543]/20 hover:bg-[#A67D35] transition-colors">
                    <Plus size={16} /> Post New Job
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {jobs.map((job) => (
                    <div key={job.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow group flex flex-col h-full">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md ${job.status === 'Active' ? 'bg-green-50 text-green-600' :
                                    job.status === 'Draft' ? 'bg-orange-50 text-orange-600' : 'bg-gray-100 text-gray-500'
                                }`}>
                                {job.status}
                            </div>
                            <button onClick={() => handleGenericAction('Job Options Menu')} className="text-gray-400 hover:text-gray-700 p-1">
                                <MoreVertical size={16} />
                            </button>
                        </div>

                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1 group-hover:text-[#C29543] transition-colors cursor-pointer">{job.title}</h3>
                            <p className="text-sm font-medium text-gray-500">{job.department}</p>

                            <div className="flex flex-wrap gap-y-2 gap-x-4 mt-4 text-xs font-bold text-gray-600">
                                <div className="flex items-center gap-1.5"><Briefcase size={14} className="text-[#C29543]" /> {job.type}</div>
                                <div className="flex items-center gap-1.5"><MapPin size={14} className="text-[#C29543]" /> {job.location}</div>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-2xl font-black text-gray-900">{job.candidates}</span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Candidates</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] font-medium text-gray-400 mb-1">Posted {job.postedAt}</span>
                                <button onClick={() => handleGenericAction(`View Candidates for ${job.title}`)} className="text-sm font-bold text-[#C29543] hover:text-[#A67D35] transition-colors">
                                    View Details →
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderApplicantTracking = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="relative w-72">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="Search by name or role..." className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:bg-white transition-all text-gray-700" />
                    </div>
                    <select className="px-4 py-2 bg-gray-50 border border-transparent rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:bg-white transition-all text-gray-700">
                        <option>All Roles</option>
                        <option>Senior Mathematics Teacher</option>
                        <option>Administrative Officer</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden text-left">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px]">
                        <thead>
                            <tr className="bg-gray-50/80 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Applicant Info</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Applied Role</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Fit Score</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {applicants.map(app => (
                                <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={app.avatar} alt={app.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{app.name}</p>
                                                <p className="text-[11px] font-medium text-gray-400">Applied: {app.appliedOn}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold text-gray-700">{app.role}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="relative inline-block w-40">
                                            <select
                                                value={app.status}
                                                onChange={(e) => {
                                                    const newStatus = e.target.value;
                                                    setApplicants(applicants.map(a => a.id === app.id ? { ...a, status: newStatus } : a));
                                                }}
                                                className={`appearance-none w-full px-3 py-1.5 pr-8 rounded-md text-xs font-bold cursor-pointer outline-none border ${app.status === 'New' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                        app.status === 'In Review' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                                            app.status === 'Interviewing' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                                                app.status === 'Offered' ? 'bg-green-50 text-green-600 border-green-100' :
                                                                    'bg-red-50 text-red-600 border-red-100'
                                                    }`}
                                            >
                                                <option value="New">New</option>
                                                <option value="In Review">In Review</option>
                                                <option value="Interviewing">Interviewing</option>
                                                <option value="Offered">Offered</option>
                                                <option value="Rejected">Rejected</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-[#C29543] rounded-full" style={{ width: app.score }}></div>
                                            </div>
                                            <span className="text-xs font-bold text-gray-700">{app.score}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => handleGenericAction('Schedule Interview')} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Schedule Interview">
                                                <CalendarDays size={16} />
                                            </button>
                                            <button onClick={() => handleGenericAction('View Profile')} className="px-3 py-1.5 border border-gray-200 text-gray-600 font-bold text-xs rounded-lg hover:bg-gray-50 transition-colors shadow-sm bg-white">
                                                Profile
                                            </button>
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

    const renderInterviewManagement = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-gray-900 border-b-2 border-[#C29543] pb-1">Upcoming Interviews ({interviews.filter(i => i.status !== 'Completed').length})</span>
                    <span className="text-sm font-medium text-gray-400 cursor-pointer hover:text-gray-900 transition-colors">Completed</span>
                </div>
                <button onClick={() => handleGenericAction('Schedule New Interview')} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-bold shadow-sm hover:bg-gray-50 transition-colors">
                    <CalendarDays size={16} /> Schedule Interview
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {interviews.map(interview => (
                    <div key={interview.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow relative overflow-hidden group">

                        {/* Status Strip */}
                        <div className={`absolute top-0 left-0 w-1 h-full ${interview.status === 'Completed' ? 'bg-green-500' :
                                interview.status === 'Scheduled' ? 'bg-blue-500' : 'bg-[#C29543]'
                            }`}></div>

                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <img src={interview.avatar} alt={interview.applicant} className="w-12 h-12 rounded-full object-cover border border-gray-200" />
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900">{interview.applicant}</h3>
                                    <p className="text-xs font-medium text-[#C29543] truncate max-w-[150px]">{interview.role}</p>
                                </div>
                            </div>
                            <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border ${interview.status === 'Completed' ? 'border-green-200 text-green-600 bg-green-50' :
                                    interview.status === 'Scheduled' ? 'border-blue-200 text-blue-600 bg-blue-50' : 'border-orange-200 text-orange-600 bg-orange-50'
                                }`}>
                                {interview.status}
                            </span>
                        </div>

                        <div className="space-y-3 mt-5 bg-gray-50/50 p-4 rounded-lg border border-gray-100">
                            <div className="flex items-center gap-3 text-xs font-bold text-gray-600">
                                <CalendarDays size={14} className="text-gray-400" />
                                <span>{interview.date} at {interview.time}</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs font-bold text-gray-600">
                                <MapPin size={14} className="text-gray-400" />
                                <span>{interview.type}</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs font-bold text-gray-600 border-t border-gray-200 pt-3 mt-1">
                                <Users size={14} className="text-gray-400" />
                                <span><span className="font-medium text-gray-500">Interviewer:</span> {interview.interviewer}</span>
                            </div>
                        </div>

                        <div className="mt-5 flex gap-2">
                            {interview.status !== 'Completed' && (
                                <>
                                    <button onClick={() => handleGenericAction('Reschedule Interview')} className="flex-1 py-2 bg-white border border-gray-200 text-gray-700 font-bold text-xs rounded shadow-sm hover:bg-gray-50 transition-colors">Reschedule</button>
                                    <button onClick={() => handleGenericAction('Mark as Completed')} className="flex-1 py-2 bg-[#C29543] text-white font-bold text-xs rounded shadow-sm hover:bg-[#A67D35] transition-colors">Complete</button>
                                </>
                            )}
                            {interview.status === 'Completed' && (
                                <button onClick={() => handleGenericAction('View Feedback')} className="w-full py-2 bg-white border border-gray-200 text-gray-700 font-bold text-xs rounded shadow-sm hover:bg-gray-50 transition-colors">View Feedback</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="p-4 sm:p-6 max-w-[1600px] mx-auto w-full min-h-screen bg-gray-50 font-sans">

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Recruitment Pipeline</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage jobs, track applicants, and schedule interviews.</p>
                </div>
            </div>

            {/* Top Navigation Tabs */}
            <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-100 flex flex-nowrap overflow-x-auto gap-1 mb-8">
                <button
                    onClick={() => setActiveTab('jobs')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'jobs'
                            ? 'bg-[#C29543]/10 text-[#C29543]'
                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                >
                    <Briefcase size={18} /> Job Postings
                </button>
                <button
                    onClick={() => setActiveTab('applicants')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'applicants'
                            ? 'bg-[#C29543]/10 text-[#C29543]'
                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                >
                    <Users size={18} /> Applicant Tracking
                </button>
                <button
                    onClick={() => setActiveTab('interviews')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'interviews'
                            ? 'bg-[#C29543]/10 text-[#C29543]'
                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                >
                    <CalendarDays size={18} /> Interview Management
                </button>
            </div>

            {/* Main Content Area */}
            <div className="min-h-[500px]">
                {activeTab === 'jobs' && renderJobPostings()}
                {activeTab === 'applicants' && renderApplicantTracking()}
                {activeTab === 'interviews' && renderInterviewManagement()}
            </div>

        </div>
    );
};

export default Recruitment;
