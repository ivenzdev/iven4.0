'use client';

import React, { useEffect, useState } from 'react';
import { Link, Events, scrollSpy } from 'react-scroll';
import _ from 'lodash';
import rocket from '@/public/rocket.svg';
import Image from 'next/image';
import './sidenav.scss';

import Cavans from '../home/CanvasTrail';

interface LinkItem {
  name: string;
  to: string;
  id: number;
}

interface SideNavProps {
  linkItems: LinkItem[];
  setCurrentSectionIndex: (index: number) => void;
}

function SideNav({ linkItems, setCurrentSectionIndex }: SideNavProps) {
  const [tempClick, setTempClick] = useState(false);
  useEffect(() => {
    Events.scrollEvent.register('begin', () => {});
    Events.scrollEvent.register('end', () => {});

    // Initialize scrollSpy
    scrollSpy.update();

    // Force scroll event on mount
    const timeoutId = setTimeout(() => {
      window.dispatchEvent(new Event('scroll'));
    }, 300);

    return () => {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    window.addEventListener(
      'scroll',
      _.debounce(() => {
        setTempClick(false);
      }, 100)
    );
  }, [tempClick]);

  return (
    <div className='sideNav'>
      <div>
        {linkItems &&
          linkItems.map(({ name, to }, key) => (
            <Link
              to={to}
              key={key}
              smooth='easeOutQuint'
              duration={1000}
              activeClass='active'
              spy={true}
              spyThrottle={100}
              offset={0}
              onClick={() => {
                setCurrentSectionIndex(key);
                setTempClick(true);
              }}
              style={tempClick ? { cursor: 'default' } : { cursor: 'pointer' }}
            >
              <span>{name}</span>
            </Link>
          ))}
      </div>

      {/* Display canvas regardless of window width for fullscreen effect */}
      {/* <DisplayCanvas /> */}
      <Cavans />

      <div className='rocket-container'>
        <div className='rocket'>
          <Image src={rocket} alt='rocket' width={30} height={30} />
        </div>
      </div>

      <div className='rocket-container --2'>
        <div className='rocket'>
          <Image src={rocket} alt='rocket' width={30} height={30} />
        </div>
      </div>
    </div>
  );
}

export default SideNav;
