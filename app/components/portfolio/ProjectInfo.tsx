import React from 'react';
import figma from '@/public/figma.svg';
import code from '@/public/code.svg';
import github from '@/public/github.svg';
import bit from '@/public/bit.svg';
import Grid from './Grid';
import Image from 'next/image';
import { Project } from './Projects';

// Define the missing types
interface ProjectInfoProps {
  project: Project; // Replace with proper type when available
  setInfoKey: (key: number) => void;
}

function ProjectInfo({ project, setInfoKey }: ProjectInfoProps) {
  const currentLanguage = process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE;
  const lang = currentLanguage !== 'en';

  if (!project) {
    return null;
  }

  return (
    <div className={`project-info ${project ? 'active' : ''}`}>
      <div
        className='gridMenu'
        onClick={() => {
          setInfoKey(-1);
        }}
      >
        <Grid />
      </div>

      <div>
        <div className='header-grid'>
          <Image src={project.img} alt='project-img' width={50} height={50} />
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

        <div className='section'>
          <h5>Description</h5>
          <p>{project && (lang ? project.description.chn : project.description.eng)}</p>
        </div>

        <div className='section'>
          <h5>Tech Stack</h5>
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

        <div className='section'>
          <h5>Links</h5>

          <div className='link-container'>
            {project?.github && (
              <a href={project.github} target='_blank' rel='noreferrer'>
                <Image src={github} alt='github' width={20} height={20} />
                Github
              </a>
            )}
            {project?.bit && (
              <a href={project.bit} target='_blank' rel='noreferrer'>
                <Image src={bit} alt='bitBucket' width={20} height={20} />
                Bitbucket
              </a>
            )}
            {project && (project.figmaLink || project.sampleFigmaLink) && (
              <>
                {' '}
                <a href={project.figmaLink || project.sampleFigmaLink} target='_blank' rel='noreferrer'>
                  <Image src={figma} alt='figma' width={20} height={20} />
                  {project.sampleFigmaLink ? 'Sample Prototype' : 'Prototype'}
                </a>
                <hr />{' '}
              </>
            )}

            {project && (project.githubLink || project.samplegithubLink) && (
              <>
                {' '}
                <a href={project.githubLink || project.samplegithubLink} target='_blank' rel='noreferrer'>
                  <Image src={github} alt='github' width={20} height={20} />
                  Github
                </a>
                <hr />{' '}
              </>
            )}

            {project?.noUrl && (
              <span>
                <Image src={code} alt='code' />
                Link Unavailable
              </span>
            )}

            {project?.url && (
              <a href={project.url} target='_blank' rel='noreferrer'>
                <Image src={code} alt='code' />
                Deliverable
              </a>
            )}

            {project?.sampleUrl && (
              <a href={project.sampleUrl} target='_blank' rel='noreferrer'>
                <Image src={code} alt='code' />
                Sample Deliverable
              </a>
            )}
          </div>
          {project?.sampleStatus && <span className='warn'>Some work are hidden due to client non-disclosure agreement</span>}
        </div>
      </div>
    </div>
  );
}

export default ProjectInfo;
