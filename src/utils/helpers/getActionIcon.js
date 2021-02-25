
import {
  Edit,
  PlusSquare
} from 'react-feather';

const getActionIcon = type => {
  switch (type) {
    case 'EDIT':
      return <Edit />
    case 'ADD':
      return <PlusSquare />
    default:
      return <PlusSquare />
  }
};

export default getActionIcon;