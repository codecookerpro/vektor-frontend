import React, { memo, useMemo } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from 'components/UI/VektorDialog';
import { Chip, Grid, Button, Typography, Box } from '@material-ui/core';
import { COLORS } from 'parts/WorkflowGraph/constants';
import moment from 'moment';
import LinkButton from 'components/UI/Buttons/LinkButton';
import LINKS from 'utils/constants/links';

const DetailDialog = ({ open, onClose, metaSystem }) => {
  const details = useMemo(
    () =>
      metaSystem.mainSystem.deliverables.map(({ name, start, end, calculated }) => {
        const diffThreshold = metaSystem.differentialWeight * (moment(end) - moment(start));
        const differential = calculated.differential;
        const label = `${differential > 0 ? '+' : ''}${differential}`;
        let color = null;

        if (differential <= 0) {
          color = COLORS.green;
        } else if (differential <= diffThreshold) {
          color = COLORS.yellow;
        } else {
          color = COLORS.red;
        }

        return { name, color, label };
      }),
    [metaSystem]
  );

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <LinkButton
          to={LINKS.EDIT_META_SYSTEM.HREF.replace(':systemId', metaSystem._id)
            .replace(':mainSystemId', '_')
            .replace(':projectId', metaSystem.project)}
          style={{ fontSize: 16 }}
        >
          {metaSystem.name}
        </LinkButton>
        <br />
        <small>{metaSystem.equipmentNumber}#</small>
      </DialogTitle>
      <DialogContent>
        <Grid container justify="space-between" spacing={1}>
          {details.map(({ name, color, label }, idx) => (
            <Grid key={idx} item xs={12}>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                <Typography item xs={8}>
                  {name}
                </Typography>
                <Chip label={label} style={{ background: color, color: 'white', borderRadius: 20, height: 20 }} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={onClose}>
          Okay, close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(DetailDialog);
