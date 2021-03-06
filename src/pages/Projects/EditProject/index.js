import React, { memo, useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import PageHeader from "parts/PageHeader";
import ProjectForm from "../Shared/ProjectForm";
import LINKS from "utils/constants/links";
import users from "utils/temp/users";
import results from "utils/temp/projects";
import { isEmpty } from "utils/helpers/utility";

const NAV_LINKS = [LINKS.PROJECT_MANAGEMENT, LINKS.PROJECTS];

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(7.5),
  },
}));

const EditProject = () => {
  const classes = useStyles();
  const { id } = useParams();

  const [selectedOrganization, setSelectedOrganization] = useState("");

  const project = useMemo(() => results.find((item) => item.id === id), [id]);

  useEffect(() => {
    if (!isEmpty(project)) {
      setSelectedOrganization(project.organization.id);
    }
  }, [project]);

  const userList = useMemo(
    () =>
      users.filter((user) => user?.organization.id === selectedOrganization),
    [selectedOrganization]
  );

  return (
    <>
      <PageHeader title={LINKS.EDIT_PROJECT.TITLE} links={NAV_LINKS} />
      <Card className={classes.root}>
        <CardContent>
          <ProjectForm
            users={userList}
            project={project}
            setSelectedOrganization={setSelectedOrganization}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default memo(EditProject);
