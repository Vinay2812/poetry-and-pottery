"use client";

import { CONTACT_SUBJECT_OPTIONS } from "@/consts/forms";
import { ArrowRight } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

import { FormInput } from "./form-input";
import { FormSelect } from "./form-select";

export function ContactForm() {
  const handleSubmit = async () => {
    // Form submission logic would go here
  };

  return (
    <div className="shadow-card overflow-hidden rounded-3xl bg-white p-8 lg:p-10">
      <form className="space-y-5" action={handleSubmit}>
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
        <SubmitButton />
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="shadow-primary/20 h-12 w-full rounded-full shadow-lg"
      size="lg"
      disabled={pending}
    >
      {pending ? "Sending..." : "Send Message"}
      <ArrowRight className="ml-2 h-5 w-5" />
    </Button>
  );
}
