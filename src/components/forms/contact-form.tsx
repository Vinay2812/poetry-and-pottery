"use client";

import { CONTACT_SUBJECT_OPTIONS } from "@/consts/forms";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import { FormInput } from "./form-input";
import { FormSelect } from "./form-select";

export function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
  };

  return (
    <div className="shadow-card overflow-hidden rounded-3xl bg-white p-8 lg:p-10">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormInput
            label="Name"
            name="name"
            type="text"
            placeholder="Your name"
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="your@email.com"
          />
        </div>
        <FormSelect
          label="Subject"
          name="subject"
          placeholder="Select a topic"
          options={CONTACT_SUBJECT_OPTIONS}
        />
        <FormInput
          as="textarea"
          label="Message"
          name="message"
          rows={5}
          placeholder="Tell us what's on your mind..."
        />
        <Button
          type="submit"
          className="shadow-primary/20 h-12 w-full rounded-full shadow-lg"
          size="lg"
        >
          Send Message
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}
