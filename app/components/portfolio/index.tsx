import React, { useEffect, useRef, useState } from 'react';
import ProjectInfo from '../portfolio/ProjectInfo';
import { projects } from '../portfolio/Projects';
import './portfolio.scss';
import Image from 'next/image';

function Portfolio() {
  const [infoKey, setInfoKey] = useState<number>(-1);
  const projectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.innerWidth <= 768 && infoKey !== -1 && projectRef.current) {
      projectRef.current.scrollIntoView();
    }
  }, [infoKey]);

  const currentLanguage = process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE;
  const lang = currentLanguage !== 'en';

  return (
    <div className='portfolio page' id='portfolio' ref={projectRef}>
      <div className='portfolio-content-wrap'>
        <div className='portfolio-content'>
          <div className='portfolio-content__header'>
            <h3>portfolio</h3>
            <p>{lang ? '近 期 作 品' : 'My Recent Creations'} -</p>
          </div>

          <div className={`portfolio-content__grid ${projects[infoKey] ? 'hidden' : ''}`}>
            {projects.map((project, key) => (
              <div
                key={key}
                className='item'
                onClick={() => {
                  setInfoKey(key);
                }}
              >
                <div className='header-grid'>
                  <Image src={project.img} alt='project-img' width={35} height={35} />
                  <div>
                    <h4>
                      {project?.label}
                      {project?.year.map((i, key) => (
                        <span key={key}>{i}</span>
                      ))}
                    </h4>
                    <p>{project?.about}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <ProjectInfo project={projects[infoKey]} setInfoKey={setInfoKey} />
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
