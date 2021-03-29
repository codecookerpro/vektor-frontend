
import React, { memo, useMemo } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";

import ContainedButton from "components/UI/Buttons/ContainedButton";
import PageHeader from "parts/PageHeader";
import DetailLinkCard from "parts/DetailLinkCard";
import WorkflowTemplateForm from "../Shared/WorkflowTemplateForm";
import LINKS from "utils/constants/links";
import results from "utils/temp/systems";

const NAV_LINKS = [LINKS.PROJECT_TEMPLATE, LINKS.WORKFLOW_TEMPLATES];

const EditWorkflowTemplate = () => {
  const { id } = useParams();
  const history = useHistory();

  const workflowTemplate = useMemo(() => results.find((item) => item.id === id), [id]);

  const historyHandler = () => {
    history.push(LINKS.WORKFLOW_TEMPLATE_HISTORY.HREF.replace(":id", id));
  };

  const workflowChartHandler = () => {
    history.push(LINKS.WORKFLOW_TEMPLATE_CHART.HREF.replace(":id", id));
  };

  return (
    <>
      <PageHeader
        title={LINKS.EDIT_WORKFLOW_TEMPLATE.TITLE}
        links={NAV_LINKS}
        leftElement={
          <ContainedButton onClick={historyHandler}>
            History
          </ContainedButton>
        }
      />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <WorkflowTemplateForm workflowTemplate={workflowTemplate} />
        </Grid>
        <Grid item xs={12}>
          <DetailLinkCard
            title="Workflow Chart"
            buttonLabel="See Chart"
            onDetail={workflowChartHandler}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default memo(EditWorkflowTemplate);
