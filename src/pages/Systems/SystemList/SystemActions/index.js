import React, { memo } from "react";
import { Button, Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import VektorSearchInput from "components/UI/TextFields/VektorSearchInput";
import FilterSelect from "components/UI/Selects/FilterSelect";
import SYSTEM_ACTIONS from "utils/constants/table-actions/system";
import projects from "utils/temp/projects";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(7.5),
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${theme.spacing(6, 8)} !important`,
  },
  container: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    margin: theme.spacing(4),
  },
}));

const SystemActions = ({
  search,
  setSearch,
  action,
  setAction,
  project,
  setProject,
  onAction,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography variant="h3" color="textPrimary">
          Select system to change
        </Typography>

        <div className={classes.container}>
          <VektorSearchInput
            placeholder="Search"
            className={classes.input}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FilterSelect
            label="Action:"
            placeholder="Select Action"
            items={SYSTEM_ACTIONS}
            value={action}
            onChange={(e) => setAction(e.target.value)}
            className={classes.input}
          />
          <Button color="primary" variant="contained" onClick={onAction}>
            Go
          </Button>
          <FilterSelect
            label="By project"
            placeholder="All projects"
            items={projects}
            keys={{
              label: "name",
              value: "id",
            }}
            value={project}
            onChange={(e) => setProject(e.target.value)}
            className={classes.input}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(SystemActions);
