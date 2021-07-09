import { useState, useMemo, useCallback } from 'react';
import FilterSelect from 'components/UI/Selects/FilterSelect';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
import { useHistory, useLocation } from 'react-router-dom';

const useFilter = ({ items = [], by = null, label, keys = { label: 'name', value: '_id' } }) => {
  const { search, pathname } = useLocation();
  const history = useHistory();
  const storeItems = useSelector((state) => by && get(state, by.split('.')));

  const params = useMemo(() => new URLSearchParams(search), [search]);
  const filterKey = useMemo(() => `f__${label}`, [label]);
  const entries = useMemo(() => (items ? items : by ? storeItems : []), [items, storeItems, by]);

  const [value, setValue] = useState(params.get(filterKey));

  const handleChange = useCallback(
    ({ target: { value } }) => {
      params.set(filterKey, value);
      history.replace(`${pathname}?${params.toString()}`);
      setValue(value);
    },
    [filterKey, history, params, pathname]
  );

  const selectorProps = useMemo(
    () => ({
      label: `By ${label}`,
      placeholder: `Select ${label}`,
      items: entries,
      keys,
      value,
      onChange: handleChange,
    }),
    [label, entries, keys, value, handleChange]
  );

  const component = useMemo(() => <FilterSelect {...selectorProps} />, [selectorProps]);

  return [component, value];
};

export default useFilter;
