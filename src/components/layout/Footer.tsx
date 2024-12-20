import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Events</h3>
            <ul className="space-y-2">
              <li><Link href="/category/concerts" className="hover:text-primary transition-colors">Concerts</Link></li>
              <li><Link href="/category/sports" className="hover:text-primary transition-colors">Sports</Link></li>
              <li><Link href="/category/theatre" className="hover:text-primary transition-colors">Theatre</Link></li>
              <li><Link href="/category/comedy" className="hover:text-primary transition-colors">Comedy</Link></li>
              <li><Link href="/category/family" className="hover:text-primary transition-colors">Family</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/support/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/support/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/support/help" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link href="/support/shipping" className="hover:text-primary transition-colors">Shipping</Link></li>
              <li><Link href="/support/refunds" className="hover:text-primary transition-colors">Refunds</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/legal/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/legal/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
              <li><Link href="/legal/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link></li>
              <li><Link href="/legal/accessibility" className="hover:text-primary transition-colors">Accessibility</Link></li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>1-800-YOUR-TICKETS</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>support@yourchoicetickets.com</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <div className="flex gap-2">
                <Input placeholder="Enter your email" type="email" className="max-w-[200px]" />
                <Button>Subscribe</Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Follow Us</h3>
              <div className="flex space-x-4">
                <Link href="https://facebook.com" className="hover:text-primary transition-colors">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="https://twitter.com" className="hover:text-primary transition-colors">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="https://instagram.com" className="hover:text-primary transition-colors">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link href="https://youtube.com" className="hover:text-primary transition-colors">
                  <Youtube className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <Link href="/careers" className="hover:text-primary transition-colors">Careers</Link>
            <Link href="/press" className="hover:text-primary transition-colors">Press</Link>
            <Link href="/partnerships" className="hover:text-primary transition-colors">Partnerships</Link>
            <Link href="/sitemap" className="hover:text-primary transition-colors">Sitemap</Link>
          </div>
          <p>© 2024 Your Choice Tickets. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};