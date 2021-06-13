import React, { memo, useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';

import ContainedButton from 'components/UI/Buttons/ContainedButton';
import PageHeader from 'parts/PageHeader';
import SystemForm from '../Shared/MetaSystemForm';
import LINKS from 'utils/constants/links';
import results from 'utils/temp/systems';

const NAV_LINKS = [LINKS.PROJECT_MANAGEMENT, LINKS.SYSTEMS];

const EditMetaSystem = () => {
  const { id } = useParams();
  const history = useHistory();

  const system = useMemo(() => results.find((item) => item.id === id), [id]);

  const historyHandler = () => {
    history.push(LINKS.SYSTEM_HISTORY.HREF.replace(':id', id));
  };

  return (
    <>
      <PageHeader
        title={LINKS.EDIT_SYSTEM.TITLE}
        links={NAV_LINKS}
        leftElement={<ContainedButton onClick={historyHandler}>History</ContainedButton>}
      />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <SystemForm system={system} />
        </Grid>
      </Grid>
    </>
  );
};

export default memo(EditMetaSystem);
