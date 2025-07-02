// src/components/Header.tsx

import { Link, useLocation } from "react-router-dom"; // <-- useLocation ko import karein
import { useAppSelector } from "@/app/hooks";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { Bell, Bookmark, User } from "lucide-react";

import NavigationMenu from "./header/NavigationMenu";
import HeaderActions from "./header/HeaderActions";
import MobileMenu from "./header/MobileMenu";
import logo from "@/assets/logo.png";

const Header = () => {
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation(); // <-- Current location ko get karein

  // Check karein ki kya hum career guide page par hain
  const isCareerGuidePage = location.pathname.startsWith("/career-guide");

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between h-20">
        <div className="flex items-center gap-4 -ml-10">
          <Link
            to="/"
            className="relative flex-shrink-0 flex items-center h-20"
          >
            <img
              src={logo}
              alt="TeacherJob Logo"
              className="h-[200px] w-auto object-contain"
              style={{ minWidth: 120 }}
            />
          </Link>

          <nav className="hidden sm:flex items-center">
            <NavigationMenu />
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex">
            <HeaderActions user={user} />
          </div>

          {/* --- YAHAN BADLAV KIYA GAYA HAI --- */}
          {/* Mobile icons sirf tab dikhayein jab hum career guide page par NAHI hain */}
          {!isCareerGuidePage && (
            <div className="flex sm:hidden items-center gap-0">
              <Button asChild variant="ghost" size="icon">
                <Link to="/my-jobs" aria-label="Saved Jobs">
                  <Bookmark className="h-6 w-6" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon">
                <Link to="/notifications" aria-label="Notifications">
                  <Bell className="h-8 w-8" />
                </Link>
              </Button>
              {!user && (
                <Button asChild variant="ghost" size="icon">
                  <Link to="/login" aria-label="Login">
                    <User className="h-6 w-6" />
                  </Link>
                </Button>
              )}
              <MobileMenu user={user} />
            </div>
          )}
          {/* --- END OF CHANGE --- */}
        </div>
      </div>
    </header>
  );
};

export default Header;
