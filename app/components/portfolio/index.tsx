import React, { useEffect, useRef, useState } from 'react';
import ProjectInfo from '../portfolio/ProjectInfo';
import { projects } from '../portfolio/Projects';
import './portfolio.scss';
import Image from 'next/image';
import { t } from '../../utils/translations';

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

  return (
    <div className='portfolio page' id='portfolio' ref={projectRef}>
      <div className='page-content'>
        <div className='portfolio-content'>
          <div className='portfolio-content__header'>
            <h3>{t('portfolio.title')}</h3>
            <p>{t('portfolio.subtitle')}</p>
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
