/**
 * Centralized WhatsApp utility for abctyping
 * Manages phone number resolution and contextual pre-filled messages
 */

export const DEFAULT_WHATSAPP_PHONE =
  process.env.NEXT_PUBLIC_WHATSAPP_PHONE ||
  process.env.NEXT_PUBLIC_CONTACT_PHONE?.replace(/\D/g, "") ||
  "97126427667";

/**
 * Returns a standardized wa.me link with encoded pre-filled text
 */
export function getWhatsAppUrl(prefilledText: string, phone?: string): string {
  const targetPhone = phone || DEFAULT_WHATSAPP_PHONE;
  const cleanPhone = targetPhone.replace(/\D/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(prefilledText.trim())}`;
}

/**
 * Pre-defined contextual message templates tailored to each page & section
 */
export const WHATSAPP_MESSAGES = {
  // Home Page Sections
  hero: "Hello ABC Typing, I would like to enquire about your typing and government clearance services in UAE.",
  services: "Hello ABC Typing, I am browsing your services list and would like more details.",
  process: "Hello ABC Typing, I have a question regarding your document processing timeline and steps.",
  whyUs: "Hello ABC Typing, I would like to speak to an ABC Typing specialist regarding my PRO & typing needs.",
  enquiry: "Hello ABC Typing, I would like to get a quote and submit an enquiry for typing services.",
  faq: "Hello ABC Typing, I have a question regarding service requirements and documents.",
  footer: "Hello ABC Typing, I am reaching out from your website to enquire about your services.",

  // Business Setup / Corporate
  businessSetup: "Hello ABC Typing, I want to discuss Business Setup & Company Formation services in Abu Dhabi & UAE.",

  // Dynamic Service Detail Generator
  serviceDetail: (serviceName: string, category?: string) =>
    category
      ? `Hello ABC Typing, I would like more details and pricing for ${serviceName} (Category: ${category}).`
      : `Hello ABC Typing, I would like more details and pricing for ${serviceName}.`,

  serviceContextual: (serviceName: string) =>
    `Hello ABC Typing, I have an enquiry regarding ${serviceName}. Could you please share the procedure, requirements, and pricing?`,
};
