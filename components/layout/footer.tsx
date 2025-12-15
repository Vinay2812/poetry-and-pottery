import Link from "next/link";

import { Separator } from "../ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="container mx-auto mt-auto">
      <div className="mx-auto px-4 pt-12 pb-24 lg:pb-12">
        <Separator className="border-border mb-8 border-t lg:mb-16" />
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full">
                <span className="text-sm font-bold text-white">E</span>
              </div>
              <span className="text-lg font-semibold">Poetry & Pottery</span>
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
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Vases
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=plates"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Plates
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=mugs"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Mugs
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=planters"
                  className="text-muted-foreground hover:text-foreground text-sm"
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
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Workshops
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground text-sm"
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
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/care"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Care Instructions
                </Link>
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
