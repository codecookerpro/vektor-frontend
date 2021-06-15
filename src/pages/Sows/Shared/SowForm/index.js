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
import { SOW_FORM_PHASE } from 'utils/constants/sowFormPhase';
import { useStyles } from './styles';
import { addSOW, editSOW } from 'redux/actions/sowAction';
import { PERMISSION_TYPE } from 'utils/constants/permissions';
import setSchema from './setSchema';
import { FORM_MODES } from 'utils/constants/formModes';
import AttachmentsPhase from './AttachmentsPhase';
import { isEmpty } from 'utils/helpers/utility';
import LINKS from 'utils/constants/links';

const SowForm = ({ mode }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const { organization: defaultOrganization } = useSelector(({ projects }) => projects);
  const { permissions } = useSelector(({ auth }) => auth.currentUser);
  const isOrganizationVisible = permissions === PERMISSION_TYPE.ADMIN;

  const schema = setSchema(isOrganizationVisible && mode === FORM_MODES.CREATION);

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
        <InitiationPhase sow={sow} title={SOW_FORM_PHASE.INITIATION_PHASE} setNotRequiredField={setNotRequiredField} />
        {mode === FORM_MODES.EDITING && <AttachmentsPhase sow={sow} title={SOW_FORM_PHASE.INITIATION_PHASE_ATTACHMENTS} />}
        <IntakePhase sow={sow} title={SOW_FORM_PHASE.INTAKE_PHASE} setNotRequiredField={setNotRequiredField} />
        {mode === FORM_MODES.EDITING && <AttachmentsPhase sow={sow} title={SOW_FORM_PHASE.INTAKE_PHASE_ATTACHMENTS} />}
        <IproSubmit sow={sow} title={SOW_FORM_PHASE.IPRO_SUBMIT} setNotRequiredField={setNotRequiredField} />
        {mode === FORM_MODES.EDITING && <AttachmentsPhase sow={sow} title={SOW_FORM_PHASE.IPRO_SUBMIT_ATTACHMENTS} />}
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
