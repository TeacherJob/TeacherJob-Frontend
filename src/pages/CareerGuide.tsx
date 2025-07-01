import { useState, useRef, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom"; // Updated import
import {
  Search,
  ChevronDown,
  Briefcase,
  FileText,
  MessageSquare,
  ArrowRight,
  Rocket,
  Newspaper,
  Menu,
} from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useGetAllCareerArticlesQuery } from "@/features/admin/adminApiService";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

// --- Components (ArticleCard, Skeleton, etc. No changes needed here) ---
const ArticleCard = ({ article }: { article: any }) => (
  <Link
    to={`/career-guide/${article.slug}`}
    className="group bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 hover:border-orange-500/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
  >
    <div className="relative overflow-hidden">
      <img
        src={article?.image?.url}
        alt={article.title}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <p className="text-sm font-semibold text-orange-600 mb-2">
        {article.category}
      </p>
      <h3 className="text-lg font-bold text-gray-900 mb-2 text-left">
        {article.title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4 text-left flex-grow">
        {article.summary}
      </p>
      <div className="font-semibold text-orange-600 flex items-center justify-start gap-1.5 text-sm transition-colors group-hover:text-orange-700">
        Read Article
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  </Link>
);

const ArticleCardSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200">
    <Skeleton className="h-48 w-full" />
    <div className="p-6">
      <Skeleton className="h-4 w-24 mb-3" />
      <Skeleton className="h-6 w-full mb-2" />
      <Skeleton className="h-6 w-5/6 mb-4" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  </div>
);

const CategorySection = ({
  title,
  articles,
  categoryId,
  subtitle,
  theme,
  onExploreClick,
}: {
  title: string;
  articles: any[];
  categoryId: string;
  subtitle: string;
  theme: any;
  onExploreClick: (categoryId: string) => void;
}) => (
  <div className="py-16 sm:py-20 relative overflow-hidden bg-gray-50">
    <div
      className="absolute -inset-x-32 -top-48 -bottom-32 transform-gpu overflow-hidden blur-3xl"
      aria-hidden="true"
    >
      <div
        className={`relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] ${theme.bgGradient} opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]`}
      ></div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="text-left md:text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-gray-900">
          {title}
        </h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-600">
          {subtitle}
        </p>
      </div>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.length > 0 ? (
          articles
            .slice(0, 3)
            .map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))
        ) : (
          <div className="col-span-full mt-16 text-center text-gray-500 italic">
            No articles yet for this category.
          </div>
        )}
      </div>
      <div className="mt-16 text-center">
        <button
          onClick={() => onExploreClick(categoryId)}
          className="inline-block bg-orange-500 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:bg-orange-600"
        >
          Explore All {title} Articles
        </button>
      </div>
    </div>
  </div>
);

const CareerGuideHero = ({
  themes,
  onExploreClick,
}: {
  themes: any[];
  onExploreClick: (id: string) => void;
}) => (
  <section
    className="relative bg-cover bg-center py-16 sm:py-20"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop')",
    }}
  >
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
        Career Advancement Hub
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-200">
        Your one-stop destination for career advice, resume tips, and interview
        strategies.
      </p>
      <form className="mt-8 max-w-xl mx-auto">
        <div className="relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search for articles..."
            className="h-14 pl-14 w-full text-md bg-white text-gray-900 rounded-full border-2 border-gray-300 shadow-lg focus:ring-2 focus:ring-indigo-500/40"
          />
        </div>
      </form>
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onExploreClick(theme.id)}
            className="group flex items-center justify-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-full border border-gray-300 shadow-sm hover:shadow-lg hover:border-indigo-500/60 transition-all"
          >
            {theme.icon}
            <span className="font-semibold text-gray-600 group-hover:text-gray-900 text-sm">
              {theme.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  </section>
);

