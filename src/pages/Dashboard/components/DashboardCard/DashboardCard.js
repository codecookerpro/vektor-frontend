import React, { memo, useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { DashboardChart, DashboardTable, DetailCard } from './components';
import { ColorButton, LinkButton } from 'components/UI/Buttons';
import LINKS from 'utils/constants/links';

import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2, 0),
  },
  cardTitle: {
    color: '#000',
    fontSize: 16,
  },
  cardNoPhases: {
    padding: theme.spacing(2, 0),
    '& *': {
      color: 'lightgray',
    },
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '400px',
  },
  button: {
    marginTop: 'auto',
  },
}));

const DashboardCard = ({ data, id, index, moveCard }) => {
  const [toggledDetail, toggleDetail] = useState(false);
  const noPhases = useMemo(() => data.phases.length === 0, [data]);

  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: { id, index, type: 'card' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const classes = useStyles({ isDragging });

  drag(drop(ref));

  const detailHandler = () => {
    toggleDetail(!toggledDetail);
  };

  return (
    <Grid item xs={toggledDetail ? 12 : 6} md={toggledDetail ? 9 : 3} lg={toggledDetail ? 6 : 2} ref={ref} data-handler-id={handlerId}>
      <Grid container spacing={6}>
        <Grid item xs={toggledDetail ? 4 : 12}>
          <Card mb={3} className={noPhases ? classes.cardNoPhases : classes.card}>
            <CardHeader
              title={
                <LinkButton to={LINKS.EDIT_PROJECT.HREF.replace(':id', data._id)} className={classes.cardTitle}>
                  {data.name}
                </LinkButton>
              }
            />
            <CardContent className={classes.cardContent}>
              <DashboardChart data={data} />
              <DashboardTable phases={data.phases} />
              {noPhases === false && (
                <ColorButton className={classes.button} colour="lightGreen" onClick={detailHandler}>
                  {toggledDetail ? 'Hide Details' : 'More Details'}
                </ColorButton>
              )}
            </CardContent>
          </Card>
        </Grid>
        {toggledDetail && (
          <Grid item xs={8}>
            <DetailCard data={data} />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default memo(DashboardCard);
