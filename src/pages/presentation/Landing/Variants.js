import React from "react";
import styled from "styled-components/macro";
import { useHistory } from "react-router-dom";

import { Box, Chip, Container, Grid, Typography } from "@material-ui/core";
import { spacing } from "@material-ui/system";

const Wrapper = styled.div`
  ${spacing};
  background: ${(props) => props.theme.palette.background.paper};
  text-align: center;
`;

const DemoContent = styled.div(spacing);

const DemoLink = styled.div`
  cursor: pointer;
`;

const DemoImage = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
  box-shadow: 0 4px 12px 0 rgba(18, 38, 63, 0.125);
  transition: 0.15s ease-in-out;

  &:hover {
    transform: scale(1.0325);
  }
`;

const DemoChip = styled(Chip)`
  background-color: ${(props) => props.theme.palette.secondary.main};
  border-radius: 5px;
  color: ${(props) => props.theme.palette.common.white};
  font-size: 55%;
  height: 18px;
  margin-top: -16px;
  padding: 3px 0;

  span {
    padding-left: ${(props) => props.theme.spacing(1.375)}px;
    padding-right: ${(props) => props.theme.spacing(1.375)}px;
  }
`;

const TypographyOverline = styled(Typography)`
  text-transform: uppercase;
  color: ${(props) => props.theme.palette.primary.main};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;

function Variants() {
  return (
    <Wrapper pt={16} pb={20}>
      <Container>
        <TypographyOverline variant="body2" gutterBottom>
          Variants
        </TypographyOverline>
        <Typography variant="h2" component="h3" gutterBottom>
          Multiple color schemes
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          The package includes 50+ prebuilt pages, 6 theme variants and 3
          prebuilt dashboards.
        </Typography>
        <Box mb={8} />

      </Container>
    </Wrapper>
  );
}

export default Variants;
