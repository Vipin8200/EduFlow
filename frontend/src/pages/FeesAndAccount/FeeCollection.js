import React, { useState } from 'react';
import {
    Search, User, CreditCard, ReceiptIndianRupee,
    Printer, Download, CheckCircle2, AlertTriangle,
    ChevronDown, QrCode, Wallet, Landmark
} from 'lucide-react';

const mockStudentDues = {
    id: 'ADM-2023-452',
    name: 'Aarav Sharma',
    class: 'Grade 10',
    section: 'A',
    totalFee: 45000,
    paid: 22000,
    remaining: 23000,
    installments: [
        { id: 1, name: 'Term-1 Fee', amount: 15000, status: 'Paid', date: '2024-02-15' },
        { id: 2, name: 'Term-2 Fee', amount: 15000, status: 'Overdue', date: '2024-03-01' },
        { id: 3, name: 'Term-3 Fee', amount: 15000, status: 'Pending', date: '2024-06-01' },
    ]
};

const FeeCollection = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showReceipt, setShowReceipt] = useState(false);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            setSelectedStudent(mockStudentDues);
        }
    };

    const handlePayment = () => {
        setShowReceipt(true);
    };

    return (
        <div className="p-4 sm:p-6 max-w-[1600px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">Fee Collection Terminal</h1>
                    <p className="text-sm text-gray-500 font-medium">Search student records and process manual payments.</p>
                </div>
                {selectedStudent && (
                    <button onClick={() => setSelectedStudent(null)} className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-black text-gray-400 hover:text-red-500 hover:border-red-100 transition-all shadow-sm">
                        Clear Search
                    </button>
                )}
            </div>

            {!selectedStudent ? (
                <div className="max-w-xl mx-auto py-32 animate-in fade-in zoom-in-95 duration-500">
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100 text-center space-y-8">
                        <div className="w-20 h-20 bg-[#C29543]/10 rounded-full flex items-center justify-center mx-auto text-[#C29543]">
                            <Search size={40} />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-black text-gray-900">Process Fee Collection</h2>
                            <p className="text-gray-400 font-medium text-sm">Enter the Admission ID or Student Name to access current dues and payment history.</p>
                        </div>
                        <div className="flex bg-gray-50 p-1.5 border border-gray-100 rounded-2xl">
                            <input
                                type="text"
                                placeholder="Start typing Student Name or ID..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="flex-1 bg-transparent px-4 py-3 text-sm font-bold text-gray-700 focus:outline-none"
                            />
                            <button onClick={handleSearch} className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black shadow-lg shadow-gray-200 transition-all active:scale-95">
                                Find Record
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 animate-in slide-in-from-bottom-5 duration-300">
                    {/* Student Info Card */}
                    <div className="xl:col-span-1 space-y-6">
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                                <ReceiptIndianRupee size={80} />
                            </div>
                            <div className="w-24 h-24 rounded-full bg-gray-100 mx-auto mb-4 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                                <img src={`https://i.pravatar.cc/150?u=${selectedStudent.id}`} alt="" />
                            </div>
                            <h2 className="text-xl font-black text-gray-900">{selectedStudent.name}</h2>
                            <p className="text-xs font-black text-gray-400 tracking-widest uppercase">{selectedStudent.id}</p>
                            <p className="text-sm font-bold text-[#C29543] bg-orange-50 px-3 py-1 rounded-full inline-block mt-2">
                                {selectedStudent.class} — {selectedStudent.section}
                            </p>

                            <div className="mt-8 space-y-3">
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-2xl border border-gray-100">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Dues</span>
                                    <span className="text-lg font-black text-gray-900">₹{selectedStudent.totalFee}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-green-50 rounded-2xl border border-green-100">
                                    <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Received</span>
                                    <span className="text-lg font-black text-green-700">₹{selectedStudent.paid}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-red-50 rounded-2xl border border-red-100">
                                    <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Outstanding</span>
                                    <span className="text-xl font-black text-red-600">₹{selectedStudent.remaining}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-900 p-6 rounded-3xl border border-gray-800 shadow-xl shadow-gray-200 text-white space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <QrCode size={20} className="text-[#C29543]" />
                                <h3 className="font-black">UPI Fast-Pay</h3>
                            </div>
                            <div className="aspect-square bg-white rounded-2xl flex items-center justify-center p-4">
                                <div className="w-full h-full border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center font-black text-gray-400 text-xs italic">QR Image</div>
                            </div>
                            <p className="text-[10px] font-bold text-gray-400 text-center uppercase tracking-widest">Scan to request payment from parents</p>
                        </div>
                    </div>

                    {/* Dues & Payment Section */}
                    <div className="xl:col-span-3 space-y-6">
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                                <h3 className="font-black text-gray-900 text-sm">Installment Schedule & Breakdown</h3>
                                <div className="p-2 bg-orange-50 text-[#C29543] rounded-xl"><AlertTriangle size={18} /></div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-gray-50">
                                            <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">ID</th>
                                            <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Fee Description</th>
                                            <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Due Date</th>
                                            <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
                                            <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                            <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {selectedStudent.installments.map(inst => (
                                            <tr key={inst.id} className={`${inst.status === 'Paid' ? 'opacity-50 grayscale' : 'hover:bg-gray-50/50'} transition-all`}>
                                                <td className="px-6 py-4 font-black text-xs text-gray-400">#0{inst.id}</td>
                                                <td className="px-6 py-4 font-bold text-gray-900">{inst.name}</td>
                                                <td className="px-6 py-4 font-bold text-gray-500 text-sm">{inst.date}</td>
                                                <td className="px-6 py-4 font-black">₹{inst.amount}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${inst.status === 'Paid' ? 'bg-green-100 text-green-700' :
                                                            inst.status === 'Overdue' ? 'bg-red-100 text-red-700 animation-pulse' : 'bg-orange-100 text-orange-700'
                                                        }`}>
                                                        {inst.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <input type="checkbox" disabled={inst.status === 'Paid'} className="w-5 h-5 rounded-lg border-gray-200 text-[#C29543] focus:ring-[#C29543]" />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Payment Options */}
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-8">
                            <div className="flex-1 space-y-6 border-r-0 md:border-r border-gray-50 pr-0 md:pr-8">
                                <h3 className="font-black text-gray-900 border-b border-gray-50 pb-4">Select Payment Mode</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {[
                                        { label: 'Cash', icon: <Wallet /> },
                                        { label: 'Card', icon: <CreditCard /> },
                                        { label: 'Cheque', icon: <Landmark /> },
                                        { label: 'Online', icon: <Landmark /> },
                                    ].map(mode => (
                                        <button key={mode.label} className="p-4 border-2 border-gray-100 rounded-2xl flex flex-col items-center gap-2 hover:border-[#C29543] hover:bg-orange-50/30 transition-all active:scale-95 group">
                                            <div className="text-gray-400 group-hover:text-[#C29543]">{mode.icon}</div>
                                            <span className="text-[11px] font-black text-gray-600 group-hover:text-gray-900 uppercase tracking-widest">{mode.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="w-full md:w-80 space-y-4">
                                <div className="p-4 bg-gray-50 rounded-2xl space-y-2">
                                    <div className="flex justify-between text-xs font-bold text-gray-400">
                                        <span>Selected Total</span>
                                        <span className="text-gray-900">₹15,000.00</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-bold text-gray-400">
                                        <span>Convenience Fee</span>
                                        <span className="text-gray-900">₹0.00</span>
                                    </div>
                                    <div className="pt-2 border-t border-gray-200 flex justify-between items-center">
                                        <span className="text-sm font-black text-gray-900 uppercase">Payable</span>
                                        <span className="text-2xl font-black text-[#C29543]">₹15,000</span>
                                    </div>
                                </div>
                                <button onClick={handlePayment} className="w-full py-4 bg-[#C29543] text-white rounded-2xl font-black text-lg hover:shadow-2xl hover:translate-y-[-2px] transition-all shadow-xl shadow-orange-100">
                                    Confirm Payment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Receipt Modal */}
            {showReceipt && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300">
                        <div className="p-8 pb-4 text-center border-b border-gray-50 bg-gray-50/50">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 size={32} />
                            </div>
                            <h2 className="text-2xl font-black text-gray-900">Payment Successful!</h2>
                            <p className="text-sm text-gray-500 font-medium">Receipt generated for {selectedStudent.name}</p>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="flex items-center justify-between py-3 border-b border-gray-50 italic">
                                <span className="text-gray-400 font-bold text-sm underline decoration-[#C29543] decoration-2">Receipt #RC-90234</span>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{new Date().toLocaleDateString()}</span>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400 font-medium">Amount Paid</span>
                                    <span className="text-gray-900 font-black">₹15,000.00</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400 font-medium">Mode</span>
                                    <span className="text-gray-900 font-black">CASH</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400 font-medium">Recorded By</span>
                                    <span className="text-gray-900 font-black italic underline decoration-gray-200 decoration-1">Admin_Desk_04</span>
                                </div>
                            </div>
                            <div className="pt-8 flex gap-4">
                                <button onClick={() => setShowReceipt(false)} className="flex-1 py-3.5 bg-gray-50 text-gray-500 rounded-2xl font-bold text-sm hover:bg-gray-100 transition-all">Close</button>
                                <button className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gray-900 text-white rounded-2xl font-black text-sm hover:bg-black transition-all shadow-xl shadow-gray-200">
                                    <Printer size={18} /> Print
                                </button>
                                <button className="w-14 py-3.5 border-2 border-dashed border-gray-100 text-gray-300 rounded-2xl hover:border-[#C29543] hover:text-[#C29543] transition-all flex items-center justify-center">
                                    <Download size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeeCollection;
