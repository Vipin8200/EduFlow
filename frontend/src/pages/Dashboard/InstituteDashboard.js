import React from "react";
import {
  Users,
  Briefcase,
  CalendarCheck,
  Wallet,
  IndianRupee,
  FileText,
  Bus,
  Building,
  UserPlus,
  Contact,
  Megaphone,
  FileSignature,
  BookOpen,
  CalendarPlus,
  MoreHorizontal
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  AreaChart,
  Area,
  Legend
} from "recharts";

// --- Dummy Data ---
const monthlyFeeData = [
  { name: "Apr", amount: 2 },
  { name: "May", amount: 4 },
  { name: "Jun", amount: 3.5 },
  { name: "Jul", amount: 7 },
  { name: "Aug", amount: 5 },
  { name: "Sep", amount: 9 },
];

const admissionGrowthData = [
  { name: "Q1", value: 30 },
  { name: "Q2", value: 50 },
  { name: "Q3", value: 70 },
  { name: "Q4", value: 100 },
];

const attendanceTrendData = [
  { name: "Mon", rate: 92 },
  { name: "Tue", rate: 89 },
  { name: "Wed", rate: 95 },
  { name: "Thu", rate: 93 },
  { name: "Fri", rate: 96 },
  { name: "Sat", rate: 85 },
  { name: "Sun", rate: 88 },
];

// Stacked bar values
const expenseIncomeData = [
  { name: "Apr", income: 80, expense: 40 },
  { name: "May", income: 75, expense: 50 },
  { name: "Jun", income: 90, expense: 35 },
];

