import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProjectPreview from './ProjectPreview';
import ProjectLightbox from './ProjectLightbox';

const ProjectsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
`;

function Projects() {
  const [projects, setProjects] = useState([]);
  const [openProject, setOpenProject] = useState(null);

  const openLightbox = (project) => {
    console.log('preview clicked: ', project);
    setOpenProject(project);
  };

  useEffect(() => {
    console.log('Projects.jsx: useEffect()');

    const projectsData = [
      {
        id: 1,
        title: 'Project 1',
        description: 'Project 1 description',
        media: [{ type: 'image', link: 'https://picsum.photos/500' }, { type: 'image', link: 'https://picsum.photos/1000' }],
        categories: ['category 1', 'category 2'],
        isApp: false,
        dist: {},
      },
      {
        id: 2,
        title: 'Project 2',
        description: 'Project 2 description',
        media: [{ type: 'image', link: 'https://picsum.photos/200' }, { type: 'image', link: 'https://picsum.photos/500' }, { type: 'image', link: 'https://picsum.photos/100' }],
        categories: ['category 3', 'category 2'],
        isApp: false,
        dist: {},
      },
    ];
    setProjects(projectsData);
    // fetch('/api/projects')
    //   .then((res) => res.json())
    //   .then((data) => setProjects(data))
    //   .catch((err) => console.log(err));
  }, []);

  return (
    <div className="Projects">
      <h1>Projects</h1>
      <ProjectsContainer className="Projects-container">
        {projects.map((project) => (
          <ProjectPreview project={project} lightboxOpener={openLightbox} key={project.id} />
        ))}
      </ProjectsContainer>
      {openProject && (
        <ProjectLightbox project={openProject} callback={openLightbox} />
      )}
    </div>
  );
}

export default Projects;
