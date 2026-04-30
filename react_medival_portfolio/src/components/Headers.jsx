import { useRef, useState } from "react";
import { ArrowBigDown, ChevronRight, Menu, X } from "lucide-react";
import { cn } from "../lib/utils";

const HeaderComponent = () => {
    const [openMenu, setOpenMenu] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const timeoutRef = useRef(null);

    const menuItems = [
        { label: "ACCUEIL", href: "/", isTrigger: false },
        {
            label: "HOME", href: "/home", isTrigger: true, subItems: [
                { label: "hero", href: "#hero" },
                { label: "presentation", href: "#presentation" },
                { label: "languages", href: "#languages" },
                { label: "skills", href: "#skills" },
                { label: "projects", href: "#projects" },
                { label: "design", href: "#design" },
                { label: "about", href: "#about" },
                { label: "contact", href: "#contact" },
            ]
        },
        { label: "PROJETS", href: "/projects", isTrigger: false },
        { label: "My blogs", href: "/blogs", isTrigger: false },
        { label: "CMREF Portfolio", href: "/CMREF", isTrigger: false, color: "text-emerald-600 hover:bg-emerald-50 hover:text-emerald-900" },
        { label: "Kids Typing Game", href: "/fallingletters", isTrigger: false, color: "bg-blue-600 text-white hover:bg-blue-50 hover:text-rose-900" },
    ];

    const handleMouseEnter = (label) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setOpenMenu(label);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setOpenMenu(null), 150);
    };

    return (
        <header className="w-[98%] mx-auto mt-2 bg-white rounded-lg shadow-sm border border-slate-100 sticky top-0 z-50">
            <div className="px-4 h-14 flex items-center justify-between">

                {/* Mobile Toggle */}
                <button className="lg:hidden p-2 text-slate-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center space-x-1 w-full justify-center">
                    {menuItems.map((item, index) => (
                        <div
                            key={index}
                            className="relative"
                            onMouseEnter={() => item.isTrigger && handleMouseEnter(item.label)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <a
                                href={item.href || "#"}
                                className={`px-3 py-2 rounded-md text-xs font-bold transition-all duration-200 flex items-center gap-1 ${item.color || "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`
                                }
                            >
                                {item.label}
                                {item.isTrigger && <ArrowBigDown size={14} className="fill-current" />}
                            </a>

                            {/* Dropdown */}
                            {item.isTrigger && openMenu === item.label && (
                                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-slate-100 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                    {item.subItems.map((subItem, subIndex) => (
                                        <div key={subIndex} className="relative group">
                                            <a
                                                href={subItem.href || "#"}
                                                className={`block px-4 py-2 text-xs font-semibold transition-colors duration-150 ${subItem.color || "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                                    }`}
                                            >
                                                {subItem.label}
                                                {subItem.subItems && <ChevronRight size={12} />}
                                            </a>
                                            {/* Render Nested Level */}
                                            {subItem.subItems && (
                                                <div className="hidden group-hover:block">
                                                    <DesktopSubMenu items={subItem.subItems} />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>
                    ))}
                </nav>
            </div>
            {/* Mobile Nav */}
            {isMobileMenuOpen && (
                <nav className="lg:hidden border-t border-slate-100 bg-white rounded-b-lg overflow-hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <MobileMenu items={menuItems} />
                    </div>
                </nav>
            )}
        </header>
    )
}

const MobileMenu = ({ items, level = 0 }) => {
    return items.map((item, index) => (
        <div key={index} className={level > 0 ? "pl-4" : ""}>
            <a
                href={item.href || "#"}
                className={cn(
                    "block px-3 py-2 rounded-md font-bold transition-colors",
                    level === 0 ? "text-sm text-slate-600" : "text-xs text-slate-500",
                    item.color || "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                    "hover:bg-slate-50 hover:text-slate-900"
                )}
            >
                {item.label}
            </a>
            {item.subItems && (
                <div className="border-l border-slate-100 ml-3">
                    <MobileMenu items={item.subItems} level={level + 1} />
                </div>
            )}
        </div>
    ));
};

const DesktopSubMenu = ({ items }) => (
    <div className="absolute top-0 left-full -ml-0.5 w-56 bg-white rounded-md shadow-lg border border-slate-100 py-1 z-50 group-hover:block hidden animate-in fade-in slide-in-from-left-2 duration-200">
        {items.map((item, idx) => (
            <div key={idx} className="relative group">
                <a
                    href={item.href || "#"}
                    className="flex items-center justify-between px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                    {item.label}
                    {item.subItems && <ChevronRight size={12} />}
                </a>
                {item.subItems && (
                    <div className="hidden group-hover:block">
                        <DesktopSubMenu items={item.subItems} />
                    </div>
                )}
            </div>
        ))}
    </div>
);

export default HeaderComponent;