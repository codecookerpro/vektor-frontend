import React, { memo, useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { DashboardChart, DashboardTable, DetailCard } from './components';
import { ColorButton, LinkButton } from 'components/UI/Buttons';
import LINKS from 'utils/constants/links';

import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const useStyles = makeStyles((theme) => ({
  root: {
    opacity: (props) => (props.isDragging ? 0 : 1),
  },
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

const DashboardCard = ({ data, moveCard, onDrop }) => {
  const { _id: cardId } = data;
  const [toggledDetail, toggleDetail] = useState(false);
  const noPhases = useMemo(() => data.phases.length === 0, [data]);
  const cardSizes = useMemo(
    () =>
      toggledDetail
        ? {
            xs: 12,
            md: 9,
            lg: 6,
          }
        : {
            xs: 6,
            md: 3,
            lg: 2,
          },
    [toggledDetail]
  );

  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: 'card',
    hover(item) {
      if (!ref.current || item.id === cardId) {
        return;
      }

      moveCard(item.id, cardId);
    },
    drop: onDrop,
  });
  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: { id: cardId, type: 'card' },
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
    <Grid ref={ref} item className={classes.root} {...cardSizes}>
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
