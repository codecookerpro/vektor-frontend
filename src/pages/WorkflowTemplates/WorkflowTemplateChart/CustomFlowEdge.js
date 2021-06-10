import React, { useEffect, useState } from 'react';
import { getSmoothStepPath, getMarkerEnd } from 'react-flow-renderer';
import EdgeDialog from './EdgeDialog';
import { makeStyles } from '@material-ui/core/styles';
import { arrowHeadColor } from 'utils/constants/reactflow/chart-configs';

const useStyles = makeStyles(() => ({
  hoverPath: {
    strokeWidth: 15,
    opacity: 0,
    stroke: arrowHeadColor,
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
    data.removeEdge(data);
  };

  const edgePath = getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
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
