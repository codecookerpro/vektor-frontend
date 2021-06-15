import React, { memo } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

const DeliverableTable = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" color="textPrimary" gutterBottom>
          Deliverables
        </Typography>
      </CardContent>
    </Card>
  );
};

export default memo(DeliverableTable);
