// src/components/Header.tsx

import { Link } from "react-router-dom";
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

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between h-20">
        {/* Left Side: Logo and Desktop Navigation */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="relative flex-shrink-0 flex items-center h-20"
          >
            <img
              src={logo}
              alt="TeacherJob Logo"
              className="h-[180px] w-auto object-contain" // Size theek kiya gaya
              style={{ minWidth: 120 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center">
            <NavigationMenu />
          </nav>
        </div>

        {/* Right Side: Actions Menu */}
        <div className="flex items-center gap-2">
          {/* Desktop: Full actions */}
          <div className="hidden sm:flex">
            <HeaderActions user={user} />
          </div>

          {/* === YAHAN BADLAV KIYA GAYA HAI === */}
          {/* Mobile: Icon buttons */}
          <div className="flex sm:hidden items-center gap-0">
            {" "}
            {/* Spacing kam karke gap-0 kiya gaya */}
            <Button asChild variant="ghost" size="icon">
              <Link to="/my-jobs" aria-label="Saved Jobs">
                <Bookmark className="h-6 w-6" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon">
              <Link to="/notifications" aria-label="Notifications">
                <Bell className="h-6 w-6" />
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
          {/* === END OF CHANGE === */}
        </div>
      </div>
    </header>
  );
};

export default Header;
