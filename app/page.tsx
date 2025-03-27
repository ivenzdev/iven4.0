/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useMemo, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect } from 'react';
import Home from '@/app/components/home/index';
import Navbar from '@/app/components/navbar/index';
import SideNav from '@/app/components/sidenav/index';
import { t } from './utils/translations';
import About from '@/app/components/about/index';
import Skill from '@/app/components/skill/index';
import { scroller } from 'react-scroll';
import Portfolio from '@/app/components/portfolio/index';
import Contact from '@/app/components/contact/index';
import _ from 'lodash';

export default function Page() {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 700,
      offset: 0,
    });

    // Add event listener for additional refreshes if needed
    window.addEventListener('load', AOS.refresh);

    // Clean up
    return () => {
      window.removeEventListener('load', AOS.refresh);
    };
  }, []); // Empty dependency array means this runs once on mount

  const getString = (key: string): string => {
    const translation = t(key);
    return Array.isArray(translation) ? translation.join(' ') : translation;
  };

  const linkItems = useMemo(
    () => [
      { name: getString('navbar.home'), to: 'home', id: 0 },
      { name: getString('navbar.about'), to: 'about', id: 1 },
      { name: getString('navbar.skills'), to: 'skills', id: 2 },
      { name: getString('navbar.portfolio'), to: 'portfolio', id: 3 },
      { name: getString('navbar.contact'), to: 'contact', id: 4 },
    ],
    []
  );

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  useEffect(() => {
    // Common function for both scroll and resize events
    const handleViewportChange = () => {
      if (window.innerHeight > 700 && window.innerWidth > 940) {
        const height = window.innerHeight < 700 ? 700 : window.innerHeight;
        const index = Math.round(window.pageYOffset / height);
        const link = linkItems.find((item) => item.id === index);

        if (link) {
          scroller.scrollTo(link.to, {
            duration: 300,
            smooth: 'easeOutQuart',
            offset: 0,
          });
        }
      }
    };

    // Debounced scroll handler
    const handleScroll = _.debounce(() => {
      handleViewportChange();
    }, 700);

    // Resize handler
    const handleResize = () => {
      handleViewportChange();
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [linkItems]);

  // Add state for sidenav width
  const [sidenavWidth, setSidenavWidth] = useState(650);

  // Calculate sidenav width based on window size
  useEffect(() => {
    const calculateSidenavWidth = () => {
      if (typeof window === 'undefined') return;

      const windowWidth = window.innerWidth;

      // Minimum app-content width is 700px
      const minAppContentWidth = 700;

      // Calculate available width for sidenav
      let newSidenavWidth = windowWidth - minAppContentWidth;

      // Ensure sidenav has a minimum width of 300px and maximum of 650px
      newSidenavWidth = Math.max(300, Math.min(650, newSidenavWidth));

      setSidenavWidth(newSidenavWidth);
    };

    // Calculate on mount
    calculateSidenavWidth();

    // Recalculate on window resize
    window.addEventListener('resize', calculateSidenavWidth);

    return () => {
      window.removeEventListener('resize', calculateSidenavWidth);
    };
  }, []);

  // Add state for window width - initialize without using window
  const [windowWidth, setWindowWidth] = useState(0);
  const [isBrowser, setIsBrowser] = useState(false);
  const [showSidenav, setShowSidenav] = useState(false);

  // Update after component mounts to avoid hydration mismatch
  useEffect(() => {
    setIsBrowser(true);
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Add delay for sidenav display
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSidenav(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='app'>
      {<SideNav linkItems={linkItems} setCurrentSectionIndex={setCurrentSectionIndex} width={sidenavWidth} />}
      <Navbar linkItems={linkItems} />
      <div
        className='app-content'
        style={
          isBrowser
            ? {
                transform: windowWidth > 940 ? `translateX(${sidenavWidth}px)` : 'none',
                maxWidth: windowWidth > 940 ? `calc(100vw - ${sidenavWidth}px)` : '100%',
              }
            : {}
        }>
        <Home />
        <About />
        <Skill />
        <Portfolio />
        <Contact />
      </div>
    </div>
  );
}
