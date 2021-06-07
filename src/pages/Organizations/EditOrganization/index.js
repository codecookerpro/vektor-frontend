import React, { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import ContainedButton from 'components/UI/Buttons/ContainedButton';
import PageHeader from 'parts/PageHeader';
import OrganizationForm from '../Shared/OrganizationForm';
import LINKS from 'utils/constants/links';
import { isEmpty } from 'utils/helpers/utility';
import DepartmentForm from '../Shared/DepartmentForm';

const NAV_LINKS = [LINKS.USER_MANAGEMENT, LINKS.ORGANIZATIONS];

const EditOrganization = () => {
  const { id } = useParams();
  const history = useHistory();

  const { results = [] } = useSelector((state) => state.organizations);
  const organization = useMemo(() => results.find((item) => item._id === id), [results, id]);

  const historyHandler = () => {
    history.push(LINKS.ORGANIZATION_HISTORY.HREF.replace(':id', id));
  };

  return (
    <>
      <PageHeader
        title={LINKS.EDIT_ORGANIZATION.TITLE}
        links={NAV_LINKS}
        leftElement={<ContainedButton onClick={historyHandler}>History</ContainedButton>}
      />
      {!isEmpty(organization) && <OrganizationForm />}
      {!isEmpty(organization) && <DepartmentForm />}
    </>
  );
};

export default memo(EditOrganization);
