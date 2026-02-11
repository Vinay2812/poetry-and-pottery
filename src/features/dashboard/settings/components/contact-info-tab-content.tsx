"use client";

import { Input } from "@/components/ui/input";

import type { ContactInfoViewModel } from "../types";

interface ContactInfoTabContentProps {
  contactInfo: ContactInfoViewModel;
  onContactInfoChange: (info: ContactInfoViewModel) => void;
}

export function ContactInfoTabContent({
  contactInfo,
  onContactInfoChange,
}: ContactInfoTabContentProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="space-y-2">
        <label className="text-sm font-medium">Address</label>
        <Input
          value={contactInfo.address}
          onChange={(e) =>
            onContactInfoChange({ ...contactInfo, address: e.target.value })
          }
          placeholder="123 Potter's Lane, Artisan District"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <Input
          type="email"
          value={contactInfo.email}
          onChange={(e) =>
            onContactInfoChange({ ...contactInfo, email: e.target.value })
          }
          placeholder="hello@example.com"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Phone</label>
        <Input
          value={contactInfo.phone}
          onChange={(e) =>
            onContactInfoChange({ ...contactInfo, phone: e.target.value })
          }
          placeholder="+91 98765 43210"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Business Hours</label>
        <Input
          value={contactInfo.hours}
          onChange={(e) =>
            onContactInfoChange({ ...contactInfo, hours: e.target.value })
          }
          placeholder="Mon-Sat, 10am - 6pm"
        />
      </div>
    </div>
  );
}
