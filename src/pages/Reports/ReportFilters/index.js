import React, { memo } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import FilterSelect from "components/UI/Selects/FilterSelect";
import organizations from "utils/temp/organizations";
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

const ReportFilters = ({ filter, setFilter }) => {
  const classes = useStyles();

  const inputHandler = (event) => {
    setFilter((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography variant="h3" color="textPrimary">
          Select records to download CSV
        </Typography>

        <div className={classes.container}>
          <FilterSelect
            label="By organization"
            placeholder="All organizations"
            name="organization"
            items={organizations}
            value={filter?.organization || ""}
            onChange={inputHandler}
            className={classes.input}
          />
          <FilterSelect
            label="By project"
            placeholder="All projects"
            name="project"
            items={projects}
            keys={{
              label: "name",
              value: "id",
            }}
            value={filter?.project || ""}
            onChange={inputHandler}
            className={classes.input}
          />
          <FilterSelect
            label="By project number"
            placeholder="All project numbers"
            name="projectNumber"
            items={projects}
            keys={{
              label: "name",
              value: "id",
            }}
            value={filter?.projectNumber || ""}
            onChange={inputHandler}
            className={classes.input}
          />
          <FilterSelect
            label="By PN name"
            placeholder="All PN names"
            name="pnName"
            items={projects}
            keys={{
              label: "name",
              value: "id",
            }}
            value={filter?.pnName || ""}
            onChange={inputHandler}
            className={classes.input}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(ReportFilters);
