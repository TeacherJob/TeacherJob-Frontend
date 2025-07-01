import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/app/hooks";
import { selectCurrentUser } from "@/features/auth/authSlice";
import NavigationMenu from "./header/NavigationMenu";
import HeaderActions from "./header/HeaderActions";
import MobileMenu from "./header/MobileMenu";
import SaveJobButtonMobile from "./header/SaveJobButtonMobile";
import logo from "@/assets/logo.png";

const Header = () => {
  const { t } = useTranslation();
  const user = useAppSelector(selectCurrentUser);

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border shadow-sm">
      <div className="max-w-screen-xl mx-auto px-0 flex items-center h-24">
        {/* Logo on the left, nav in a single row, actions on right */}
        <Link
          to="/"
          className="relative flex-shrink-0 flex items-center h-24 mr-[-8px]"
        >
          <img
            src={logo}
            alt="TeacherJob Logo"
            className="h-[180px] w-auto object-contain"
            style={{ minWidth: 150 }}
          />
        </Link>
        {/* NavigationMenu takes all available space, single row, no wrap, smaller text, less gap, no scroll bar */}
        <nav className="flex-1 flex items-center whitespace-nowrap min-w-0">
          <div
            className="w-full flex items-center gap-1 text-[14px] sm:text-[14px] font-medium text-foreground"
            style={{ overflow: "hidden" }}
          >
            <NavigationMenu />
          </div>
        </nav>
        {/* Actions and Mobile Menu */}
        <div className="flex items-center gap-1 sm:gap-2 ml-2">
          {/* Desktop & Tablet: Only show HeaderActions */}
          <div className="hidden sm:flex items-center gap-2">
            <HeaderActions user={user} />
          </div>
          {/* Mobile: Show save and notification always, profile only if NOT logged in */}
          <div className="flex sm:hidden items-center gap-1">
            <SaveJobButtonMobile />
            <Link to="/notifications" aria-label="Notifications">
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-foreground"
              >
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </Link>
            {!user && (
              <Link to="/login" aria-label="Login">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-foreground"
                >
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8V22h19.2v-2.8c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </Link>
            )}
          </div>
          <MobileMenu user={user} />
        </div>
      </div>
    </header>
  );
};

export default Header;
