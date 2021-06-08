import { CUSTOM_EDGE } from 'utils/constants/reactflow/custom-node-types';

const config = {
  label: 'Deliverable name',
  // below values units are pixels
  chartContainerHeight: 350,
  nodeHeight: 70,
  defaultNodeMarginY: 15,
  nodeWidth: 149,
  defaultNodeMarginX: 15,
  // below line nodes configurations
  lineNodeParams: {
    type: CUSTOM_EDGE,
    arrowHeadType: 'arrowclosed',
    style: {
      // line color
      strokeWidth: 5,
      pointerEvents: 'all',
      stroke: '#000',
    },
  },
  handleColors: {
    target: '#557fb9',
    source: '#f9037ede',
  },
};

export default config;
