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
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-20">
        <div className="flex items-center gap-2 sm:gap-4">
          <Link to="/" className="flex-shrink-0 -ml-12 sm:-ml-16 lg:-ml-20">
            <img
              src={logo}
              alt="TeacherJob Logo"
              className="h-60 w-auto sm:h-48 md:h-32 lg:h-60 object-contain"
            />
          </Link>
          <NavigationMenu />
        </div>
        <div className="flex items-center ml-auto gap-2 sm:gap-4">
          <HeaderActions user={user} />
          <MobileMenu user={user} />
        </div>
      </div>
    </header>
  );
};

export default Header;
