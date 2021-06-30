import { useState, useMemo } from 'react';
import FilterSelect from 'components/UI/Selects/FilterSelect';

const useFilter = ({ items, label, keys = { label: 'name', value: '_id' } }) => {
  const [value, setValue] = useState(null);
  const handleSelect = ({ target: { value } }) => {
    setValue(value);
  };
  const selectorProps = useMemo(
    () => ({
      label: `By ${label}`,
      placeholder: `Select ${label}`,
      items,
      keys,
      value,
      onChange: handleSelect,
    }),
    [label, items, keys, value]
  );

  const component = useMemo(() => <FilterSelect {...selectorProps} />, [selectorProps]);

  return [component, value];
};

export default useFilter;
