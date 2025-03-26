import React, { useState, useEffect } from 'react';
import { t } from '../../utils/translations';
import ivenz from '@/public/profile.png';
import Autotype from './Autotype';
import { Link } from 'react-scroll';

import Image from 'next/image';

import './home.scss';

const Home: React.FC = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setOffset(window.innerWidth < 940 ? -100 : 0);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderGreeting = () => (
    <>
      <span>{t('greeting')}</span>
    </>
  );

  return (
    <div className='home page' id='home'>
      <div className='page-content'>
        <div className='home-container'>
          <div className='home-card' data-aos='fade-up'>
            <Image className='home-card-image' width={200} height={200} src={ivenz} alt={`${t('name.first')} ${t('name.last')}`} />
          </div>

          <div className='home-content'>
            <h2 data-aos='fade-up' data-aos-duration='650' data-aos-delay='0'>
              {renderGreeting()}
            </h2>

            <div data-aos='fade-up' data-aos-duration='650' data-aos-delay='100'>
              <Autotype />
            </div>

            <p data-aos='fade-up' data-aos-duration='650' data-aos-delay='200'>
              {t('description')}
            </p>

            <div className='home-content-buttons' data-aos='fade-up' data-aos-duration='650' data-aos-delay='400'>
              <div className='home-content-button'>
                <Link
                  to='contact'
                  href='#contact'
                  aria-label='Request Resume'
                  smooth
                  className='home-content-button1-link'
                  duration={700}
                  offset={offset}
                  onClick={() => {
                    const contactSection = document.querySelector('.contact.page');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}>
                  {t('requestResume')}
                </Link>
              </div>

              <div className='home-content-button'>
                <Link
                  to='portfolio'
                  href='#portfolio'
                  aria-label='View Work'
                  duration={700}
                  offset={offset}
                  className='home-content-button2-link'
                  smooth
                  onClick={() => {
                    const contactSection = document.querySelector('.portfolio.page');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}>
                  {t('viewWork')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
