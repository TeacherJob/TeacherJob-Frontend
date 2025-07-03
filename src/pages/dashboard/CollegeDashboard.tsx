// file: src/components/CollegeDashboard.js (NAYA AUR BEHTAR CODE)

import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectCurrentUser, logOut } from "@/features/auth/authSlice";

// Naye imports
import { useLogoutMutation } from "@/features/auth/authApiService";
import { apiService } from "@/features/api/apiService";
import toast from "react-hot-toast";

import {
  GraduationCap,
  PlusCircle,
  ClipboardList,
  FileText,
  UserCheck,
  FileCheck,
  Settings,
  Home,
  Menu,
  X,
  LogOut as LogOutIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CollegeDashboard = () => {
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [logoutUser] = useLogoutMutation();

  const menuItems = [
    { path: "/dashboard/college/profile", label: "Profile", icon: GraduationCap },
    { path: "/dashboard/college/post-job", label: "Post New Job", icon: PlusCircle },
    { path: "/dashboard/college/posts", label: "Manage Posts", icon: ClipboardList },
    { path: "/dashboard/college/applications", label: "Applications", icon: FileText },
    { path: "/dashboard/college/shortlist", label: "Shortlist Candidates", icon: UserCheck },
    { path: "/dashboard/college/offer-letter", label: "Offer Letters", icon: FileCheck },
    { path: "/dashboard/college/settings", label: "Settings", icon: Settings },
  ];

  const handleLinkClick = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  const handleSignOut = async () => {
    const loadingToast = toast.loading("Signing out...");
    try {
      await logoutUser({}).unwrap();
      dispatch(logOut());
      dispatch(apiService.util.resetApiState());
      toast.success("Signed out successfully.", { id: loadingToast });
      navigate("/login");
    } catch (error) {
      toast.error("Failed to sign out. Please try again.", { id: loadingToast });
      console.error("Failed to logout:", error);
    }
  };

  // Sidebar Links ke liye JSX
  const NavLinks = () => (
    <nav className="flex-1 space-y-1.5 overflow-y-auto">
      {/* Back to Home Link */}
      <Link
        to="/"
        onClick={handleLinkClick}
        className="flex items-center w-full p-2.5 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
      >
        <Home className="w-5 h-5 mr-3" />
        <span>Back to Home</span>
      </Link>
      
      {/* Dashboard Links */}
      {menuItems.map((item) => {
        const isActive = location.pathname.startsWith(item.path);
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={handleLinkClick}
            className={`flex items-center w-full p-2.5 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? 'bg-orange-500 text-white' // Active link style
                : 'text-gray-700 hover:bg-gray-100' // Inactive link style
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* --- SIDEBAR --- */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0
        `}
      >
        <div className="p-4 flex-grow flex flex-col overflow-y-hidden">
          {/* Sidebar Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            {/* [FIX] Is div se email truncate hoga */}
            <div className="overflow-hidden">
              <h2 className="font-bold text-gray-800 text-lg">
                Employer Dashboard
              </h2>
              <p className="text-sm text-gray-500 truncate" title={user?.email}>
                {user?.email}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <NavLinks />

          {/* Sign Out Button at the bottom */}
          <div className="mt-auto pt-4">
            <hr className="my-4 border-gray-200" />
            <button
              className="flex items-center w-full p-2.5 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              onClick={handleSignOut}
            >
              <LogOutIcon className="w-5 h-5 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-30">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </Button>
          <h1 className="text-lg font-semibold">College Dashboard</h1>
          <div className="w-8"></div> {/* Spacer */}
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default CollegeDashboard;
