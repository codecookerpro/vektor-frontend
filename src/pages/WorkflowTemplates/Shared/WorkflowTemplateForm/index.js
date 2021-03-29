import React, { memo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Card, CardContent, Grid, Button, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

import VektorTextField from "components/UI/TextFields/VektorTextField";
import FilterSelect from "components/UI/Selects/FilterSelect";
import {
  STRING_INPUT_VALID,
  SELECT_VALID,
  INTEGER_VALID
} from "utils/constants/validations";
import LINKS from "utils/constants/links";
import { EQUIPMENT_TYPES } from "utils/constants/equipment";

const useStyles = makeStyles((theme) => ({
  alert: {
    marginBottom: theme.spacing(4),
  },
  name: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: theme.spacing(3),
  },
  form: {
    marginBottom: theme.spacing(6),
  },
  buttonContainer: {
    display: "flex",
  },
  delete: {
    marginLeft: "auto",
    backgroundColor: theme.custom.palette.red,
  },
}));

const schema = yup.object().shape({
  name: STRING_INPUT_VALID,
  organization: SELECT_VALID,
  differentialWeight: INTEGER_VALID,
});

const WorkflowTemplateForm = ({ workflowTemplate = {} }) => {
  const classes = useStyles();
  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState("");

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const params = {
        name: data.name,
        organization: data.organization,
        differentialWeight: data.differentialWeight,
      };

      console.log(params);
      history.push(LINKS.WORKFLOW_TEMPLATES.HREF);
    } catch (error) {
      if (error.response) {
        const {
          data: { message },
        } = error.response;
        setErrorMessage(message);
      }
    }
  };

  const deleteHandler = () => {
    console.log("delete");
  };

  return (
    <Card>
      <CardContent>
        {errorMessage && (
          <Alert mt={2} mb={1} severity="warning" className={classes.alert}>
            {errorMessage}
          </Alert>
        )}
        <Typography variant="h6" className={classes.name}>
          {workflowTemplate?.name || "New workflowTemplate"}
        </Typography>
        <form noValidate className={classes.form}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                as={<VektorTextField />}
                fullWidth
                name="name"
                label="Name"
                placeholder="Name"
                error={errors.name?.message}
                control={control}
                defaultValue={workflowTemplate?.name || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                as={<FilterSelect />}
                fullWidth
                name="organization"
                label="Organization"
                placeholder="Select organization"
                items={EQUIPMENT_TYPES}
                error={errors.organization?.message}
                control={control}
                defaultValue={workflowTemplate?.organization || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                as={<VektorTextField />}
                fullWidth
                type='number'
                name="differentialWeight"
                label="Differential Weight"
                placeholder="Number"
                error={errors.differentialWeight?.message}
                control={control}
                defaultValue={workflowTemplate?.differentialWeight || 1}
              />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.buttonContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit(onSubmit())}
                >
                  Save
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.delete}
                  onClick={deleteHandler}
                >
                  Delete
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default memo(WorkflowTemplateForm);
