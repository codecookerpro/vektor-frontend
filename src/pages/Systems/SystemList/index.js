import React, { memo, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Plus } from 'react-feather';

import ContainedButton from 'components/UI/Buttons/ContainedButton';
import PageHeader from 'parts/PageHeader';
import SystemActions from './SystemActions';
import SystemsTable from './SystemsTable';
import LINKS from 'utils/constants/links';

const NAV_LINKS = [LINKS.PROJECT_MANAGEMENT];

const SystemList = () => {
  const history = useHistory();

  const [search, setSearch] = useState('');
  const [action, setAction] = useState('');
  const [project, setProject] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  const addHandler = useCallback(() => {
    history.push(LINKS.ADD_SYSTEM.HREF);
  }, [history]);

  const actionHandler = useCallback(() => {
    console.log('action go');
  }, []);

  return (
    <>
      <PageHeader
        title={LINKS.SYSTEMS.TITLE}
        links={NAV_LINKS}
        leftElement={
          <ContainedButton onClick={addHandler}>
            <Plus /> Add System
          </ContainedButton>
        }
      />
      <SystemActions
        search={search}
        setSearch={setSearch}
        action={action}
        setAction={setAction}
        project={project}
        setProject={setProject}
        onAction={actionHandler}
      />
      <SystemsTable selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
    </>
  );
};

export default memo(SystemList);
