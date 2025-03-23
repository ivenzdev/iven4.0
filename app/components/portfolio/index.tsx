import React, { useEffect, useRef, useState } from 'react';
import ProjectInfo from '../portfolio/ProjectInfo';
import { projects } from '../portfolio/Projects';
import './portfolio.scss';
import Image from 'next/image';

function Portfolio() {
  const [infoKey, setInfoKey] = useState<number>(-1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const projectRef = useRef<HTMLDivElement | null>(null);

  const openProjectModal = (key: number) => {
    setInfoKey(key);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setInfoKey(-1);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  const currentLanguage = process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE;
  const lang = currentLanguage !== 'en';

  return (
    <div className='portfolio page' id='portfolio' ref={projectRef}>
      <div className='page-content'>
        <div className='portfolio-content-wrap'>
          <div className='portfolio-content'>
            <div className='portfolio-content__header'>
              <h3>My Work</h3>
              <p>{lang ? '近 期 作 品' : 'Software & Web Applications'}</p>
            </div>

            <div className='portfolio-content__grid'>
              {projects.map((project, key) => (
                <div key={key} className='item' onClick={() => openProjectModal(key)}>
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
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className='project-modal-overlay' onClick={closeProjectModal}>
          <div className='project-modal fade-in' onClick={(e) => e.stopPropagation()}>
            <ProjectInfo project={projects[infoKey]} setInfoKey={closeProjectModal} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Portfolio;
