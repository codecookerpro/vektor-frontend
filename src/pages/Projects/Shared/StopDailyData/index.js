import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, Typography } from '@material-ui/core';
import VektorCheckbox from 'components/UI/VektorCheckbox';
import { editProject } from 'redux/actions/projects';

const StopDailyData = ({ project }) => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(editProject({ _id: project._id, finished: e.target.checked }));
  };

  return (
    <Card>
      <CardContent>
        <VektorCheckbox label="Finished" checked={project?.finished || false} onChange={handleChange} />
        <Typography variant="body2" color="textSecondary">
          Stops daily data collection for chart plotting.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default memo(StopDailyData);
