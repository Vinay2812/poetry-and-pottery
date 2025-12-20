import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { Separator } from "../ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="container mx-auto mt-auto">
      <div className="mx-auto px-4 pt-12 pb-24 lg:pb-12">
        <Separator className="border-border mb-8 border-t lg:mb-16" />
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full">
                <span className="text-sm font-bold text-white">P</span>
              </div>
              <span className="bg-gradient-to-r from-neutral-900 to-neutral-600 bg-clip-text text-lg font-bold text-transparent dark:from-neutral-100 dark:to-neutral-400">
                Poetry & Pottery
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Hand-thrown porcelain designed to ground your daily moments in
              nature.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="mb-4 font-semibold">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products?category=vases"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-150"
                >
                  Vases
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=plates"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-150"
                >
                  Plates
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=mugs"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-150"
                >
                  Mugs
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=planters"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-150"
                >
                  Planters
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 font-semibold">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-150"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-150"
                >
                  Workshops
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-150"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-4 font-semibold">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shipping"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-150"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-150"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/care"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-150"
                >
                  Care Instructions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h4 className="mb-4 font-semibold">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                <span className="text-muted-foreground text-sm">
                  Sangli, Maharashtra, India
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="text-primary h-4 w-4 shrink-0" />
                <span className="text-muted-foreground text-sm">
                  Tue-Sat: 10am-6pm
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="text-primary h-4 w-4 shrink-0" />
                <a
                  href="mailto:hello@poetryandpottery.com"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-150"
                >
                  support
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="text-primary h-4 w-4 shrink-0" />
                <a
                  href="tel:+919876543210"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-150"
                >
                  +91 98765 43210
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="border-border mt-8 border-t lg:mt-16" />

        <div className="text-muted-foreground pt-8 text-center text-sm lg:pt-16">
          © {currentYear} Poetry & Pottery. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
