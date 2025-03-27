import js from './asset/js.svg';
import ts from './asset/ts.svg';
import react from './asset/react.svg';
import html from './asset/html.svg';
import css from './asset/css.svg';
import node from './asset/node.svg';
import mongo from './asset/mongo.svg';
import sass from './asset/scss.svg';
import next from './asset/next.svg';
import aws from './asset/aws.svg';
import emailjs from './asset/emailjs.svg';
import cag from './asset/cag.png';
import enroll from './asset/enroll.png';
import eCap from './asset/ecap.png';
import celebrate from './asset/cele.png';
import portfolio from './asset/portfolio.png';
import { StaticImageData } from 'next/image';
import rentvest from './asset/rentvest.png';
import vest from './asset/vest.png';
import zk from './asset/zk.png'
import stealth from './asset/stealth.png'
import python from './asset/python.svg'
import { t } from '../../utils/translations';

// Define types for projects
export type Project = {
  label: string | string[];
  year: string[];
  about: string | string[];
  key: string;
  img: StaticImageData;
  tech: { label: string; svg: string }[];
  url?: string;
  figmaLink?: string;
  sampleFigmaLink?: string;
  githubLink?: string;
  noUrl?: boolean;
  sampleUrl?: string;
  sampleStatus?: boolean;
  github?: string;
  bit?: string;
};

export const projects: Project[] = [
  {
    key: 'rentvest',
    label: t('portfolio.projects.rentvest.label'),
    year: t('portfolio.projects.rentvest.year') as string[],
    about: t('portfolio.projects.rentvest.about'),
    url: 'https://rentvest.io/',
    img: rentvest,
    tech: [
      { label: 'Next', svg: next },
      { label: 'TypeScript', svg: ts },
      { label: 'Python', svg: python },
      { label: '', svg: aws },
    ],
  },
  {
    key: 'celebrate',
    label: t('portfolio.projects.celebrate.label'),
    year: t('portfolio.projects.celebrate.year') as string[],
    about: t('portfolio.projects.celebrate.about'),
    url: 'https://celebr8.life/',
    img: celebrate,
    tech: [
      { label: 'Next.js', svg: next },
      { label: 'Typescript', svg: ts },
      { label: 'Node.js', svg: node },
      { label: 'MongoDB', svg: mongo },
    ],
  },
  {
    key: 'vest',
    label: t('portfolio.projects.vest.label'),
    year: t('portfolio.projects.vest.year') as string[],
    about: t('portfolio.projects.vest.about'),
    githubLink: 'https://github.com/ivenzdev/cryto',
    figmaLink: 'https://www.figma.com/design/Y0xGAiudDKFthVWTLnyWCT/Frontend-Takehome-Assignment?node-id=0-1&t=8wIdCFNItEVJHghr-0',
    url: 'https://cryto-xi.vercel.app/trade/ETH-PERP',
    img: vest,
    tech: [
      { label: 'React', svg: react },
      { label: 'TypeScript', svg: ts },
      { label: 'zkSync', svg: zk },
    ],
  },
  {
    key: 'stealth',
    label: t('portfolio.projects.stealth.label'),
    year: t('portfolio.projects.stealth.year') as string[],
    about: t('portfolio.projects.stealth.about'),
    img: stealth,
    tech: [
      { label: 'React', svg: react },
      { label: 'Node.js', svg: node },
      { label: 'MongoDB', svg: mongo },
      { label: '', svg: aws },
    ],
  },
  {
    key: 'enrolld',
    label: t('portfolio.projects.enrolld.label'),
    year: t('portfolio.projects.enrolld.year') as string[],
    about: t('portfolio.projects.enrolld.about'),
    figmaLink: 'https://www.figma.com/file/yq7qVkXtkSTfRgGqBKjZTr/Enrolld-Sample?t=izRKW6GmB31spYDB-0',
    url: 'https://getenrolld.com/',
    img: enroll,
    tech: [
      { label: 'React', svg: react },
      { label: 'Sass', svg: sass },
      { label: 'Node.js', svg: node },
      { label: '', svg: aws }
    ],
  },
  {
    key: 'portfolio',
    label: t('portfolio.projects.portfolio.label'),
    year: t('portfolio.projects.portfolio.year') as string[],
    about: t('portfolio.projects.portfolio.about'),
    url: 'https://ivenz.dev/',
    img: portfolio,
    tech: [
      { label: 'React', svg: react },
      { label: 'HTML', svg: html },
      { label: 'CSS', svg: css },
      { label: 'Email.js', svg: emailjs },
    ],
  },
  {
    key: 'ecapital',
    label: t('portfolio.projects.ecapital.label'),
    year: t('portfolio.projects.ecapital.year') as string[],
    about: t('portfolio.projects.ecapital.about'),
    figmaLink: 'https://www.figma.com/file/oKAjG7Z7fBOybAOMbhi8wk/eCapital-Sample?node-id=0%3A1&t=gmOoKjuPPLUZyjcY-1',
    url: 'https://ecaptl.com/',
    img: eCap,
    tech: [
      { label: 'Javascript', svg: js },
      { label: 'React', svg: react },
      { label: 'HTML', svg: html },
      { label: 'CSS', svg: css },
    ],
  },
  {
    key: 'cag',
    label: t('portfolio.projects.cag.label'),
    year: t('portfolio.projects.cag.year') as string[],
    about: t('portfolio.projects.cag.about'),
    figmaLink: 'https://www.figma.com/file/n9LDKODUOBNLuHv8U2cEm9/StartUp-Company?node-id=0%3A1&t=MkPaUHL2601fIV7o-1',
    url: 'http://www.cse.lehigh.edu/~haz323/WebDesign/Project%204/home.html',
    img: cag,
    tech: [
      { label: 'Javascript', svg: js },
      { label: 'HTML', svg: html },
      { label: 'CSS', svg: css },
    ],
  },
];
