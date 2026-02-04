"use client";

import { CONTACT_SUBJECT_OPTIONS } from "@/consts/forms";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

import { submitContactForm } from "@/lib/contact-business";

import { FormInput } from "./form-input";
import { FormSelect } from "./form-select";

export function ContactForm() {
  const handleSubmit = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    await submitContactForm({
      name,
      email,
      phone: phone || undefined,
      subject,
      message,
    });
  };

  return (
    <form className="space-y-5" action={handleSubmit}>
      {/* Name and Email Row - 2 columns on desktop */}
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Name */}
        <FormInput
          label="Name"
          name="name"
          type="text"
          placeholder="Your full name"
          required
        />

        {/* Email */}
        <FormInput
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />
      </div>

      {/* Phone and Subject Row - 2 columns on desktop */}
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Phone */}
        <FormInput
          label="Phone (optional)"
          name="phone"
          type="number"
          placeholder="+91 98765 43210"
          className="appearance-none"
          inputMode="numeric"
        />

        {/* Subject */}
        <FormSelect
          label="Subject"
          name="subject"
          placeholder="What's this about?"
          options={CONTACT_SUBJECT_OPTIONS}
          required
        />
      </div>

      {/* Message */}
      <FormInput
        as="textarea"
        label="Message"
        name="message"
        rows={2}
        placeholder="Tell us how we can help..."
        className="min-h-[40px] resize-none"
        required
      />

      {/* Submit */}
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="h-12 w-full" size="lg" disabled={pending}>
      {pending ? "Sending..." : "Send Message"}
    </Button>
  );
}
