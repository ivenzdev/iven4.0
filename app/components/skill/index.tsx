import React, { useState } from 'react';
import FilledBar from './FilledBar';
import { Waypoint } from 'react-waypoint';
import './skill.scss';
import { t } from '../../utils/translations';

interface SkillItem {
  id: number;
  name: string;
  level: number;
}

function Skills() {
  const [toggle, setToggle] = useState<boolean>(false);

  const skills: SkillItem[] = [
    { id: 2, name: 'Next.js', level: 82 },
    { id: 3, name: 'React.js', level: 88 },
    { id: 1, name: 'Javascript', level: 85 },
    { id: 10, name: 'Typescript', level: 80 },
    { id: 4, name: 'HTML5', level: 87 },
    { id: 5, name: 'CSS/SCSS', level: 91 },
    { id: 6, name: 'Node.js', level: 84 },
    { id: 7, name: 'MongoDB', level: 83 },
    { id: 8, name: 'Figma', level: 80 },
    { id: 9, name: 'Github', level: 84 },
  ];

  return (
    <div className='skill page' id='skills'>
      <Waypoint onEnter={() => setToggle(true)} bottomOffset='40%' />

      <div className='page-content'>
        <div className='skill-page-content'>
          <div className='skill-page-content__head'>
            <h2>{t('skills.title')}</h2>
            <p>- {t('skills.subtitle.zh')} -</p>
          </div>

          <div className='skill-page-content__body'>
            {skills.map((item, key) => (
              <FilledBar appear={toggle} item={item} key={key} id={key} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skills;
