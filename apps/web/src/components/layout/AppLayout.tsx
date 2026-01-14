import React from "react";
import Sidebar from "./Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <Sidebar />
      {/* Main Content Area - Offset by sidebar width on desktop */}
      <div className="md:pl-72 min-h-screen flex flex-col transition-all duration-300">
        <main className="flex-1 p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;