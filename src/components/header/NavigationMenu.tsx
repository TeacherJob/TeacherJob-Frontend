import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NavigationMenu = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const navItems = [
    { label: t("header.nav.home"), path: "/" },
    { label: t("header.nav.aboutUs"), path: "/about" },
    { label: t("header.nav.salaryGuide"), path: "/salary-guide" },
    { label: t("header.nav.careerGuide"), path: "/career-guide" },
    { label: t("header.nav.browseJobs"), path: "/browse-jobs" },
    { label: t("header.nav.media"), path: "/press" },
  ];

  return (
    <nav className="hidden md:flex items-center h-16 space-x-1 lg:space-x-2">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`h-full flex items-center px-2 py-2 text-sm font-medium transition-all duration-200 lg:px-4 ${
            location.pathname === item.path
              ? "text-foreground border-b-2 border-primary"
              : "text-muted sesiones-foreground hover:text-foreground border-b-2 border-transparent"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavigationMenu;
