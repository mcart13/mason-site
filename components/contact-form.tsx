"use client";

import type { FormEvent } from "react";
import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    const mailto = `mailto:mason@cartwrightne.com?subject=Contact from ${name}&body=Name: ${name}%0AEmail: ${email}%0A%0AMessage:%0A${message}`;

    location.href = mailto;
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="p-8 bg-card border border-border rounded-lg">
        <p className="text-lg">
          Thanks for reaching out! Your email client should have opened. I&apos;ll
          get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="name">
          Name
        </label>
        <input
          className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background"
          id="name"
          name="name"
          placeholder="Your name"
          required
          type="text"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background"
          id="email"
          name="email"
          placeholder="your@email.com"
          required
          type="email"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="message">
          Message
        </label>
        <textarea
          className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background resize-none"
          id="message"
          name="message"
          placeholder="Tell me about your project..."
          required
          rows={5}
        />
      </div>
      <button
        className="w-full px-6 py-4 font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        disabled={status === "sending"}
        style={{
          backgroundColor: "var(--foreground)",
          color: "var(--background)",
        }}
        type="submit"
      >
        {status === "sending" ? "Opening email..." : "Send Message"}
      </button>
    </form>
  );
}