// --- MAIN PAGE COMPONENT ---
const CareerGuidePage = () => {
  const navigate = useNavigate(); // ADDED: Initialize navigate
  const [activeTab, setActiveTab] = useState("career-guide");
  const [activeSubTab, setActiveSubTab] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrollingUp(
        currentScrollY < lastScrollY.current || currentScrollY < 100
      );
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const { data: response, isLoading, isError } = useGetAllCareerArticlesQuery();
  const articlesByCategory = useMemo(() => {
    if (!response?.data) return {};
    return response.data.reduce(
      (acc: { [key: string]: any[] }, article: any) => {
        const { category } = article;
        if (!acc[category]) acc[category] = [];
        acc[category].push(article);
        return acc;
      },
      {}
    );
  }, [response]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Nav Data (No changes needed here) ---
  const mainNav = [
    { id: "finding-a-job", label: "Search Strategies" },
    {
      id: "resumes-cover-letters",
      label: "Resume Toolkit",
      subTabs: [
        { id: "resumes-cover-letters", label: "Resume & Cover Letter Advice" },
        { id: "resume-samples", label: "Resume Samples" },
        { id: "cover-letter-samples", label: "Cover Letter Samples" },
      ],
    },
    { id: "interviewing", label: "Nail the Interview" },
    { id: "pay-salary", label: "Know Your Worth" },
    {
      id: "career-development",
      label: "Upskilling & Advancement",
      subTabs: [
        { id: "career-development", label: "Career Development Advice" },
        { id: "starting-a-new-job", label: "Starting a New Job" },
      ],
    },
    { id: "news", label: "News" },
  ];

  const pageData: {
    [key: string]: { title: string; subtitle: string; categoryKey?: string };
  } = {
    "career-guide": {
      title: "Career Guide",
      subtitle: "Your one-stop resource for career advice.",
    },
    "finding-a-job": {
      title: "Search Strategies",
      subtitle: "Career ideas and guidance to pick the right role for you.",
      categoryKey: "Finding a Job",
    },
    "resumes-cover-letters": {
      title: "Resumes & Cover Letters",
      subtitle:
        "Professional templates and examples to create standout applications.",
    },
    "resume-samples": {
      title: "Resume Samples",
      subtitle: "Browse our selection of resume samples to get started.",
      categoryKey: "Resume Sample",
    },
    "cover-letter-samples": {
      title: "Cover Letter Samples",
      subtitle:
        "Find inspiration for your own cover letter with our professional samples.",
      categoryKey: "Cover Letter Sample",
    },
    interviewing: {
      title: "Nail the Interview",
      subtitle: "Common questions, answers and advice to help you prepare.",
      categoryKey: "Interviewing",
    },
    "pay-salary": {
      title: "Know Your Worth",
      subtitle: "Data and tips for talking about money at work.",
      categoryKey: "Pay & Salary",
    },
    "career-development": {
      title: "Career Development",
      subtitle: "Skills and steps to take your career to the next level.",
    },
    "starting-a-new-job": {
      title: "Starting a New Job",
      subtitle:
        "Best practices to make a strong impression and transition smoothly.",
    },
    news: {
      title: "Latest News & Updates",
      subtitle:
        "Stay informed with the latest happenings in the education sector.",
      categoryKey: "News",
    },
  };

  // --- YAHAN BADLAV KIYA GAYA HAI ---
  const handleTabClick = (tabId: string, subTabId: string | null = null) => {
    // If the "News" tab is clicked, navigate to the /press page and stop.
    if (tabId === "news") {
      navigate("/press");
      return;
    }

    // Otherwise, continue with the existing logic to switch tabs.
    setActiveTab(tabId);
    const targetTab = mainNav.find((t) => t.id === tabId);
    if (subTabId) {
      setActiveSubTab(subTabId);
    } else if (targetTab?.subTabs) {
      setActiveSubTab(targetTab.subTabs[0].id);
    } else {
      setActiveSubTab(null);
    }
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
  };
  // --- END OF CHANGE ---

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleTabClick("career-guide");
  };

  const handleDropdownToggle = (tabId: string) =>
    setOpenDropdown(openDropdown === tabId ? null : tabId);

  const handleSubTabClick = (
    e: React.MouseEvent,
    tabId: string,
    subTabId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    handleTabClick(tabId, subTabId);
  };

  const homePageThemes = [
    {
      id: "finding-a-job",
      title: "Search Strategies",
      icon: (
        <Briefcase
          size={20}
          className="text-gray-500 group-hover:text-orange-600"
        />
      ),
    },
    {
      id: "resumes-cover-letters",
      title: "Resumes",
      icon: (
        <FileText
          size={20}
          className="text-gray-500 group-hover:text-emerald-500"
        />
      ),
    },
    {
      id: "interviewing",
      title: "Nail the Interview",
      icon: (
        <MessageSquare
          size={20}
          className="text-gray-500 group-hover:text-sky-500"
        />
      ),
    },
    {
      id: "career-development",
      title: "Growth",
      icon: (
        <Rocket
          size={20}
          className="text-gray-500 group-hover:text-indigo-500"
        />
      ),
    },
    {
      id: "news",
      title: "News",
      icon: (
        <Newspaper
          size={20}
          className="text-gray-500 group-hover:text-red-500"
        />
      ),
    },
  ];

  const renderHomePage = () => {
    const homePageCategories = [
      {
        id: "finding-a-job",
        categoryName: "Finding a Job",
        theme: {
          bgGradient: "bg-gradient-to-r from-orange-200/30 to-orange-100/10",
        },
      },
      {
        id: "resumes-cover-letters",
        categoryName: "Resumes & Cover Letters",
        theme: {
          bgGradient: "bg-gradient-to-r from-emerald-200/30 to-emerald-100/10",
        },
      },
      {
        id: "interviewing",
        categoryName: "Interviewing",
        theme: { bgGradient: "bg-gradient-to-r from-sky-200/30 to-sky-100/10" },
      },
    ];

    return (
      <>
        <CareerGuideHero
          themes={homePageThemes}
          onExploreClick={handleTabClick}
        />
        <div className="bg-white">
          {homePageCategories.map((cat) => {
            const categoryData = pageData[cat.id] || {
              title: "",
              subtitle: "",
            };
            return (
              <div key={cat.id}>
                <CategorySection
                  title={categoryData.title}
                  subtitle={categoryData.subtitle}
                  articles={
                    isLoading
                      ? []
                      : articlesByCategory[
                          categoryData.categoryKey || categoryData.title
                        ] || []
                  }
                  categoryId={cat.id}
                  theme={cat.theme}
                  onExploreClick={handleTabClick}
                />
              </div>
            );
          })}
        </div>
      </>
    );
  };

  const renderContentPage = () => {
    const currentContentKey = activeSubTab || activeTab;
    const currentContentData = pageData[currentContentKey] || {
      title: "",
      subtitle: "",
    };
    const categoryToFilter =
      currentContentData.categoryKey || currentContentData.title;
    const articlesForCurrentTab = articlesByCategory[categoryToFilter] || [];
    return (
      <div className="bg-white min-h-[60vh]">
        <div className="bg-gray-50 border-b border-gray-200">
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mt-3">
              {currentContentData.title}
            </h1>
            {currentContentData.subtitle && (
              <p className="text-lg text-gray-600 max-w-4xl mt-2">
                {currentContentData.subtitle}
              </p>
            )}
          </main>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <ArticleCardSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <p className="text-center text-red-600 py-20 font-semibold">
              Failed to load articles.
            </p>
          ) : articlesForCurrentTab.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articlesForCurrentTab.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 md:col-span-3 text-center h-40 flex items-center justify-center">
              No articles found for this category yet.
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen font-sans flex flex-col">
      <div
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          isScrollingUp ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Header />
      </div>

      <div className="flex-grow" style={{ paddingTop: `${headerHeight}px` }}>
        <div
          ref={navRef}
          className="sticky z-40 border-b border-gray-200 bg-white shadow-sm"
          style={{ top: isScrollingUp ? `${headerHeight}px` : "0px" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <a href="#" onClick={handleLogoClick} className="flex-shrink-0">
                <span className="font-bold text-gray-900 text-lg whitespace-nowrap ml-8">
                  Career Essentials
                </span>
              </a>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex flex-grow items-center justify-center">
                {mainNav.map((tab) => (
                  <div key={tab.id} className="relative">
                    <button
                      onClick={(e) =>
                        tab.subTabs
                          ? handleDropdownToggle(tab.id)
                          : handleTabClick(tab.id)
                      }
                      className={`flex items-center text-sm font-semibold px-4 py-5 transition-colors duration-200 relative whitespace-nowrap ${
                        activeTab === tab.id
                          ? "text-orange-600"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {tab.label}
                      {tab.subTabs && (
                        <ChevronDown
                          className={`w-5 h-5 ml-1.5 transition-transform duration-200 ${openDropdown === tab.id ? "rotate-180" : ""}`}
                        />
                      )}
                      {activeTab === tab.id && !openDropdown && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-orange-500 rounded-full"></span>
                      )}
                    </button>
                    {tab.subTabs && openDropdown === tab.id && (
                      <div className="absolute left-1/2 -translate-x-1/2 mt-1 w-64 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200 animate-in fade-in-20 zoom-in-95">
                        {tab.subTabs.map((subTab) => (
                          <a
                            key={subTab.id}
                            href="#"
                            onClick={(e) =>
                              handleSubTabClick(e, tab.id, subTab.id)
                            }
                            className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${
                              activeSubTab === subTab.id
                                ? "font-semibold text-orange-600 bg-orange-50"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {subTab.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
                  aria-label="Open career menu"
                >
                  <span className="font-semibold text-sm mr-2">Menu</span>
                  <Menu className="w-6 h-6 inline-block" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- Slide-out Sidebar Menu */}
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            {/* Sidebar */}
            <div
              ref={navRef}
              className={`fixed top-0 left-0 h-full w-4/5 max-w-xs bg-white z-50 shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              </div>
              <div className="flex-grow overflow-y-auto">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {mainNav.map((tab) => (
                    <div key={tab.id}>
                      <button
                        onClick={() =>
                          tab.subTabs
                            ? handleDropdownToggle(tab.id)
                            : handleTabClick(tab.id)
                        }
                        className={`w-full flex justify-between items-center px-3 py-3 rounded-md text-base font-medium ${activeTab === tab.id && !openDropdown ? "text-orange-600 bg-orange-50" : "text-gray-700 hover:bg-gray-100"}`}
                      >
                        <span>{tab.label}</span>
                        {tab.subTabs && (
                          <ChevronDown
                            className={`w-5 h-5 transition-transform ${openDropdown === tab.id ? "rotate-180" : ""}`}
                          />
                        )}
                      </button>
                      {tab.subTabs && openDropdown === tab.id && (
                        <div className="pl-4 mt-1 space-y-1">
                          {tab.subTabs.map((subTab) => (
                            <a
                              href="#"
                              key={subTab.id}
                              onClick={(e) =>
                                handleSubTabClick(e, tab.id, subTab.id)
                              }
                              className={`block px-3 py-2 rounded-md text-base font-medium ${activeSubTab === subTab.id ? "text-orange-600 bg-orange-50" : "text-gray-600 hover:bg-gray-100"}`}
                            >
                              {subTab.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "career-guide" ? renderHomePage() : renderContentPage()}
      </div>
      <Footer />
    </div>
  );
};

export default CareerGuidePage;
