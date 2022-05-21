import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import ProjectPreview from './ProjectPreview';
import ProjectLightbox from './ProjectLightbox/ProjectLightbox';

const ProjectsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
`;

function Projects() {
  const [projects, setProjects] = useState([]);
  const [openProject, setOpenProject] = useState(null);

  const openLightbox = useCallback((project) => {
    // if a preview is clicked while a lightbox is open, ignore the call from the preview.
    if (project && openProject) {
      return;
    }
    setOpenProject(project);
  }, [openProject]);

  useEffect(() => {
    const projectsData = [
      {
        id: 1,
        title: 'Project 1',
        description: 'Project 1 description',
        media: [{ type: 'image', link: 'https://picsum.photos/500' }, { type: 'image', link: 'https://picsum.photos/1000' }],
        categories: ['category 1', 'category 2'],
        appID: false,
      },
      {
        id: 2,
        title: 'Project 2',
        description: 'Project 2 description',
        previewMedia: { type: 'image', link: 'https://picsum.photos/500' },
        media: [{ type: 'image', link: 'https://picsum.photos/200' }, { type: 'image', link: 'https://picsum.photos/500' }, { type: 'image', link: 'https://picsum.photos/100' }],
        categories: ['category 3', 'category 2'],
        appID: false,
      },
      {
        id: 3,
        title: 'Project 3',
        description: 'Project 3 description',
        media: [{ type: 'video', link: 'https://samplelib.com/lib/preview/mp4/sample-10s.mp4' }, { type: 'image', link: 'https://picsum.photos/200' }, { type: 'video', link: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4' }, { type: 'custom', link: '<iframe width="560" height="315" src="https://www.youtube.com/embed/EngW7tLk6R8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' }],
        categories: ['category 3', 'category 2'],
        appID: false,
      },
      {
        id: 4,
        title: 'Project 4',
        description: 'Project 4 description',
        previewMedia: { type: 'image', link: 'https://picsum.photos/500' },
        media: [],
        categories: ['category 1', 'category 2'],
        appID: 1,
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
      <ProjectLightbox project={openProject} callback={openLightbox} />
    </div>
  );
}

export default Projects;
