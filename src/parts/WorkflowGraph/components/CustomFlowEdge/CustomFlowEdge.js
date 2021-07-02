import React, { memo, useState, useMemo } from 'react';
import { getMarkerEnd, getEdgeCenter } from 'react-flow-renderer';
import CloseIcon from '@material-ui/icons/Close';
import { getSmoothStepPathPatched } from './helper';
import { EdgeDialog } from './components';
import { makeStyles } from '@material-ui/core/styles';
import { GRAPH_PROPS } from 'parts/WorkflowGraph/constants';
import { COLORS, MARKER_ENDS } from 'parts/WorkflowGraph/constants';

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

const CustomFlowEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style: baseStyle = {}, data, arrowHeadType }) => {
  const [toggled, setToggled] = useState(false);
  const classes = useStyles();

  const { markerEndId, style, color } = useMemo(() => {
    let markerEndId = MARKER_ENDS.blue;
    const style = { ...baseStyle };
    let color = COLORS.blue;

    if (data.sourceNodeData) {
      const { status } = data.sourceNodeData;

      if (status < 100) {
        style.strokeDasharray = 5;
        style.stroke = COLORS.red;
        markerEndId = MARKER_ENDS.red;
        color = COLORS.red;
      } else if (status === 100) {
        style.stroke = COLORS.green;
        markerEndId = MARKER_ENDS.green;
        color = COLORS.green;
      }
    }

    return { style, markerEndId, color };
  }, [data, baseStyle]);

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
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  const foreignObjectSize = 24;

  return (
    <>
      <path id={id} style={style} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} />
      {data.editable && <path className={classes.hoverPath} d={edgePath} onDoubleClick={toggleDialog} />}
      {color === COLORS.red && (
        <foreignObject
          width={foreignObjectSize}
          height={foreignObjectSize}
          x={edgeCenterX - foreignObjectSize / 2}
          y={edgeCenterY - foreignObjectSize / 2}
        >
          <CloseIcon style={{ color: COLORS.red }} />
        </foreignObject>
      )}
      <EdgeDialog setToggled={setToggled} toggled={toggled} onDelete={deleteEdge} />
    </>
  );
};

export default memo(CustomFlowEdge);
