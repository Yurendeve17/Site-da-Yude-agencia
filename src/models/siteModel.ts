import { THEME_STORAGE_KEY } from '../config/siteConfig';

export type ThemeMode = 'light' | 'dark';

export interface Testimonial {
  quote: string;
  initials: string;
  name: string;
  role: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: '“A YUDE entendeu a nossa visão desde o primeiro encontro e transformou-a numa marca que hoje fala por nós.”',
    initials: 'AM',
    name: 'Amélia Mucavele',
    role: 'Fundadora, Verde Vivo',
  },
  {
    quote: '“Mais do que um fornecedor, encontrámos um parceiro que pensa connosco e entrega com uma atenção incrível.”',
    initials: 'JM',
    name: 'Júlio Matola',
    role: 'Director, Street Bites',
  },
  {
    quote: '“O resultado foi uma presença digital à altura da energia que temos no terreno. A equipa da YUDE foi essencial.”',
    initials: 'NS',
    name: 'Nádia Sitoe',
    role: 'Produtora, Sunset Sessions',
  },
];

export const DEFAULT_THEME: ThemeMode = 'dark';

export function getInitialTheme(): ThemeMode {
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') {
    return saved;
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function getThemePreference(): ThemeMode {
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  return saved === 'light' || saved === 'dark' ? saved : DEFAULT_THEME;
}
