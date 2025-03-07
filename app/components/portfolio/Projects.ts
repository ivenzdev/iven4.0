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
import yan from './asset/art.webp';
import cag from './asset/cag.png';
import enroll from './asset/enroll.png';
import eCap from './asset/ecap.png';
import celebrate from './asset/cele.svg';
import portfolio from './asset/portfolio.png';
import { StaticImageData } from 'next/image';
import rentvest from './asset/rentvest.jpg';
import vest from './asset/vest.png';
import zk from './asset/zk.png'
// Define types for projects
export type Project = {
  label: string;
  about: string;
  year: string[];
  description: {
    eng: string;
    chn: string;
  };
  img: StaticImageData
  tech: { label: string; svg: string }[];
  [key: string]: any;
};

export const projects: Project[] = [

  {
    label: 'RentVest',
    about: 'Real Estate Platform for Rent to Own',
    year: ['2025', 'Startup'],
    description: {
      eng: "Rent Vest is a real estate platform designed to streamline property rentals, rent-to-own options, and home purchases, providing a seamless experience for both tenants and property owners. As the Lead Founding Frontend Engineer, I'm taking full ownership on frontend development, leading product development for user-centric rent-to-own real estate platform, architecting and optimizing UI/UX for scalable, high-performance solutions aligned with business goals.",
      chn: "Rent Vest是一個房地產平台，旨在簡化租賃、租購選項和房屋購買流程，為租戶和房主提供無縫體驗。作為**前端開發負責人**，我使用**React、Next.js 和 TypeScript** 構建了 UI，確保高性能和響應速度。我實施了**狀態管理、API 集成和性能優化**，包括懶加載和動態導入。我還與後端工程師合作，整合**安全支付處理、房產管理工具和數據驅動的推薦系統**，提升用戶體驗和參與度。",
    },
    url: 'https://rentvest.ai/',
    img: rentvest, // Replace with the imported RentVest image
    tech: [
      { label: 'Next', svg: next },
      { label: 'React', svg: react },
      { label: 'TypeScript', svg: ts },
      { label: 'Python', svg: node },
    ],
  },

  {
    label: 'Celebrate Life',
    about: 'Event Planning & Memory Sharing App',
    year: ['2024', 'Startup'],
    description: {
      eng: "Celebrate Life is a platform that helps users create and preserve meaningful memories by curating life stories, organizing digital archives, and sharing special moments with loved ones. As the Lead Frontend Developer, I designed and built the UI using React and Next.js, ensuring an intuitive and seamless experience. I implemented state management, API integrations, and performance optimizations, while collaborating with the backend team to support secure data storage, multimedia uploads, and interactive storytelling features.",
      chn: "Celebrate Life是一個社交平台，旨在幫助用戶創建、分享和珍惜人生中特別的時刻。該應用允許用戶策劃活動、邀請朋友，並通過照片、視頻和個人故事共享美好回憶。平台專注於直觀的設計和無縫協作，提供即時更新和智能活動提醒。",
    },
    // figmaLink: 'https://www.figma.com/file/your-figma-design',
    url: 'https://celebr8.life/',
    img: celebrate, // Replace with the imported image
    tech: [
      { label: 'Next.js', svg: next },
      { label: 'Typescript', svg: ts },
      { label: 'Node.js', svg: node },
      { label: '', svg: aws },
    ],
  },

  {
    label: 'Vest Exchange Clone',
    about: 'Decentralized Perpetual Futures Exchange',
    year: ['2024'],
    description: {
      eng: "Vest Exchange is a decentralized perpetual futures trading platform built on zkSync, offering low-latency, gas-efficient transactions. As a personal 1:1 clone project, I rebuilt its frontend using React, and TypeScript, replicating the user interface and core trading functionalities. I implemented real-time price updates via WebSockets,.",
      chn: "Vest Exchange 是一個基於 zkSync 的**去中心化永續合約交易平台**，提供低延遲和高效的交易體驗。作為一個**個人 1:1 克隆項目**，我使用 **React、Next.js 和 TypeScript** 重建了前端，複製了用戶界面和核心交易功能。我實現了 **WebSockets 的實時價格更新、智能合約交互，以及 UI 性能優化**，確保流暢的交易體驗。這個項目的目標是深入了解 DeFi 交易基礎架構、區塊鏈 API 和 zk-rollup 擴展解決方案。",
    },
    githubLink: 'https://github.com/ivenzdev/cryto',
    figmaLink: 'https://www.figma.com/design/Y0xGAiudDKFthVWTLnyWCT/Frontend-Takehome-Assignment?node-id=0-1&t=8wIdCFNItEVJHghr-0',
    url: 'https://cryto-xi.vercel.app/trade/ETH-PERP',  // Replace with your live demo if available
    img: vest, // Replace with the imported Vest Exchange clone image
    tech: [
      { label: 'React', svg: react },
      { label: 'TypeScript', svg: ts },
      { label: 'zkSync', svg: zk },
    ],
  },


  {
    label: 'Yan',
    about: 'Personal Endeavour and Innovations',
    year: ['2022', 'Private Asset', 'Sold'],
    description: {
      eng: "I've designed and built this art-inspired, full-stack application as a comprehensive display of my skills. With thoughtful UI/UX design, dedicated front and back-end programming, careful database operations, and practical business solutions, this project captures my journey in software development. It's a blend of software architecture planning and rigorous testing that I'm genuinely proud to present.",
      chn: '我构建了这款充满艺术气息的全栈应用，以全面展示我的技能。这个项目捕捉了我在软件开发中的旅程，采用了周到的UI/UX设计、专注的前后端编程、谨慎的数据库操作和实用的商业解决方案。这是我深感自豪的软件架构规划与严格测试的结晶。',
    },
    url: 'https://about.yannn.org/',
    img: yan,
    tech: [
      { label: 'React', svg: react },
      { label: 'Node.js', svg: node },
      { label: 'MongoDB', svg: mongo },
      { label: '', svg: aws },
    ],
  },

  {
    label: 'Enrolld',
    about: 'College Course Enrollment App',
    year: ['2023', 'College Capstone'],
    description: {
      eng: "Meet 'Enrolld', an application that collaborated with my college's registration department, with one clear mission: to make enrolling in student courses as easy as pie. Accustomed for mobile & desktop view, & utilized a powerful forecasting algorithm to recommend future courses for university staff, professors, & students. Managed refactoring, redesigning, bug fixing, & implementing 20+ of both old & new application features. Enforced adherence to React.js best practices.",
      chn: "這是一個名為'Enrolld'的應用程式，其明確的任務就是使學生課程註冊變得容易如反掌。適用於移動和桌面視圖，並利用了強大的預測算法向大學職員、教授和學生推薦未來的課程。我管理了重構、重新設計、錯誤修復，並實現了20多種新舊應用程式特性。堅持遵守React.js的最佳實踐。",
    },
    figmaLink: 'https://www.figma.com/file/yq7qVkXtkSTfRgGqBKjZTr/Enrolld-Sample?t=izRKW6GmB31spYDB-0',
    url: 'https://getenrolld.com/',
    img: enroll,
    tech: [{ label: 'React', svg: react }, { label: 'Sass', svg: sass }, { label: 'Node.js', svg: node }, { label: '', svg: aws }],
  },

  {
    label: 'IZ | Engineer',
    about: "Iven Zhang's Portfolio Website",
    year: ['2022'],
    description: {
      eng: 'Featuring a single-page layout showcasing my skills, projects, and contact information. Available in both English and Chinese, this site invites you to explore my work and connect with me for collaboration opportunities.',
      chn: '展示了一種單頁佈局，展示了我的技能、項目和聯繫信息。該網站提供英文和中文兩種語言，邀請您探索我的作品並與我聯繫以尋求合作機會。',
    },
    url: 'https://ivenz.dev/',
    // https://ivenzhang.netlify.app/
    img: portfolio,
    tech: [
      { label: 'React', svg: react },
      { label: 'HTML', svg: html },
      { label: 'CSS', svg: css },
      { label: 'Email.js', svg: emailjs },
    ],
  },
  {
    label: 'eCapital',
    about: 'Investment Startup Company',
    year: ['2022'],
    description: {
      eng: "Undertaken a freelance project, served as a Project Manager, React.js Developer, and Website Designer for ECAPITAL Startup in Manhattan, NY. Built visually stunning and highly responsive mobile/desktop website portfolios while managing the project's layout, milestones, and timeline to ensure optimal execution.",
      chn: '接手了一個自由項目，為紐約曼哈頓的ECAPITAL新創公司擔任項目經理、React.js開發人員和網站設計師。在管理項目的佈局、里程碑和時間表以確保最優執行的同時，創建了視覺效果出眾且反應極快的移動/桌面網站投資組合。',
    },
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
    label: 'CAG',
    about: 'Cloud Accounting Group',
    year: ['2022'],
    description: {
      eng: 'As a website designer and developer, my fun project involves creating a brand that aligns with a given prompt. This includes developing user demographics and personas, creating a brand mood board, designing a style tile, mapping out the site structure, prototyping, and ultimately implementing the website.',
      chn: '作為一名網站設計師和開發者，我的有趣項目包括創建一個與給定提示相符的品牌。這包括開發用戶人口統計學和角色設定，創建品牌情緒板，設計風格瓷磚，劃定網站結構，製作原型，最終實現網站。',
    },
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
