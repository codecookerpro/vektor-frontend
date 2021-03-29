
import React, { memo, useMemo } from "react";
import { useParams, useHistory } from "react-router-dom";

import ContainedButton from "components/UI/Buttons/ContainedButton";
import PageHeader from "parts/PageHeader";
import OrganizationForm from "../Shared/OrganizationForm";
import LINKS from "utils/constants/links";
import results from "utils/temp/systems";

const NAV_LINKS = [LINKS.USER_MANAGEMENT, LINKS.ORGANIZATIONS];

const EditOrganization = () => {
  const { id } = useParams();
  const history = useHistory();

  const organization = useMemo(() => results.find((item) => item.id === id), [id]);

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
      <OrganizationForm organization={organization} />
    </>
  );
};

export default memo(EditOrganization);
