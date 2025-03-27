import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import en from '@/public/us.svg';
import cn from '@/public/china.svg';

interface LanguageDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLanguage: (lang: 'en' | 'zh') => void;
  currentLang: 'en' | 'zh';
}

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({ isOpen, onClose, onSelectLanguage, currentLang }) => {
  const handleSelect = (lang: 'en' | 'zh') => {
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
            <div className={`language-option ${currentLang === 'en' ? 'active' : ''}`} onClick={() => handleSelect('en')}>
              <Image src={en} alt='English' width={15} height={15} />
              <span>English</span>
            </div>
            <div className={`language-option ${currentLang === 'zh' ? 'active' : ''}`} onClick={() => handleSelect('zh')}>
              <Image src={cn} alt='中文' width={15} height={15} />
              <span>中文</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LanguageDropdown;
