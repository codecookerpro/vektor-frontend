import { useState, useMemo, useCallback, useEffect } from 'react';
import FilterSelect from 'components/UI/Selects/FilterSelect';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
import { useHistory, useLocation } from 'react-router-dom';

const useFilter = ({ items = [], by = null, label, keys = { label: 'name', value: '_id' }, multiple = false }) => {
  const { search, pathname } = useLocation();
  const history = useHistory();
  const storeItems = useSelector((state) => by && get(state, by.split('.')));

  const params = useMemo(() => new URLSearchParams(search), [search]);
  const filterKey = useMemo(() => `f__${label}`, [label]);
  const entries = useMemo(() => (items.length ? items : by ? storeItems : []), [items, storeItems, by]);
  const param = params.get(filterKey);
  const [value, setValue] = useState(multiple ? param?.split(',') || [] : param);

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
      multiple,
      onChange: handleChange,
    }),
    [label, entries, keys, value, multiple, handleChange]
  );

  useEffect(() => {
    setTimeout(() => {
      params.set(filterKey, '');
      history.replace(`${pathname}?${params.toString()}`);
      setValue(multiple ? [] : null);
    });
    // eslint-disable-next-line
  }, [entries]);

  const component = useMemo(() => <FilterSelect {...selectorProps} />, [selectorProps]);

  return [component, value];
};

export default useFilter;
