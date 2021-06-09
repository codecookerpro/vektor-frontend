import React, { memo } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

import VektorCheckbox from 'components/UI/VektorCheckbox';

const StopDailyData = ({ project }) => {
  return (
    <Card>
      <CardContent>
        <VektorCheckbox label="Finished" checked={project?.finished || false} />
        <Typography variant="body2" color="textSecondary">
          Stops daily data collection for chart plotting.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default memo(StopDailyData);
