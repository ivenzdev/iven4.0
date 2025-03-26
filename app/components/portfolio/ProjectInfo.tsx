import React from 'react';
import figma from '@/public/figma.svg';
import code from '@/public/code.svg';
import github from '@/public/github.svg';
import bit from '@/public/bit.svg';
import close from '@/public/close.svg';
import Image from 'next/image';
import { Project } from './Projects';
import { t } from '../../utils/translations';

// Define the missing types
interface ProjectInfoProps {
  project: Project; // Replace with proper type when available
  setInfoKey: (key: number) => void;
}

function ProjectInfo({ project, setInfoKey }: ProjectInfoProps) {
  if (!project) {
    return null;
  }

  return (
    <div className={`project-info ${project ? 'active' : ''}`}>
      <div
        className='close-button'
        onClick={() => {
          setInfoKey(-1);
        }}>
        {/* <Grid /> */}
        <Image src={close} alt='close' width={15} height={15} />
      </div>

      <div>
        <div className='header-grid'>
          <Image src={project.img} alt='project-img' width={50} height={50} />
          <div>
            <h4>
              {t(`portfolio.projects.${project.key}.label`)}
              {(t(`portfolio.projects.${project.key}.year`) as string[]).map((i: string, key: number) => (
                <span key={key}>{i}</span>
              ))}
            </h4>
            <p>{t(`portfolio.projects.${project.key}.about`)}</p>
          </div>
        </div>

        <div className='section'>
          <h5>{t('portfolio.projectInfo.description')}</h5>
          <p>{t(`portfolio.projects.${project.key}.description`)}</p>
        </div>

        <div className='section'>
          <h5>{t('portfolio.projectInfo.techStack')}</h5>
          <div className='tech-stack'>
            {project?.tech?.map(({ label, svg }, key) => (
              <React.Fragment key={key}>
                <span>
                  <Image src={svg} alt='label' width={20} height={20} />
                  {label}
                </span>
                <hr />
              </React.Fragment>
            ))}
          </div>
        </div>

        {(project.url || project.figmaLink) && (
          <div className='section'>
            <h5>{t('portfolio.projectInfo.links')}</h5>

            <div className='link-container'>
              {project?.github && (
                <a href={project.github} target='_blank' rel='noreferrer'>
                  <Image src={github} alt='github' width={20} height={20} />
                  {t('portfolio.projectInfo.github')}
                </a>
              )}
              {project?.bit && (
                <a href={project.bit} target='_blank' rel='noreferrer'>
                  <Image src={bit} alt='bitBucket' width={20} height={20} />
                  {t('portfolio.projectInfo.bitbucket')}
                </a>
              )}
              {project && (project.figmaLink || project.sampleFigmaLink) && (
                <>
                  {' '}
                  <a href={project.figmaLink || project.sampleFigmaLink} target='_blank' rel='noreferrer'>
                    <Image src={figma} alt='figma' width={20} height={20} />
                    {project.sampleFigmaLink ? t('portfolio.projectInfo.samplePrototype') : t('portfolio.projectInfo.prototype')}
                  </a>
                  <hr />{' '}
                </>
              )}

              {project && project.githubLink && (
                <>
                  {' '}
                  <a href={project.githubLink} target='_blank' rel='noreferrer'>
                    <Image src={github} alt='github' width={20} height={20} />
                    {t('portfolio.projectInfo.github')}
                  </a>
                  <hr />{' '}
                </>
              )}

              {project?.noUrl && (
                <span>
                  <Image src={code} alt='code' />
                  {t('portfolio.projectInfo.linkUnavailable')}
                </span>
              )}

              {project?.url && (
                <a href={project.url} target='_blank' rel='noreferrer'>
                  <Image src={code} alt='code' />
                  {t('portfolio.projectInfo.deliverable')}
                </a>
              )}

              {project?.sampleUrl && (
                <a href={project.sampleUrl} target='_blank' rel='noreferrer'>
                  <Image src={code} alt='code' />
                  {t('portfolio.projectInfo.sampleDeliverable')}
                </a>
              )}
            </div>
            {project?.sampleStatus && <span className='warn'>{t('portfolio.projectInfo.nda')}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectInfo;
