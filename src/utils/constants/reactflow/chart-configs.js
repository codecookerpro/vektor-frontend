import { CUSTOM_EDGE } from 'utils/constants/reactflow/custom-node-types';

export const arrowHeadColor = '#4d84c0';
export const label = 'Deliverable name';
export const chartContainerHeight = 350;
export const nodeHeight = 70;
export const defaultNodeMarginY = 15;
export const nodeWidth = 149;
export const defaultNodeMarginX = 15;

export const nodeStyle = {
  border: '1.5px solid #4d84c0',
  borderRadius: '10px',
  padding: '21px 0',
  background: '#fff',
  width: nodeWidth + 'px',
  height: nodeHeight + 'px',
};

export const edgeDefaultProps = {
  type: CUSTOM_EDGE,
  arrowHeadType: 'arrowclosed',
  style: {
    // line color
    strokeWidth: 3,
    pointerEvents: 'all',
    stroke: '#000',
  },
};

export const handleColors = {
  target: '#557fb9',
  source: '#f9037ede',
};
