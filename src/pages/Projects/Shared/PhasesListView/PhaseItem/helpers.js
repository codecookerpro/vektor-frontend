import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateMetaSystem } from 'redux/actions/metaSystem';

import LINKS from 'utils/constants/links';
import useUserPermissions from 'utils/hooks/useUserPermission';
import { ALLOWED_ROLES } from './constants';

const usePhaseItemLogic = (item, canDrag) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { included } = useUserPermissions(ALLOWED_ROLES);

  const changeColumn = (projectPhase) => {
    const params = { _id: item._id, projectPhase: projectPhase || null };

    dispatch(updateMetaSystem(params));
  };

  const [{ isDragging }, dragRef] = useDrag({
    item: { name: item.name, type: 'ITEM' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (_, monitor) => {
      const dropResult = monitor.getDropResult();

      if (dropResult) {
        changeColumn(dropResult.name);
      }
    },
    canDrag: included && canDrag,
  });

  const onClick = () => {
    history.push(LINKS.EDIT_META_SYSTEM.HREF.replace(':systemId', item._id).replace(':mainSystemId', '_'));
  };

  return {
    isDragging,
    dragRef,
    onClick,
  };
};

export default usePhaseItemLogic;
