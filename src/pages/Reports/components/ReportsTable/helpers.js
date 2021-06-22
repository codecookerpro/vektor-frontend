import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getReports } from 'redux/actions/reports';
import { DEFAULT_ROWS_PER_PAGE } from 'utils/constants';

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

  const reportsWithOrganizationName = useMemo(
    () =>
      reportsData.map((r) => ({
        ...r,
        organizationName: organizationsData.find((o) => o._id === r.organization)?.name || 'No organization name',
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
    let filteredData = [];

    if (filterKeys.length > 0) {
      filteredData = filterKeys.reduce((acc, key) => [...acc.filter((r) => r[key] === filter[key])], reportsWithOrganizationName);
    } else {
      filteredData = reportsWithOrganizationName;
    }

    setRowCounts(filteredData.length);
    setReports(rowsPerPage > 0 ? filteredData.slice(fromPage, toPage) : filteredData);
  }, [filter, fromPage, organizationsData, reportsData, reportsWithOrganizationName, rowsPerPage, toPage]);

  const toggleHandler = useCallback(
    (value) => () => {
      const currentIndex = selectedItems.findIndex((item) => item._id === value._id);
      const newSelectedItems = [...selectedItems];

      if (currentIndex === -1) {
        newSelectedItems.push(value);
      } else {
        newSelectedItems.splice(currentIndex, 1);
      }

      setSelectedItems(newSelectedItems);
    },
    [selectedItems]
  );
  const checkSelected = useCallback((rowId) => selectedItems.findIndex((value) => rowId === value._id) !== -1, [selectedItems]);
  const getRelevantHeaders = (value) => (isAdmin ? value : value.slice(1));

  return {
    reports,
    selectedItems,
    rowCounts,
    page,
    rowsPerPage,
    setPage,
    toggleHandler,
    checkSelected,
    getRelevantHeaders,
    setRowsPerPage,
    resetSelectedItems: () => setSelectedItems([]),
  };
};

export default useReportsTableLogic;
