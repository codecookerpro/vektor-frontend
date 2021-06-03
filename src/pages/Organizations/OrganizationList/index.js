import React, { memo, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Plus } from 'react-feather';

import ContainedButton from 'components/UI/Buttons/ContainedButton';
import PageHeader from 'parts/PageHeader';
import OrganizationActions from './OrganizationActions';
import OrganizationsTable from './OrganizationsTable';
import LINKS from 'utils/constants/links';
import { setSelectedOrganization } from '../../../redux/actions/organizations';
import { useDispatch } from 'react-redux';

const NAV_LINKS = [LINKS.USER_MANAGEMENT];

const OrganizationList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [action, setAction] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  const actionHandler = useCallback(() => {
    console.log('action go');
  }, []);

  const addHandler = useCallback(() => {
    dispatch(setSelectedOrganization({}));
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
      <OrganizationActions action={action} setAction={setAction} onAction={actionHandler} />
      <OrganizationsTable selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
    </>
  );
};

export default memo(OrganizationList);
