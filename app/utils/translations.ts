import enTranslations from '../locales/en/translation.json';
import zhTranslations from '../locales/zh/translation.json';

// Define a type for the translations
type Translations = {
    [key: string]: string | string[] | Translations;
};

// Get the current language from hostname or env variable
export const getCurrentLanguage = (): 'en' | 'zh' => {
    // In browser
    if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;
        if (hostname.startsWith('zh.')) {
            return 'zh';
        }
    }

    // Fallback to environment variable or default to English
    return process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE === 'zh' ? 'zh' : 'en';
};

// Load translations based on current language
export const getTranslations = (): Translations => {
    const lang = getCurrentLanguage();
    return lang === 'zh' ? zhTranslations : enTranslations;
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