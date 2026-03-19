import React, { useState } from 'react';
import {
    BadgeCheck, Plus, Search, Filter,
    MoreVertical, User, Printer,
    Download, Layout, Info,
    Settings2, Save, Trash2, Edit2,
    Share2, QrCode, ClipboardList,
    MonitorCheck, Scan, Smartphone
} from 'lucide-react';

const IdCardConfiguration = () => {
    return (
        <div className="p-4 sm:p-6 max-w-[1700px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans tracking-tight">
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 font-sans">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight text-[#C29543]">Institutional Credentials Designer</h1>
                    <p className="text-sm text-gray-500 font-medium tracking-tight">Personalize residential identity templates, field mappings, and batch print logic.</p>
                </div>
                <div className="flex bg-white p-1.5 border border-gray-100 rounded-2xl shadow-sm transition-transform scale-90 md:scale-100 origin-right transition-all">
                    <button className="flex items-center gap-2 px-8 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-[10px] hover:shadow-xl transition-all uppercase tracking-widest"><Printer size={14} /> Batch Dispatch</button>
                    <button className="flex items-center gap-2 px-6 py-2.5 text-gray-400 font-bold text-[10px] hover:text-gray-900 transition-all uppercase tracking-widest"><Save size={14} /> Commit Blueprint</button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                {/* Left: Template Designer (3D-ish feel) */}
                <div className="xl:col-span-8 space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
                    <div className="bg-white p-12 rounded-[60px] border border-gray-100 shadow-xl overflow-hidden relative group border-t-8 border-t-[#C29543]">
                        <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none group-hover:scale-125 transition-transform duration-1000 rotate-12">
                            <BadgeCheck size={400} />
                        </div>
                        <h3 className="text-xl font-black text-gray-900 italic tracking-tight uppercase underline decoration-gray-50 decoration-8 underline-offset-[-2px] mb-12">Identity Blueprint Canvas</h3>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-16 py-12">
                            {/* ID Card Front Card Mockup */}
                            <div className="w-[320px] h-[480px] bg-gradient-to-br from-gray-900 to-black rounded-[40px] shadow-2xl relative overflow-hidden group/card scale-100 hover:scale-[1.02] transition-transform duration-500 border-2 border-white/10 ring-8 ring-gray-50">
                                <div className="absolute top-[-50px] left-[-30px] w-48 h-48 bg-[#C29543]/20 blur-[80px] rounded-full rotate-[-15deg] group-hover/card:bg-orange-500/20 transition-all"></div>
                                <div className="p-8 h-full flex flex-col items-center">
                                    <div className="flex items-center gap-3 mb-10 w-full">
                                        <div className="w-10 h-10 bg-[#C29543] rounded-xl shadow-lg shadow-orange-500/20"></div>
                                        <div className="text-white">
                                            <p className="text-[10px] font-black uppercase tracking-widest italic opacity-50">Karmel Institute</p>
                                            <p className="text-[8px] font-black uppercase tracking-[2px] opacity-30">EST. 1994</p>
                                        </div>
                                    </div>

                                    <div className="w-28 h-28 bg-gray-800 rounded-[32px] border-2 border-white/20 mb-8 flex items-center justify-center text-white/10 group-hover/card:border-[#C29543]/40 transition-all shadow-inner relative overflow-hidden">
                                        <User size={60} strokeWidth={1} />
                                        <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-black to-transparent"></div>
                                    </div>

                                    <div className="text-center space-y-1 mb-10">
                                        <h4 className="text-white text-lg font-black italic tracking-wide">ROHIT SHARMA</h4>
                                        <p className="text-[#C29543] text-[9px] font-bold uppercase tracking-widest italic tracking-widest">RESIDENTIAL BOARDER</p>
                                    </div>

                                    <div className="w-full space-y-4 px-2">
                                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                            <span className="text-[8px] font-black text-white/30 uppercase tracking-widest italic">ROLL INDEX</span>
                                            <span className="text-[10px] font-black text-white italic">#10822-SC</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                            <span className="text-[8px] font-black text-white/30 uppercase tracking-widest italic">WING ASSIGN</span>
                                            <span className="text-[10px] font-black text-white italic">NORTH BLOCK A</span>
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-8 flex items-center justify-center gap-4 opacity-50 group-hover/card:opacity-100 transition-opacity">
                                        <QrCode size={40} className="text-white" strokeWidth={1} />
                                    </div>
                                </div>
                            </div>

                            {/* ID Card Back Design Mockup */}
                            <div className="w-[320px] h-[480px] bg-white rounded-[40px] shadow-2xl relative overflow-hidden group/back scale-95 opacity-80 hover:opacity-100 transition-all border border-gray-100">
                                <div className="p-8 h-full flex flex-col">
                                    <div className="space-y-6 flex-1">
                                        <div className="p-5 bg-gray-50 rounded-[28px] border border-gray-100 space-y-2">
                                            <p className="text-[8px] font-black text-gray-400 italic mb-2 tracking-widest">EMERGENCY DATA MATRIX</p>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-bold text-gray-900">BLOOD GROUP: B+ VE</p>
                                                <p className="text-[10px] font-bold text-gray-900">M: +91 99880 77660</p>
                                            </div>
                                        </div>
                                        <div className="p-5 bg-gray-50 rounded-[28px] border border-gray-100">
                                            <p className="text-[8px] font-black text-gray-400 italic mb-2 tracking-widest uppercase">Institutional Terms</p>
                                            <p className="text-[7px] text-gray-400 leading-relaxed font-black uppercase tracking-tighter italic">This credential unit remains the physical property of Karmel International Institute. Specialized biometric access is synchronized with this localized Uid node.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-8 border-t border-gray-50 mt-auto">
                                        <Scan size={24} className="text-[#C29543]" />
                                        <span className="text-[9px] font-black text-gray-400 italic">SYSTEM CERTIFIED</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Field Mappings & Configuration */}
                <div className="xl:col-span-4 space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
                    <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8 border-b-8 border-b-orange-100 relative group overflow-hidden">
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
                            <Settings2 size={24} className="text-[#C29543]" />
                            <h3 className="font-black text-xl italic uppercase underline decoration-orange-50 decoration-8 underline-offset-[-2px]">Personalization Hub</h3>
                        </div>
                        <div className="space-y-6 relative z-10 font-sans">
                            <div className="p-5 bg-gray-50 rounded-3xl border border-gray-100 space-y-4">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 underline decoration-orange-100 decoration-4">Primary Identity Node</label>
                                <div className="space-y-3">
                                    {['FullName', 'RollNumber', 'BloodGroup', 'GuardianContact'].map(field => (
                                        <div key={field} className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl hover:border-[#C29543] transition-all group/field cursor-pointer">
                                            <span className="text-[10px] font-bold text-gray-900 italic tracking-tight">{field} Mapping</span>
                                            <div className="w-8 h-4 bg-orange-100 rounded-full relative"><div className="absolute right-1 top-1 w-2 h-2 bg-[#C29543] rounded-full scale-100 transition-transform"></div></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4 pt-4">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic ml-1 mb-2">Printing Protocol</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <button className="py-4 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-gray-200 active:scale-95">Offset Print</button>
                                    <button className="py-4 bg-gray-50 border border-gray-100 text-gray-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-orange-200 hover:text-orange-600 transition-all font-black">Digital Png</button>
                                </div>
                            </div>

                            <div className="p-6 bg-orange-50 rounded-[32px] border border-orange-100 space-y-3 group-hover:bg-[#C29543] group-hover:text-white transition-all duration-500">
                                <h4 className="flex items-center gap-3 text-xs font-black uppercase tracking-widest italic"><BadgeCheck size={18} /> Credentials Health</h4>
                                <p className="text-[10px] font-bold leading-relaxed opacity-70 italic tracking-wider">Localized ID rendering utilizes HD vectors and is optimized for PVC thermal printers.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-10 rounded-[50px] border border-gray-100 shadow-sm space-y-6 relative group overflow-hidden">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-blue-50 text-blue-500 rounded-2xl group-hover:rotate-12 transition-transform duration-500 shadow-sm"><Smartphone size={24} /></div>
                            <div>
                                <h4 className="text-sm font-black text-gray-900 italic tracking-tight uppercase">Virtual Identity Node</h4>
                                <p className="text-[10px] font-black text-gray-400 uppercase italic">Mobile App Verification System</p>
                            </div>
                        </div>
                        <button className="w-full py-4.5 bg-gray-50 border border-gray-100 text-[9px] font-black text-gray-950 uppercase tracking-[4px] rounded-[24px] hover:border-blue-200 hover:text-blue-500 transition-all shadow-sm">Sync Mobile Cluster</button>
                    </div>
                </div>
            </div>

            <div className="mt-16 bg-gray-900 p-12 rounded-[60px] text-white flex flex-col xl:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[500px] h-full bg-white/[0.03] rotate-[-15deg] group-hover:rotate-0 transition-transform duration-1000"></div>
                <div className="flex-1 space-y-6 relative z-10 text-center xl:text-left">
                    <div className="flex items-center justify-center xl:justify-start gap-4">
                        <div className="p-4 bg-white/10 rounded-[28px] border border-white/10"><MonitorCheck size={28} className="text-[#C29543]" /></div>
                        <h3 className="text-2xl font-black italic tracking-widest uppercase underline decoration-[#C29543] decoration-8 underline-offset-4">Secured Issuance Index</h3>
                    </div>
                    <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-3xl italic tracking-tight">Personalized identities are cryptographically mapped for attendance verification. The printing pipeline utilizes verifiable audit tokens to prevent unauthorized credential reproduction during localized batch dispatches.</p>
                </div>
                <button className="px-12 h-14 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[4px] hover:bg-[#C29543] hover:text-white transition-all shadow-xl shadow-gray-950 relative z-10">
                    Verify Blueprint Integrity
                </button>
            </div>
        </div>
    );
};

export default IdCardConfiguration;
