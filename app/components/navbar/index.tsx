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

  return (
    <div className='navBar'>
      <div className='navBar__content-wrap'>
        <NextLink href='/' passHref aria-label='Home'>
          <Logo />
        </NextLink>

        <div className='navBar__content'>
          <Menu SetopenMenu={SetopenMenu} openMenu={openMenu} />
          <div className='sep' />
          <div
            className='flag'
            onClick={() => {
              const currentLang = getCurrentLanguage();
              if (currentLang === 'en') {
                window.location.href = 'https://zh.ivenzhang.com';
              } else {
                window.location.href = 'https://ivenzhang.com';
              }
            }}
            style={{ cursor: 'pointer' }}>
            <Image src={getCurrentLanguage() === 'en' ? en : cn} alt='language icon' />
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
