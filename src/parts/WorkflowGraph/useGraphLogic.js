import { useState, useEffect, useRef } from 'react';
import { removeElements, addEdge } from 'react-flow-renderer';
import { noop } from 'utils/constants';
import { GRAPH_EVENTS } from './constants';
import { makeNode, makeEdge, getLayoutedElements, deliverablesToElements, validateElements } from './helper';

const useGraphLogic = ({ editable = false, deliverables = [], onGraphEvent = noop, boardRef }) => {
  const [elements, setElements] = useState([]);
  const [dialogToggled, setDialogToggled] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const bodyStyleRef = useRef(null);
  const boardStyleRef = useRef(null);

  useEffect(() => {
    const elements = deliverablesToElements(deliverables, editable);
    setElements(elements);
    onGraphEvent(GRAPH_EVENTS.graphInit, elements);
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

    handleSwitchPopup: setDialogToggled,
  };

  const handleCreate = () => {
    const newNode = makeNode(elements.length, eventHandlers, editable);
    const updatedElements = [...elements, newNode];
    setElements(updatedElements);
    onGraphEvent(GRAPH_EVENTS.nodeCreate, updatedElements, newNode.id);
  };

  const handleConnect = (conn) => {
    const newEdge = makeEdge(conn, elements, eventHandlers, editable);

    if (newEdge) {
      const updatedElements = addEdge(newEdge, elements);
      setElements(updatedElements);
      onGraphEvent(GRAPH_EVENTS.edgeCreate, updatedElements, newEdge.target);
    }
  };

  const handleLayout = (direction) => {
    const layoutedElements = getLayoutedElements(elements, direction);
    setElements(layoutedElements);
    onGraphEvent(GRAPH_EVENTS.graphLayout, layoutedElements);
  };

  const handleNodeDragStop = (e, node) => {
    e.preventDefault();
    onGraphEvent(GRAPH_EVENTS.nodePosChange, elements, node.id, node.position);
  };

  const handleFullscreen = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (fullscreen) {
      document.body.style = bodyStyleRef.current;
      boardRef.current.style = boardStyleRef.current;
    } else {
      document.body.style.overflow = 'hidden';
      const style = boardRef.current.style;
      style.position = 'fixed';
      style.zIndex = 9999999;
      style.top = '0px';
      style.left = '0px';
      style.background = 'white';
    }

    setFullscreen(!fullscreen);
  };

  const handleEscapeFromFS = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (fullscreen && e.key === 'Escape') {
      document.body.style = bodyStyleRef.current;
      boardRef.current.style = boardStyleRef.current;
      setFullscreen(false);
    }
  };

  useEffect(() => {
    if (boardRef.current) {
      setTimeout(() => {
        const fullscreenButton = boardRef.current.querySelectorAll('.react-flow__controls-fitview')[0];
        const interactiveButton = boardRef.current.querySelectorAll('.react-flow__controls-interactive')[0];

        if (interactiveButton) {
          interactiveButton.remove();
        }

        bodyStyleRef.current = document.body.style;
        boardStyleRef.current = boardRef.current.style;

        fullscreenButton.onclick = handleFullscreen;
        window.onkeydown = handleEscapeFromFS;
      });
    }
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
