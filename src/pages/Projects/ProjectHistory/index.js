import React, { memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import PageHeader from 'parts/PageHeader';
import HistoryTableCard from 'parts/HistoryTableCard';
import LINKS from 'utils/constants/links';
import projects from 'utils/temp/projects';
import results from 'utils/temp/project-history';

const ProjectHistory = () => {
  const { id } = useParams();

  const project = useMemo(() => projects.find((item) => item.id === id), [id]);
  const NAV_LINKS = [
    LINKS.PROJECT_MANAGEMENT,
    LINKS.PROJECTS,
    {
      HREF: LINKS.EDIT_PROJECT.HREF.replace(':id', id),
      TITLE: project?.name || 'Not Found',
    },
  ];

  return (
    <>
      <PageHeader title={`${LINKS.PROJECT_HISTORY.TITLE}: ${project?.name || 'Not Found'}`} links={NAV_LINKS} />
      <HistoryTableCard title="Projects" results={results} />
    </>
  );
};

export default memo(ProjectHistory);
