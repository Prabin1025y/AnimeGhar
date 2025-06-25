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
  Play,
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
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">AnimeStream</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your gateway to the ultimate anime streaming experience. Discover, watch, and fall in love with anime.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Browse Anime
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  New Releases
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Top Rated
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Community
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />
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
        <Separator className="my-8 bg-gray-800" />

        <div className="flex flex-col sm:flex-row justify-between items-center text-gray-400">
          <p>&copy; 2025 AnimeStream. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              DMCA
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
