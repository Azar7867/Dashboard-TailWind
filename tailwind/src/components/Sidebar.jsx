import { useState, useRef, useEffect } from "react";
import {
  LayoutDashboard, BarChart3, Users, Folder, Settings, HelpCircle,
  X, PlayCircle, CheckCircle, FileText, CreditCard, ChevronLeft,
  PlusCircle, DollarSign, Car, Tag, Percent,ImageIcon
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { createPortal } from "react-dom";

const API_BASE = "http://localhost:5000/api/logo";

const menu = [
  {
    section: "Main",
    items: [
      { name: "Dashboard",   icon: LayoutDashboard, path: "/",                color: "purple", badge: null  },
      { name: "Analytics",   icon: BarChart3,        path: "/analytics",       color: "blue",   badge: "New" },
      { name: "Team",        icon: Users,            path: "/team",            color: "teal",   badge: null  },
      { name: "Projects",    icon: Folder,           path: "/projects",        color: "amber",  badge: null  },
    ],
  },
  {
    section: "Car Management",
    items: [
      { name: "Car Details", icon: Car,     path: "/cars",       color: "indigo" },
      { name: "Apply Offer", icon: Percent, path: "/offer",      color: "green"  },
      { name: "Offer Cars",  icon: Tag,     path: "/offer-cars", color: "rose"   },
    ],
  },
  {
    section: "Tasks",
    items: [
      { name: "All Tasks",   icon: LayoutDashboard, path: "/tasks",       color: "sky",    badge: "12" },
      { name: "In Progress", icon: PlayCircle,       path: "/in-progress", color: "orange", badge: "5"  },
      { name: "Completed",   icon: CheckCircle,      path: "/completed",   color: "green",  badge: "28" },
    ],
  },
  {
    section: "Content",
    items: [
      { name: "Blog",      icon: FileText,   path: "/blog",            color: "pink",    badge: null },
      { name: "Pricing",   icon: CreditCard, path: "/pricing",         color: "rose",    badge: null },
      { name: "Add Plan",  icon: PlusCircle, path: "/add-plan",        color: "violet",  badge: null },
      { name: "Payments",  icon: DollarSign, path: "/payment-history", color: "emerald", badge: null },
    ],
  },
];

const footerItems = [
  { name: "Settings", icon: Settings,   path: "/settings", color: "slate" },
  { name: "Help",     icon: HelpCircle, path: "/help",     color: "blue"  },
];

const colorMap = {
  purple:  { bg: "bg-violet-100",  icon: "text-violet-600"  },
  blue:    { bg: "bg-blue-100",    icon: "text-blue-600"    },
  teal:    { bg: "bg-teal-100",    icon: "text-teal-600"    },
  amber:   { bg: "bg-amber-100",   icon: "text-amber-600"   },
  sky:     { bg: "bg-sky-100",     icon: "text-sky-600"     },
  orange:  { bg: "bg-orange-100",  icon: "text-orange-600"  },
  green:   { bg: "bg-green-100",   icon: "text-green-600"   },
  pink:    { bg: "bg-pink-100",    icon: "text-pink-600"    },
  rose:    { bg: "bg-rose-100",    icon: "text-rose-600"    },
  violet:  { bg: "bg-violet-100",  icon: "text-violet-500"  },
  emerald: { bg: "bg-emerald-100", icon: "text-emerald-600" },
  slate:   { bg: "bg-slate-100",   icon: "text-slate-500"   },
  indigo:  { bg: "bg-indigo-100",  icon: "text-indigo-600"  },
};

const badgeStyle = (badge) => {
  if (badge === "New") return "bg-blue-50 text-blue-600";
  if (Number(badge) > 10) return "bg-green-50 text-green-600";
  return "bg-amber-50 text-amber-600";
};

function PortalTooltip({ name, badge, anchorRef, visible }) {
  if (!visible || !anchorRef.current) return null;
  const rect = anchorRef.current.getBoundingClientRect();
  return createPortal(
    <div
      style={{
        position: "fixed",
        top: rect.top + rect.height / 2,
        left: rect.right + 10,
        transform: "translateY(-50%)",
        zIndex: 9999,
        pointerEvents: "none",
      }}
      className="flex items-center gap-1.5 bg-[#1A1D27] text-[#F1F3F8] text-[12px] font-medium tracking-tight px-3 py-1.5 rounded-[9px] shadow-[0_4px_20px_rgba(0,0,0,.28)] whitespace-nowrap select-none animate-in fade-in zoom-in-95 duration-150"
    >
      <span className="absolute -left-[5px] top-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-[#1A1D27] rounded-[2px]" />
      {name}
      {badge && (
        <span className="ml-1 bg-white/20 px-1.5 py-[1px] rounded-full text-[10px] font-semibold">
          {badge}
        </span>
      )}
    </div>,
    document.body
  );
}

function NavItem({ item, collapsed, onNavigate }) {
  const Icon = item.icon;
  const colors = colorMap[item.color] || colorMap.slate;
  const rowRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative"
      ref={rowRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <NavLink
        to={item.path}
        end={item.path === "/"}
        onClick={onNavigate}
        className={({ isActive }) =>
          `flex items-center gap-2.5 px-2 py-2 rounded-[10px] transition-colors duration-150 cursor-pointer
           ${isActive ? "bg-[#EEF2FF]" : "hover:bg-[#F5F6FA]"}`
        }
      >
        {({ isActive }) => (
          <>
            <div
              className={`w-[34px] h-[34px] rounded-[9px] flex items-center justify-center flex-shrink-0 transition-transform duration-150
                ${hovered ? "scale-105" : ""}
                ${isActive ? "bg-violet-100" : colors.bg}`}
            >
              <Icon size={15} className={isActive ? "text-violet-600" : colors.icon} strokeWidth={2} />
            </div>
            <span
              className={`text-[15.5px] font-medium flex-1 whitespace-nowrap overflow-hidden transition-[opacity,max-width] duration-200
                ${collapsed ? "opacity-0 max-w-0 pointer-events-none" : "opacity-100 max-w-[140px]"}
                ${isActive ? "text-[#4338CA] !font-bold" : "text-[#4B5563]"}`}
            >
              {item.name}
            </span>
            {item.badge && (
              <span
                className={`text-[10px] font-semibold px-[7px] py-[2px] rounded-full leading-snug whitespace-nowrap flex-shrink-0 transition-[opacity,width,padding] duration-200
                  ${collapsed ? "opacity-0 w-0 overflow-hidden !px-0" : "opacity-100"}
                  ${badgeStyle(item.badge)}`}
              >
                {item.badge}
              </span>
            )}
          </>
        )}
      </NavLink>
      {collapsed && (
        <PortalTooltip name={item.name} badge={item.badge} anchorRef={rowRef} visible={hovered} />
      )}
    </div>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────

export default function Sidebar({ isOpen, toggleSidebar}) {
  const [collapsed, setCollapsed] = useState(false);
  const [logoUrl, setLogoUrl] = useState(null); // ✅ local state, no prop needed
  const [loading, setLoading] = useState(true);

  // ── Fetch logo from API on mount ──
  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await fetch(API_BASE);
        const data = await res.json();
        if (data?.data?.url) {
          setLogoUrl(data.data.url); // ✅ set directly from API
        }
      } catch (err) {
        console.error("Logo fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogo();
  }, []);// ✅ runs once on mount — correct

  useEffect(() => {
    const handler = (e) => setLogoUrl(e.detail);
    window.addEventListener("logo-updated", handler);
    return () => window.removeEventListener("logo-updated", handler);
  }, []);

  const handleMobileNav = () => { if (window.innerWidth < 1024) toggleSidebar(); };

  return (
    <>
     {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden" onClick={toggleSidebar} />
      )}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col h-screen bg-white border-r border-[#ECEEF3]
        transition-[width,min-width] duration-[320ms] ease-[cubic-bezier(.4,0,.2,1)] overflow-visible
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${collapsed ? "w-[64px] min-w-[64px]" : "w-[240px] min-w-[240px]"}`}
      >
        <div className="flex items-center justify-between px-3.5 py-[18px] border-b border-[#F0F2F7] min-h-[62px] gap-2">
          <div className="flex items-center gap-2.5 overflow-hidden min-w-0">
            {loading ? (
              <div className="w-[34px] h-[34px] rounded-[10px] bg-gray-100 animate-pulse flex-shrink-0" />
            ) : logoUrl ? (
              <img src={logoUrl} alt="Logo" className="w-[200px] h-[44px] rounded-[10px] object-contain flex-shrink-0" />
            ) : (
              <div className="w-[34px] h-[34px] rounded-[10px] bg-gray-100 flex items-center justify-center flex-shrink-0">
                <ImageIcon size={16} className="text-gray-400" />
              </div>
            )}
          </div>

          {/* Desktop collapse toggle */}
          <button
            onClick={() => setCollapsed((p) => !p)}
            className="hidden lg:flex w-[28px] h-[28px] items-center justify-center flex-shrink-0 rounded-[8px] border border-[#E8EAF0] bg-[#F8F9FB] hover:bg-[#EEF2FF] hover:border-[#C7D0F8] transition-colors duration-150 cursor-pointer"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft
              size={13}
              className={`text-[#6B7280] transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
            />
          </button>

          {/* Mobile close */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden flex w-[28px] h-[28px] items-center justify-center rounded-[8px] hover:bg-slate-100 transition-colors"
          >
            <X size={16} className="text-slate-500" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto overflow-x-visible px-2.5 py-3 flex flex-col gap-[2px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {menu.map((group, gi) => (
            <div key={group.section}>
              {gi > 0 && <div className="h-px bg-[#F0F2F7] mx-2 my-1" />}
              <p
                className={`text-[9.5px] font-semibold uppercase tracking-[0.9px] text-[#B0B7C9] px-2 whitespace-nowrap mb-1
                  transition-[opacity,height,padding,margin] duration-200
                  ${collapsed ? "opacity-0 h-0 overflow-hidden !p-0 !m-0" : "opacity-100 pt-2.5 pb-1"}`}
              >
                {group.section}
              </p>
              {group.items.map((item) => (
                <NavItem key={item.path} item={item} collapsed={collapsed} onNavigate={handleMobileNav} />
              ))}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-2.5 py-2.5 border-t border-[#F0F2F7] flex flex-col gap-[2px]">
          {footerItems.map((item) => (
            <NavItem key={item.path} item={item} collapsed={collapsed} onNavigate={handleMobileNav} />
          ))}
        </div>
      </aside>
    </>
  );
}