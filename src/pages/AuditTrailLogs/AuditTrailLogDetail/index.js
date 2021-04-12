
import React, { memo, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { getAuditTrailLogs } from 'redux/actions/auditTrailLogs';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import PageHeader from 'parts/PageHeader';
import LINKS from 'utils/constants/links';
import { isEmpty } from 'utils/helpers/utility';
import { getEnglishDateWithTime } from 'utils/helpers/time'

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(6),
  },
  description: {
    marginBottom: theme.spacing(3),
  },
}));

const NAV_LINKS = [LINKS.USER_MANAGEMENT, LINKS.AUDIT_TRAIL_LOGS];

const AuditTrailLogDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const { results = [] } = useSelector(state => state.auditTrailLogs);

  useEffect(() => {
    dispatch(getAuditTrailLogs());
  }, [dispatch]);

  const auditTrailLog = useMemo(() => results.find((item) => item._id === id), [id, results]);

  const historyHandler = () => {
    history.push(LINKS.AUDIT_TRAIL_LOG_HISTORY.HREF.replace(':id', id));
  };

  const closeHandler = () => {
    history.push(LINKS.AUDIT_TRAIL_LOGS.HREF);
  }

  return (
    <>
      <PageHeader
        title={LINKS.AUDIT_TRAIL_LOG_DETAIL.TITLE}
        links={NAV_LINKS}
        leftElement={
          <ContainedButton onClick={historyHandler}>
            History
          </ContainedButton>
        }
      />
      {isEmpty(auditTrailLog)
        ? (
          <Typography variant='h5' color='textPrimary'>
            Not Found
          </Typography>
        ) : (
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant='h6' color='textPrimary' className={classes.title}>
                    {`Action Time: ${getEnglishDateWithTime(auditTrailLog.actionTime)}`}
                  </Typography>
                  <Typography variant='body2' color='textPrimary' className={classes.description}>
                    user <br />
                    {auditTrailLog?.user}
                  </Typography>
                  <Typography variant='body2' color='textPrimary' className={classes.description}>
                    Action <br />
                    {auditTrailLog?.action}
                  </Typography>
                  <Typography variant='body2' color='textPrimary'>
                    Object <br />
                    {auditTrailLog?.object}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant='h6' color='textPrimary' className={classes.title}>
                    Details
                  </Typography>
                  <Typography variant='body2' color='textPrimary' className={classes.description}>
                    Change Message <br />
                    {auditTrailLog?.changeMessage}
                  </Typography>
                  <Typography variant='body2' color='textPrimary' className={classes.description}>
                    Content Type <br />
                    {auditTrailLog?.contentType}
                  </Typography>
                  <Typography variant='body2' color='textPrimary' className={classes.description}>
                    Object Id <br />
                    {auditTrailLog?.objectID}
                  </Typography>
                  <Typography variant='body2' color='textPrimary'>
                    Object Repr <br />
                    {auditTrailLog?.objectRep}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Button
                color='default'
                variant='contained'
                onClick={closeHandler}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        )
      }
    </>
  );
};

export default memo(AuditTrailLogDetail);
