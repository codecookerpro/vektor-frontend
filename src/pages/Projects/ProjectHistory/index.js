import React, { memo, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import VektorSubTableContainer from "parts/Tables/VektorSubTableContainer";
import PageHeader from "parts/PageHeader";
import LINKS from "utils/constants/links";
import projects from "utils/temp/projects";
import results from "utils/temp/project-history";

const columns = [
  { id: "date", label: "Date/Time", minWidth: 170 },
  { id: "user", label: "User", minWidth: 170 },
  { id: "action", label: "Action", minWidth: 100 },
];

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(7.5),
  },
}));

const ProjectHistory = () => {
  const classes = useStyles();
  const { id } = useParams();

  const project = useMemo(() => projects.find((item) => item.id === id), [id]);
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
        title={`${LINKS.PROJECT_HISTORY.TITLE}: ${
          project?.name || "Not Found"
        }`}
        links={NAV_LINKS}
      />
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" color="textPrimary" gutterBottom>
            Systems
          </Typography>
          <VektorSubTableContainer columns={columns}>
            {results.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.date || ""}</TableCell>
                <TableCell>{`${row?.user?.email}(${row?.user?.name})`}</TableCell>
                <TableCell>{row.action}</TableCell>
              </TableRow>
            ))}
          </VektorSubTableContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default memo(ProjectHistory);
