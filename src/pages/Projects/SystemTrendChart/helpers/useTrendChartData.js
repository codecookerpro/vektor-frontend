import { useState, useMemo, useEffect } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';

import LINKS from 'utils/constants/links';
import { getSystemHistory, readMetaSystem } from 'redux/actions/metaSystem';
import { isEmpty } from 'utils/helpers/utility';

const useTrendChartData = (projectId, systemId) => {
  const dispatch = useDispatch();
  const [chartData, setChartData] = useState([]);
  const isDeliverableTrendChart = Boolean(systemId);
  const title = isDeliverableTrendChart ? LINKS.DELIVERABLE_TREND_CHART.TITLE : LINKS.SYSTEM_TREND_CHART.TITLE;

  const { results: projects, metaSystems, systemTrends } = useSelector(({ projects }) => projects);

  const { name: systemName } = useMemo(() => metaSystems[projectId]?.find((item) => item._id === systemId) || {}, [metaSystems, projectId, systemId]);
  const { name: projectName } = useMemo(() => projects?.find((item) => item._id === projectId) || {}, [projectId, projects]);

  const getSystemTrendChartData = useMemo(() => {
    const systemTrendsCharts = {};
    const currentSystemTrends = systemTrends[projectId] || [];
    let data = [];

    const names = [
      'Date',
      ...currentSystemTrends
        ?.map(({ metaSystem }) => {
          const name = metaSystems[projectId]?.find(({ _id }) => metaSystem === _id)?.name || metaSystem;
          return [`${name} EV`, `${name} PV`];
        })
        .flat(),
    ];

    const allDates = [
      ...new Set(
        currentSystemTrends
          .map(({ samples }) => samples)
          .flat()
          .map(({ date }) => moment(date).format('YYYY/MM/DD'))
          .sort()
      ),
    ];

    for (const cst of currentSystemTrends) {
      systemTrendsCharts[`${cst.metaSystem}EV`] = [...cst.samples?.map((s) => [moment(s.date).format('YYYY/MM/DD'), s.EV])];
      systemTrendsCharts[`${cst.metaSystem}PV`] = [...cst.samples?.map((s) => [moment(s.date).format('YYYY/MM/DD'), s.PV])];
    }

    for (const date of allDates) {
      data = [...data, [date, ...Object.keys(systemTrendsCharts).map((key) => systemTrendsCharts[key].filter((s) => s[0] === date).flat()[1])]];
    }

    return [names, ...data];
  }, [metaSystems, projectId, systemTrends]);

  const getDeliverableTrendChartData = useMemo(() => {
    let data = [];
    const { samples } = systemTrends[projectId]?.find(({ metaSystem }) => metaSystem === systemId) || {};

    if (!isEmpty(samples)) {
      const names = [
        'Date',
        ...samples[0].deliverables
          ?.map(({ deliverable }) => {
            const name =
              metaSystems[projectId]?.find(({ _id }) => systemId === _id)?.mainSystem?.deliverables?.find(({ _id }) => deliverable === _id)?.name ||
              deliverable;

            return [`${name} EV`, `${name} PV`];
          })
          .flat(),
      ];

      const allDates = [...samples.map(({ date }) => moment(date).format('YYYY/MM/DD'))];

      data = allDates.map((date) => {
        const { deliverables } = samples.find(({ date: sampleDate }) => date === moment(sampleDate).format('YYYY/MM/DD')) || {};
        return [date, ...deliverables.map(({ EV, PV }) => [EV, PV]).flat()];
      });

      return [names, ...data];
    }

    return data;
  }, [metaSystems, projectId, systemId, systemTrends]);

  useEffect(() => {
    dispatch(readMetaSystem(projectId));
    dispatch(getSystemHistory(projectId, true));
  }, [dispatch, metaSystems, projectId]);

  useEffect(() => {
    const isDeliverableTrendChart = Boolean(systemId);
    let data = [];

    if (Boolean(systemTrends[projectId]) && !isEmpty(systemTrends[projectId])) {
      if (isDeliverableTrendChart) {
        data = getDeliverableTrendChartData;
      } else {
        data = getSystemTrendChartData;
      }
      setChartData(data);
    }
  }, [getDeliverableTrendChartData, getSystemTrendChartData, projectId, systemId, systemTrends]);

  return { projectName, systemName, title, chartData };
};

export default useTrendChartData;
