// import React from 'react';
import { t } from '../../utils/translations';
import ivenz from '@/public/profile.png';
import Autotype from './Autotype';
import { Link } from 'react-scroll';

import Image from 'next/image';

import './home.scss';

const Home = ({ setCurrentSectionIndex }: { setCurrentSectionIndex: (index: number) => void }) => {
  const currentLanguage = process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE;
  const isEnglish = currentLanguage === 'en';

  const renderGreeting = () => (
    <>
      <span>{isEnglish ? <>{t('greeting')}</> : t('greeting')}</span>
    </>
  );

  return (
    <div className='home page' id='home'>
      <div className='page-content'>
        <div className='home-container'>
          <div className='home-card' data-aos='fade-up'>
            <Image className='home-card-image' width={200} height={200} src={typeof ivenz === 'string' ? ivenz : ivenz.src} alt={`${t('name.first')} ${t('name.last')}`} />
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

            <div className='home-content-buttons' data-aos='fade-up' data-aos-duration='300' data-aos-delay='200'>
              <div className='home-content-button'>
                <Link
                  to='contact'
                  smooth
                  className='home-content-button1-link'
                  data-aos='fade-up'
                  data-aos-duration='650'
                  data-aos-delay='400'
                  duration={700}
                  onClick={() => {
                    // This click handler can be used to properly interact with snap scrolling
                    setCurrentSectionIndex(4);
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
                  data-aos='fade-up'
                  data-aos-duration='650'
                  data-aos-delay='500'
                  className='home-content-button2-link'
                  to='portfolio'
                  smooth
                  duration={700}
                  onClick={() => {
                    // This click handler can be used to properly interact with snap scrolling
                    setCurrentSectionIndex(3);
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
