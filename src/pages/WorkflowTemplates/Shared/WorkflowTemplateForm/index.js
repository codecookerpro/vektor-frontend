import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';

import { Card, CardContent, Grid, Button, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import { PERMISSION_TYPE } from 'utils/constants/permissions';
import * as workflowTemplateAPI from 'services/api-workflow-template';
import { addWorkflowTemplate, editWorkflowTemplate, removeWorkflowTemplate } from 'redux/actions/workflowTemplates';
import VektorTextField from 'components/UI/TextFields/VektorTextField';
import FilterSelect from 'components/UI/Selects/FilterSelect';
import { STRING_INPUT_VALID, SELECT_VALID, INTEGER_VALID } from 'utils/constants/validations';
import LINKS from 'utils/constants/links';
import useLoading from 'utils/hooks/useLoading';
import { isEmpty } from 'utils/helpers/utility';
import { INPUT_NODE, CUSTOM_EDGE } from 'utils/constants/reactflow/custom-node-types';
import { setPopup } from 'redux/actions/popupActions';
import { POPUP_TYPE } from 'utils/constants/popupType';
import { FORM_MODE } from 'utils/constants';

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
  delete: {
    backgroundColor: theme.custom.palette.red,
  },
  content: {
    marginBottom: theme.spacing(6),
  },
}));

const WorkflowTemplateForm = ({ workflowTemplate = {}, nodes = [], onEdit = () => {} }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { changeLoadingStatus } = useLoading();
  const { results: organizations = [] } = useSelector((state) => state.organizations);
  const [errorMessage, setErrorMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  const formMode = isEmpty(workflowTemplate) ? FORM_MODE.create : editMode ? FORM_MODE.update : FORM_MODE.view;

  const currentUser = useSelector((state) => state.auth.currentUser);

  let schemaForOrg = {
    name: STRING_INPUT_VALID,
    differentialWeight: INTEGER_VALID,
  };

  if (currentUser.permissions === PERMISSION_TYPE.ADMIN) {
    schemaForOrg.organization = SELECT_VALID;
  }

  const schema = joi.object().keys(schemaForOrg);

  const { control, handleSubmit, errors } = useForm({
    resolver: joiResolver(schema),
  });

  const getDeliverables = () => {
    const connections = nodes.filter((node) => node.type === CUSTOM_EDGE);

    const deliverables = nodes
      .filter((node) => node.type === INPUT_NODE && node.data.label)
      .map((node) => {
        const predecessors = connections.filter((conn) => conn.target === node.id).map((conn) => conn.source);
        const edges = connections.filter((conn) => conn.target === node.id);

        return {
          name: node.data.label,
          predecessors,
          chartData: { ...node, edges },
        };
      });

    return deliverables;
  };

  const onSubmit = async (data) => {
    changeLoadingStatus(true);
    const deliverables = getDeliverables();

    if (deliverables.length === 0) {
      setErrorMessage('Deliverables are not valid.');
      changeLoadingStatus(false);
      return;
    }

    try {
      const params = {
        name: data.name,
        organization: currentUser.permissions === PERMISSION_TYPE.ADMIN ? data.organization : currentUser.organization,
        differentialWeight: data.differentialWeight,
      };

      if (isEmpty(workflowTemplate)) {
        const response = await workflowTemplateAPI.createWorkflowTemplate({ ...params, deliverables });
        dispatch(addWorkflowTemplate(response.data));
      } else {
        const response = await workflowTemplateAPI.updateWorkflowTemplate({ ...params, _id: workflowTemplate._id });
        dispatch(editWorkflowTemplate(response.data));
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
        popupType: POPUP_TYPE.CONFIRM,
        popupText: 'Are you sure you want to delete this template?',
        onConfirm: async () => {
          try {
            await workflowTemplateAPI.deleteWorkflowTemplate({ _id: workflowTemplate._id });
            dispatch(removeWorkflowTemplate(workflowTemplate));
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

  const changeMode = (editable) => {
    setEditMode(editable);
    onEdit(editable);
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
                disabled={formMode === FORM_MODE.view}
                defaultValue={workflowTemplate?.name || ''}
              />
            </Grid>
            {currentUser.permissions === PERMISSION_TYPE.ADMIN && (
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
                  disabled={formMode === FORM_MODE.view}
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
                disabled={formMode === FORM_MODE.view}
                defaultValue={workflowTemplate?.differentialWeight || 1}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="space-between">
                {formMode == FORM_MODE.create ? (
                  <Grid item>
                    <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
                      Save
                    </Button>
                  </Grid>
                ) : formMode === FORM_MODE.update ? (
                  <>
                    <Grid item>
                      <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
                        SAVE CHANGES
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" color="default" onClick={() => changeMode(false)}>
                        CANCEL
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button color="primary" variant="contained" className={classes.delete} onClick={deleteHandler}>
                        DELETE
                      </Button>
                    </Grid>
                  </>
                ) : (
                  <Button variant="contained" color="primary" onClick={() => changeMode(true)}>
                    EDIT
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default memo(WorkflowTemplateForm);
