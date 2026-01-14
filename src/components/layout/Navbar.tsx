import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { servicesData } from "@/data/services";
import { ModeToggle } from "@/components/mode-toggle";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services", isMegaMenu: true },
  { name: "Industries", path: "/industries" },
  { name: "Resources", path: "/resources" },
  { name: "Pricing", path: "/pricing" },
  { 
    name: "Company", 
    path: "/company",
    dropdownItems: [
      { name: "About", path: "/company" },
      { name: "Careers", path: "/careers" },
      { name: "Contact Us", path: "/contact" },
    ]
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>(
    servicesData[0].category
  );
  const location = useLocation();

  const handleMouseEnter = (name: string) => {
    setActiveMenu(name);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  // Reset active category when menu closes
  useEffect(() => {
    if (activeMenu !== "Services") {
      // Small delay to prevent flashing if quickly re-entering
      const timer = setTimeout(() => {
        setActiveCategory(servicesData[0].category);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [activeMenu]);

  const currentCategoryData = servicesData.find(
    (c) => c.category === activeCategory
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border/50">
      <nav className="container-page relative" onMouseLeave={handleMouseLeave}>
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/Balgin-black.png" 
              alt="Balgin Logo" 
              className="h-8 w-auto block dark:hidden" 
            />
            <img 
              src="/Balgin-white.png" 
              alt="Balgin Logo" 
              className="h-8 w-auto hidden dark:block" 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.path}
                onMouseEnter={() => handleMouseEnter(link.name)}
                className="relative py-4" // Added padding to bridge gap to menu
              >
                <Link
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-accent flex items-center gap-1 ${location.pathname === link.path
                    ? "text-foreground"
                    : "text-muted-foreground"
                    }`}
                >
                  {link.name}
                  {(link.isMegaMenu || link.dropdownItems) && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${activeMenu === link.name ? "rotate-180" : ""
                        }`}
                    />
                  )}
                </Link>

                {/* Regular Dropdown */}
                {link.dropdownItems && activeMenu === link.name && (
                  <div className="absolute top-full left-0 w-48 bg-background border border-border/50 rounded-xl shadow-lg overflow-hidden py-2 animate-in fade-in zoom-in-95 duration-200">
                    {link.dropdownItems?.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="block px-4 py-2 text-sm text-muted-foreground hover:bg-foreground hover:text-background transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <ModeToggle />
            <Button variant="accent" size="default" asChild>
              <Link to="/company#contact">Talk to Experts</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <ModeToggle />
            <button
              className="p-2 text-foreground"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mega Menu (Desktop) */}
        {activeMenu === "Services" && (
          <div
            className="absolute left-0 right-0 top-full"
            onMouseEnter={() => setActiveMenu("Services")}
          >
            <div className="bg-background border border-border rounded-b-xl shadow-lg mx-auto overflow-hidden max-w-7xl">
              <div className="flex">
                {/* Left Column: Categories */}
                <div className="w-1/4 bg-muted/30 border-r border-border/50 py-8">
                  {servicesData.map((category) => (
                    <div
                      key={category.category}
                      onMouseEnter={() => setActiveCategory(category.category)}
                      className={`px-8 py-4 cursor-pointer flex items-center gap-3 group transition-all duration-200 relative ${activeCategory === category.category
                        ? "bg-background border-l-4 border-accent text-foreground font-medium shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border-l-4 border-transparent"
                        }`}
                    >
                      <category.icon
                        size={20}
                        className={
                          activeCategory === category.category
                            ? "text-accent"
                            : "text-muted-foreground group-hover:text-foreground"
                        }
                      />
                      <span className="text-base whitespace-nowrap">{category.category}</span>
                      {activeCategory === category.category && (
                        <ChevronRight
                          size={16}
                          className="text-accent absolute right-4"
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Right Column: Services */}
                <div className="w-3/4 p-10 min-h-[450px] bg-background">
                  {currentCategoryData && (
                    <div
                      key={currentCategoryData.category}
                      className="grid grid-cols-3 gap-8"
                    >
                      {currentCategoryData.items.map((item) => (
                        <div key={item.title} className="space-y-4">
                          <Link
                            to="/services"
                            className="block font-bold text-lg text-foreground hover:text-accent transition-colors border-b border-border/40 pb-2"
                          >
                            {item.title}
                          </Link>
                          <ul className="space-y-2.5">
                            {item.services.map((service) => (
                              <li key={service}>
                                <Link
                                  to="/services"
                                  className="block text-sm text-muted-foreground hover:bg-foreground hover:text-background px-2 py-1 -ml-2 rounded-md transition-colors duration-200 leading-relaxed"
                                >
                                  {service}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden overflow-hidden bg-background border-t border-border/50 animate-in slide-in-from-top-5 duration-200">
            <div className="py-4 space-y-4 h-[calc(100vh-4rem)] overflow-y-auto px-4 pb-20">
              {navLinks.map((link) => (
                <div key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => !link.isMegaMenu && !link.dropdownItems && setIsOpen(false)}
                    className={`block text-lg font-medium transition-colors hover:text-accent py-2 ${location.pathname === link.path
                      ? "text-foreground"
                      : "text-muted-foreground"
                      }`}
                  >
                    {link.name}
                  </Link>
                  {link.isMegaMenu && (
                    <div className="pl-4 space-y-4 mt-2 border-l border-border/50 ml-2">
                      {servicesData.map((category) => (
                        <div key={category.category} className="space-y-2">
                          <h4 className="text-sm font-medium text-foreground/80 uppercase tracking-wide py-1 flex items-center gap-2">
                            <category.icon size={16} />
                            {category.category}
                          </h4>
                          <div className="space-y-2 pl-2 border-l border-border/30 ml-1">
                            {category.items.map((item) => (
                              <div key={item.title} className="space-y-1">
                                <span className="text-xs font-semibold text-muted-foreground/80 block mt-2 mb-1">
                                  {item.title}
                                </span>
                                {item.services.map((service) => (
                                  <Link
                                    key={service}
                                    to="/services"
                                    onClick={() => setIsOpen(false)}
                                    className="block text-sm text-muted-foreground hover:text-accent transition-colors"
                                  >
                                    {service}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Regular Dropdown (Mobile) */}
                  {link.dropdownItems && (
                    <div className="pl-4 space-y-2 mt-2 border-l border-border/50 ml-2">
                      {link.dropdownItems?.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className="block text-sm text-muted-foreground hover:text-accent transition-colors py-1"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Button variant="accent" size="default" className="w-full mt-8" asChild>
                <Link to="/company#contact" onClick={() => setIsOpen(false)}>Talk to Experts</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
