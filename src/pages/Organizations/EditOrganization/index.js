
import React, { memo, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { getOrganizations } from 'redux/actions/organizations';
import ContainedButton from "components/UI/Buttons/ContainedButton";
import PageHeader from "parts/PageHeader";
import OrganizationForm from "../Shared/OrganizationForm";
import LINKS from "utils/constants/links";
import { isEmpty } from "utils/helpers/utility";

const NAV_LINKS = [LINKS.USER_MANAGEMENT, LINKS.ORGANIZATIONS];

const EditOrganization = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const { results = [] } = useSelector(state => state.organizations);
  const organization = useMemo(() => results.find((item) => item._id === id), [results, id]);

  useEffect(() => {
    dispatch(getOrganizations());
  }, [dispatch]);

  const historyHandler = () => {
    history.push(LINKS.ORGANIZATION_HISTORY.HREF.replace(":id", id));
  };

  return (
    <>
      <PageHeader
        title={LINKS.EDIT_ORGANIZATION.TITLE}
        links={NAV_LINKS}
        leftElement={
          <ContainedButton onClick={historyHandler}>
            History
          </ContainedButton>
        }
      />
      {
        !isEmpty(organization) &&
        <OrganizationForm organization={organization} />
      }
    </>
  );
};

export default memo(EditOrganization);
