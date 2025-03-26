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
      <Person />
      <div className='page-content --contact'>
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
                <a href='https://www.linkedin.com/in/iven-zhang-511b86205/' target='_blank' rel='noreferrer' key='0' aria-label="Visit Iven Zhang's LinkedIn profile">
                  <Image src={linkin} alt='LinkedIn - Connect with Iven Zhang' width={24} height={24} />
                </a>
                <a href='mailto:ivenzhangg@gmail.com' target='_blank' rel='noreferrer' key='2' aria-label='Email Iven Zhang'>
                  <Image src={mail} alt='Email - Contact Iven Zhang' width={24} height={24} />
                </a>
                <a href='https://www.instagram.com/_yesloiven/?hl=en' target='_blank' rel='noreferrer' key='3' aria-label='Follow Iven Zhang on Instagram'>
                  <Image src={inst} alt='Instagram - Follow Iven Zhang' width={24} height={24} />
                </a>
              </div>
            }
          </div>
        </div>

        <h4 className='copyright'>
          © {new Date().getFullYear()} IZ | ENGINEER. {t('contact.copyright')}
        </h4>
      </div>
    </div>
  );
};

export default Contact;
