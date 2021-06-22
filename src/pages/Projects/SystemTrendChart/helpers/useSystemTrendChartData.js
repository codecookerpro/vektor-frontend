import { useState, useMemo, useEffect } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';

import { getSystemHistory } from 'redux/actions/systems';

const useSystemTrendChartData = (_id) => {
  const dispatch = useDispatch();
  const [chartData, setChartData] = useState([]);

  const { results: projects, metaSystems, systemTrends } = useSelector(({ projects }) => projects);

  const { name } = useMemo(() => projects.find((item) => item._id === _id) || {}, [_id, projects]);

  useEffect(() => dispatch(getSystemHistory(_id, true)), [dispatch, _id]);

  useEffect(() => {
    const systemTrendsCharts = {};
    let data = [];
    const currentSystemTrends = systemTrends[_id] || [];

    if (currentSystemTrends.length > 0) {
      const names = [
        'Date',
        ...(
          metaSystems[_id]?.map(({ name }) => [`${name} EV`, `${name} PV`]) ||
          currentSystemTrends?.map(({ metaSystem }) => [`${metaSystem} EV`, `${metaSystem} PV`])
        ).flat(),
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

      setChartData([names, ...data]);
    }
  }, [metaSystems, _id, systemTrends]);

  return { name, chartData };
};

export default useSystemTrendChartData;
