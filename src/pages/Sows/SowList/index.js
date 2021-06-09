import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus } from 'react-feather';
import { useHistory } from 'react-router-dom';

import SowTable from './SowTable';
import { getSOWs } from 'redux/actions/sowAction';
import SowFilters from './SowFilter';
import PageHeader from 'parts/PageHeader';
import LINKS from 'utils/constants/links';
import { PERMISSION_TYPE } from 'utils/constants/permissions';
import ContainedButton from 'components/UI/Buttons/ContainedButton';

const SowList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);

  const { permissions } = useSelector(({ auth }) => auth.currentUser);
  const isVisible = [PERMISSION_TYPE.ADMIN, PERMISSION_TYPE.SUPERVISOR, PERMISSION_TYPE.PROJECT_MANAGER, PERMISSION_TYPE.USER].includes(permissions);
  useEffect(() => {
    dispatch(getSOWs(filter));
  }, [dispatch, filter]);

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
      <SowTable selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
    </>
  );
};

export default memo(SowList);
