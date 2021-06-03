import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';
import { Card, CardContent, Grid, Button, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import * as organizationAPI from 'services/api-organization';
import { editOrganization, setSelectedOrganization } from 'redux/actions/organizations';
import VektorTextField from 'components/UI/TextFields/VektorTextField';
import { STRING_INPUT_VALID } from 'utils/constants/validations';
import { isEmpty } from 'utils/helpers/utility';
import useLoading from 'utils/hooks/useLoading';
import { Plus, Trash } from 'react-feather';
import { checkObjectId } from 'utils/helpers/checkObjectId';
import { setPopup } from 'redux/actions/popupActions';
import { POPUP_TYPE } from 'utils/constants/popupType';
import { errorCode2Message } from 'utils/helpers/errorCode2Message';
import { POPUP_TEXT } from 'utils/constants/popupText';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
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
    color: theme.custom.palette.red,
    borderColor: theme.custom.palette.red,
    '&hover': {
      borderColor: theme.custom.palette.red,
    },
  },
  departmentInput: {
    marginTop: theme.spacing(6),
  },
  departmentsBlock: {
    marginBottom: theme.spacing(6),
    marginTop: theme.spacing(6),
    // border: `1px solid ${theme.custom.palette.border}`,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
  departmentRow: {
    display: 'flex',
    justifyContent: 'center',
    verticalAlign: 'center',
    marginBottom: theme.spacing(2),
    position: 'relative',
  },
  deleteDepartment: {
    position: 'absolute',
    top: theme.spacing(2),
    right: 0,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    display: 'flex',
  },
}));

let departmentsValidate = joi.object().keys({
  label: STRING_INPUT_VALID,
  _id: STRING_INPUT_VALID,
});

const schema = joi.object().keys({
  departments: joi.array().items(departmentsValidate),
});

const DepartmentForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { changeLoadingStatus } = useLoading();
  const [errorMessage, setErrorMessage] = useState('');
  const { organization = {} } = useSelector((state) => state.organizations);

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
      const response = data.departments.map(({ _id, label }) => {
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
        const lastResponse = results[results.length - 1].value.data;
        dispatch(setSelectedOrganization(lastResponse));
        dispatch(editOrganization(lastResponse));
        const rejected = results.filter((result) => result.status === 'rejected');
        if (rejected.length > 0) {
          dispatch(setPopup({ popupType: POPUP_TYPE.ERROR, popupText: errorCode2Message(100, []) }));
        } else {
          dispatch(setPopup({ popupType: POPUP_TYPE.INFO, popupText: POPUP_TEXT.INFO.SAVE_DEPARTMENT }));
        }
      });
      // }
      // history.push(LINKS.ORGANIZATIONS.HREF);
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

  const deleteHandler = async (department, index) => {
    changeLoadingStatus(true);
    if (checkObjectId(department._id)) {
      const response = await organizationAPI.deleteOrganizationDepartment({
        _id: department._id,
        mainId: organization._id,
      });
      dispatch(editOrganization(response.data));
      dispatch(setSelectedOrganization(response.data));
      setDepartments(response.data.departments);
    } else {
      departments.splice(index, 1);
      setDepartments(departments);
      dispatch(setSelectedOrganization(organization));
    }
    changeLoadingStatus(false);
  };

  const addDepartment = async (data) => {
    let { departments = [] } = data;
    if (departments.length) {
      const { _id, label } = departments[departments.length - 1];
      let options = {
        mainId: organization._id,
        label,
      };
      if (!checkObjectId(_id)) {
        const response = await organizationAPI.createOrganizationDepartment(options);
        dispatch(editOrganization(response.data));
        dispatch(setSelectedOrganization(response.data));
        departments = response.data.departments;
      }
    }
    const newDepartmentsList = departments.concat([{ label: '', _id: '' }]);
    setDepartments(newDepartmentsList);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        {errorMessage && (
          <Alert mt={2} mb={1} severity="warning" className={classes.alert}>
            {errorMessage}
          </Alert>
        )}
        <form noValidate className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12} className={classes.departmentsBlock}>
              <Typography color="textSecondary" className={classes.label}>
                Departments
              </Typography>
              {departments.map((department, index) => (
                <div className={classes.departmentRow} key={department._id || index}>
                  <Grid item xs={12}>
                    <Controller
                      className={classes.departmentInput}
                      disabled={isEmpty(organization)}
                      as={<VektorTextField />}
                      fullWidth
                      // id={department._id || index}
                      name={`departments.${index}.label`}
                      placeholder="Department"
                      error={errors.departments?.[index]?.label?.message}
                      control={control}
                      defaultValue={department.label || ''}
                    />
                    <Controller defaultValue={department._id || `${index}`} size="small" control={control} name={`departments.${index}._id`} />
                  </Grid>
                  {/*{!isEmpty(organization) && (*/}
                  <div className={classes.deleteDepartment}>
                    <Button variant="outlined" className={classes.delete} size="small" onClick={() => deleteHandler(department, index)}>
                      <Trash />
                    </Button>
                    {/*)}*/}
                  </div>
                </div>
              ))}
              <div className={classes.departmentsBtn}>
                <Button variant="outlined" color="primary" onClick={handleSubmit(addDepartment)} disabled={isEmpty(organization)}>
                  <Plus /> Add another department
                </Button>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.buttonContainer}>
                {!isEmpty(organization) && (
                  <Button variant="contained" color="primary" type="submit" disabled={isEmpty(organization)}>
                    Save Changes
                  </Button>
                )}
                {/*{!isEmpty(organization) && (*/}
                {/*  <Button color="primary" variant="contained" className={classes.delete} onClick={deleteHandler}>*/}
                {/*    Delete*/}
                {/*  </Button>*/}
                {/*)}*/}
              </div>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default memo(DepartmentForm);
