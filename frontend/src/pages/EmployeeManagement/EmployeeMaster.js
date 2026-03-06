import React, { useState, useRef, useEffect } from 'react';
import {
    User,
    Briefcase,
    IndianRupee,
    Folder,
    ShieldCheck,
    Printer,
    Download,
    Archive,
    Save,
    Camera,
    Calendar,
    ChevronDown,
    List,
    FileText,
    CreditCard,
    Home,
    Award
} from 'lucide-react';

export default function EmployeeMaster() {
    const [portalAccess, setPortalAccess] = useState(true);
    const [accountStatus, setAccountStatus] = useState(true);

    // Profile Photo State & Ref
    const [profilePhoto, setProfilePhoto] = useState(null);
    const photoInputRef = useRef(null);

    // Documents State
    const [documents, setDocuments] = useState({
        resume: null,
        idProof: null,
        addressProof: null,
        certificates: null,
        experienceLetter: null
    });

    // We'll store Refs for each document type to trigger file explorer
    const docInputRefs = {
        resume: useRef(null),
        idProof: useRef(null),
        addressProof: useRef(null),
        certificates: useRef(null),
        experienceLetter: useRef(null)
    };

    // Load from Session Storage on mount
    useEffect(() => {
        const savedPhoto = sessionStorage.getItem('empPhoto');
        if (savedPhoto) setProfilePhoto(savedPhoto);

        const savedDocs = sessionStorage.getItem('empDocs');
        if (savedDocs) setDocuments(JSON.parse(savedDocs));

        // Cleanup function for when page unmounts/reloads explicitly asked
        return () => {
            // Let's actually keep it in session storage if user accidentally refreshes, 
            // but if explicitly requested to remove on load "when page load then remove that autometically"
            sessionStorage.removeItem('empPhoto');
            sessionStorage.removeItem('empDocs');
        };
    }, []);

    // Helper: Convert File to Base64 to store in SessionStorage safely
    const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    // Handle Profile Photo Upload
    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Image only, max 10KB (10 * 1024 bytes) = 10240 bytes
        // The user's prompt said: photo "max size is 10kb only"
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file (JPG, PNG).');
            return;
        }
        if (file.size > 10240) {
            alert('Profile photo must be less than 10KB.');
            return;
        }

        const base64 = await toBase64(file);
        setProfilePhoto(base64);
        sessionStorage.setItem('empPhoto', base64);
    };

    // Handle Document Upload
    const handleDocumentUpload = async (docKey, allowedFormat, maxSizeKb, e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate Format
        if (allowedFormat === 'pdf' && file.type !== 'application/pdf') {
            alert(`Please upload a PDF for this document.`);
            return;
        }
        if (allowedFormat === 'image' && !file.type.startsWith('image/')) {
            alert(`Please upload an Image (JPG/PNG) for this document.`);
            return;
        }

        // Validate Size (convert kb to bytes)
        const maxSizeBytes = maxSizeKb * 1024;
        if (file.size > maxSizeBytes) {
            const sizeStr = maxSizeKb >= 1024 ? `${maxSizeKb / 1024}MB` : `${maxSizeKb}KB`;
            alert(`File size must be less than ${sizeStr}.`);
            return;
        }

        const base64 = await toBase64(file);
        const updatedDocs = { ...documents, [docKey]: { name: file.name, data: base64 } };
        setDocuments(updatedDocs);
        sessionStorage.setItem('empDocs', JSON.stringify(updatedDocs));
    };

    return (
        <div className="relative flex flex-col h-full">
            <div className="max-w-5xl mx-auto space-y-6 w-full pb-10">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Employee Master</h1>
                        <p className="text-gray-500 text-sm mt-1">Add, edit, and configure employee profiles, roles, and system access.</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm whitespace-nowrap">
                        <List size={18} />
                        View Employee List
                    </button>
                </div>

                {/* Basic Details Card */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-gray-100 rounded-lg">
                            <User size={20} className="text-gray-700" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-900">Basic Details</h2>
                    </div>

                    {/* Photo Upload Area */}
                    <div className="flex items-center gap-6 mb-8">
                        <div
                            className="w-24 h-24 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0 overflow-hidden relative group cursor-pointer"
                            onClick={() => photoInputRef.current?.click()}
                        >
                            {profilePhoto ? (
                                <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <Camera size={24} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                            )}
                        </div>
                        <div>
                            <input
                                type="file"
                                accept="image/jpeg, image/png, image/gif"
                                ref={photoInputRef}
                                onChange={handlePhotoUpload}
                                className="hidden"
                            />
                            <button
                                onClick={() => photoInputRef.current?.click()}
                                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors mb-2"
                            >
                                {profilePhoto ? 'Change Photo' : 'Upload Photo'}
                            </button>
                            <p className="text-xs text-gray-400">JPG, PNG or GIF (Max. 10KB)</p>
                        </div>
                    </div>

                    {/* Form Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">

                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-gray-700 block text-left">
                                Employee ID <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value="EMP-2024-089"
                                readOnly
                                className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 focus:outline-none"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-gray-700 block text-left">
                                First Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter first name"
                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 transition-colors"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-gray-700 block text-left">
                                Last Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter last name"
                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 transition-colors"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-gray-700 block text-left">Gender</label>
                            <div className="relative">
                                <select className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 transition-colors">
                                    <option value="" disabled selected>Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-gray-700 block text-left">Date of Birth</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="DD/MM/YYYY"
                                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 transition-colors"
                                />
                                <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-gray-700 block text-left">
                                Mobile Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="+91 -"
                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 transition-colors"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-gray-700 block text-left">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter official email"
                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 transition-colors"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-gray-700 block text-left">Blood Group</label>
                            <div className="relative">
                                <select className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 transition-colors">
                                    <option value="" disabled selected>Select group</option>
                                    <option value="a+">A+</option>
                                    <option value="a-">A-</option>
                                    <option value="b+">B+</option>
                                    <option value="o+">O+</option>
                                </select>
                                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-gray-700 block text-left">Aadhaar / ID Number</label>
                            <input
                                type="text"
                                placeholder="Enter ID number"
                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 transition-colors"
                            />
                        </div>

                    </div>
                </div>

                {/* Professional Details Card */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-gray-100 rounded-lg">
                            <Briefcase size={20} className="text-gray-700" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-900">Professional Details</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-gray-700 block text-left">
                                Designation <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Senior Teacher"
                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 transition-colors"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-gray-700 block text-left">
                                Department <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 transition-colors">
                                    <option value="" disabled selected>Select department</option>
                                    <option value="math">Mathematics</option>
                                    <option value="science">Science</option>
                                    <option value="admin">Administration</option>
                                </select>
                                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-gray-700 block text-left">
                                Joining Date <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="DD/MM/YYYY"
                                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 transition-colors"
                                />
                                <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-gray-700 block text-left">Employment Type</label>
                            <div className="relative">
                                <select className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 transition-colors">
                                    <option value="" disabled selected>Select type</option>
                                    <option value="full">Full Time</option>
                                    <option value="part">Part Time</option>
                                    <option value="contract">Contract</option>
                                </select>
                                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-gray-700 block text-left">Reporting Manager</label>
                            <div className="relative">
                                <select className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 transition-colors">
                                    <option value="" disabled selected>Select manager</option>
                                    <option value="manager1">Rakesh Sharma</option>
                                    <option value="manager2">Priya Desai</option>
                                </select>
                                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-gray-700 block text-left">Shift Assignment</label>
                            <div className="relative">
                                <select className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 transition-colors">
                                    <option value="" disabled selected>Select shift</option>
                                    <option value="morning">Morning (08:00 - 14:00)</option>
                                    <option value="general">General (09:00 - 17:00)</option>
                                </select>
                                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Salary Structure Card */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-gray-100 rounded-lg">
                            <IndianRupee size={20} className="text-gray-700" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-900">Salary Structure</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-gray-700 block text-left">
                                Basic Salary <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="0.00"
                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 transition-colors"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-gray-700 block text-left">Allowances</label>
                            <input
                                type="text"
                                placeholder="0.00"
                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 transition-colors"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-gray-700 block text-left">Deductions</label>
                            <input
                                type="text"
                                placeholder="0.00"
                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 transition-colors"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-gray-700 block text-left">Bank Account Number</label>
                            <input
                                type="text"
                                placeholder="Enter account number"
                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 transition-colors"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-gray-700 block text-left">IFSC Code</label>
                            <input
                                type="text"
                                placeholder="Enter IFSC code"
                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 transition-colors"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-gray-700 block text-left">UAN / PF Number</label>
                            <input
                                type="text"
                                placeholder="Enter PF number"
                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 transition-colors"
                            />
                        </div>
                    </div>
                </div>

                {/* Documents Upload Card */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-gray-100 rounded-lg">
                            <Folder size={20} className="text-gray-700" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-900">Documents Upload</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {[
                            { key: 'resume', title: 'Resume', subtitle: 'Click to upload PDF', icon: FileText, format: 'pdf', maxKb: 5120 },
                            { key: 'idProof', title: 'ID Proof', subtitle: 'Aadhaar / PAN', icon: CreditCard, format: 'image', maxKb: 10 },
                            { key: 'addressProof', title: 'Address Proof', subtitle: 'Click to upload', icon: Home, format: 'image', maxKb: 10 },
                            { key: 'certificates', title: 'Certificates', subtitle: 'Degrees / Diplomas', icon: Award, format: 'pdf', maxKb: 5120 },
                            { key: 'experienceLetter', title: 'Experience Letter', subtitle: 'Previous employer', icon: Briefcase, format: 'pdf', maxKb: 5120 },
                        ].map((doc, idx) => {
                            const hasUploaded = documents[doc.key] !== null;
                            return (
                                <div
                                    key={idx}
                                    onClick={() => docInputRefs[doc.key].current?.click()}
                                    className={`border ${hasUploaded ? 'border-solid border-green-200 bg-green-50/50 hover:bg-green-50' : 'border-dashed border-gray-200 bg-gray-50/50 hover:bg-gray-50'} rounded-xl flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-colors group relative`}
                                >
                                    <input
                                        type="file"
                                        accept={doc.format === 'pdf' ? 'application/pdf' : 'image/jpeg, image/png'}
                                        ref={docInputRefs[doc.key]}
                                        onChange={(e) => handleDocumentUpload(doc.key, doc.format, doc.maxKb, e)}
                                        className="hidden"
                                    />
                                    <div className={`w-10 h-10 ${hasUploaded ? 'bg-green-100 border-green-200 text-green-700' : 'bg-white border-gray-200 text-gray-700 group-hover:border-gray-300'} rounded-lg border flex items-center justify-center mb-3 transition-colors`}>
                                        <doc.icon size={20} className={hasUploaded ? 'text-green-700' : 'text-gray-700'} />
                                    </div>
                                    <h3 className="font-bold text-gray-900 text-sm mb-1">{doc.title}</h3>
                                    <p className={`text-xs ${hasUploaded ? 'text-green-600 font-medium' : 'text-gray-400'}`}>
                                        {hasUploaded ? 'Uploaded Successfully' : doc.subtitle}
                                    </p>
                                    {!hasUploaded && (
                                        <p className="text-[10px] text-gray-400 mt-1">({doc.format === 'pdf' ? 'Max 5MB' : 'Max 10KB'})</p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Status & Access Card */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-gray-100 rounded-lg">
                            <ShieldCheck size={20} className="text-gray-700" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-900">Status & Access</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">

                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-gray-700 block text-left">
                                Assign Portal Role <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 transition-colors">
                                    <option value="" disabled>Select Role</option>
                                    <option value="teacher" selected>Teacher</option>
                                    <option value="admin">Admin</option>
                                    <option value="hr">HR</option>
                                </select>
                                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <div className="flex items-end">
                            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-800 hover:bg-gray-50 transition-colors mb-[2px]">
                                <ShieldCheck size={16} className="text-gray-600" />
                                Reset Password
                            </button>
                        </div>

                        {/* Toggles container */}
                        <div className="lg:col-span-1 border border-gray-100 bg-gray-50/30 rounded-xl p-4 flex flex-col justify-center gap-1.5 row-span-2">
                            <div className="flex items-center justify-between pointer-events-auto">
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">Portal Login Access</h4>
                                    <p className="text-[11px] text-gray-400">Allow user to log in via app/web</p>
                                </div>
                                {/* Simple toggle switch implementation */}
                                <button
                                    onClick={() => setPortalAccess(!portalAccess)}
                                    className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500/50 ${portalAccess ? 'bg-green-100' : 'bg-gray-200'}`}
                                >
                                    <span className={`block w-4 h-4 rounded-full bg-white shadow-sm absolute top-1 transition-transform duration-200 ${portalAccess ? 'translate-x-[22px] bg-green-500 shadow-green-500/30' : 'translate-x-1'}`} />
                                </button>
                            </div>
                        </div>

                        <div className="lg:col-start-1 border border-gray-100 bg-gray-50/30 rounded-xl p-4 flex flex-col justify-center gap-1.5 mt-auto">
                            <div className="flex items-center justify-between pointer-events-auto">
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">Account Status</h4>
                                    <p className="text-[11px] text-gray-400">Set as Active or Inactive</p>
                                </div>
                                <button
                                    onClick={() => setAccountStatus(!accountStatus)}
                                    className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500/50 ${accountStatus ? 'bg-green-100' : 'bg-gray-200'}`}
                                >
                                    <span className={`block w-4 h-4 rounded-full bg-white shadow-sm absolute top-1 transition-transform duration-200 ${accountStatus ? 'translate-x-[22px] bg-green-500 shadow-green-500/30' : 'translate-x-1'}`} />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            {/* Sticky Fixed Footer Bar */}
            <div className="sticky -bottom-6 mt-10 w-full bg-white border-t border-gray-200 py-4 px-6 z-40 shadow-[0_-4px_15px_rgba(0,0,0,0.05)]">
                <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors bg-white">
                            <Printer size={16} />
                            Generate ID Card
                        </button>
                        <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors bg-white">
                            <Download size={16} />
                            Export
                        </button>
                        <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-red-100 text-red-600 rounded-lg text-sm font-bold hover:bg-red-50 transition-colors bg-white">
                            <Archive size={16} />
                            Archive
                        </button>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                        <button className="flex-1 sm:flex-none px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors bg-white">
                            Cancel
                        </button>
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0a0a0a] text-white rounded-lg text-sm font-bold hover:bg-black transition-colors shadow-md">
                            <Save size={16} />
                            Save Employee
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
