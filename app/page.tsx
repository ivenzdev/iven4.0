'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
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
  const isScrolling = useRef(false);
  const lastScrollTime = useRef(Date.now());
  const lastScrollDirection = useRef(0);

  // Add effect to initialize scroll on mount
  useEffect(() => {
    // Small delay to ensure all components are rendered
    const timer = setTimeout(() => {
      scroller.scrollTo(linkItems[0].to, {
        duration: 0,
        smooth: 'easeOutQuart',
        offset: 0,
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [linkItems]); // Empty dependency array ensures this runs once on mount

  // Fix: Properly implement useCallback
  const handleScrollSnap = useCallback(
    (direction: number) => {
      // Cancel any ongoing scroll animation when user initiates a new scroll
      if (isScrolling.current) {
        // Force stop any ongoing scroll animations
        // We'll implement this by immediately allowing a new scroll
        isScrolling.current = false;
      }

      const nextIndex = Math.max(0, Math.min(linkItems.length - 1, currentSectionIndex + direction));
      if (nextIndex !== currentSectionIndex) {
        isScrolling.current = true;
        setCurrentSectionIndex(nextIndex);

        const targetId = linkItems[nextIndex].to;
        scroller.scrollTo(targetId, {
          duration: 1200,
          smooth: 'easeOutQuart',
          offset: 0,
        });

        // Longer timeout to ensure animation completes before allowing new scrolls
        setTimeout(() => {
          isScrolling.current = false;
        }, 1200); // Match the duration of the scroll animation
      }
    },
    [currentSectionIndex, linkItems]
  );

  // Detect wheel events for scroll direction - immediate response
  useEffect(() => {
    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault();

      // We'll allow scrolling even if already scrolling
      // This makes the UI more responsive to user input

      const now = Date.now();
      const timeDelta = now - lastScrollTime.current;
      lastScrollTime.current = now;

      // Determine scroll direction (1 for down, -1 for up)
      const direction = e.deltaY > 0 ? 1 : -1;

      // Only process if not too frequent (to prevent rapid multiple scrolls)
      if (timeDelta > 100) {
        lastScrollDirection.current = direction;
        handleScrollSnap(direction);
      }
    };

    window.addEventListener('wheel', wheelHandler, { passive: false });

    return () => {
      window.removeEventListener('wheel', wheelHandler);
    };
  }, [currentSectionIndex, handleScrollSnap, linkItems]);

  return (
    <div className='app'>
      <SideNav linkItems={linkItems} setCurrentSectionIndex={setCurrentSectionIndex} />
      <Navbar linkItems={linkItems} />
      <div className='app-content'>
        <Home setCurrentSectionIndex={setCurrentSectionIndex} />
        <About />
        <Skill />
        <Portfolio />
        <Contact />
      </div>
    </div>
  );
}
