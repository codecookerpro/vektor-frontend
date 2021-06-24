import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import LINKS from 'utils/constants/links';

const useTrendChartNames = (projectId, systemId) => {
  const title = Boolean(systemId) ? LINKS.DELIVERABLE_TREND_CHART.TITLE : LINKS.SYSTEM_TREND_CHART.TITLE;

  const { results: projects, metaSystems } = useSelector(({ projects }) => projects);

  const { name: systemName } = useMemo(() => metaSystems[projectId]?.find((item) => item._id === systemId) || {}, [metaSystems, projectId, systemId]);
  const { name: projectName } = useMemo(() => projects?.find((item) => item._id === projectId) || {}, [projectId, projects]);

  return { systemName, projectName, title };
};

export default useTrendChartNames;
