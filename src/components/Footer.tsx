import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Github,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Hash,
  Star,
  Zap,
} from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
  const additionalButtons = [
    { label: "#", icon: Hash, description: "Numbers" },
    { label: "★", icon: Star, description: "Popular" },
    { label: "⚡", icon: Zap, description: "Latest" },
  ]

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Browse Anime", href: "/browse" },
    { label: "Top Rated", href: "/top-rated" },
    { label: "Latest Episodes", href: "/latest" },
    { label: "Movies", href: "/movies" },
    { label: "Genres", href: "/genres" },
  ]

  const supportLinks = [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "Report Issue", href: "/report" },
    { label: "Request Anime", href: "/request" },
    { label: "FAQ", href: "/faq" },
    { label: "Terms of Service", href: "/terms" },
  ]

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "DMCA", href: "/dmca" },
    { label: "Cookie Policy", href: "/cookies" },
  ]

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
    { icon: Github, href: "https://github.com", label: "GitHub" },
  ]

  return (
    <footer className="bg-white/10 dark:bg-gray-900/10 backdrop-blur-md border-t border-white/20 dark:border-gray-700/20 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">AnimeStream</h3>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Your ultimate destination for streaming anime content. Discover thousands of anime series and movies from
              around the world.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>Global Service</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-200 flex items-center gap-1 group"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-200 flex items-center gap-1 group"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Connect</h4>
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4" />
                <span>support@animestream.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
            <div className="flex gap-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-50/50 dark:hover:bg-cyan-900/20 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <Separator className="bg-white/20 dark:bg-gray-700/20 mb-8" />

        {/* Alphabet Navigation */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Browse by Letter</h4>
          <div className="flex flex-wrap gap-2">
            {alphabets.map((letter) => (
              <Link
                key={letter}
                href={`/browse?letter=${letter}`}
                className="w-10 h-10 p-0 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 hover:bg-cyan-50/50 dark:hover:bg-cyan-900/20 hover:border-cyan-300/50 dark:hover:border-cyan-700/50 text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 rounded-md flex items-center justify-center text-sm"
              >
                {letter}
              </Link>
            ))}
            {additionalButtons.map((btn, index) => (
              <Link
                key={index}
                href={`/browse?filter=${btn.description.toLowerCase()}`}
                className="w-10 h-10 p-0 bg-cyan-100/50 dark:bg-cyan-900/30 backdrop-blur-sm border border-cyan-300/50 dark:border-cyan-700/50 hover:bg-cyan-200/50 dark:hover:bg-cyan-800/30 text-cyan-700 dark:text-cyan-300 hover:text-cyan-800 dark:hover:text-cyan-200 transition-all duration-200 rounded-md flex items-center justify-center text-sm"
                title={btn.description}
              >
                {btn.label}
              </Link>
            ))}
          </div>
        </div>

        <Separator className="bg-white/20 dark:bg-gray-700/20 mb-6" />

        {/* Disclaimer */}
        <div className="py-2">
          <h5 className="text-sm font-semibold text-orange-800 dark:text-orange-300 mb-2">⚠️ Important Disclaimer</h5>
          <p className="text-xs text-orange-700 dark:text-orange-400 leading-relaxed">
            <strong>Content Notice:</strong> All anime content displayed on this website is not hosted on our servers.
            We do not store, upload, or distribute any copyrighted material. All content is sourced from third-party
            providers and we cannot guarantee the availability, quality, or legality of the content. We are not
            responsible for any copyright infringement or legal issues that may arise from the use of external content.
            Users access content at their own risk and discretion.
          </p>
        </div>

        {/* Legal Links and Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-4">
            {legalLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center md:text-right">
            <p>© {currentYear} Prabin Acharya. All rights reserved.</p>
            <p className="mt-1">Made with ❤️ for anime lovers worldwide</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
