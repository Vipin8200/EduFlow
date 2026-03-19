import React from 'react';
import {
    Lock, Bell, ShieldCheck,
    Smartphone, Moon, Globe,
    ChevronRight, Save, Info,
    Eye, EyeOff, ShieldAlert,
    Database, Activity, CheckCircle2
} from 'lucide-react';

const Setting = () => {
    return (
        <div className="p-4 sm:p-6 max-w-[1700px] mx-auto w-full min-h-screen font-sans">
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase italic underline decoration-[red] decoration-8 underline-offset-4">Security Nexus Settings</h1>
                    <p className="text-sm text-gray-500 font-medium mt-3 italic">Analytical manipulation of your security credentials and system preferences.</p>
                </div>
                <button className="flex items-center gap-3 px-8 h-12 bg-gray-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-gray-200 hover:bg-[#C29543] transition-all active:scale-95">
                    COMMIT CHANGES <CheckCircle2 size={16} />
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-10 animate-in fade-in slide-in-from-left-4 duration-700">
                    <div className="bg-white p-12 rounded-[60px] border border-red-50 shadow-2xl space-y-10 relative overflow-hidden border-t-8 border-t-red-500">
                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-125 transition-transform duration-1000 rotate-12">
                            <ShieldAlert size={300} />
                        </div>

                        <div className="flex items-center gap-4 mb-2 relative z-10">
                            <div className="p-4 bg-red-50 text-red-500 rounded-3xl shadow-sm"><Lock size={24} /></div>
                            <h3 className="text-xl font-black italic tracking-widest uppercase underline decoration-red-50 decoration-8 underline-offset-4">Protocol Credential Reset</h3>
                        </div>

                        <div className="space-y-8 relative z-10">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-gray-400 uppercase italic tracking-widest ml-4">Current Knowledge Vector (Password)</label>
                                <div className="p-6 bg-gray-50 border border-gray-100 rounded-[30px] flex items-center justify-between group hover:border-[#C29543] transition-all cursor-pointer shadow-sm">
                                    <input type="password" placeholder="••••••••••••" className="bg-transparent text-xs font-black text-gray-950 uppercase italic tracking-[5px] w-full outline-none" />
                                    <Eye size={18} className="text-gray-300 group-hover:text-gray-900" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-gray-400 uppercase italic tracking-widest ml-4">New Credential Map</label>
                                    <div className="p-6 bg-gray-50 border border-gray-100 rounded-[30px] flex items-center justify-between group hover:border-blue-500 transition-all cursor-pointer shadow-sm">
                                        <input type="password" placeholder="NEW KEY VECTOR" className="bg-transparent text-[10px] font-black text-gray-950 uppercase italic tracking-[5px] w-full outline-none" />
                                        <ShieldCheck size={18} className="text-gray-300 group-hover:text-blue-500" />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-gray-400 uppercase italic tracking-widest ml-4">Verify New Context</label>
                                    <div className="p-6 bg-gray-50 border border-gray-100 rounded-[30px] flex items-center justify-between group hover:border-green-500 transition-all cursor-pointer shadow-sm">
                                        <input type="password" placeholder="REPEAT KEY VECTOR" className="bg-transparent text-[10px] font-black text-gray-950 uppercase italic tracking-[5px] w-full outline-none" />
                                        <CheckCircle2 size={18} className="text-gray-300 group-hover:text-green-500" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button className="w-full py-6 bg-red-600 text-white rounded-[32px] font-black text-[10px] uppercase tracking-[8px] hover:bg-gray-950 transition-all shadow-2xl shadow-red-950/20 active:scale-95 relative z-10 transition-all active:scale-90 flex items-center justify-center gap-4">
                            RESET CREDENTIAL MATRIX <Lock size={16} />
                        </button>
                    </div>

                    <div className="bg-white p-12 rounded-[60px] border border-gray-100 shadow-2xl space-y-10 relative overflow-hidden border-t-8 border-t-blue-100">
                        <div className="flex items-center gap-4 mb-2 relative z-10">
                            <div className="p-4 bg-blue-50 text-blue-500 rounded-3xl shadow-sm"><Bell size={24} /></div>
                            <h3 className="text-xl font-black italic tracking-widest uppercase underline decoration-blue-50 decoration-8 underline-offset-4">Temporal Notification Hub</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                            {[
                                { label: 'Knowledge Broadcasts (Emails)', icon: <Globe />, state: true },
                                { label: 'Nexus Terminal Pushes', icon: <Smartphone />, state: true },
                                { label: 'Commit Pulse Logs', icon: <Activity />, state: false },
                                { label: 'Dark Mode Synapsis', icon: <Moon />, state: false }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-6 bg-gray-50 rounded-[35px] border border-gray-50 hover:bg-white hover:border-gray-100 hover:shadow-xl transition-all group cursor-pointer group hover:scale-[1.02] duration-500">
                                    <div className="flex items-center gap-6">
                                        <div className="p-4 bg-white text-gray-300 rounded-2xl group-hover:text-blue-500 transition-all shadow-sm">{React.cloneElement(item.icon, { size: 18 })}</div>
                                        <span className="text-[10px] font-black uppercase text-gray-950 italic tracking-widest">{item.label}</span>
                                    </div>
                                    <div className={`w-12 h-6 rounded-full p-1 transition-all ${item.state ? 'bg-[#C29543]' : 'bg-gray-300'}`}>
                                        <div className={`w-4 h-4 bg-white rounded-full transform transition-transform ${item.state ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-10 animate-in fade-in slide-in-from-right-4 duration-700">
                    <div className="bg-gray-950 p-10 rounded-[60px] text-white shadow-2xl relative overflow-hidden group h-full">
                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-150 transition-transform duration-1000 rotate-12">
                            <Database size={200} />
                        </div>
                        <h3 className="text-xl font-black italic uppercase tracking-tighter mb-4 text-[#C29543]">Nexus Health Node</h3>
                        <p className="text-gray-400 text-xs font-medium leading-relaxed italic mb-10 relative z-10 uppercase tracking-widest">Master security terminal status: <span className="text-green-500">ENCRYPTED/OPTIMAL</span>. Integrity synchronization active across all pedagogical clusters.</p>

                        <div className="p-8 bg-white/5 rounded-[40px] border border-white/5 shadow-inner-sm space-y-6 relative z-10">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase italic text-gray-500 tracking-widest">Last Login Temporal</span>
                                <span className="text-[10px] font-black text-[#C29543] italic uppercase">14:02 PM</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase italic text-gray-500 tracking-widest">Authorized Terminals</span>
                                <span className="text-[10px] font-black text-[#C29543] italic uppercase">02 Nodes</span>
                            </div>
                        </div>

                        <div className="mt-10 p-6 bg-white/5 rounded-[32px] border border-white/5 flex items-center gap-4 transition-all group-hover:bg-white/10 shadow-sm relative z-10">
                            <div className="p-3 bg-white/10 rounded-2xl shadow-sm text-[#C29543]"><Info size={16} /></div>
                            <p className="text-[9px] font-black text-gray-400 uppercase leading-relaxed italic tracking-widest">Master security commitment triggers a total terminal log-out session across all nexus nodes.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Setting;
