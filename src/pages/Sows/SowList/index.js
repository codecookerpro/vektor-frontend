import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PageHeader from '../../../parts/PageHeader';
import LINKS from '../../../utils/constants/links';
import OrganizationFilter from '../../Projects/ProjectList/OrganizationFilter';
import ProjectsTable from '../../Projects/ProjectList/ProjectsTable';
import SowTable from './SowTable';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const SowList = () => {
  const classes = useStyles();

  return (
    <>
      {/*<PageHeader title={LINKS.PROJECTS.TITLE} links={NAV_LINKS} leftElement={isVisible && renderAddProjectButton()} />*/}
      {/*<OrganizationFilter organization={organization} setOrganization={setOrganization} />*/}
      <SowTable />
    </>
  );
};

export default memo(SowList);
