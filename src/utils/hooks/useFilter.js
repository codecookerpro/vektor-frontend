import { useState, useMemo } from 'react';
import FilterSelect from 'components/UI/Selects/FilterSelect';

const useFilter = ({ items, label, keys = { label: 'name', value: '_id' } }) => {
  const [value, setValue] = useState(null);
  const selectorProps = useMemo(
    () => ({
      label: `By ${label}`,
      placeholder: `Select ${label}`,
      items,
      keys,
      value,
      onChange: (event) => setValue(event.target.value),
    }),
    [label, items, keys, value]
  );

  const component = useMemo(() => <FilterSelect {...selectorProps} />, [selectorProps]);

  return [component, value];
};

export default useFilter;
