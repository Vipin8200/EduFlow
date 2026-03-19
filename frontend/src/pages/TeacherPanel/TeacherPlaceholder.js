import React from 'react';
import { Construction } from 'lucide-react';

const TeacherPlaceholder = ({ title }) => {
    return (
        <div className="p-10 flex flex-col items-center justify-center min-h-[60vh] text-center bg-white rounded-[40px] border border-gray-100 shadow-sm m-6">
            <div className="p-6 bg-orange-50 text-[#C29543] rounded-full mb-6">
                <Construction size={48} />
            </div>
            <h1 className="text-2xl font-black text-gray-900 uppercase italic tracking-tight mb-2">{title}</h1>
            <p className="text-gray-500 font-medium max-w-md">This module is currently under architectural optimization. Detailed features will be available in the next deployment cycle.</p>
        </div>
    );
};

export default TeacherPlaceholder;
