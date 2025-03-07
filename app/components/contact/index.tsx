import React from 'react';
import Person from './Person';
import { t } from '../../utils/translations';
import ContactForm from './ContactForm';
import Image from 'next/image';
import takeoff from './asset/takeoff.svg';
import linkin from '@/public/linkin.svg';
import mail from '@/public/mail.svg';
import inst from '@/public/inst.svg';
import './contact.scss';

const Contact: React.FC = () => {
  const currentLanguage = process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE;
  const isNonEnglish = currentLanguage !== 'en';

  return (
    <div className='contact page' id='contact'>
      <div className='contact-page-content-container'>
        <div className='contact-page-content'>
          <h3>
            {t('contact.collaboration')}
            <Image src={takeoff} alt={t('contact.icons.takeoff') as string} width={24} height={24} />
          </h3>
          <p>{t('contact.buildTogether')}</p>
          <ContactForm isNonEnglish={isNonEnglish} />
          {
            <div className='contact-page-content-icons'>
              <a href='https://www.linkedin.com/in/iven-zhang-511b86205/' target='_blank' rel='noreferrer' key='0'>
                <Image src={linkin} alt='linkedin icon' />
              </a>
              <a href='mailto:ivenzhangg@gmail.com' target='_blank' rel='noreferrer' key='2'>
                <Image src={mail} alt='mail icon' />
              </a>
              <a href='https://www.instagram.com/_yesloiven/?hl=en' target='_blank' rel='noreferrer' key='3'>
                <Image src={inst} alt='instagram icon' />
              </a>
            </div>
          }
          ,
        </div>
      </div>
      <Person />
      <h4 className='copyright'>
        © {new Date().getFullYear()} IZ | ENGINEER. {t('contact.copyright')}
      </h4>
    </div>
  );
};

export default Contact;
