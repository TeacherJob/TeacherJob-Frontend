import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/app/hooks";
import { selectCurrentUser } from "@/features/auth/authSlice";
import NavigationMenu from "./header/NavigationMenu";
import HeaderActions from "./header/HeaderActions";
import MobileMenu from "./header/MobileMenu";
import logo from "@/assets/logo.png";

const Header = () => {
  const { t } = useTranslation();
  const user = useAppSelector(selectCurrentUser);

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {" "}
          {/* Header height h-20 (80px) hai */}
          <div className="flex items-center gap-8">
            {/* FIX 1: Logo ko left shift karne ke liye negative margin (-ml-4) add kiya */}
            <Link to="/" className="flex-shrink-0 -ml-10">
              <img
                src={logo}
                alt="TeacherJob Logo"
                // FIX 2: Logo ka size thoda bada kiya (h-16 = 64px) taaki woh header mein fit ho
                className="h-[250px] w-auto"
              />
            </Link>
            <NavigationMenu />
          </div>
          <HeaderActions user={user} />
          <MobileMenu user={user} />
        </div>
      </div>
    </header>
  );
};

export default Header;
