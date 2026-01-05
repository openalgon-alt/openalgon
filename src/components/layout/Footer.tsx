import { Link } from "react-router-dom";

const footerLinks = {
  services: [
    { name: "AI & Automation", path: "/services#ai" },
    { name: "Web & Mobile Apps", path: "/services#web" },
    { name: "Product Engineering", path: "/services#product" },
    { name: "Cloud Engineering", path: "/services#cloud" },
  ],
  company: [
    { name: "About Us", path: "/company" },
    { name: "Careers", path: "/company#careers" },
    { name: "Contact", path: "/company#contact" },
  ],
  resources: [
    { name: "Insights", path: "/resources#insights" },
    { name: "Case Studies", path: "/resources#cases" },
    { name: "Guides", path: "/resources#guides" },
  ],
};

export const Footer = () => {
  return (
    <footer className="section-dark">
      <div className="container-page py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold tracking-tight">OpenAlgon</span>
            </Link>
            <p className="text-dark-foreground/70 text-sm leading-relaxed max-w-xs">
              The team behind intelligent systems. We build technology that transforms businesses.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-dark-foreground/50">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-dark-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-dark-foreground/50">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-dark-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-dark-foreground/50">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-dark-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-dark-foreground/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-dark-foreground/50">
              © {new Date().getFullYear()} OpenAlgon. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/privacy"
                className="text-sm text-dark-foreground/50 hover:text-accent transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-dark-foreground/50 hover:text-accent transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
