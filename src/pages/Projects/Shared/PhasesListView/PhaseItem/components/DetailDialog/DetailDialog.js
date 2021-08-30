import React, { memo, useMemo } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from 'components/UI/VektorDialog';
import { Chip, Grid, Button } from '@material-ui/core';
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
        <LinkButton to={LINKS.EDIT_META_SYSTEM.HREF.replace(':systemId', metaSystem._id)} style={{ fontSize: 16 }}>
          {metaSystem.name}
        </LinkButton>
        <br />
        <small>{metaSystem.equipmentNumber}#</small>
      </DialogTitle>
      <DialogContent>
        <Grid container justify="space-between" spacing={1}>
          {details.map(({ name, color, label }, idx) => (
            <React.Fragment key={idx}>
              <Grid item xs={10}>
                {name}
              </Grid>
              <Grid item xs={2} style={{ textAlign: 'center' }}>
                <Chip label={label} style={{ background: color, color: 'white', borderRadius: 20, height: 20 }} />
              </Grid>
            </React.Fragment>
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
