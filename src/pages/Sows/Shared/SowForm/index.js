import React, { memo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { Button } from '@material-ui/core';
import NewSow from './NewSow';
import InitiationPhase from './InitiationPhase';
import IntakePhase from './IntakePhase';
import IproSubmit from './IproSubmit';
import { SOW_FORM_PHASE } from './constants';
import { useStyles } from './styles';
import { addSOW, editSOW } from 'redux/actions/sowAction';
import { PERMISSION_TYPES } from 'utils/constants';
import setSchema from './setSchema';
import AttachmentsPhase from './AttachmentsPhase';
import { isEmpty } from 'utils/helpers/utility';
import LINKS from 'utils/constants/links';
import { FORM_MODE } from 'utils/constants';

const SowForm = ({ mode }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const { organization: defaultOrganization } = useSelector(({ projects }) => projects);
  const { permissions } = useSelector(({ auth }) => auth.currentUser);
  const isOrganizationVisible = permissions === PERMISSION_TYPES.admin;

  const schema = setSchema(isOrganizationVisible && mode === FORM_MODE.create);

  const { control, handleSubmit, errors } = useForm({
    resolver: joiResolver(schema),
    shouldUnregister: false,
  });
  const { sow } = useSelector(({ sows }) => sows);
  const [notRequiredField, setNotRequiredField] = useState({
    initiationPhase: sow?.initiationPhase,
    intakePhase: sow?.intakePhase,
    iProSubmit: sow?.iProSubmit,
  });
  const [project, setProject] = useState({});

  const onSubmit = async (data) => {
    const { name, metaSystem } = data;
    const arraySystemProject = metaSystem.split('/');
    if (isEmpty(sow)) {
      const organization = isOrganizationVisible ? data.organization : defaultOrganization;
      const params = {
        name,
        organization,
        metaSystem: arraySystemProject[0],
        project: arraySystemProject[1],
        ...notRequiredField,
      };
      await dispatch(addSOW(params));
    } else {
      const { organization, _id } = sow;
      const params = {
        _id,
        name,
        organization,
        metaSystem: arraySystemProject[0],
        project: arraySystemProject[1],
        ...notRequiredField,
      };
      await dispatch(editSOW(params));
    }
    history.push(LINKS.SOWS.HREF);
  };
  return (
    <>
      <form noValidate className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <NewSow
          mode={mode}
          sow={sow}
          control={control}
          errors={errors}
          project={project}
          setProject={setProject}
          isOrganizationVisible={isOrganizationVisible}
        />
        <InitiationPhase sow={sow} title={SOW_FORM_PHASE.initiationPhase} setNotRequiredField={setNotRequiredField} />
        {mode === FORM_MODE.update && <AttachmentsPhase sow={sow} title={SOW_FORM_PHASE.initiationPhaseAttachments} />}
        <IntakePhase sow={sow} title={SOW_FORM_PHASE.intakePhase} setNotRequiredField={setNotRequiredField} />
        {mode === FORM_MODE.update && <AttachmentsPhase sow={sow} title={SOW_FORM_PHASE.intakePhaseAttachments} />}
        <IproSubmit sow={sow} title={SOW_FORM_PHASE.iproSubmit} setNotRequiredField={setNotRequiredField} />
        {mode === FORM_MODE.update && <AttachmentsPhase sow={sow} title={SOW_FORM_PHASE.iproSubmitAttachments} />}
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
