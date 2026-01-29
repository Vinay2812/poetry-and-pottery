"use client";

import {
  Contact,
  Image as ImageIcon,
  Loader2,
  Save,
  Share2,
} from "lucide-react";
import { useCallback, useState } from "react";
import { useFormStatus } from "react-dom";

import { OptimizedImage } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type { SettingsFormProps, SettingsTab } from "../types";

interface ImagePreviewProps {
  src: string;
  alt: string;
}

function ImagePreview({ src, alt }: ImagePreviewProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return null;
  }

  return (
    <div className="relative mt-2 aspect-video w-full overflow-hidden rounded-lg border bg-neutral-100">
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setHasError(true)}
      />
    </div>
  );
}

export function SettingsForm({
  viewModel,
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

  const handleHeroImagesSave = useCallback(async () => {
    await onHeroImagesChange(heroImages);
  }, [heroImages, onHeroImagesChange]);

  const handleContactInfoSave = useCallback(async () => {
    await onContactInfoChange(contactInfo);
  }, [contactInfo, onContactInfoChange]);

  const handleSocialLinksSave = useCallback(async () => {
    await onSocialLinksChange(socialLinks);
  }, [socialLinks, onSocialLinksChange]);

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
          <form className="rounded-lg border p-6" action={handleHeroImagesSave}>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Hero Images</h3>
                <p className="text-muted-foreground text-sm">
                  Configure the hero banner images for different pages.
                </p>
              </div>
              <SettingsSaveButton />
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
                <ImagePreview src={heroImages.home} alt="Home page hero" />
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
                <ImagePreview src={heroImages.ourStory} alt="About page hero" />
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
                <ImagePreview
                  src={heroImages.products}
                  alt="Products page hero"
                />
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
                <ImagePreview src={heroImages.events} alt="Events page hero" />
              </div>
            </div>
          </form>
        </TabsContent>

        {/* Contact Info Tab */}
        <TabsContent value="contact" className="space-y-6 pt-6">
          <form
            className="rounded-lg border p-6"
            action={handleContactInfoSave}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Contact Information</h3>
                <p className="text-muted-foreground text-sm">
                  Update your business contact details.
                </p>
              </div>
              <SettingsSaveButton />
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
          </form>
        </TabsContent>

        {/* Social Links Tab */}
        <TabsContent value="social" className="space-y-6 pt-6">
          <form
            className="rounded-lg border p-6"
            action={handleSocialLinksSave}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Social Media Links</h3>
                <p className="text-muted-foreground text-sm">
                  Configure your social media profile links.
                </p>
              </div>
              <SettingsSaveButton />
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
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SettingsSaveButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} size="sm">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : (
        <Save className="mr-2 h-4 w-4" />
      )}
      Save Changes
    </Button>
  );
}
