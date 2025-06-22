import {
  ShieldAlert,
  Twitter,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Clock,
  BarChart2,
  Scale,
  Lock,
  FileText,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Footer() {
  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        {
          name: "File Complaint",
          href: "#file",
          icon: <ShieldAlert className="w-4 h-4" />,
        },
        {
          name: "Dashboard",
          href: "#dashboard",
          icon: <BarChart2 className="w-4 h-4" />,
        },
        {
          name: "Legal AI",
          href: "#legal",
          icon: <Scale className="w-4 h-4" />,
        },
      ],
    },
    {
      title: "Resources",
      links: [
        {
          name: "Privacy Policy",
          href: "#privacy",
          icon: <Lock className="w-4 h-4" />,
        },
        {
          name: "Terms of Service",
          href: "#terms",
          icon: <FileText className="w-4 h-4" />,
        },
        { name: "FAQ", href: "#faq", icon: <HelpCircle className="w-4 h-4" /> },
      ],
    },
    {
      title: "Contact",
      links: [
        {
          name: "hello@verifir.com",
          href: "mailto:hello@verifir.com",
          icon: <Mail className="w-4 h-4" />,
        },
        {
          name: "+1 (555) 123-4567",
          href: "tel:+15551234567",
          icon: <Phone className="w-4 h-4" />,
        },
        {
          name: "9 AM - 5 PM, Monday to Friday",
          href: "#",
          icon: <Clock className="w-4 h-4" />,
        },
      ],
    },
  ];

  const socialLinks = [
    { name: "Twitter", href: "#", icon: <Twitter className="w-5 h-5" /> },
    { name: "GitHub", href: "#", icon: <Github className="w-5 h-5" /> },
    { name: "LinkedIn", href: "#", icon: <Linkedin className="w-5 h-5" /> },
  ];

  return (
    <footer className="bg-black/90 border-t border-orange-500/20 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center shadow-lg shadow-orange-600/20">
                <ShieldAlert className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                VeriFIR
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Empowering justice through AI and blockchain technology.
            </p>

            <div className="flex gap-4 pt-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-muted-foreground hover:text-orange-500 transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title} className="space-y-4">
              <h3 className="text-sm font-semibold text-orange-500 uppercase tracking-wider">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-orange-400 transition-colors"
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-orange-500 uppercase tracking-wider">
              Stay Updated
            </h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest updates.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-background/80 border border-orange-500/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500/50"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-orange-500/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} VeriFIR. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="#privacy"
              className="text-sm text-muted-foreground hover:text-orange-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#terms"
              className="text-sm text-muted-foreground hover:text-orange-400 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
