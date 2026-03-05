// import Sidebar from "../components/Sidebar";

// export default function MainLayout({ children }) {

//   return (

//     <div className="flex h-screen">

//       <Sidebar/>

//       <div className="flex-1 bg-gray-100 overflow-y-auto">

//         {children}

//       </div>

//     </div>

//   );
// }



import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden text-gray-900 font-sans">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 h-screen overflow-hidden w-full relative">
        {/* Header Component - Fixed at the top within this flex column */}
        <Header />

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#f9fafb]">
          {children}
        </main>
      </div>
    </div>
  );
}