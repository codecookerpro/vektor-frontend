import { useCallback, useEffect, useMemo, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { getReports } from 'redux/actions/reports';
import { DEFAULT_ROWS_PER_PAGE } from 'utils/constants';

import { COLUMNS } from './constants';

const useReportsTableLogic = (isAdmin, filter) => {
  const dispatch = useDispatch();

  const [reports, setReports] = useState([]);
  const [page, setPage] = useState(0);
  const [rowCounts, setRowCounts] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [selectedItems, setSelectedItems] = useState([]);

  const fromPage = page * rowsPerPage;
  const toPage = fromPage + rowsPerPage;

  const { reportsData, organizationsData, userOrganization } = useSelector(({ reports, organizations, auth }) => {
    const { results: reportsData } = reports;
    const { results: organizationsData } = organizations;
    const {
      currentUser: { organization: userOrganization },
    } = auth;

    return { reportsData, organizationsData, userOrganization };
  });

  const filteredReports = useMemo(
    () =>
      reportsData.map((r) => ({
        ...r,
        organizationName: organizationsData.find((o) => o._id === r.organization)?.name || 'No organization name',
        start: moment(r.start).format('YYYY/MM/DD'),
        end: moment(r.end).format('YYYY/MM/DD'),
      })),
    [organizationsData, reportsData]
  );

  useEffect(() => {
    if (isAdmin) {
      dispatch(getReports(null, true));
    } else {
      dispatch(getReports({ organization: userOrganization }, true));
    }
  }, [dispatch, isAdmin, userOrganization]);

  useEffect(() => {
    const filterKeys = Object.keys(filter);
    let data = [];

    if (filterKeys.length > 0) {
      data = filterKeys.reduce((acc, key) => [...acc.filter((r) => r[key] === filter[key])], filteredReports);
    } else {
      data = filteredReports;
    }

    setRowCounts(data.length);
    setReports(rowsPerPage > 0 ? data.slice(fromPage, toPage) : data);
  }, [filter, fromPage, organizationsData, reportsData, filteredReports, rowsPerPage, toPage]);

  const toggleHandler = useCallback(
    (value) => () => {
      if (value) {
        const currentIndex = selectedItems.findIndex((item) => item._id === value._id);
        const newSelectedItems = [...selectedItems];

        if (currentIndex === -1) {
          newSelectedItems.push(value);
        } else {
          newSelectedItems.splice(currentIndex, 1);
        }

        setSelectedItems(newSelectedItems);
      } else {
        setSelectedItems(selectedItems.length === reports.length ? [] : reports);
      }
    },
    [reports, selectedItems]
  );

  const checkSelected = useCallback(
    (rowId) => (rowId ? selectedItems.findIndex((value) => rowId === value._id) !== -1 : selectedItems.length === reports.length),
    [reports.length, selectedItems]
  );

  const resetSelectedItems = () => setSelectedItems([]);

  const columns = [
    {
      id: 'select',
      label: <Checkbox inputProps={{ 'aria-labelledby': `check-all` }} checked={checkSelected()} onChange={toggleHandler()} />,
      minWidth: 10,
    },
    ...getRelevantHeaders(isAdmin, COLUMNS),
  ];

  return {
    reports,
    columns,
    selectedItems,
    rowCounts,
    page,
    rowsPerPage,
    setPage,
    toggleHandler,
    checkSelected,
    setRowsPerPage,
    resetSelectedItems,
  };
};

const getRelevantHeaders = (isAdmin, value) => (isAdmin ? value : value.filter((v) => v?.id !== 'organization' && v?.key !== 'organizationName'));

export { useReportsTableLogic, getRelevantHeaders };