export default function InstituteDashboard() {
  const statCards = [
    { title: "Total Students", value: "2,451", icon: Users },
    { title: "Total Staff", value: "186", icon: Briefcase },
    { title: "Today Attendance %", value: "94.2%", icon: CalendarCheck },
    { title: "Pending Fees Amount", value: "₹ 12,45,000", icon: Wallet },
    { title: "Today Collection", value: "₹ 2,15,400", icon: IndianRupee },
    { title: "Upcoming Exams", value: "06", icon: FileText },
    { title: "Active Transport Routes", value: "14", icon: Bus },
    { title: "Hostel Occupancy %", value: "82%", icon: Building },
  ];

  const quickActions = [
    { label: "Add Student", icon: UserPlus },
    { label: "Add Employee", icon: Contact },
    { label: "Collect Fees", icon: Wallet },
    { label: "Create Notice", icon: Megaphone },
    { label: "Create Exam", icon: FileSignature },
    { label: "Add Homework", icon: BookOpen },
    { label: "Create Event", icon: CalendarPlus },
    { label: "More Actions", icon: MoreHorizontal },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-100 p-2 rounded shadow-md text-sm">
          <p className="font-semibold">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 md:p-8 space-y-6 pb-8 max-w-[1600px] mx-auto">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }
      `}</style>

      {/* --- Top 8 Cards --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="bg-white border border-gray-100 rounded-[16px] p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex items-start justify-between">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-400">{card.title}</p>
                <h3 className="text-[26px] font-bold text-gray-800 tracking-tight">{card.value}</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                <Icon size={20} className="text-[#34a853]" />
              </div>
            </div>
          );
        })}
      </div>

      {/* --- First Charts Row --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Monthly Fee Collection */}
        <div className="bg-white border border-gray-100 rounded-[16px] p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] h-[320px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800 text-[16px]">Monthly Fee Collection</h3>
            <span className="text-sm text-gray-400">This financial year</span>
          </div>
          <div className="flex-1 w-full bg-[#fafafa] rounded-2xl border border-gray-50 pt-4 pr-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyFeeData}>
                <defs>
                  <linearGradient id="goldArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C29543" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#C29543" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 13 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val}L`} tick={{ fill: '#9ca3af', fontSize: 13 }} dx={-10} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="amount" name="Collection" stroke="#C29543" strokeWidth={3} fill="url(#goldArea)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Student Admission Growth */}
        <div className="bg-white border border-gray-100 rounded-[16px] p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] h-[320px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800 text-[16px]">Student Admission Growth</h3>
            <span className="text-sm text-gray-400">Last 12 months</span>
          </div>
          <div className="flex-1 w-full relative bg-[#fafafa] rounded-2xl border border-gray-50 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={admissionGrowthData} margin={{ top: 10, right: 30, left: 30, bottom: 0 }}>
                <defs>
                  <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#eec170" stopOpacity={1} />
                    <stop offset="100%" stopColor="#C29543" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={{ stroke: '#C29543', strokeWidth: 2 }} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 13 }} dy={10} />
                <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
                <Bar dataKey="value" name="Growth" fill="url(#goldGradient)" radius={[40, 40, 40, 40]} barSize={90} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* --- Second Charts Row --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Attendance Trend */}
        <div className="bg-white border border-gray-100 rounded-[16px] p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] h-[320px] flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 text-[16px]">Attendance Trend (Last 7 days)</h3>
            <span className="text-sm text-gray-400">Daily presence</span>
          </div>
          <div className="flex-1 w-full bg-[#fafafa] rounded-2xl border border-gray-50 pt-4 pr-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceTrendData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 13 }} dy={10} />
                <YAxis hide domain={[0, 100]} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} content={<CustomTooltip />} />
                <ReferenceLine y={80} stroke="#ef4444" strokeWidth={1} label={{ position: 'right', value: 'Low line 80%', fill: 'white', fontSize: 10, backgroundColor: '#ef4444', padding: 4 }} />
                {/* Simulated text for top values like "100%", "90%" since YAxis is hidden */}
                <text x="2%" y="15" fill="#9ca3af" fontSize="12" fontWeight="500">100%</text>
                <text x="48%" y="15" fill="#9ca3af" fontSize="12" fontWeight="500">90%</text>
                <text x="96%" y="15" fill="#9ca3af" fontSize="12" fontWeight="500">80%</text>

                <Bar dataKey="rate" name="Attendance" fill="#d4aa54" radius={[4, 4, 0, 0]} barSize={45} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense vs Income */}
        <div className="bg-white border border-gray-100 rounded-[16px] p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] h-[320px] flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 text-[16px]">Expense vs Income</h3>
            <span className="text-sm text-gray-400">Current quarter</span>
          </div>
          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center gap-1.5 object-cover">
              <div className="w-2.5 h-2.5 rounded-full bg-[#d4aa54]"></div>
              <span className="text-sm text-gray-500 font-medium">Income</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff4d4f]"></div>
              <span className="text-sm text-gray-500 font-medium">Expense</span>
            </div>
          </div>
          <div className="flex-1 w-full bg-[#fafafa] rounded-2xl border border-gray-50 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={expenseIncomeData} margin={{ top: 0, right: 20, bottom: 0, left: -20 }} barGap={0} barCategoryGap={20}>
                <defs>
                  <linearGradient id="goldHorizontal" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#eec170" stopOpacity={1} />
                    <stop offset="100%" stopColor="#d4aa54" stopOpacity={1} />
                  </linearGradient>
                  <linearGradient id="redHorizontal" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#ff7875" stopOpacity={1} />
                    <stop offset="100%" stopColor="#ff4d4f" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 13, fontWeight: 500 }} />
                <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
                <Bar dataKey="income" name="Income" stackId="a" fill="url(#goldHorizontal)" radius={[10, 0, 0, 10]} barSize={12} />
                <Bar dataKey="expense" name="Expense" stackId="a" fill="url(#redHorizontal)" radius={[0, 10, 10, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* --- Quick Action Panel --- */}
      <div className="bg-white border border-gray-100 rounded-[16px] p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <span className="w-[26px] h-[26px] rounded-lg bg-[#6b8eaa] text-white flex items-center justify-center text-[13px] font-bold shadow-sm">3</span>
            <h3 className="font-bold text-gray-800 text-[18px]">Quick Action Panel</h3>
          </div>
          <span className="text-sm text-gray-400">Tap an action to jump directly to the module</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <div key={idx} className="bg-[#f4f5f8] hover:bg-[#e9ecef] transition-colors cursor-pointer rounded-xl p-4 flex items-center gap-3 border border-transparent hover:border-gray-200">
                <Icon size={18} className="text-gray-700 shrink-0" />
                <span className="text-[14px] font-bold text-gray-800 truncate">{action.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- Bottom Panels --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Notifications Panel */}
        <div className="bg-white border border-gray-100 rounded-[16px] p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] h-[350px] flex flex-col">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-3">
              <span className="w-[26px] h-[26px] rounded-lg bg-[#6b8eaa] text-white flex items-center justify-center text-[13px] font-bold shadow-sm">4</span>
              <h3 className="font-bold text-gray-800 text-[18px]">Notifications Panel</h3>
            </div>
            <span className="text-[#C29543] font-bold text-sm cursor-pointer hover:underline">View all</span>
          </div>
          <p className="text-sm text-gray-400 mb-5">HR and academic alerts that need your attention.</p>

          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3">
            <div className="bg-[#f8f9fa] border border-gray-100 p-4 rounded-xl flex items-start gap-4">
              <span className="text-[11px] font-bold text-gray-700 bg-gray-200 px-2 py-1 rounded shrink-0 w-[80px] text-center">Leave</span>
              <div>
                <h4 className="font-bold text-gray-800 text-[14px]">Pending Leave Requests</h4>
                <p className="text-[13px] text-gray-500 mt-1 leading-snug">5 new requests from teaching staff waiting for approval.</p>
              </div>
            </div>

            <div className="bg-[#f8f9fa] border border-gray-100 p-4 rounded-xl flex items-start gap-4">
              <span className="text-[11px] font-bold text-gray-700 bg-gray-200 px-2 py-1 rounded shrink-0 w-[80px] text-center">Attendance</span>
              <div>
                <h4 className="font-bold text-gray-800 text-[14px]">Low Attendance Alerts</h4>
                <p className="text-[13px] text-gray-500 mt-1 leading-snug">12 students flagged below 75% in the last 30 days.</p>
              </div>
            </div>

            <div className="bg-[#f8f9fa] border border-gray-100 p-4 rounded-xl flex items-start gap-4 opacity-50">
              <span className="text-[11px] font-bold text-gray-700 bg-gray-200 px-2 py-1 rounded shrink-0 w-[80px] text-center">Library</span>
              <div>
                <h4 className="font-bold text-gray-800 text-[14px]">Overdue Books</h4>
                <p className="text-[13px] text-gray-500 mt-1 leading-snug">45 books are currently overdue for more than 2 weeks.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities Log */}
        <div className="bg-white border border-gray-100 rounded-[16px] p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] h-[350px] flex flex-col">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-3">
              <span className="w-[26px] h-[26px] rounded-lg bg-[#6b8eaa] text-white flex items-center justify-center text-[13px] font-bold shadow-sm">5</span>
              <h3 className="font-bold text-gray-800 text-[18px]">Recent Activities Log</h3>
            </div>
            <span className="text-[#C29543] font-bold text-sm cursor-pointer hover:underline">View timeline</span>
          </div>
          <p className="text-sm text-gray-400 mb-5">Latest updates performed inside the ERP.</p>

          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar relative pl-3">
            {/* Timeline vertical line */}
            <div className="absolute left-[31px] top-6 bottom-4 w-[2px] bg-gray-100 z-0"></div>

            <div className="relative z-10 space-y-4">
              {/* Activity 1 */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-white border-[3px] border-white ring-1 ring-gray-200 flex items-center justify-center shrink-0 z-10 mt-1">
                  <UserPlus size={16} className="text-gray-600" />
                </div>
                <div className="flex-1 border border-gray-100 rounded-xl p-3 bg-white">
                  <p className="text-[14px] font-bold text-gray-800">Student Arjun Patel added to Class 8-B.</p>
                  <p className="text-[12px] text-gray-400 mt-1">10 minutes ago</p>
                </div>
              </div>

              {/* Activity 2 */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-white border-[3px] border-white ring-1 ring-gray-200 flex items-center justify-center shrink-0 z-10 mt-1">
                  <Wallet size={16} className="text-gray-600" />
                </div>
                <div className="flex-1 border border-gray-100 rounded-xl p-3 bg-white">
                  <p className="text-[14px] font-bold text-gray-800">Fee collected from 24 students in Grade 6.</p>
                  <p className="text-[12px] text-gray-400 mt-1">35 minutes ago</p>
                </div>
              </div>

              {/* Activity 3 */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-white border-[3px] border-white ring-1 ring-gray-200 flex items-center justify-center shrink-0 z-10 mt-1">
                  <FileSignature size={16} className="text-gray-600" />
                </div>
                <div className="flex-1 border border-gray-100 rounded-xl p-3 bg-white">
                  <p className="text-[14px] font-bold text-gray-800">Exam Created: Mid-Term Science for Class 9.</p>
                  <p className="text-[12px] text-gray-400 mt-1">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}