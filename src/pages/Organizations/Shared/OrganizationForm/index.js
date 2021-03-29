import React, { memo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Card, CardContent, Grid, Button, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

import VektorTextField from "components/UI/TextFields/VektorTextField";
import { STRING_INPUT_VALID } from "utils/constants/validations";
import LINKS from "utils/constants/links";

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
  description: STRING_INPUT_VALID,
});

const OrganizationForm = ({ organization = {} }) => {
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
        description: data.description,
      };

      console.log(params);
      history.push(LINKS.ORGANIZATIONS.HREF);
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
          {organization?.name || "New Organization"}
        </Typography>
        <form noValidate className={classes.form}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Controller
                as={<VektorTextField />}
                fullWidth
                name="name"
                label="Name"
                placeholder="Name"
                error={errors.name?.message}
                control={control}
                defaultValue={organization?.name || ""}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                as={<VektorTextField />}
                fullWidth
                name="description"
                label="Description"
                placeholder="Description"
                error={errors.description?.message}
                control={control}
                defaultValue={organization?.description || ""}
              />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.buttonContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit(onSubmit())}
                >
                  Save Changes
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

export default memo(OrganizationForm);
