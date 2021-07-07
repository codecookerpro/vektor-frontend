import { useSelector } from 'react-redux';
import { get } from 'lodash';
import { useMemo } from 'react';

const useEntryMapping = (data, mapping = []) => {
  const models = useSelector((state) =>
    mapping.reduce(
      (acc, { by }) => ({
        ...acc,
        [by]: get(state, by.split('.')),
      }),
      {}
    )
  );

  const mappedData = useMemo(
    () =>
      data.map((entry) =>
        mapping.reduce(
          (acc, { src, tar, by }) => ({
            ...acc,
            [tar || src]: models[by].find((m) => m._id === entry[src]),
          }),
          entry
        )
      ),
    [data, mapping, models]
  );

  return mappedData;
};

export default useEntryMapping;
