import React, { memo, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Plus } from 'react-feather';

import ContainedButton from 'components/UI/Buttons/ContainedButton';
import PageHeader from 'parts/PageHeader';
import OrganizationsTable from './OrganizationsTable';
import LINKS from 'utils/constants/links';
import { setSelectedDepartments, setSelectedOrganization } from 'redux/actions/organizations';
import { useDispatch } from 'react-redux';

const NAV_LINKS = [LINKS.USER_MANAGEMENT];

const OrganizationList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState([]);

  const addHandler = useCallback(() => {
    dispatch(setSelectedOrganization({}));
    dispatch(setSelectedDepartments([]));
    history.push(LINKS.ADD_ORGANIZATION.HREF);
  }, [history, dispatch]);

  return (
    <>
      <PageHeader
        title={LINKS.ORGANIZATIONS.TITLE}
        links={NAV_LINKS}
        leftElement={
          <ContainedButton onClick={addHandler}>
            <Plus /> Add Organization
          </ContainedButton>
        }
      />
      <OrganizationsTable selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
    </>
  );
};

export default memo(OrganizationList);
