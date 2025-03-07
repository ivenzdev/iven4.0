import React, { useState, useRef } from 'react';
import { t } from '../../utils/translations';
import Image from 'next/image';
import rocket from './asset/rocket.svg';
import check from './asset/check.svg';
import warning from './asset/warning.svg';
import { validateForm } from './validation';
import { sendEmail, EmailPayload } from './emailService';

const CircleLoader = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox='0 0 38 38' xmlns='http://www.w3.org/2000/svg' stroke={color}>
    <g fill='none' fillRule='evenodd'>
      <g transform='translate(1 1)' strokeWidth='2'>
        <circle strokeOpacity='.5' cx='18' cy='18' r='18' />
        <path d='M36 18c0-9.94-8.06-18-18-18'>
          <animateTransform attributeName='transform' type='rotate' from='0 18 18' to='360 18 18' dur='1s' repeatCount='indefinite' />
        </path>
      </g>
    </g>
  </svg>
);

// Define types for state
interface ContactState {
  name: string;
  email: string;
  content: string;
  subjects: string[];
  error: { field: string; message: string | string[] };
  loading: boolean;
  success: { field: string; message: string | string[] };
}

// Type for form input fields
interface InputField {
  classname: string;
  tag: string;
  name: 'name' | 'email';
  label: string | string[];
  ref: React.RefObject<HTMLInputElement | null>;
}

// Props for ContactForm component
interface ContactFormProps {
  isNonEnglish: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ isNonEnglish }) => {
  const [state, setState] = useState<ContactState>({
    name: '',
    email: '',
    content: '',
    subjects: [],
    error: { field: '', message: '' },
    loading: false,
    success: { field: '', message: '' },
  });

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleSelection = (item: string) => {
    if (state.error.field === 'subjects') {
      setState((prev) => ({ ...prev, error: { field: '', message: '' } }));
    }

    setState((prev) => {
      if (prev.subjects.includes(item)) {
        const list = prev.subjects.filter((subject) => subject !== item);
        return { ...prev, subjects: list };
      } else {
        return { ...prev, subjects: [...prev.subjects, item] };
      }
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, loading: true }));

    try {
      const validation = validateForm(state.name, state.email, state.content, state.subjects);

      if (validation.isValid) {
        const payload: EmailPayload = {
          name: state.name,
          email: state.email,
          content: state.content,
          subject: state.subjects.toString(),
        };

        const response = await sendEmail(payload);

        if (response.status === 200) {
          setState((prev) => ({
            ...prev,
            success: {
              field: 'load_message',
              message: t('contact.successMessage'),
            },
            name: '',
            email: '',
            subjects: [],
            content: '',
          }));
        }
      } else if (validation.field && validation.message) {
        setState((prev) => ({
          ...prev,
          error: {
            field: validation.field || '',
            message: validation.message ? (t(validation.message) as string) : '',
          },
        }));

        // Focus the appropriate field
        if (validation.field === 'name') nameRef.current?.focus();
        if (validation.field === 'email') emailRef.current?.focus();
        if (validation.field === 'content') contentRef.current?.focus();
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('contact.errorMessage');

      setState((prev) => ({
        ...prev,
        error: {
          field: 'load_message',
          message: errorMessage,
        },
      }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === state.error.field) {
      setState((prev) => ({ ...prev, error: { field: '', message: '' as string } }));
    }

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleMode = (name: keyof ContactState): string => {
    const value = state[name];

    if ((value && typeof value === 'string' && value.length > 0) || (Array.isArray(value) && value.length > 0)) {
      return 'mode-1';
    }
    return '';
  };

  const selected = (name: string): string => {
    return state.subjects.includes(name) ? 'selected active' : '';
  };

  const printInputError = (field: string) => {
    if (state.error.field === field) {
      return (
        <h5 className='contact-error-message'>
          <Image src={warning} alt={t('contact.icons.warning') as string} width={16} height={16} /> {state.error.message}
        </h5>
      );
    }
    return null;
  };

  const printSubmitMessage = (field: string) => {
    if (state.error.field === field) {
      return (
        <h5 className='contact-error-message'>
          <Image src={warning} alt={t('contact.icons.warning') as string} width={16} height={16} /> {state.error.message}
        </h5>
      );
    }
    if (state.success.field === field) {
      return (
        <h5 className='contact-error-message --success'>
          <Image src={check} alt={t('contact.icons.success') as string} width={16} height={16} /> {state.success.message}
        </h5>
      );
    }
    return null;
  };

  const inputs: InputField[] = [
    {
      classname: 'form-input',
      tag: 'input',
      name: 'name',
      label: t('contact.form.name'),
      ref: nameRef,
    },
    {
      classname: 'form-input',
      tag: 'input',
      name: 'email',
      label: t('contact.form.email'),
      ref: emailRef,
    },
  ];

  const selections = isNonEnglish ? (t('contact.subjects.zh') as string[]) : (t('contact.subjects.en') as string[]);
  return (
    <form onSubmit={onSubmit}>
      {inputs.map(({ name, tag, classname, ref, label }, key) => (
        <div key={key} className={`${classname} ${handleMode(name)}`}>
          <div className='indicator'>
            <span>{label}</span>
          </div>
          <div className='placeholder'>
            <span>
              {label} <i style={{ color: '#f2493d' }}>*</i>
            </span>
            {React.createElement(tag, {
              ref: ref,
              name: name,
              onChange: handleChange,
              value: state[name],
            })}
          </div>
          {printInputError(name)}
        </div>
      ))}

      <div className='input-selections-section'>
        <h4>
          {t('contact.form.selectApplied')}
          <i style={{ color: '#f2493d' }}>*</i>
        </h4>
        <div className='input-selections-container'>
          {selections &&
            selections.length > 0 &&
            selections.map((item, key) => (
              <div key={key} className={`input-selections ${selected(item)}`} onClick={() => handleSelection(item)}>
                <span>{item}</span>
              </div>
            ))}
        </div>
        {printInputError('subjects')}
      </div>

      <div className={`form-input textarea ${handleMode('content')}`}>
        <div className='indicator'>
          <span>{t('contact.form.howCanIHelp')}</span>
        </div>
        <div className='placeholder'>
          <span>
            {t('contact.form.howCanIHelp')} <i style={{ color: 'red' }}>*</i>
          </span>

          <textarea onChange={handleChange} value={state.content} ref={contentRef} name='content'></textarea>
        </div>
        {printInputError('content')}
      </div>

      <button>
        {!state.loading ? (
          <>
            <span>{t('contact.sendInquiry')}</span>
            <Image src={rocket} alt={t('contact.icons.rocket') as string} width={20} height={20} />
          </>
        ) : (
          <div style={{ marginLeft: '10px' }}>
            <CircleLoader color='white' size={20} />
          </div>
        )}
        {printSubmitMessage('load_message')}
      </button>

      <h5>
        {t('contact.preferEmail')}
        <a href='mailto:ivenzhangg@gmail.com'>ivenzhangg@gmail.com</a>
      </h5>
    </form>
  );
};

export default ContactForm;
