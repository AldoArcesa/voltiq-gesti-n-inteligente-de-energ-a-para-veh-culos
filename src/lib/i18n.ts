// This is a lightweight i18n setup for the prototype.
// A full implementation would use a library like i18next.
const resources = {
  es: {
    translation: {
      "welcome_to_voltiq": "Bienvenido a VoltIQ",
      "tagline": "Gestión Inteligente de Energía para tu Vehículo.",
      "get_started": "Comenzar Ahora",
      "discover_demo": "Descubrir Demo",
    },
  },
  en: {
    translation: {
      "welcome_to_voltiq": "Welcome to VoltIQ",
      "tagline": "Intelligent Energy Management for Your Vehicle.",
      "get_started": "Get Started Now",
      "discover_demo": "Discover Demo",
    },
  },
};
let currentLocale: 'es' | 'en' = 'es';
export const setLocale = (locale: 'es' | 'en') => {
  currentLocale = locale;
};
export const t = (key: keyof typeof resources['es']['translation']): string => {
  return resources[currentLocale].translation[key] || key;
};
export const formatNumber = (num: number, options?: Intl.NumberFormatOptions) => {
  return new Intl.NumberFormat(currentLocale, options).format(num);
};
export const formatDate = (date: Date, options?: Intl.DateTimeFormatOptions) => {
  return new Intl.DateTimeFormat(currentLocale, options).format(date);
};