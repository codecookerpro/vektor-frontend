
import React, { memo, useCallback } from 'react'
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles'
import { Plus } from 'react-feather';

import ContainedButton from 'components/UI/Buttons/ContainedButton'
import PageHeader from 'parts/PageHeader';
import OrganizationFilter from './OrganizationFilter';
import ProjectsTable from './ProjectsTable';
import LINKS from 'utils/constants/links';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  }
}));

const NAV_LINKS = [
  LINKS.PROJECT_MANAGEMENT
]

const ProjectList = () => {
  const classes = useStyles();
  const history = useHistory();

  const addProjectHandler = useCallback(() => {
    history.push(LINKS.ADD_PROJECT.HREF)
  }, [history]);

  return (
    <main className={classes.root}>
      <PageHeader
        title={LINKS.PROJECTS.TITLE}
        links={NAV_LINKS}
        leftElement={
          <ContainedButton onClick={addProjectHandler}>
            <Plus /> Add Project
          </ContainedButton>
        }
      />
      <OrganizationFilter />

      <ProjectsTable />
    </main>
  )
}

export default memo(ProjectList)