"use client";

import {
  Contact,
  ExternalLink,
  Image as ImageIcon,
  Loader2,
  Save,
  Share2,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type { SettingsFormProps, SettingsTab } from "../types";

export function SettingsForm({
  viewModel,
  isPending,
  activeTab,
  onTabChange,
  onHeroImagesChange,
  onContactInfoChange,
  onSocialLinksChange,
}: SettingsFormProps) {
  // Local state for form inputs
  const [heroImages, setHeroImages] = useState(viewModel.heroImages);
  const [contactInfo, setContactInfo] = useState(viewModel.contactInfo);
  const [socialLinks, setSocialLinks] = useState(viewModel.socialLinks);

  const handleHeroImagesSave = () => {
    onHeroImagesChange(heroImages);
  };

  const handleContactInfoSave = () => {
    onContactInfoChange(contactInfo);
  };

  const handleSocialLinksSave = () => {
    onSocialLinksChange(socialLinks);
  };

  return (
    <div className="space-y-6">
      <Tabs
        value={activeTab}
        onValueChange={(v) => onTabChange(v as SettingsTab)}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="hero" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Hero Images</span>
            <span className="sm:hidden">Images</span>
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <Contact className="h-4 w-4" />
            <span className="hidden sm:inline">Contact Info</span>
            <span className="sm:hidden">Contact</span>
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Social Links</span>
            <span className="sm:hidden">Social</span>
          </TabsTrigger>
        </TabsList>

        {/* Hero Images Tab */}
        <TabsContent value="hero" className="space-y-6 pt-6">
          <div className="rounded-lg border p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Hero Images</h3>
                <p className="text-muted-foreground text-sm">
                  Configure the hero banner images for different pages.
                </p>
              </div>
              <Button
                onClick={handleHeroImagesSave}
                disabled={isPending}
                size="sm"
              >
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save Changes
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Home Page Hero</label>
                <Input
                  value={heroImages.home}
                  onChange={(e) =>
                    setHeroImages({ ...heroImages, home: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                />
                {heroImages.home && (
                  <a
                    href={heroImages.home}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary flex items-center gap-1 text-xs"
                  >
                    <ExternalLink className="h-3 w-3" /> Preview
                  </a>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">About Page Hero</label>
                <Input
                  value={heroImages.ourStory}
                  onChange={(e) =>
                    setHeroImages({ ...heroImages, ourStory: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                />
                {heroImages.ourStory && (
                  <a
                    href={heroImages.ourStory}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary flex items-center gap-1 text-xs"
                  >
                    <ExternalLink className="h-3 w-3" /> Preview
                  </a>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Products Page Hero
                </label>
                <Input
                  value={heroImages.products}
                  onChange={(e) =>
                    setHeroImages({ ...heroImages, products: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                />
                {heroImages.products && (
                  <a
                    href={heroImages.products}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary flex items-center gap-1 text-xs"
                  >
                    <ExternalLink className="h-3 w-3" /> Preview
                  </a>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Events Page Hero</label>
                <Input
                  value={heroImages.events}
                  onChange={(e) =>
                    setHeroImages({ ...heroImages, events: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                />
                {heroImages.events && (
                  <a
                    href={heroImages.events}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary flex items-center gap-1 text-xs"
                  >
                    <ExternalLink className="h-3 w-3" /> Preview
                  </a>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Contact Info Tab */}
        <TabsContent value="contact" className="space-y-6 pt-6">
          <div className="rounded-lg border p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Contact Information</h3>
                <p className="text-muted-foreground text-sm">
                  Update your business contact details.
                </p>
              </div>
              <Button
                onClick={handleContactInfoSave}
                disabled={isPending}
                size="sm"
              >
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save Changes
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Address</label>
                <Input
                  value={contactInfo.address}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, address: e.target.value })
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
                    setContactInfo({ ...contactInfo, email: e.target.value })
                  }
                  placeholder="hello@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <Input
                  value={contactInfo.phone}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, phone: e.target.value })
                  }
                  placeholder="+91 98765 43210"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Business Hours</label>
                <Input
                  value={contactInfo.hours}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, hours: e.target.value })
                  }
                  placeholder="Mon-Sat, 10am - 6pm"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Social Links Tab */}
        <TabsContent value="social" className="space-y-6 pt-6">
          <div className="rounded-lg border p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Social Media Links</h3>
                <p className="text-muted-foreground text-sm">
                  Configure your social media profile links.
                </p>
              </div>
              <Button
                onClick={handleSocialLinksSave}
                disabled={isPending}
                size="sm"
              >
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save Changes
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Instagram</label>
                <Input
                  value={socialLinks.instagram}
                  onChange={(e) =>
                    setSocialLinks({
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
                    setSocialLinks({ ...socialLinks, facebook: e.target.value })
                  }
                  placeholder="https://facebook.com/yourpage"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Twitter / X</label>
                <Input
                  value={socialLinks.twitter}
                  onChange={(e) =>
                    setSocialLinks({ ...socialLinks, twitter: e.target.value })
                  }
                  placeholder="https://twitter.com/yourprofile"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Pinterest</label>
                <Input
                  value={socialLinks.pinterest}
                  onChange={(e) =>
                    setSocialLinks({
                      ...socialLinks,
                      pinterest: e.target.value,
                    })
                  }
                  placeholder="https://pinterest.com/yourprofile"
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
