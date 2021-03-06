import React, { memo } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import VektorCheckbox from "components/UI/VektorCheckbox";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350,
    marginBottom: theme.spacing(6),
  },
}));

const StopDailyData = ({ project }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <VektorCheckbox label="Finished" checked={project?.finished} />
        <Typography variant="body2" color="textSecondary">
          Stops daily data collection for chart plotting.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default memo(StopDailyData);
