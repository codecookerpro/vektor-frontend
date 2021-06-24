import React, { memo } from 'react';

import PageHeader from 'parts/PageHeader';
import MetaSystemForm from '../Shared/MetaSystemForm';
import LINKS from 'utils/constants/links';
import { FORM_MODE } from 'utils/constants';

import useNavLinks from './helpers';

const AddMetaSystem = () => {
  const links = useNavLinks();

  return (
    <>
      <PageHeader title={LINKS.ADD_META_SYSTEM.TITLE} links={links} />
      <MetaSystemForm mode={FORM_MODE.create} />
    </>
  );
};

export default memo(AddMetaSystem);
