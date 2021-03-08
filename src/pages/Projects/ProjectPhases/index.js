import React, { memo, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Grid, Card, CardContent } from "@material-ui/core";

import PageHeader from "parts/PageHeader";
import ProjectPhasesTable from "../Shared/ProjectPhasesTable";
import LINKS from "utils/constants/links";
import results from "utils/temp/projects";

const ProjectPhases = () => {
  const { id } = useParams();

  const project = useMemo(() => results.find((item) => item.id === id), [id]);
  const NAV_LINKS = [
    LINKS.PROJECT_MANAGEMENT,
    LINKS.PROJECTS,
    {
      HREF: LINKS.EDIT_PROJECT.HREF.replace(":id", id),
      TITLE: project?.name || "Not Found",
    },
  ];

  return (
    <>
      <PageHeader
        title={`${LINKS.PROJECT_PHASES.TITLE}: ${project?.name || "Not Found"}`}
        links={NAV_LINKS}
      />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent>Data</CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <ProjectPhasesTable />
        </Grid>
      </Grid>
    </>
  );
};

export default memo(ProjectPhases);
