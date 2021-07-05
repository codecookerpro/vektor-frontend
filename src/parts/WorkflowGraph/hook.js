import { useState, useEffect, useRef } from 'react';
import { removeElements, addEdge } from 'react-flow-renderer';
import { noop } from 'utils/constants';
import { isEmpty } from 'utils/helpers/utility';
import { GRAPH_EVENTS, GRAPH_PROPS } from './constants';
import { makeNode, makeEdge, getLayoutedElements, deliverablesToElements, validateElements, checkConnectionValid } from './helper';

const useGraphLogic = ({ editable = false, deliverables = [], onGraphEvent = noop, boardRef, differentialWeight = 0 }) => {
  const [elements, setElements] = useState([]);
  const [dialogToggled, setDialogToggled] = useState(false);
  const bodyStyleRef = useRef(null);
  const boardStyleRef = useRef(null);
  const fullscreenRef = useRef(false);

  useEffect(() => {
    if (deliverables.length) {
      const elements = deliverablesToElements(deliverables, editable, differentialWeight);
      const shouldMigrate = deliverables.reduce((acc, d) => acc || isEmpty(d?.chartData?.position), false);
      setElements(elements);

      setTimeout(() => {
        if (shouldMigrate) {
          onGraphEvent(GRAPH_EVENTS.graphMigrate, elements);
        } else {
          onGraphEvent(GRAPH_EVENTS.graphInit, elements);
        }
      });
    }
    // eslint-disable-next-line
  }, [deliverables, editable]);

  const eventHandlers = {
    handleInputChange: (id, value) => {
      setElements((els) => {
        const updatedElements = els.map((n) => {
          if (n.id === id) {
            n.data.label = value;
          }
          return n;
        });

        onGraphEvent(GRAPH_EVENTS.nodeLabelChange, updatedElements, id);
        return updatedElements;
      });
    },

    handleDeleteNode: (nodeId) => {
      setElements((els) => {
        const nodeToRemove = els.filter((nd) => nd.id === nodeId);
        const updatedElements = removeElements(nodeToRemove, els);
        onGraphEvent(GRAPH_EVENTS.nodeDelete, updatedElements, nodeId);
        return updatedElements;
      });
    },

    handleRemoveEdge: (edge) => () => {
      setElements((els) => {
        const { source, target } = edge;
        const updatedElements = els.filter((e) => e.target !== target || e.source !== source);
        onGraphEvent(GRAPH_EVENTS.edgeDelete, updatedElements, target);
        return updatedElements;
      });
    },

    isValidConnection: (conn) => {
      let elements = null;
      setElements((els) => {
        elements = els;
        return els;
      });

      return checkConnectionValid(elements, conn);
    },

    handleSwitchPopup: setDialogToggled,
  };

  const handleCreate = () => {
    const newNode = makeNode(elements.length, eventHandlers, editable);
    const updatedElements = [...elements, newNode];
    setElements(updatedElements);

    if (editable) {
      onGraphEvent(GRAPH_EVENTS.nodeCreate, updatedElements, newNode.id);
    }
  };

  const handleConnect = (conn) => {
    const newEdge = makeEdge(conn, eventHandlers, editable);
    const updatedElements = addEdge(newEdge, elements);
    setElements(updatedElements);

    if (editable) {
      onGraphEvent(GRAPH_EVENTS.edgeCreate, updatedElements, newEdge.target);
    }
  };

  const handleLayout = (direction) => {
    const layoutedElements = getLayoutedElements(elements, direction);
    setElements(layoutedElements);

    if (editable) {
      onGraphEvent(GRAPH_EVENTS.graphLayout, layoutedElements);
    }
  };

  const handleNodeDragStop = (e, node) => {
    e.preventDefault();

    setElements((elements) => {
      const updatedElements = elements.map((n) => (n.id === node.id ? { ...n, position: node.position } : n));

      if (editable) {
        onGraphEvent(GRAPH_EVENTS.nodePosChange, updatedElements, node.id);
      }

      return updatedElements;
    });
  };

  const handleFullscreen = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (fullscreenRef.current) {
      document.body.style = bodyStyleRef.current;
      boardRef.current.style = boardStyleRef.current;
    } else {
      document.body.style.overflow = 'hidden';
      const style = boardRef.current.style;
      style.position = 'fixed';
      style.zIndex = GRAPH_PROPS.zIndex;
      style.top = '0px';
      style.left = '0px';
      style.background = 'white';
    }

    fullscreenRef.current = !fullscreenRef.current;
  };

  const handleEscapeFromFS = (e) => {
    if (fullscreenRef.current && e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      document.body.style = bodyStyleRef.current;
      boardRef.current.style = boardStyleRef.current;
      fullscreenRef.current = false;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (boardRef.current) {
        const fullscreenButton = boardRef.current.querySelectorAll('.react-flow__controls-fitview')[0];
        const interactiveButton = boardRef.current.querySelectorAll('.react-flow__controls-interactive')[0];

        if (interactiveButton) {
          interactiveButton.remove();
        }

        bodyStyleRef.current = document.body.style;
        boardStyleRef.current = boardRef.current.style;

        fullscreenButton.addEventListener('click', handleFullscreen);
        window.addEventListener('keydown', handleEscapeFromFS);
      }
    });
    // eslint-disable-next-line
  }, [boardRef]);

  return {
    dialogToggled,
    elements: validateElements(elements, eventHandlers),

    handleCreate,
    handleConnect,
    handleLayout,
    handleNodeDragStop,
  };
};

export default useGraphLogic;
