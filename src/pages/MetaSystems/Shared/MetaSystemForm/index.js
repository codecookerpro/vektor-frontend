import React, { memo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';
import { Card, CardContent, Grid, Button, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import VektorTextField from 'components/UI/TextFields/VektorTextField';
import FilterSelect from 'components/UI/Selects/FilterSelect';
import { STRING_INPUT_VALID, SELECT_VALID } from 'utils/constants/validations';
import LINKS from 'utils/constants/links';
import { EQUIPMENT_TYPE, EQUIPMENT_TYPES } from 'utils/constants/equipment-types';
import { EQUIPMENT_CATEGORIES, EQUIPMENT_CATEGORY_TYPE } from 'utils/constants/equipment-categories';
import projects from 'utils/temp/projects';
import workflowTemplates from 'utils/temp/workflow-templates';

const useStyles = makeStyles((theme) => ({
  alert: {
    marginBottom: theme.spacing(4),
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: theme.spacing(3),
  },
  form: {
    marginBottom: theme.spacing(6),
  },
  buttonContainer: {
    display: 'flex',
  },
  delete: {
    marginLeft: 'auto',
    backgroundColor: theme.custom.palette.red,
  },
}));

const schema = joi.object().keys({
  name: STRING_INPUT_VALID,
  equipmentCategory: SELECT_VALID,
  equipmentType: SELECT_VALID,
  equipmentName: STRING_INPUT_VALID,
  equipmentNumber: STRING_INPUT_VALID,
  project: SELECT_VALID,
  workflow: SELECT_VALID,
  productCode: STRING_INPUT_VALID,
  site: STRING_INPUT_VALID,
});

const MetaSystemForm = ({ system = {} }) => {
  const classes = useStyles();
  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState('');

  const { control, handleSubmit, errors, reset } = useForm({
    resolver: joiResolver(schema),
  });

  const onSubmit = (addNew) => async (data) => {
    try {
      const params = {
        name: data.name,
        equipmentCategory: data.equipmentCategory,
        equipmentType: data.equipmentType,
        equipmentName: data.equipmentName,
        equipmentNumber: data.equipmentNumber,
        project: data.project,
        workflow: data.workflow,
        productCode: data.productCode,
        site: data.site,
      };

      if (addNew) {
        reset({
          name: '',
          equipmentCategory: '',
          equipmentType: '',
          equipmentName: '',
          equipmentNumber: '',
          project: '',
          workflow: '',
          productCode: '',
          site: '',
        });
      } else {
        history.push(LINKS.SYSTEMS.HREF);
      }
    } catch (error) {
      if (error.response) {
        const {
          data: { message },
        } = error.response;
        setErrorMessage(message);
      }
    }
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
          {system?.name || 'New System'}
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
                defaultValue={system?.name || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                as={<FilterSelect />}
                fullWidth
                name="equipmentCategory"
                label="Equipment Category"
                placeholder="Select Category"
                items={EQUIPMENT_CATEGORIES}
                error={errors.equipmentCategory?.message}
                control={control}
                defaultValue={system?.equipment?.category || EQUIPMENT_CATEGORY_TYPE.CUSTOM}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                as={<FilterSelect />}
                fullWidth
                name="equipmentType"
                label="Equipment Type"
                placeholder="Select Type"
                items={EQUIPMENT_TYPES}
                error={errors.equipmentType?.message}
                control={control}
                defaultValue={system?.equipment?.type || EQUIPMENT_TYPE.PROCESS}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Controller
                as={<VektorTextField />}
                fullWidth
                name="equipmentName"
                label="Equipment Name"
                placeholder="Equipment Name"
                error={errors.equipmentName?.message}
                control={control}
                defaultValue={system?.equipment?.name || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Controller
                as={<VektorTextField />}
                fullWidth
                name="equipmentNumber"
                label="Equipment Number"
                placeholder="Equipment Number"
                error={errors.equipmentNumber?.message}
                control={control}
                defaultValue={system?.equipment?.number || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                as={<VektorTextField />}
                fullWidth
                name="site"
                label="Site"
                placeholder="Site"
                error={errors.site?.message}
                control={control}
                defaultValue={system?.site || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.buttonContainer}>
                <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit(false))}>
                  Save Changes
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default memo(MetaSystemForm);
