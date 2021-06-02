import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';
import { Card, CardContent, Grid, Button, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import * as organizationAPI from 'services/api-organization';
import { addOrganization, editOrganization, removeOrganization } from 'redux/actions/organizations';
import VektorTextField from 'components/UI/TextFields/VektorTextField';
import { STRING_INPUT_VALID } from 'utils/constants/validations';
import LINKS from 'utils/constants/links';
import { isEmpty } from 'utils/helpers/utility';
import useLoading from 'utils/hooks/useLoading';
import { Plus } from 'react-feather';
import { checkObjectId } from 'utils/helpers/checkObjectId';
import { setPopup } from 'redux/actions/popupActions';
import { POPUP_TYPE } from 'utils/constants/popupType';
import { errorCode2Message } from 'utils/helpers/errorCode2Message';

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
  departmentsBtn: {
    marginTop: theme.spacing(3),
  },
  delete: {
    marginLeft: 'auto',
    backgroundColor: theme.custom.palette.red,
  },
  departmentInput: {
    marginTop: theme.spacing(6),
  },
  departmentsBlock: {
    marginBottom: theme.spacing(6),
    marginTop: theme.spacing(6),
    border: `1px solid ${theme.custom.palette.border}`,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
}));

let departmentsValidate = joi.object().keys({
  label: STRING_INPUT_VALID,
  _id: STRING_INPUT_VALID,
});

const schema = joi.object().keys({
  name: STRING_INPUT_VALID,
  departments: joi.array().items(departmentsValidate),
});

const OrganizationForm = ({ organization = {} }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { changeLoadingStatus } = useLoading();
  const [errorMessage, setErrorMessage] = useState('');
  const [departments, setDepartments] = useState(organization.departments || [{ label: '', _id: '' }]);
  const { control, handleSubmit, errors } = useForm({
    resolver: joiResolver(schema),
  });

  const onSubmit = async (data) => {
    changeLoadingStatus(true);
    try {
      let params = {
        name: data.name,
      };
      let departments = data.departments;

      if (isEmpty(organization)) {
        let createDepartments = departments.map(({ label }) => ({ label }));
        params = {
          mainId: organization._id,
          ...params,
          departments: createDepartments,
        };
        const response = await organizationAPI.createOrganization(params);
        dispatch(addOrganization(response.data));
      } else {
        const response = departments.map(({ _id, label }) => {
          let options = {
            mainId: organization._id,
            label,
          };
          if (checkObjectId(_id)) {
            options = {
              ...options,
              _id,
            };
            return organizationAPI.updateOrganizationDepartment(options);
          } else {
            return organizationAPI.createOrganizationDepartment(options);
          }
        });
        Promise.allSettled(response).then((results) => {
          params = {
            _id: organization._id,
            ...params,
          };
          organizationAPI.updateOrganization(params).then((response) => {
            dispatch(editOrganization(response.data));
          });
          const rejected = results.filter((result) => result.status === 'rejected');
          if (rejected.length > 0) {
            dispatch(setPopup({ popupType: POPUP_TYPE.ERROR, popupText: errorCode2Message(100, []) }));
          }
        });
      }
      history.push(LINKS.ORGANIZATIONS.HREF);
    } catch (error) {
      if (error.response) {
        const {
          data: { message },
        } = error.response;
        setErrorMessage(message);
      }
    }
    changeLoadingStatus(false);
  };

  const deleteHandler = async () => {
    changeLoadingStatus(true);
    try {
      await organizationAPI.deleteOrganization({ _id: organization._id });
      dispatch(removeOrganization(organization));
      history.push(LINKS.ORGANIZATIONS.HREF);
    } catch (error) {
      if (error.response) {
        const {
          data: { message },
        } = error.response;
        setErrorMessage(message);
      }
    }
    changeLoadingStatus(false);
  };

  const addDepartment = () => {
    const newDepartments = departments.concat([{ label: '', _id: '' }]);
    setDepartments(newDepartments);
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
          {organization?.name || 'New Organization'}
        </Typography>
        <form noValidate className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
                defaultValue={organization?.name || ''}
              />
            </Grid>
            <Grid item xs={12} className={classes.departmentsBlock}>
              <Typography color="textSecondary" className={classes.label}>
                Departments
              </Typography>
              {departments.map((department, index) => (
                <div key={index}>
                  <Controller
                    className={classes.departmentInput}
                    as={<VektorTextField />}
                    fullWidth
                    name={`departments.${index}.label`}
                    placeholder="Department"
                    error={errors.departments?.[index]?.label?.message}
                    control={control}
                    defaultValue={department.label || ''}
                  />
                  <Controller defaultValue={department._id || `${index}`} control={control} name={`departments.${index}._id`} />
                </div>
              ))}
              <div className={classes.departmentsBtn}>
                <Button variant="outlined" color="primary" onClick={addDepartment}>
                  <Plus /> Add another department
                </Button>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.buttonContainer}>
                <Button variant="contained" color="primary" type="submit">
                  Save Changes
                </Button>
                {!isEmpty(organization) && (
                  <Button color="primary" variant="contained" className={classes.delete} onClick={deleteHandler}>
                    Delete
                  </Button>
                )}
              </div>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default memo(OrganizationForm);
