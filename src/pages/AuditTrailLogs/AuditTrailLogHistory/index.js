import React, { memo, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography } from '@material-ui/core';

import { getEvents } from 'redux/actions/events';
import PageHeader from 'parts/PageHeader';
import LINKS from 'utils/constants/links';
import { getEnglishDateWithTime } from 'utils/helpers/time';

const AuditTrailLogHistory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { results = [] } = useSelector((state) => state.events);
  const event = useMemo(() => results.find((item) => item._id === id), [id, results]);

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  const NAV_LINKS = [
    LINKS.USER_MANAGEMENT,
    LINKS.AUDIT_TRAIL_LOGS,
    {
      HREF: LINKS.AUDIT_TRAIL_LOG_DETAIL.HREF.replace(':id', id),
      TITLE: getEnglishDateWithTime(event?.updatedAt),
    },
  ];

  return (
    <>
      <PageHeader title={`${LINKS.AUDIT_TRAIL_LOG_HISTORY.TITLE}: ${getEnglishDateWithTime(event?.updatedAt)}`} links={NAV_LINKS} />
      <Card>
        <CardContent>
          <Typography variant="body2" color="textPrimary">
            {`This object doesn't have a change history. 
            It probably wasn't added via this admin site.`}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default memo(AuditTrailLogHistory);
