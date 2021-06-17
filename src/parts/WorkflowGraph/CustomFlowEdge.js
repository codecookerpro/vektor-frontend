import React, { useEffect, useState } from 'react';
import { getMarkerEnd } from 'react-flow-renderer';
import { getSmoothStepPathPatched } from './helper';
import EdgeDialog from './EdgeDialog';
import { makeStyles } from '@material-ui/core/styles';
import { GRAPH_PROPS } from './constants';

const useStyles = makeStyles(() => ({
  hoverPath: {
    strokeWidth: 15,
    opacity: 0,
    stroke: GRAPH_PROPS.arrowHeadColor,
    fill: 'none',
    pointerEvents: 'all',
    '&:hover': {
      opacity: 0.5,
    },
  },
}));

export default function CustomFlowEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  arrowHeadType,
  markerEndId,
}) {
  const [toggled, setToggled] = useState(false);
  const classes = useStyles();

  const toggleDialog = () => {
    if (data.editable) {
      setToggled(true);
    }
  };

  const deleteEdge = () => {
    setToggled(false);
    data.handleRemoveEdge(data);
  };

  const edgePath = getSmoothStepPathPatched({ sourceX, sourceY, targetX, targetY, targetPosition, sourcePosition, borderRadius: 8 });
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);

  useEffect(() => {
    const marker = document.getElementById('react-flow__arrowclosed');
    marker.markerWidth.baseVal.value = 30;
    marker.markerHeight.baseVal.value = 30;
  });

  return (
    <>
      <path id={id} style={style} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} />
      <path className={classes.hoverPath} d={edgePath} onDoubleClick={toggleDialog} />
      <EdgeDialog setToggled={setToggled} toggled={toggled} onDelete={deleteEdge} />
    </>
  );
}
