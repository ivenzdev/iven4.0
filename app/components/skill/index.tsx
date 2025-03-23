import React, { useState } from 'react';
import FilledBar from './FilledBar';
import { Waypoint } from 'react-waypoint';
import './skill.scss';

interface SkillProps {
  lang?: boolean;
}

interface SkillItem {
  id: number;
  name: string;
  level: number;
}

function Skills({ lang = false }: SkillProps) {
  const [toggle, setToggle] = useState<boolean>(false);

  const title = 'profession'.split('');

  const skills: SkillItem[] = [
    { id: 2, name: 'Next.js', level: 82 },
    { id: 3, name: 'React.js', level: 88 },
    { id: 1, name: 'Javascript', level: 85 },
    { id: 10, name: 'Typescript', level: 80 },
    { id: 4, name: 'HTML', level: 87 },
    { id: 5, name: 'CSS', level: 91 },
    { id: 6, name: 'Node.js', level: 84 },
    { id: 7, name: 'MongoDB', level: 83 },
    { id: 8, name: 'Figma', level: 80 },
    { id: 9, name: 'Git', level: 84 },
  ];

  return (
    <div className='skill page' id='skills'>
      <Waypoint onEnter={() => setToggle(true)} bottomOffset='40%' />

      <div className='page-content'>
        <div className='skill-page-content'>
          <div className='skill-page-content__head'>
            <h2>
              {title.map((l, key) => (
                <span key={key}>{l}</span>
              ))}
            </h2>
            <p>- {lang ? '軟 件 知 識' : 'Knowledge in Software'} -</p>
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
