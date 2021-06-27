import { useState, useMemo } from 'react';
import { noop } from 'utils/constants';
import FilterSelect from 'components/UI/Selects/FilterSelect';

const useFilter = (items, label, setFilter = noop, keys = { label: 'name', value: '_id' }) => {
  const [value, setValue] = useState(null);
  const handleSelect = ({ target: { value } }) => {
    setValue(value);
    setFilter(value);
  };
  const component = useMemo(
    () => (
      <FilterSelect label={`By ${label}`} placeholder={`Select ${label}`} items={items} keys={keys} value={value} onChange={handleSelect} />
    ),
    // eslint-disable-next-line
    [label, items, keys, value]
  );

  return component;
};

export default useFilter;
