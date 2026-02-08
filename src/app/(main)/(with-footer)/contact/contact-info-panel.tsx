import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { getWhatsAppBaseUrl } from "@/lib/contact-business";

import { InstagramIcon } from "./instagram-icon";
import { WhatsAppIcon } from "./whatsapp-icon";

export function ContactInfoPanel() {
  const whatsappLink = getWhatsAppBaseUrl();

  return (
    <div className="bg-primary relative order-2 p-8 lg:order-1 lg:col-span-2 lg:p-10">
      <div className="bg-primary-dark/20 absolute -bottom-16 -left-16 h-40 w-40 rounded-full" />
      <div className="bg-primary-dark/10 absolute -bottom-8 -left-8 h-24 w-24 rounded-full" />

      <div className="relative">
        <h2 className="font-display text-xl font-semibold text-white">
          Contact Information
        </h2>
        <p className="mt-2 text-sm text-white/80">
          Fill out the form and our team will get back to you within 24 hours.
        </p>

        <div className="mt-10 space-y-6">
          <Link
            href="tel:+918329026762"
            className="flex items-center gap-4 text-white transition-opacity hover:opacity-80"
          >
            <Phone className="h-5 w-5" />
            <span className="text-sm">+91 83290 26762</span>
          </Link>

          <Link
            href="mailto:poetryandpottery.aj@gmail.com"
            className="flex items-center gap-4 text-white transition-opacity hover:opacity-80"
          >
            <Mail className="h-5 w-5" />
            <span className="text-sm">poetryandpottery.aj@gmail.com</span>
          </Link>

          <div className="flex items-center gap-4 text-white">
            <MapPin className="h-5 w-5 shrink-0" />
            <span className="text-sm">Sangli, Maharashtra, India</span>
          </div>
        </div>

        <div className="mt-16 flex gap-4">
          <Link
            href="https://instagram.com/poetryandpottery_"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Instagram"
          >
            <InstagramIcon className="h-4 w-4" />
          </Link>
          {whatsappLink ? (
            <Link
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
