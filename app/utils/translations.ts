import enTranslations from '../locales/en/translation.json';
import zhTranslations from '../locales/zh/translation.json';
import jpTranslations from '../locales/jp/translation.json';
import koTranslations from '../locales/ko/translation.json';
import frTranslations from '../locales/fr/translation.json';
import ruTranslations from '../locales/ru/translation.json';
import deTranslations from '../locales/de/translation.json';

// Define a type for the translations
type Translations = {
    [key: string]: string | string[] | Translations;
};

type Language = 'en' | 'zh' | 'jp' | 'ko' | 'fr' | 'ru' | 'de';

// Get the current language from hostname or env variable
export const getCurrentLanguage = (): Language => {
    // In browser
    if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;
        if (hostname.startsWith('zh.')) return 'zh';
        if (hostname.startsWith('jp.')) return 'jp';
        if (hostname.startsWith('ko.')) return 'ko';
        if (hostname.startsWith('fr.')) return 'fr';
        if (hostname.startsWith('ru.')) return 'ru';
        if (hostname.startsWith('de.')) return 'de';
    }

    // Fallback to environment variable or default to English
    const defaultLang = process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE as Language;
    return defaultLang || 'en';
};

// Load translations based on current language
export const getTranslations = (): Translations => {
    const lang = getCurrentLanguage();
    const translations: Record<Language, Translations> = {
        en: enTranslations,
        zh: zhTranslations,
        jp: jpTranslations,
        ko: koTranslations,
        fr: frTranslations,
        ru: ruTranslations,
        de: deTranslations,
    };
    return translations[lang] || enTranslations;
};

// Helper function to get a specific translation
export const t = (key: string): string | string[] => {
    const translations = getTranslations();
    const result = key.split('.').reduce((obj: Translations | string | string[], i: string) => {
        if (typeof obj === 'string' || Array.isArray(obj)) return obj;
        return obj[i] !== undefined ? obj[i] : key;
    }, translations);

    // Ensure the result is either a string or a string array
    return typeof result === 'string' || Array.isArray(result) ? result : key;
}; 