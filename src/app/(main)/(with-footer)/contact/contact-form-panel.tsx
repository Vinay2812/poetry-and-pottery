import { ContactForm } from "@/components/forms";

export function ContactFormPanel() {
  return (
    <div className="order-1 p-8 lg:order-2 lg:col-span-3 lg:p-10">
      <h1 className="font-display text-2xl font-bold text-neutral-900">
        Contact Us
      </h1>
      <p className="mt-2 text-sm text-neutral-600">
        Have a question or want to work together? We&apos;d love to hear from
        you.
      </p>

      <div className="mt-8">
        <ContactForm />
      </div>
    </div>
  );
}
