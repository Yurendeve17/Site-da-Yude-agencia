import type { ContactFormData } from '../models/siteModel';

export function toWhatsAppMessage({ name, email, message }: ContactFormData): string {
  return `Olá, YUDE! Sou ${name}. O meu email é ${email}.\n\n${message}`;
}

export function openWhatsAppChat(payload: ContactFormData): void {
  const message = encodeURIComponent(toWhatsAppMessage(payload));
  const url = `https://wa.me/258875200954?text=${message}`;
  window.open(url, '_blank', 'noopener');
}
