import React, { memo, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Plus } from "react-feather";

import ContainedButton from "components/UI/Buttons/ContainedButton";
import PageHeader from "parts/PageHeader";
import OrganizationFilter from "./OrganizationFilter";
import ProjectsTable from "./ProjectsTable";
import LINKS from "utils/constants/links";

const NAV_LINKS = [LINKS.PROJECT_MANAGEMENT];

const ProjectList = () => {
  const history = useHistory();

  const addProjectHandler = useCallback(() => {
    history.push(LINKS.ADD_PROJECT.HREF);
  }, [history]);

  return (
    <>
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
    </>
  );
};

export default memo(ProjectList);
