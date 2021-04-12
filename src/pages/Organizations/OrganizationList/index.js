
import React, { memo, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Plus } from 'react-feather';

import ContainedButton from 'components/UI/Buttons/ContainedButton';
import PageHeader from 'parts/PageHeader';
import OrganizationActions from './OrganizationActions';
import OrganizationsTable from './OrganizationsTable';
import LINKS from 'utils/constants/links';

const NAV_LINKS = [LINKS.USER_MANAGEMENT];

const OrganizationList = () => {
  const history = useHistory();

  const [action, setAction] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  const actionHandler = useCallback(() => {
    console.log('action go');
  }, []);

  const addHandler = useCallback(() => {
    history.push(LINKS.ADD_ORGANIZATION.HREF);
  }, [history]);

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
      <OrganizationActions
        action={action}
        setAction={setAction}
        onAction={actionHandler}
      />
      <OrganizationsTable
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
    </>
  );
};

export default memo(OrganizationList);