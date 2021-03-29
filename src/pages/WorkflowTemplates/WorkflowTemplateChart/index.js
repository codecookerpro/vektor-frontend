import React, { memo, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import PageHeader from "parts/PageHeader";
import LINKS from "utils/constants/links";
import results from "utils/temp/systems";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(7.5),
  },
}));

const WorkflowTemplateChart = () => {
  const classes = useStyles();
  const { id } = useParams();

  const workflowTemplate = useMemo(() => results.find((item) => item.id === id), [id]);

  const NAV_LINKS = [
    LINKS.PROJECT_TEMPLATE,
    LINKS.WORKFLOW_TEMPLATES,
    {
      HREF: LINKS.WORKFLOW_TEMPLATE_CHART.HREF.replace(":id", id),
      TITLE: workflowTemplate?.name || "Not Found",
    },
  ];

  return (
    <>
      <PageHeader
        title={`${LINKS.WORKFLOW_TEMPLATE_CHART.TITLE}: ${workflowTemplate?.name || "Not Found"}`}
        links={NAV_LINKS}
      />
      <Card className={classes.root}>
        <CardHeader
          title="Workflow Template Chart"
        />
        <CardContent>
          Workflow Chart
        </CardContent>
      </Card>
    </>
  );
};

export default memo(WorkflowTemplateChart);
