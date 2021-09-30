import React from 'react';
import { Card, CardContent, CardHeader, Grid, makeStyles } from '@material-ui/core';
import { useDrop } from 'react-dnd';
import { useCardToggler } from 'utils/hooks';
import PhaseItem from '../PhaseItem';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
}));

const BufferBox = ({ systems }) => {
  const classes = useStyles();
  const [toggleButton, , toggled] = useCardToggler({ defaultToggled: true });
  const [, dropRef] = useDrop({
    accept: 'ITEM',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div className={classes.root} ref={dropRef}>
      <Card>
        <CardHeader title="Unassigned systems" action={toggleButton} />
        {toggled && (
          <CardContent>
            <Grid container spacing={2}>
              {systems.map((sys) => (
                <Grid key={sys._id} item xs={2}>
                  <PhaseItem item={sys} />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default BufferBox;
