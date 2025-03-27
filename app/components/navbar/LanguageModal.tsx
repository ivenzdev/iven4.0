import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import en from '@/public/us.svg';
import cn from '@/public/china.svg';
import japan from '@/public/japan.svg';
import korea from '@/public/korea.svg';
import france from '@/public/france.svg';
import russia from '@/public/russia.svg';
import germany from '@/public/germany.svg';

interface LanguageDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLanguage: (lang: string) => void;
  currentLang: string;
}

const languages = [
  { code: 'en', name: 'English', flag: en },
  { code: 'zh', name: '中文', flag: cn },
  { code: 'ja', name: '日本語', flag: japan },
  { code: 'ko', name: '한국어', flag: korea },
  { code: 'fr', name: 'Français', flag: france },
  { code: 'ru', name: 'Русский', flag: russia },
  { code: 'de', name: 'Deutsch', flag: germany },
];

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({ isOpen, onClose, onSelectLanguage, currentLang }) => {
  const handleSelect = (lang: string) => {
    onSelectLanguage(lang);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className='language-dropdown'
          onClick={(e) => e.stopPropagation()}>
          <div className='language-options'>
            {languages.map((lang) => (
              <div key={lang.code} className={`language-option ${currentLang === lang.code ? 'active' : ''}`} onClick={() => handleSelect(lang.code)}>
                <Image src={lang.flag} alt={lang.name} width={15} height={15} priority />
                <span>{lang.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LanguageDropdown;
