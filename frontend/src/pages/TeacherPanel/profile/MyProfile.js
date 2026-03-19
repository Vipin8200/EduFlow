import React from 'react';
import {
    User, Mail, Phone, MapPin,
    Calendar, Briefcase, GraduationCap,
    Edit3, Camera, ShieldCheck, Star,
    CheckCircle2, Info, ChevronRight,
    Github, Linkedin, Twitter
} from 'lucide-react';

const MyProfile = () => {
    return (
        <div className="p-4 sm:p-6 max-w-[1700px] mx-auto w-full min-h-screen font-sans">
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase italic underline decoration-[#C29543] decoration-8 underline-offset-4">Academic Persona Profile</h1>
                    <p className="text-sm text-gray-500 font-medium mt-3 italic">Analytical management of your pedagogical identity and professional meta-data.</p>
                </div>
                <button className="flex items-center gap-3 px-8 h-12 bg-gray-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-gray-200 hover:bg-[#C29543] transition-all active:scale-95">
                    SYNC PERSONA <CheckCircle2 size={16} />
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-4 space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
                    <div className="bg-white p-10 rounded-[60px] border border-gray-100 shadow-2xl relative overflow-hidden group border-t-8 border-t-[#C29543]">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-150 transition-transform duration-700 font-black text-9xl leading-none italic select-none">P</div>

                        <div className="relative w-max mx-auto mb-8">
                            <div className="w-40 h-40 bg-gray-50 rounded-[50px] overflow-hidden border-8 border-white shadow-2xl group-hover:scale-105 transition-transform duration-700">
                                <img src="https://randomuser.me/api/portraits/women/45.jpg" alt="Persona" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                            </div>
                            <button className="absolute bottom-2 right-2 p-4 bg-[#C29543] text-white rounded-2xl shadow-xl hover:bg-gray-950 hover:rotate-12 transition-all active:scale-90"><Camera size={20} /></button>
                        </div>

                        <div className="text-center space-y-2 mb-10 relative z-10">
                            <h2 className="text-2xl font-black text-gray-950 uppercase italic tracking-tighter">Priya Verma</h2>
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-[10px] font-black text-[#C29543] uppercase tracking-[4px]">Senior Pedagogy Lead</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-10 relative z-10">
                            <div className="p-5 bg-gray-50 rounded-[30px] text-center border border-gray-100">
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 italic leading-none">Global ID</p>
                                <p className="text-xs font-black text-gray-950 italic">T-8422</p>
                            </div>
                            <div className="p-5 bg-gray-50 rounded-[30px] text-center border border-gray-100">
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 italic leading-none">Experience</p>
                                <p className="text-xs font-black text-gray-950 italic">8.4 Yrs</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-6 relative z-10 p-6 bg-gray-50 rounded-[32px] border border-gray-100 shadow-inner-sm">
                            <button className="p-3 bg-white text-gray-400 rounded-xl hover:text-blue-500 hover:scale-110 transition-all shadow-sm"><Twitter size={18} /></button>
                            <button className="p-3 bg-white text-gray-400 rounded-xl hover:text-blue-700 hover:scale-110 transition-all shadow-sm"><Linkedin size={18} /></button>
                            <button className="p-3 bg-white text-gray-400 rounded-xl hover:text-gray-900 hover:scale-110 transition-all shadow-sm"><Github size={18} /></button>
                        </div>
                    </div>

                    <div className="bg-gray-950 p-10 rounded-[50px] text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-150 transition-transform duration-1000 rotate-12">
                            <ShieldCheck size={150} />
                        </div>
                        <h3 className="text-xl font-black italic uppercase tracking-tighter mb-4 text-[#C29543]">Integrity Rating</h3>
                        <div className="flex items-center gap-2 mb-6">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} className={`text-[#C29543] fill-[#C29543]`} />)}
                        </div>
                        <p className="text-gray-400 text-xs font-medium leading-relaxed italic relative z-10">Consistently benchmarked as an Elite Pedagogy Lead with 99.2% session commitment integrity.</p>
                    </div>
                </div>

                <div className="lg:col-span-8 animate-in fade-in slide-in-from-right-4 duration-700">
                    <div className="bg-white p-12 rounded-[60px] border border-gray-100 shadow-2xl space-y-12 relative overflow-hidden border-t-8 border-t-gray-900">
                        <div>
                            <div className="flex items-center gap-4 mb-10">
                                <div className="p-4 bg-gray-50 text-gray-300 rounded-3xl group-hover:bg-[#C29543]/10 transition-colors"><Info size={24} /></div>
                                <h3 className="text-xl font-black italic tracking-widest uppercase underline decoration-[#C29543] decoration-8 underline-offset-4">Detailed Persona Nodes</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {[
                                    { label: 'Primary Terminal', val: 'priya.verma@eduflow.node', icon: <Mail /> },
                                    { label: 'Comm. Protocol', val: '+91 84200 91823', icon: <Phone /> },
                                    { label: 'Pedagogical Unit', val: 'Department of Higher Physics', icon: <GraduationCap /> },
                                    { label: 'Joined temporal node', val: 'August 14, 2018', icon: <Calendar /> },
                                    { label: 'Module Access', val: 'Senior Faculty Terminal', icon: <Lock /> },
                                    { label: 'Territorial Node', val: 'Ahmedabad, Gujarat, India', icon: <MapPin /> },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-6 p-6 bg-gray-50 rounded-[35px] border border-gray-50 hover:bg-white hover:border-gray-100 hover:shadow-xl transition-all group cursor-pointer group hover:scale-[1.02] duration-500">
                                        <div className="p-4 bg-white text-gray-300 rounded-2xl group-hover:text-[#C29543] transition-all shadow-sm">{React.cloneElement(item.icon, { size: 20 })}</div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-gray-400 uppercase italic tracking-widest leading-none mb-1">{item.label}</p>
                                            <p className="text-[13px] font-black italic text-gray-950 uppercase tracking-tight">{item.val}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
                            <div className="flex items-center gap-4 text-center md:text-left">
                                <div className="p-4 bg-[#C29543]/5 text-[#C29543] rounded-3xl"><Edit3 size={24} /></div>
                                <div>
                                    <h4 className="text-lg font-black italic tracking-widest uppercase text-gray-900 leading-none mb-2">Update Persona Nodes</h4>
                                    <p className="text-[10px] font-black text-gray-400 uppercase italic tracking-widest">Modification of master professional telemetry.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button className="px-10 h-14 bg-gray-50 text-gray-400 rounded-3xl font-black text-[10px] uppercase tracking-[4px] hover:bg-gray-950 hover:text-white transition-all">DISCARD NODES</button>
                                <button className="px-12 h-14 bg-gray-950 text-white rounded-3xl font-black text-[10px] uppercase tracking-[4px] hover:bg-[#C29543] transition-all shadow-2xl shadow-gray-950/20 active:scale-95">COMMIT SYNC <ChevronRight size={16} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Lock = ({ size }) => <ShieldCheck size={size || 20} />;

export default MyProfile;
