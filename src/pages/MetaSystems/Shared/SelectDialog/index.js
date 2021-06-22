import React, { memo, useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Dialog, DialogTitle, DialogContent, DialogActions } from 'components/UI/VektorDialog';
import { ColorButton } from 'components/UI/Buttons';
import { Grid, makeStyles } from '@material-ui/core';

import FilterSelect from 'components/UI/Selects/FilterSelect';
import { getWorkflowTemplates } from 'redux/actions/workflowTemplates';
import WorkflowGraph from 'parts/WorkflowGraph';
import { isEmpty } from 'lodash';

const useStyles = makeStyles((theme) => ({
  selector: {
    marginBottom: theme.spacing(2),
  },
}));

const SelectDialog = ({ open, onClose, onSelect }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const templates = useSelector((state) => state.workflowTemplates.results);
  const [templateId, setTemplateId] = useState(null);
  const template = useMemo(() => {
    if (isEmpty(templateId) || isEmpty(templates)) {
      return {};
    }

    return templates.find((t) => t._id === templateId);
  }, [templateId, templates]);

  useEffect(() => dispatch(getWorkflowTemplates()));

  const handleSelect = () => {
    onSelect(template);
    onClose();
  };

  return (
    <Dialog fullWidth={true} maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle id="alert-dialog-title">Deliverables Initialization</DialogTitle>
      <DialogContent>
        <Grid container justify="flex-end">
          <Grid item xs={4} className={classes.selector}>
            <FilterSelect
              fullWidth
              name="template"
              label="Workflow Template"
              placeholder="Select template"
              items={templates}
              keys={{
                label: 'name',
                value: '_id',
              }}
              onChange={(e) => setTemplateId(e.target.value)}
              value={templateId}
            />
          </Grid>
          <Grid item xs={12}>
            <WorkflowGraph editable={false} deliverables={template.deliverables} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions justify="flex-end">
        <ColorButton colour="red" autoFocus onClick={handleSelect}>
          Select
        </ColorButton>
        <ColorButton colour="purple" onClick={onClose}>
          Cancel
        </ColorButton>
      </DialogActions>
    </Dialog>
  );
};

export default memo(SelectDialog);
