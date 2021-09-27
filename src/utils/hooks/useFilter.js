import { useState, useMemo, useCallback, useEffect } from 'react';
import FilterSelect from 'components/UI/Selects/FilterSelect';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
import { useHistory, useLocation } from 'react-router-dom';
import pluralize from 'pluralize';

const useFilter = ({ items = [], by = null, label, keys = { label: 'name', value: '_id' }, multiple = false, resetField = null }) => {
  const { search, pathname } = useLocation();
  const history = useHistory();
  const storeItems = useSelector((state) => by && get(state, by.split('.')));

  const params = useMemo(() => new URLSearchParams(search), [search]);
  const filterKey = useMemo(() => `f__${label}`, [label]);
  const entries = useMemo(() => (items.length ? items : by ? storeItems : []), [items, storeItems, by]);
  const param = params.get(filterKey);
  const [value, setValue] = useState(multiple ? (param ? param.split(',') : []) : param);
  const [modified, setModified] = useState(false);

  const handleChange = useCallback(
    ({ target: { value } }) => {
      if (multiple && value.includes('')) {
        value = [];
      }

      params.set(filterKey, value);
      history.replace(`${pathname}?${params.toString()}`);
      setValue(value);
      setModified(true);
    },
    [filterKey, history, params, pathname, multiple]
  );

  const selectorProps = useMemo(
    () => ({
      label: `Filter by ${label}`,
      placeholder: `All ${pluralize(label)}`,
      items: entries,
      nullable: true,
      keys,
      value,
      multiple,
      onChange: handleChange,
    }),
    [label, entries, keys, value, multiple, handleChange]
  );

  useEffect(() => {
    if (modified && resetField) {
      params.set(filterKey, '');
      history.replace(`${pathname}?${params.toString()}`);
      setValue(multiple ? [] : null);
    } else if (!modified) {
      setModified(true);
    }
    // eslint-disable-next-line
  }, [resetField]);

  const component = useMemo(() => <FilterSelect {...selectorProps} />, [selectorProps]);

  return [component, value];
};

export default useFilter;
