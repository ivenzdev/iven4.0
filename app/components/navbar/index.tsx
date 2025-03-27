'use client';

import React, { useState, useEffect, useRef } from 'react';
import Logo from '@/app/components/navbar/Logo';
import { Link as ScrollLink } from 'react-scroll';
import en from '@/public/us.svg';
import cn from '@/public/china.svg';
import Menu from '@/app/components/navbar/Menu';
import NextLink from 'next/link';
import Image from 'next/image';
import { getCurrentLanguage } from '../../utils/translations';
import './navbar.scss';
import arrowDown from '@/public/arrow-down.svg';
import LanguageDropdown from './LanguageModal';

interface LinkItem {
  name: string;
  to: string;
  id: number;
}

interface IndexProps {
  linkItems: LinkItem[];
}

function Index({ linkItems }: IndexProps) {
  const [openMenu, SetopenMenu] = useState(false);
  const [scroll, setScroll] = useState<number>(0);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollCloseMenu = () => {
      setScroll(window.pageYOffset);
      if (openMenu) {
        SetopenMenu(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLanguageDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', scrollCloseMenu);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', scrollCloseMenu);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [scroll, openMenu]);

  const handleLanguageSelect = (lang: 'en' | 'zh') => {
    if (lang === 'en') {
      window.location.href = 'https://ivenzhang.com';
    } else {
      window.location.href = 'https://zh.ivenzhang.com';
    }
  };

  return (
    <div className='navBar'>
      <div className='navBar__content-wrap'>
        <NextLink href='/' passHref aria-label='Home'>
          <Logo />
        </NextLink>

        <div className='navBar__content'>
          <div className='navBar__content__menu-container'>
            <Menu SetopenMenu={SetopenMenu} openMenu={openMenu} />
          </div>
          <div className='sep' />
          <div className='flag-container' style={{ cursor: 'pointer' }} ref={dropdownRef} onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Image priority src={getCurrentLanguage() === 'en' ? en : cn} alt='language icon' className='flag-icon' />
              <Image priority src={arrowDown} alt='arrow down' className={`arrow-down `} />
            </div>
            <LanguageDropdown
              isOpen={isLanguageDropdownOpen}
              onClose={() => setIsLanguageDropdownOpen(false)}
              onSelectLanguage={handleLanguageSelect}
              currentLang={getCurrentLanguage() as 'en' | 'zh'}
            />
          </div>
        </div>

        <div className={`navBar__nav-items-container ${openMenu && 'open'}`}>
          {linkItems &&
            linkItems.map(({ name, to }, key) => (
              <React.Fragment key={key}>
                <ScrollLink
                  to={to}
                  href={`#${to}`}
                  aria-label={name}
                  smooth
                  duration={650}
                  activeClass='active'
                  spy
                  offset={-110}
                  onClick={() => {
                    SetopenMenu(false);
                  }}>
                  <span>{name}</span>
                </ScrollLink>
                <hr />
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Index;
