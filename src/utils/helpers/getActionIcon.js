import { Edit, Trash2, PlusSquare } from 'react-feather';

const getActionIcon = (type) => {
  switch (type) {
    case 'UPDATE':
      return <Edit />;
    case 'CREATE':
      return <PlusSquare />;
    case 'DELETE':
      return <Trash2 />;
    default:
      return <Edit />;
  }
};

export default getActionIcon;
