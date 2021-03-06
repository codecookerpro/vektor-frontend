import React, { memo, useState, useMemo } from "react";
import { Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import PageHeader from "parts/PageHeader";
import ProjectForm from "../Shared/ProjectForm";
import LINKS from "utils/constants/links";
import users from "utils/temp/users";

const NAV_LINKS = [LINKS.PROJECT_MANAGEMENT, LINKS.PROJECTS];

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(7.5),
  },
}));

const AddProject = () => {
  const classes = useStyles();
  const [selectedOrganization, setSelectedOrganization] = useState("");

  const userList = useMemo(
    () =>
      users.filter((user) => user?.organization.id === selectedOrganization),
    [selectedOrganization]
  );

  return (
    <>
      <PageHeader title={LINKS.ADD_PROJECT.TITLE} links={NAV_LINKS} />
      <Card className={classes.root}>
        <CardContent>
          <ProjectForm
            users={userList}
            setSelectedOrganization={setSelectedOrganization}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default memo(AddProject);
