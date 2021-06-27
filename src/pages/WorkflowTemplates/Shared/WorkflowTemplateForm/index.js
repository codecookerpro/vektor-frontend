import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';

import { Card, CardContent, Grid, Button, Typography, Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { addWorkflowTemplate, editWorkflowTemplate, removeWorkflowTemplate, duplicateWT } from 'redux/actions/workflowTemplates';
import VektorTextField from 'components/UI/TextFields/VektorTextField';
import FilterSelect from 'components/UI/Selects/FilterSelect';
import { STRING_INPUT_VALID, SELECT_VALID, INTEGER_VALID } from 'utils/constants/validations';
import LINKS from 'utils/constants/links';
import useLoading from 'utils/hooks/useLoading';
import { setPopup } from 'redux/actions/popupActions';
import { POPUP_TYPE } from 'utils/constants';
import { FORM_MODE, noop } from 'utils/constants';
import { elementsToDeliverables } from 'parts/WorkflowGraph/helper';
import { ColorButton } from 'components/UI/Buttons';
import useUserPermissions from 'utils/hooks/useUserPermission';

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
  button: {
    margin: theme.spacing(1),
  },
  buttonRight: {
    float: 'right',
  },
  content: {
    marginBottom: theme.spacing(6),
  },
}));

const WorkflowTemplateForm = ({ workflowTemplate = {}, mode = FORM_MODE.create, getElements = noop }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { changeLoadingStatus } = useLoading();
  const { results: organizations = [] } = useSelector((state) => state.organizations);
  const [errorMessage, setErrorMessage] = useState('');
  const [editable, setEditable] = useState(mode === FORM_MODE.create);
  const { isAdmin, organization: userOrganization } = useUserPermissions();

  let schemaForOrg = {
    name: STRING_INPUT_VALID,
    differentialWeight: INTEGER_VALID,
  };

  if (isAdmin) {
    schemaForOrg.organization = SELECT_VALID;
  }

  const schema = joi.object().keys(schemaForOrg);

  const { control, handleSubmit, errors } = useForm({
    resolver: joiResolver(schema),
  });

  const onSubmit = async (data) => {
    changeLoadingStatus(true);

    try {
      const params = {
        name: data.name,
        organization: isAdmin ? data.organization : userOrganization,
        differentialWeight: data.differentialWeight,
      };

      if (mode === FORM_MODE.create) {
        const deliverables = elementsToDeliverables(getElements()).filter((d) => d.name);

        if (deliverables.length === 0) {
          setErrorMessage('Deliverables are not valid.');
          changeLoadingStatus(false);
          return;
        }

        dispatch(addWorkflowTemplate({ ...params, deliverables }));
      } else {
        dispatch(editWorkflowTemplate({ ...params, _id: workflowTemplate._id }));
      }

      history.push(LINKS.WORKFLOW_TEMPLATES.HREF);
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

  const deleteHandler = () => {
    changeLoadingStatus(true);
    dispatch(
      setPopup({
        popupType: POPUP_TYPE.confirm,
        popupText: 'Are you sure you want to delete this template?',
        onConfirm: async () => {
          try {
            dispatch(removeWorkflowTemplate({ _id: workflowTemplate._id }));
            history.push(LINKS.WORKFLOW_TEMPLATES.HREF);
          } catch (error) {
            if (error.response) {
              const {
                data: { message },
              } = error.response;
              setErrorMessage(message);
            }
          }
          changeLoadingStatus(false);
        },
      })
    );
  };

  const handleDuplicate = () => {
    dispatch(duplicateWT(workflowTemplate));
    history.push(LINKS.ADD_WORKFLOW_TEMPLATE.HREF);
  };

  return (
    <Card className={classes.content}>
      <CardContent>
        {errorMessage && (
          <Alert mt={2} mb={1} severity="warning" className={classes.alert}>
            {errorMessage}
          </Alert>
        )}
        <Typography variant="h6" className={classes.name}>
          {workflowTemplate?.name || 'New workflowTemplate'}
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
                disabled={!editable}
                defaultValue={workflowTemplate?.name || ''}
              />
            </Grid>
            {isAdmin && (
              <Grid item xs={12} sm={6} md={4}>
                <Controller
                  as={<FilterSelect />}
                  fullWidth
                  name="organization"
                  label="Organization"
                  placeholder="Select organization"
                  items={organizations}
                  keys={{
                    label: 'name',
                    value: '_id',
                  }}
                  error={errors.organization?.message}
                  control={control}
                  disabled={!editable}
                  defaultValue={workflowTemplate?.organization || ''}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                as={<VektorTextField />}
                fullWidth
                type="number"
                name="differentialWeight"
                label="Differential Weight"
                placeholder="Number"
                error={errors.differentialWeight?.message}
                control={control}
                disabled={!editable}
                defaultValue={workflowTemplate?.differentialWeight || 1}
              />
            </Grid>
            <Grid item xs={12}>
              {mode === FORM_MODE.create ? (
                <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
                  Save
                </Button>
              ) : mode === FORM_MODE.update && editable ? (
                <Box>
                  <Button className={classes.button} variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
                    SAVE CHANGES
                  </Button>
                  <Button className={classes.button} variant="contained" color="default" onClick={() => setEditable(false)}>
                    CANCEL
                  </Button>
                  <ColorButton className={classes.buttonRight} colour="red" onClick={deleteHandler}>
                    DELETE
                  </ColorButton>
                </Box>
              ) : (
                <Box>
                  <Button className={classes.button} variant="contained" color="primary" onClick={() => setEditable(true)}>
                    EDIT
                  </Button>
                  <Button className={classes.button} variant="contained" color="default" onClick={handleDuplicate}>
                    DUPLICATE
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default memo(WorkflowTemplateForm);
