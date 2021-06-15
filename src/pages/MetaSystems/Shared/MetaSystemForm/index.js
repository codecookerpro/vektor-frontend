import React, { memo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';
import { Card, CardContent, Grid, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import VektorTextField from 'components/UI/TextFields/VektorTextField';
import FilterSelect from 'components/UI/Selects/FilterSelect';
import { STRING_INPUT_VALID, SELECT_VALID } from 'utils/constants/validations';
import { EQUIPMENT_TYPE, EQUIPMENT_TYPES } from 'utils/constants/equipment-types';
import { EQUIPMENT_CATEGORIES, EQUIPMENT_CATEGORY_TYPE } from 'utils/constants/equipment-categories';
import { createMetaSystem, updateMetaSystem, deleteMetaSystem } from 'redux/actions/metaSystem';
import { FORM_MODE } from 'utils/constants';
import { setPopup } from 'redux/actions/popupActions';
import { POPUP_TYPE } from 'utils/constants/popupType';

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
  deleteButton: {
    marginLeft: 'auto',
    backgroundColor: theme.custom.palette.red,
  },
  cancelButton: {
    marginLeft: theme.spacing(4),
  },
}));

const schema = joi.object().keys({
  name: STRING_INPUT_VALID,
  equipmentCategory: SELECT_VALID,
  equipmentType: SELECT_VALID,
  equipmentName: STRING_INPUT_VALID,
  equipmentNumber: STRING_INPUT_VALID,
  organization: SELECT_VALID,
  site: STRING_INPUT_VALID,
  productCode: STRING_INPUT_VALID,
});

const MetaSystemForm = ({ mode = FORM_MODE.view, system = {}, setFormMode = () => {} }) => {
  const { id } = useParams();
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const organizations = useSelector((state) => state.organizations.results);
  const { control, handleSubmit, errors } = useForm({
    resolver: joiResolver(schema),
  });
  const fieldsDisabled = mode === FORM_MODE.view;

  const onSubmit = (data) => {
    const params = {
      name: data.name,
      equipmentCategory: data.equipmentCategory,
      equipmentType: data.equipmentType,
      equipmentName: data.equipmentName,
      equipmentNumber: data.equipmentNumber,
      project: id,
      productCode: data.productCode,
      site: data.site,
    };

    if (mode === FORM_MODE.create) {
      dispatch(createMetaSystem({ ...params, organization: data.organization }));
      history.goBack();
    } else if (mode === FORM_MODE.update) {
      dispatch(updateMetaSystem({ ...params, _id: system._id }));
      setFormMode(FORM_MODE.view);
    }
  };

  const handleDelete = () => {
    dispatch(
      setPopup({
        popupType: POPUP_TYPE.CONFIRM,
        popupText: 'Are you sure you want to delete this system?',
        onConfirm: () => {
          dispatch(deleteMetaSystem(system.project, system._id));
          history.goBack();
        },
      })
    );
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" className={classes.name}>
          {system.name || 'New System'}
        </Typography>
        <form noValidate className={classes.form}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                as={<VektorTextField />}
                fullWidth
                disabled={fieldsDisabled}
                id="name"
                name="name"
                label="Name"
                placeholder="Name"
                error={errors.name?.message}
                control={control}
                defaultValue={system.name || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                as={<FilterSelect />}
                fullWidth
                disabled={fieldsDisabled}
                name="equipmentCategory"
                label="Equipment Category"
                placeholder="Select Category"
                items={EQUIPMENT_CATEGORIES}
                error={errors.equipmentCategory?.message}
                control={control}
                defaultValue={system.equipmentCategory || EQUIPMENT_CATEGORY_TYPE.CUSTOM}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                as={<FilterSelect />}
                fullWidth
                disabled={fieldsDisabled}
                name="equipmentType"
                label="Equipment Type"
                placeholder="Select Type"
                items={EQUIPMENT_TYPES}
                error={errors.equipmentType?.message}
                control={control}
                defaultValue={system.equipmentType || EQUIPMENT_TYPE.PROCESS}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Controller
                as={<VektorTextField />}
                fullWidth
                disabled={fieldsDisabled}
                id="equipmentName"
                name="equipmentName"
                label="Equipment Name"
                placeholder="Equipment Name"
                error={errors.equipmentName?.message}
                control={control}
                defaultValue={system.equipmentName || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Controller
                as={<VektorTextField />}
                fullWidth
                disabled={fieldsDisabled}
                id="equipmentNumber"
                name="equipmentNumber"
                label="Equipment Number"
                placeholder="Equipment Number"
                error={errors.equipmentNumber?.message}
                control={control}
                defaultValue={system.equipmentNumber || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Controller
                as={<VektorTextField />}
                fullWidth
                disabled={fieldsDisabled}
                id="productCode"
                name="productCode"
                label="Product Code"
                placeholder="Product Code"
                error={errors.productCode?.message}
                control={control}
                defaultValue={system.productCode}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Controller
                as={<FilterSelect />}
                fullWidth
                disabled={fieldsDisabled}
                name="organization"
                label="Organization"
                placeholder="Select Organization"
                items={organizations}
                keys={{
                  label: 'name',
                  value: '_id',
                }}
                error={errors.organization?.message}
                control={control}
                defaultValue={system.organization}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Controller
                as={<VektorTextField />}
                fullWidth
                disabled={fieldsDisabled}
                id="site"
                name="site"
                label="Site"
                placeholder="Site"
                error={errors.site?.message}
                control={control}
                defaultValue={system.site || ''}
              />
            </Grid>

            <Grid item xs={12}>
              <div className={classes.buttonContainer}>
                {mode === FORM_MODE.view ? (
                  <Button variant="contained" color="primary" onClick={() => setFormMode(FORM_MODE.update)}>
                    EDIT
                  </Button>
                ) : mode === FORM_MODE.update ? (
                  <>
                    <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
                      SAVE CHANGES
                    </Button>
                    <Button variant="contained" color="default" className={classes.cancelButton} onClick={() => history.goBack()}>
                      CANCEL
                    </Button>
                  </>
                ) : null}
                {mode === FORM_MODE.update ? (
                  <Button variant="contained" color="primary" className={classes.deleteButton} onClick={handleDelete}>
                    DELETE
                  </Button>
                ) : null}
              </div>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default memo(MetaSystemForm);
