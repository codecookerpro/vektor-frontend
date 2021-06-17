import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus } from 'react-feather';
import { useHistory } from 'react-router-dom';

import SowTable from './SowTable';
import { getSOWs, setSelectedSOW } from 'redux/actions/sowAction';
import SowFilters from './SowFilter';
import PageHeader from 'parts/PageHeader';
import LINKS from 'utils/constants/links';
import { PERMISSION_TYPE } from 'utils/constants/permissions';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import * as TABLE_ENVIRONMENTS from 'utils/constants/table-environments';

const SowList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(TABLE_ENVIRONMENTS.ROWS_PER_PAGE);
  const { permissions } = useSelector(({ auth }) => auth.currentUser);
  const isVisible = [PERMISSION_TYPE.ADMIN, PERMISSION_TYPE.SUPERVISOR, PERMISSION_TYPE.PROJECT_MANAGER, PERMISSION_TYPE.USER].includes(permissions);
  const isOrganizationVisible = permissions === PERMISSION_TYPE.ADMIN;

  useEffect(() => {
    const skip = page * rowsPerPage;
    const pagination = {
      skip,
      limit: rowsPerPage,
    };
    dispatch(getSOWs(filter, pagination));
    dispatch(setSelectedSOW({}));
  }, [dispatch, filter, page, rowsPerPage]);

  const addHandler = useCallback(() => {
    history.push(LINKS.ADD_SOW.HREF);
  }, [history]);

  const renderAddSowButton = () => (
    <ContainedButton onClick={addHandler}>
      <Plus /> Add SOW
    </ContainedButton>
  );

  return (
    <>
      <PageHeader title={LINKS.SOWS.TITLE} leftElement={isVisible && renderAddSowButton()} />
      <SowFilters filter={filter} setFilter={setFilter} />
      <SowTable
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        isOrganizationVisible={isOrganizationVisible}
      />
    </>
  );
};

export default memo(SowList);
