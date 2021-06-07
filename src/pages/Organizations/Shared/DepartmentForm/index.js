import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';
import { Card, CardContent, Grid, Button, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import { editDepartment, addDepartment, deleteDepartment, setSelectedDepartments } from 'redux/actions/organizations';
import VektorTextField from 'components/UI/TextFields/VektorTextField';
import { STRING_INPUT_VALID } from 'utils/constants/validations';
import { isEmpty } from 'utils/helpers/utility';
import useLoading from 'utils/hooks/useLoading';
import { Check, Plus, Trash } from 'react-feather';
import { checkObjectId } from 'utils/helpers/checkObjectId';

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
  save: {
    marginLeft: 'auto',
    color: theme.custom.palette.lightGreen,
    borderColor: theme.custom.palette.lightGreen,
    marginRight: theme.spacing(2),
    '&hover': {
      borderColor: theme.custom.palette.lightGreen,
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
  const { organization = {}, departments = [{ label: '', _id: '' }] } = useSelector((state) => state.organizations);

  const { control, handleSubmit, errors } = useForm({
    resolver: joiResolver(schema),
  });

  const onSubmit = (index) => async (data) => {
    changeLoadingStatus(true);
    try {
      const { _id, label } = data.departments[index];
      let options = {
        mainId: organization._id,
        label,
      };
      if (checkObjectId(_id)) {
        options = {
          ...options,
          _id,
        };
        dispatch(editDepartment(options));
      } else {
        dispatch(addDepartment(options));
      }
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
      const options = {
        _id: department._id,
        mainId: organization._id,
      };
      dispatch(deleteDepartment(options));
    } else {
      departments.splice(index, 1);
      dispatch(setSelectedDepartments(departments));
    }
    changeLoadingStatus(false);
  };

  const createDepartment = async (data) => {
    let { departments = [] } = data;
    if (departments.length) {
      const { _id, label } = departments[departments.length - 1];
      let options = {
        mainId: organization._id,
        label,
      };
      if (!checkObjectId(_id)) {
        dispatch(addDepartment(options));
      }
    }
    const newDepartmentsList = departments.concat([{ label: '', _id: '' }]);
    dispatch(setSelectedDepartments(newDepartmentsList));
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        {errorMessage && (
          <Alert mt={2} mb={1} severity="warning" className={classes.alert}>
            {errorMessage}
          </Alert>
        )}
        <form noValidate className={classes.form}>
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
                      name={`departments.${index}.label`}
                      placeholder="Department"
                      error={errors.departments?.[index]?.label?.message}
                      control={control}
                      defaultValue={department.label || ''}
                    />
                    <Controller defaultValue={department._id || `${index}`} size="small" control={control} name={`departments.${index}._id`} />
                  </Grid>
                  <div className={classes.deleteDepartment}>
                    <Button variant="outlined" className={classes.save} size="small" onClick={handleSubmit(onSubmit(index))}>
                      <Check />
                    </Button>
                    <Button variant="outlined" className={classes.delete} size="small" onClick={() => deleteHandler(department, index)}>
                      <Trash />
                    </Button>
                  </div>
                </div>
              ))}
              <div className={classes.departmentsBtn}>
                <Button variant="outlined" color="primary" onClick={handleSubmit(createDepartment)} disabled={isEmpty(organization)}>
                  <Plus /> Add another department
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default memo(DepartmentForm);
