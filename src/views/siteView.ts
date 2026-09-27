export class SiteView {
  private readonly menuToggle = document.querySelector('.menu-toggle');
  private readonly mainNav = document.querySelector('.main-nav');
  private readonly themeToggle = document.querySelector('.theme-toggle');
  private readonly themeLabel = document.querySelector('.theme-toggle-label');
  private readonly quoteElement = document.querySelector('.quote-wrap blockquote');
  private readonly avatarElement = document.querySelector('.avatar');
  private readonly authorElement = document.querySelector('.quote-author strong');
  private readonly roleElement = document.querySelector('.quote-author small');
  private readonly form = document.querySelector<HTMLFormElement>('#contact-form');
  private readonly formStatus = document.querySelector<HTMLParagraphElement>('.form-status');
  private readonly yearElement = document.querySelector('#current-year');

  bindMenuToggle(handler: () => void): void {
    this.menuToggle?.addEventListener('click', handler);
  }

  bindNavLinks(handler: () => void): void {
    document.querySelectorAll('.main-nav a').forEach((link) => {
      link.addEventListener('click', handler);
    });
  }

  bindThemeToggle(handler: () => void): void {
    this.themeToggle?.addEventListener('click', handler);
  }

  bindRevealObserver(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
  }

  bindCursorMotion(): void {
    const cursorGlow = document.querySelector('.cursor-glow');
    const heroArt = document.querySelector<HTMLElement>('.hero-art');

    if (window.matchMedia('(pointer: fine)').matches) {
      window.addEventListener('pointermove', (event) => {
        if (cursorGlow) {
          cursorGlow.setAttribute('style', `left: ${event.clientX}px; top: ${event.clientY}px;`);
        }

        if (heroArt) {
          const x = (event.clientX / window.innerWidth - 0.5) * 8;
          const y = (event.clientY / window.innerHeight - 0.5) * 8;
          heroArt.style.transform = `translate(${x}px, ${y}px)`;
        }
      });
    }
  }

  bindTestimonialControls(prevHandler: () => void, nextHandler: () => void): void {
    document.querySelector('.prev')?.addEventListener('click', prevHandler);
    document.querySelector('.next')?.addEventListener('click', nextHandler);
  }

  bindContactForm(handler: (event: SubmitEvent) => void): void {
    this.form?.addEventListener('submit', handler);
  }

  setTheme(theme: 'light' | 'dark'): void {
    document.body.classList.toggle('light-mode', theme === 'light');
    this.themeToggle?.setAttribute('aria-pressed', String(theme === 'light'));
    if (this.themeLabel) {
      this.themeLabel.textContent = theme === 'light' ? 'Dark' : 'Light';
    }
  }

  toggleMobileMenu(isOpen: boolean): void {
    this.mainNav?.classList.toggle('is-open', isOpen);
    this.menuToggle?.setAttribute('aria-expanded', String(isOpen));
  }

  renderTestimonial(quote: string, initials: string, name: string, role: string): void {
    if (this.quoteElement) this.quoteElement.textContent = quote;
    if (this.avatarElement) this.avatarElement.textContent = initials;
    if (this.authorElement) this.authorElement.textContent = name;
    if (this.roleElement) this.roleElement.textContent = role;
  }

  setFormStatus(message: string): void {
    if (this.formStatus) {
      this.formStatus.textContent = message;
    }
  }

  resetForm(): void {
    this.form?.reset();
  }

  setCurrentYear(): void {
    if (this.yearElement) {
      this.yearElement.textContent = String(new Date().getFullYear());
    }
  }
}
