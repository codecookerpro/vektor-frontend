import { useState, useMemo } from 'react';
import FilterSelect from 'components/UI/Selects/FilterSelect';
import { useSelector } from 'react-redux';
import { get } from 'lodash';

const useFilter = ({ items = [], by = null, label, keys = { label: 'name', value: '_id' } }) => {
  const [value, setValue] = useState(null);
  const storeItems = useSelector((state) => by && get(state, by.split('.')));
  const entries = useMemo(() => (items ? items : by ? storeItems : []), [items, storeItems, by]);

  const selectorProps = useMemo(
    () => ({
      label: `By ${label}`,
      placeholder: `Select ${label}`,
      items: entries,
      keys,
      value,
      onChange: (event) => setValue(event.target.value),
    }),
    [label, entries, keys, value]
  );

  const component = useMemo(() => <FilterSelect {...selectorProps} />, [selectorProps]);

  return [component, value];
};

export default useFilter;
