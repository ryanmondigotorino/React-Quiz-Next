import styled from 'styled-components';
import { theme } from 'utilities/colors';

const TableContainer = styled.div`
  width: 100%;
  height: 100px;
  background-color: ${theme.gray[700]};
  border-radius: 10px 10px 0 0;
`;

type TableWrapperProps = { noTableMenu?: boolean; type?: 'withMax' };

const TableWrapper = styled.div<TableWrapperProps>`
  height: fit-content;
  background: ${theme.gray[300]};
  padding: 20px;
  ${({ type }) =>
    type === 'withMax'
      ? `
    max-height: 470px;
    overflow-y: auto;
  `
      : ''}
  ${({ noTableMenu }) =>
    noTableMenu
      ? `
    border-radius: 10px;
  `
      : `
    border-radius: 0 0 10px 10px;
    border-top: none;
  `}
  table {
    table-layout: auto;
  }
  img {
    &.profile-image {
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
  }
`;

export const Table = {
  Container: TableContainer,
  Wrapper: TableWrapper,
};

const NavigationPaginate = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 15px 0;
  .paginate-icons {
    width: 20px;
    height: 13px;
    margin-top: 4px;
    cursor: pointer;
  }
  .paginate-count {
    padding-right: 10px;
  }
`;

export const Navigation = {
  Paginate: NavigationPaginate,
};
