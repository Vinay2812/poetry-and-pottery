"use client";

import { Input } from "@/components/ui/input";

import type { SocialLinksViewModel } from "../types";

interface SocialLinksTabContentProps {
  socialLinks: SocialLinksViewModel;
  onSocialLinksChange: (links: SocialLinksViewModel) => void;
}

export function SocialLinksTabContent({
  socialLinks,
  onSocialLinksChange,
}: SocialLinksTabContentProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="space-y-2">
        <label className="text-sm font-medium">Instagram</label>
        <Input
          value={socialLinks.instagram}
          onChange={(e) =>
            onSocialLinksChange({
              ...socialLinks,
              instagram: e.target.value,
            })
          }
          placeholder="https://instagram.com/yourprofile"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Facebook</label>
        <Input
          value={socialLinks.facebook}
          onChange={(e) =>
            onSocialLinksChange({ ...socialLinks, facebook: e.target.value })
          }
          placeholder="https://facebook.com/yourpage"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Twitter / X</label>
        <Input
          value={socialLinks.twitter}
          onChange={(e) =>
            onSocialLinksChange({ ...socialLinks, twitter: e.target.value })
          }
          placeholder="https://twitter.com/yourprofile"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Pinterest</label>
        <Input
          value={socialLinks.pinterest}
          onChange={(e) =>
            onSocialLinksChange({
              ...socialLinks,
              pinterest: e.target.value,
            })
          }
          placeholder="https://pinterest.com/yourprofile"
        />
      </div>
    </div>
  );
}
