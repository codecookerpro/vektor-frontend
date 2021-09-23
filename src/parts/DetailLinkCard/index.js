import React, { memo } from 'react';
import { Card, CardHeader } from '@material-ui/core';
import { ColorButton } from 'components/UI/Buttons';

const DetailLinkCard = ({ title, buttonLabel = 'Detail', onDetail }) => (
  <Card>
    <CardHeader
      title={title}
      action={
        <ColorButton colour="lightGreen" onClick={onDetail}>
          {buttonLabel}
        </ColorButton>
      }
    />
  </Card>
);

export default memo(DetailLinkCard);
