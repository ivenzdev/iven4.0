import React from 'react';
import lehigh from '@/public/lehigh.svg';

import { t } from '../../utils/translations';

import Image from 'next/image';
import './about.scss';

function About() {
  const content1 = [
    {
      header: t('about.education.title'),
      content: [
        <p key='1'>
          <Image src={lehigh} alt='lehigh' height={20} />
          {t('about.education.university')}
          <br /> {t('about.education.major')}
        </p>,
      ],
    },
    {
      header: t('about.expertise.title'),
      content: (t('about.expertise.items') as string[]).map((item: string, index: number) => <p key={index}>{item}</p>),
    },
    {
      header: t('about.development.title'),
      content: (t('about.development.items') as string[]).map((item: string, index: number) => <p key={index}>{item}</p>),
    },
  ];

  const content2 = [
    {
      header: t('about.stats.experience.title'),
      content: t('about.stats.experience.value'),
    },
    {
      header: t('about.stats.satisfaction.title'),
      content: t('about.stats.satisfaction.value'),
    },
    {
      header: t('about.stats.techStack.title'),
      content: t('about.stats.techStack.value'),
    },
    {
      header: t('about.stats.websites.title'),
      content: t('about.stats.websites.value'),
    },
    {
      header: t('about.stats.performance.title'),
      content: t('about.stats.performance.value'),
    },
  ];

  const c1 = content1;
  const c2 = content2;

  return (
    <div className='about page' id='about'>
      <div className='page-content'>
        <div className={`about-content`}>
          <div className='flex-wrap'>
            <div className='content-flex'>
              {c1.map(({ header, content }, key) => (
                <div className='content-flex-div1' key={key} data-aos='fade-up' data-aos-delay={(key + 1) * 100}>
                  <h2>{header}</h2>
                  {content}
                </div>
              ))}
            </div>
            <div className='content-flex'>
              <div className='content-flex-mid-container' data-aos='fade-up'>
                <div className='img' />
              </div>
            </div>
            <div className='content-flex'>
              {c2.map(({ header, content }, key) => (
                <div className='content-flex-div2' key={key} data-aos='fade-up' data-aos-delay={(key + 1) * 100}>
                  <h2>{header}</h2>
                  <p> {content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
