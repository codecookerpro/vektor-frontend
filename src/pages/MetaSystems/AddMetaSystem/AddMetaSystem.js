import React, { memo } from 'react';

import PageHeader from 'parts/PageHeader';
import MetaSystemForm from '../Shared/MetaSystemForm';
import LINKS from 'utils/constants/links';
import { FORM_MODE } from 'utils/constants';

import useNavLinks from './helpers';
import { useSelector } from 'react-redux';

const AddMetaSystem = () => {
  const links = useNavLinks();
  const systemClone = useSelector((state) => state.projects.metaSystemClone);

  return (
    <>
      <PageHeader title={LINKS.ADD_META_SYSTEM.TITLE} links={links} />
      <MetaSystemForm mode={FORM_MODE.create} system={systemClone || {}} />
    </>
  );
};

export default memo(AddMetaSystem);
