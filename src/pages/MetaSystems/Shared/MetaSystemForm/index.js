import React, { memo, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';
import {
  Card,
  CardContent,
  Grid,
  Button,
  Typography,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { ColorButton } from 'components/UI/Buttons';
import VektorTextField from 'components/UI/TextFields/VektorTextField';
import FilterSelect from 'components/UI/Selects/FilterSelect';

import { STRING_INPUT_VALID, SELECT_VALID } from 'utils/constants/validations';
import { EQUIPMENTS, EQUIPMENT_CATEGORIES, FORM_MODE, POPUP_TYPE, noop } from 'utils/constants';
import { createMetaSystem, updateMetaSystem, deleteMetaSystem, duplicateMetaSystem } from 'redux/actions/metaSystem';
import { setPopup } from 'redux/actions/popupActions';
import LINKS from 'utils/constants/links';
import { getProjects } from 'redux/actions/projects';

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
  deleteButton: {
    marginLeft: 'auto',
  },
  button: {
    marginLeft: theme.spacing(1),
  },
}));

const schema = joi.object().keys({
  name: STRING_INPUT_VALID,
  resource: SELECT_VALID,
  equipmentCategory: SELECT_VALID,
  equipmentType: SELECT_VALID,
  equipmentName: STRING_INPUT_VALID,
  equipmentNumber: STRING_INPUT_VALID,
  site: STRING_INPUT_VALID,
  productCode: STRING_INPUT_VALID,
});

const MetaSystemForm = ({ mode = FORM_MODE.view, system = {}, setFormMode = noop }) => {
  const { projectId } = useParams();
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.projects.results.find((p) => p._id === projectId));
  const users = useSelector((state) => state.users.results.filter((u) => u.organization === project?.organization));
  const { control, handleSubmit, errors } = useForm({
    resolver: joiResolver(schema),
  });
  const fieldsDisabled = mode === FORM_MODE.view;
  const calculated = system?.mainSystem?.calculated;
  const status = system?.mainSystem?.status;

  const onSubmit = (data) => {
    const params = {
      name: data.name,
      resource: data.resource,
      equipmentCategory: data.equipmentCategory,
      equipmentType: data.equipmentType,
      equipmentName: data.equipmentName,
      equipmentNumber: data.equipmentNumber,
      productCode: data.productCode,
      site: data.site,
    };

    if (mode === FORM_MODE.create) {
      dispatch(createMetaSystem({ ...params, project: projectId, organization: project.organization }));
      history.push(LINKS.EDIT_PROJECT.HREF.replace(':id', projectId));
    } else if (mode === FORM_MODE.update) {
      dispatch(updateMetaSystem({ ...params, _id: system._id }));
      setFormMode(FORM_MODE.view);
    }
  };

  const handleDelete = () => {
    dispatch(
      setPopup({
        popupType: POPUP_TYPE.confirm,
        popupText: 'Are you sure you want to delete this system?',
        onConfirm: () => {
          dispatch(deleteMetaSystem(system.project, system._id));
          history.goBack();
        },
      })
    );
  };

  const handleDuplicate = () => {
    dispatch(duplicateMetaSystem(system));
    history.push(LINKS.ADD_META_SYSTEM.HREF.replace(':projectId', system.project));
  };

  // eslint-disable-next-line
  useEffect(() => dispatch(getProjects({ filter: { _id: projectId } })), []);

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h6" className={classes.name}>
            {system.name || 'New System'}
          </Typography>
          <form noValidate className={classes.form}>
            <Grid container spacing={6}>
              <Grid item xs={6} sm={3} md={3}>
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
              <Grid item xs={6} sm={3} md={3}>
                <Controller
                  as={<FilterSelect />}
                  fullWidth
                  disabled={fieldsDisabled}
                  id="resource"
                  name="resource"
                  label="Resource"
                  placeholder="Select User"
                  items={users}
                  keys={{ value: '_id', label: 'label' }}
                  error={errors.resource?.message}
                  control={control}
                  defaultValue={system.resource || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
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
                  defaultValue={system.equipmentCategory || EQUIPMENT_CATEGORIES[0].VALUE}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  as={<FilterSelect />}
                  fullWidth
                  disabled={fieldsDisabled}
                  name="equipmentType"
                  label="Equipment Type"
                  placeholder="Select Type"
                  items={EQUIPMENTS}
                  error={errors.equipmentType?.message}
                  control={control}
                  defaultValue={system.equipmentType || EQUIPMENTS[0].VALUE}
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
                {mode === FORM_MODE.view ? (
                  <Box display="flex">
                    <Button variant="contained" color="primary" onClick={() => setFormMode(FORM_MODE.update)}>
                      EDIT
                    </Button>
                    <Button variant="contained" color="default" className={classes.button} onClick={handleDuplicate}>
                      DUPLICATE
                    </Button>
                  </Box>
                ) : (
                  <Box display="flex">
                    <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
                      SAVE CHANGES
                    </Button>
                    {mode === FORM_MODE.update && (
                      <>
                        <Button variant="contained" color="default" className={classes.button} onClick={() => setFormMode(FORM_MODE.view)}>
                          CANCEL
                        </Button>
                        <ColorButton variant="contained" colour="red" className={classes.deleteButton} onClick={handleDelete}>
                          DELETE
                        </ColorButton>
                      </>
                    )}
                  </Box>
                )}
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      {calculated && (
        <Box mt={6}>
          <Card>
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Total Planned Hours</TableCell>
                      <TableCell>PV</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Effort</TableCell>
                      <TableCell>EV</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{calculated.totalPlannedHours}</TableCell>
                      <TableCell>{Math.round(calculated.PV)}%</TableCell>
                      <TableCell>{Math.round(status)}%</TableCell>
                      <TableCell>{Math.round((calculated.totalWorkedHours / calculated.totalPlannedHours) * 100)}%</TableCell>
                      <TableCell>{Math.round(calculated.EV)}%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      )}
    </>
  );
};

export default memo(MetaSystemForm);
