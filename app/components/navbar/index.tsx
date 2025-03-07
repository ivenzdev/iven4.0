'use client';

import React, { useState, useEffect } from 'react';
import Logo from '@/app/components/navbar/Logo';
import { Link as ScrollLink } from 'react-scroll';
import en from '@/public/us.svg';
import cn from '@/public/china.svg';
import Menu from '@/app/components/navbar/Menu';
import NextLink from 'next/link';
import Image from 'next/image';
import { getCurrentLanguage } from '../../utils/translations';
import './navbar.scss';

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

  useEffect(() => {
    const scrollCloseMenu = () => {
      setScroll(window.pageYOffset);
      if (openMenu) {
        SetopenMenu(false);
      }
    };

    window.addEventListener('scroll', scrollCloseMenu);

    return () => {
      window.removeEventListener('scroll', scrollCloseMenu);
    };
  }, [scroll, openMenu]);

  const handleLanguageToggle = () => {
    const currentLang = getCurrentLanguage();
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    const pathname = window.location.pathname;

    if (currentLang === 'en') {
      // Switch to Chinese
      const zhDomain = hostname.includes('.')
        ? `${protocol}//zh.${hostname.substring(hostname.indexOf('.'))}${pathname}`
        : `${protocol}//zh.${hostname}${pathname}`;
      window.location.href = zhDomain;
    } else {
      // Switch to English
      const enDomain = hostname.includes('zh.') ? `${protocol}//${hostname.substring(hostname.indexOf('zh.') + 3)}${pathname}` : hostname;
      window.location.href = `${protocol}//${enDomain}${pathname}`;
    }
  };

  return (
    <div className='navBar'>
      <NextLink href='/' passHref>
        <Logo />
      </NextLink>

      <div className='navBar__content'>
        <Menu SetopenMenu={SetopenMenu} openMenu={openMenu} />
        <div className='sep' />
        <div onClick={handleLanguageToggle} className='flag'>
          <Image src={getCurrentLanguage() === 'en' ? en : cn} alt='language icon' />
        </div>
      </div>

      <div className={`navBar__nav-items-container ${openMenu && 'open'}`}>
        {linkItems &&
          linkItems.map(({ name, to }, key) => (
            <React.Fragment key={key}>
              <ScrollLink to={to} smooth duration={650} offset={-35} activeClass='active' spy onClick={() => SetopenMenu(false)}>
                <span>{name}</span>
              </ScrollLink>
              <hr />
            </React.Fragment>
          ))}
      </div>
    </div>
  );
}

export default Index;
