import React, { memo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';
import { Button } from '@material-ui/core';
import NewSow from './NewSow';
import InitiationPhase from './InitiationPhase';
import IntakePhase from './IntakePhase';
import IproSubmit from './IproSubmit';
import { SELECT_VALID, STRING_INPUT_VALID } from 'utils/constants/validations';
import { SOW_FORM_PHASE } from 'utils/constants/sowFormPhase';
import LINKS from 'utils/constants/links';
import { useStyles } from './styles';
import { addSOW } from 'redux/actions/sowAction';

const schema = joi.object().keys({
  name: STRING_INPUT_VALID,
  organization: SELECT_VALID,
  metaSystem: SELECT_VALID,
});

const SowForm = ({ mode }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const { control, handleSubmit, errors, reset, watch, setValue } = useForm({
    resolver: joiResolver(schema),
    shouldUnregister: false,
  });
  const [notRequiredField, setNotRequiredField] = useState({});
  const [project, setProject] = useState({});

  const onSubmit = async (data) => {
    const { name, organization, metaSystem } = data;
    const arraySystemProject = metaSystem.split('/');
    const params = {
      name,
      organization,
      metaSystem: arraySystemProject[0],
      project: arraySystemProject[1],
      ...notRequiredField,
    };
    await dispatch(addSOW(params));
    history.push(LINKS.SOWS.HREF);
  };

  return (
    <>
      <form noValidate className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <NewSow mode={mode} sow={{}} control={control} errors={errors} project={project} setProject={setProject} />
        <InitiationPhase mode={mode} sow={{}} title={SOW_FORM_PHASE.INITIATION_PHASE} setNotRequiredField={setNotRequiredField} />
        <IntakePhase mode={mode} sow={{}} title={SOW_FORM_PHASE.INTAKE_PHASE} setNotRequiredField={setNotRequiredField} />
        <IproSubmit mode={mode} sow={{}} title={SOW_FORM_PHASE.IPRO_SUBMIT} setNotRequiredField={setNotRequiredField} />
        <div className={classes.buttonContainer}>
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </div>
      </form>
    </>
  );
};

export default memo(SowForm);
