import React, { memo, useCallback } from 'react';
import { Plus } from 'react-feather';
import { useHistory } from 'react-router-dom';

import SowTable from './SowTable';
import PageHeader from 'parts/PageHeader';
import LINKS from 'utils/constants/links';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import { useUserPermission } from 'utils/hooks';
import { ALLOWED_PERMISSIONS } from './constants';

const SowList = () => {
  const history = useHistory();
  const { included: isVisible } = useUserPermission(ALLOWED_PERMISSIONS);

  const addHandler = useCallback(() => {
    history.push(LINKS.ADD_SOW.HREF);
  }, [history]);

  return (
    <>
      <PageHeader
        title={LINKS.SOWS.TITLE}
        leftElement={
          isVisible && (
            <ContainedButton onClick={addHandler}>
              <Plus /> Add SOW
            </ContainedButton>
          )
        }
      />
      <SowTable />
    </>
  );
};

export default memo(SowList);
