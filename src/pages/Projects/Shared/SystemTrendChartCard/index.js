import React, { memo } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ContainedButton from "components/UI/Buttons/ContainedButton";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350,
    marginBottom: theme.spacing(6),
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
  },
}));

const SystemTrendChartCard = ({ onDetail }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography variant="h6" color="textPrimary" className={classes.title}>
          System Trend Chart
        </Typography>
        <ContainedButton onClick={onDetail}>Details</ContainedButton>
      </CardContent>
    </Card>
  );
};

export default memo(SystemTrendChartCard);
