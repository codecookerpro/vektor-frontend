import React, { memo, useState, useMemo, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ContainedButton from "components/UI/Buttons/ContainedButton";
import PageHeader from "parts/PageHeader";
import ProjectForm from "../Shared/ProjectForm";
import StopDailyData from "../Shared/StopDailyData";
import SystemTrendChartCard from "../Shared/SystemTrendChartCard";
import ProjectSystemsTable from "../Shared/ProjectSystemsTable";
import LINKS from "utils/constants/links";
import users from "utils/temp/users";
import results from "utils/temp/projects";
import { isEmpty } from "utils/helpers/utility";

const NAV_LINKS = [LINKS.PROJECT_MANAGEMENT, LINKS.PROJECTS];

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(7.5),
  },
  form: {
    marginBottom: theme.spacing(6),
  },
}));

const EditProject = () => {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();

  const [selectedOrganization, setSelectedOrganization] = useState("");

  const project = useMemo(() => results.find((item) => item.id === id), [id]);

  useEffect(() => {
    if (!isEmpty(project)) {
      setSelectedOrganization(project.organization.id);
    }
  }, [project]);

  const userList = useMemo(
    () =>
      users?.filter((user) => user?.organization.id === selectedOrganization),
    [selectedOrganization]
  );

  const systemTrendChartHandler = () => {
    history.push(LINKS.SYSTEM_TREND_CHART.HREF.replace(":id", id));
  };

  const historyHandler = () => {
    history.push(LINKS.PROJECT_HISTORY.HREF.replace(":id", id));
  };

  return (
    <>
      <PageHeader
        title={LINKS.EDIT_PROJECT.TITLE}
        links={NAV_LINKS}
        leftElement={
          <ContainedButton onClick={historyHandler}>History</ContainedButton>
        }
      />
      <Card className={classes.root}>
        <CardContent>
          <ProjectForm
            users={userList}
            project={project}
            setSelectedOrganization={setSelectedOrganization}
            className={classes.form}
          />
          <StopDailyData project={project} />
          <SystemTrendChartCard onDetail={systemTrendChartHandler} />
          <ProjectSystemsTable />
        </CardContent>
      </Card>
    </>
  );
};

export default memo(EditProject);
