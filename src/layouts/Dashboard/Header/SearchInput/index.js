import React, { memo } from 'react';
import styled, { withTheme } from 'styled-components/macro';
import { darken } from 'polished';
import { Search as SearchIcon } from 'react-feather';
import { InputBase } from '@material-ui/core';

const Search = styled.div`
  border-radius: 2px;
  background-color: ${(props) => props.theme.header.background};
  display: none;
  position: relative;
  width: 100%;
  &:hover {
    background-color: ${(props) => darken(0.05, props.theme.header.background)};
  }
  ${(props) => props.theme.breakpoints.up('md')} {
    display: block;
  }
`;

const SearchIconWrapper = styled.div`
  width: 50px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 22px;
    height: 22px;
  }
`;

const Input = styled(InputBase)`
  color: inherit;
  width: 100%;
  > input {
    color: ${(props) => props.theme.header.search.color};
    padding-top: ${(props) => props.theme.spacing(2.5)}px;
    padding-right: ${(props) => props.theme.spacing(2.5)}px;
    padding-bottom: ${(props) => props.theme.spacing(2.5)}px;
    padding-left: ${(props) => props.theme.spacing(12)}px;
    width: 160px;
  }
`;

const SearchInput = () => (
  <Search>
    <SearchIconWrapper>
      <SearchIcon />
    </SearchIconWrapper>
    <Input placeholder='Search topics' />
  </Search>
);

export default memo(withTheme(SearchInput));
