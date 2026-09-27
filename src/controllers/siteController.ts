import { THEME_STORAGE_KEY } from '../config/siteConfig';
import { ContactFormData, getInitialTheme, testimonials } from '../models/siteModel';
import { openWhatsAppChat } from '../services/whatsappService';
import { SiteView } from '../views/siteView';

export class SiteController {
  private testimonialIndex = 0;

  constructor(private readonly view: SiteView) {
    this.view.bindMenuToggle(() => this.toggleMenu());
    this.view.bindNavLinks(() => this.closeMenu());
    this.view.bindThemeToggle(() => this.toggleTheme());
    this.view.bindRevealObserver();
    this.view.bindCursorMotion();
    this.view.bindTestimonialControls(() => this.previousTestimonial(), () => this.nextTestimonial());
    this.view.bindContactForm((event) => this.handleSubmit(event));
    this.view.setCurrentYear();
    this.renderTestimonial();
    this.applyTheme(getInitialTheme());
  }

  private toggleMenu(): void {
    const isOpen = !document.querySelector('.main-nav')?.classList.contains('is-open');
    this.view.toggleMobileMenu(isOpen);
  }

  private closeMenu(): void {
    this.view.toggleMobileMenu(false);
  }

  private toggleTheme(): void {
    const nextTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
    this.applyTheme(nextTheme);
  }

  private applyTheme(theme: 'light' | 'dark'): void {
    this.view.setTheme(theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }

  private renderTestimonial(): void {
    const item = testimonials[this.testimonialIndex];
    this.view.renderTestimonial(item.quote, item.initials, item.name, item.role);
  }

  private previousTestimonial(): void {
    this.testimonialIndex = (this.testimonialIndex - 1 + testimonials.length) % testimonials.length;
    this.renderTestimonial();
  }

  private nextTestimonial(): void {
    this.testimonialIndex = (this.testimonialIndex + 1) % testimonials.length;
    this.renderTestimonial();
  }

  private handleSubmit(event: SubmitEvent): void {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const payload: ContactFormData = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      message: String(formData.get('message') ?? ''),
    };

    this.view.setFormStatus('A abrir o WhatsApp...');
    openWhatsAppChat(payload);
    form.reset();
  }
}
