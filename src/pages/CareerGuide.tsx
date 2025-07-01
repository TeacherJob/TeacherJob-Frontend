import { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ChevronDown,
  Briefcase,
  FileText,
  MessageSquare,
  ArrowRight,
  Rocket,
} from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useGetAllCareerArticlesQuery } from "@/features/admin/adminApiService";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

// --- Components (ArticleCard, Skeleton, etc.) remain the same ---
const ArticleCard = ({ article }: { article: any }) => (
  <Link
    to={`/career-guide/${article.slug}`}
    className="group bg-subtle rounded-2xl overflow-hidden shadow-md border border-border hover:border-primary/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
  >
    <div className="relative overflow-hidden">
      <img
        src={article?.image?.url}
        alt={article.title}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <p className="text-sm font-semibold text-primary mb-2">
        {article.category}
      </p>
      <h3 className="text-lg font-bold text-main mb-2 text-left">
        {article.title}
      </h3>
      <p className="text-sm text-secondary leading-relaxed line-clamp-3 mb-4 text-left flex-grow">
        {article.summary}
      </p>
      <div className="font-semibold text-primary flex items-center justify-start gap-1.5 text-sm transition-colors group-hover:text-primary/80">
        Read Article
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  </Link>
);

const ArticleCardSkeleton = () => (
  <div className="bg-subtle rounded-2xl overflow-hidden shadow-md border border-border">
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
  <div className="py-16 sm:py-20 relative overflow-hidden bg-main">
    <div
      className="absolute -inset-x-32 -top-48 -bottom-32 transform-gpu overflow-hidden blur-3xl"
      aria-hidden="true"
    >
      <div
        className={`relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] ${theme.bgGradient} opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]`}
      ></div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="text-left md:text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-main">
          {title}
        </h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-secondary">
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
          <div className="col-span-full mt-16 text-center text-secondary italic">
            No articles yet for this category.
          </div>
        )}
      </div>
      <div className="mt-16 text-center">
        <button
          onClick={() => onExploreClick(categoryId)}
          className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
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
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary w-5 h-5" />
          <Input
            placeholder="Search for articles..."
            className="h-14 pl-14 w-full text-md bg-subtle text-main rounded-full border-2 border-border shadow-lg focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </form>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onExploreClick(theme.id)}
            className="group flex items-center justify-center gap-2 bg-subtle px-4 py-3 rounded-full border border-border shadow-sm hover:shadow-lg hover:border-primary/60 transition-all"
          >
            {theme.icon}
            <span className="font-semibold text-secondary group-hover:text-main text-sm">
              {theme.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  </section>
);


const CareerGuidePage = () => {
  const [activeTab, setActiveTab] = useState("career-guide");
  const [activeSubTab, setActiveSubTab] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
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
      setIsScrollingUp(currentScrollY < lastScrollY.current || currentScrollY < 100);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      if (navRef.current && !navRef.current.contains(event.target as Node))
        setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const mainNav = [
    {
      id: "finding-a-job",
      label: "Finding a Job",
      subTabs: [{ id: "finding-a-job", label: "Job Search Advice" }],
    },
    {
      id: "resumes-cover-letters",
      label: "Resumes & Letters",
      subTabs: [
        { id: "resumes-cover-letters", label: "Resume & Cover Letter Advice" },
        { id: "resume-samples", label: "Resume Samples" },
        { id: "cover-letter-samples", label: "Cover Letter Samples" },
      ],
    },
    {
      id: "interviewing",
      label: "Interviewing",
      subTabs: [{ id: "interviewing", label: "Interviewing Tips" }],
    },
    {
      id: "pay-salary",
      label: "Pay & Salary",
      subTabs: [{ id: "pay-salary", label: "Salary Negotiation" }],
    },
    {
      id: "career-development",
      label: "Career Development",
      subTabs: [
        { id: "career-development", label: "Career Development Advice" },
        { id: "starting-a-new-job", label: "Starting a New Job" },
      ],
    },
  ];

  const pageData: {
    [key: string]: { title: string; subtitle: string; categoryKey?: string };
  } = {
    "career-guide": {
      title: "Career Guide",
      subtitle: "Your one-stop resource for career advice.",
    },
    // ... other pageData entries
  };

  const handleTabClick = (tabId: string, subTabId: string | null = null) => {
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
  };

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
    // ... themes data
  ];

  const renderHomePage = () => {
    // ... renderHomePage content
    return <></>; // Omitted for brevity
  };

  const renderContentPage = () => {
    // ... renderContentPage content
    return <></>; // Omitted for brevity
  };

  return (
    <div className="bg-main min-h-screen font-sans flex flex-col">
      {/* START: CORRECTED STRUCTURE */}
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
          className={`sticky z-40 border-b border-border transition-all duration-300 bg-white shadow-sm`}
          style={{ top: isScrollingUp ? `${headerHeight}px` : "0px" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <a href="#" onClick={handleLogoClick} className="mr-8 py-4">
                <span className="font-bold text-main text-lg">
                  Career Essentials
                </span>
              </a>
              <nav className="hidden md:flex items-center space-x-2">
                {mainNav.map((tab) => (
                  <div key={tab.id} className="relative">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (tab.subTabs && tab.subTabs.length > 0) {
                          handleDropdownToggle(tab.id);
                        } else {
                           handleTabClick(tab.id);
                        }
                      }}
                      className={`flex items-center text-sm font-semibold px-4 py-5 transition-colors duration-200 relative ${
                        activeTab === tab.id
                          ? "text-orange-600"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {tab.label}
                      {tab.subTabs && tab.subTabs.length > 0 && (
                        <ChevronDown
                          className={`w-5 h-5 ml-1.5 transition-transform duration-200 ${openDropdown === tab.id ? "rotate-180" : ""}`}
                        />
                      )}
                      {activeTab === tab.id && !openDropdown && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-orange-500 rounded-full"></span>
                      )}
                    </button>
                    {tab.subTabs && openDropdown === tab.id && (
                      <div className="absolute left-0 mt-1 w-64 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200 animate-in fade-in-20 zoom-in-95">
                        {tab.subTabs.map((subTab) => (
                          <a
                            key={subTab.id}
                            href="#"
                            onClick={(e) => {
                              handleSubTabClick(e, tab.id, subTab.id);
                            }}
                            className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${
                              activeSubTab === subTab.id
                                ? "font-semibold text-orange-600 bg-orange-50"
                                : "text-gray-700"
                            } hover:bg-gray-100`}
                          >
                            {subTab.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {activeTab === "career-guide" ? renderHomePage() : renderContentPage()}
      </div>
      <Footer />
      {/* --- END: CORRECTED STRUCTURE --- */}
    </div>
  );
};

export default CareerGuidePage;
