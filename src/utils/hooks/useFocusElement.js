import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { isEmpty } from 'utils/helpers/utility';

const useFocusElement = (loadTarget = null) => {
  const { hash } = useLocation();
  useEffect(() => {
    if (!isEmpty(loadTarget) && hash) {
      setTimeout(() => document.getElementById(hash.slice(1)).scrollIntoView(), 50);
    }
  }, [loadTarget, hash]);
};

export default useFocusElement;
