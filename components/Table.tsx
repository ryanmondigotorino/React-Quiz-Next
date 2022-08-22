import React from 'react';
import clsx from 'clsx';
import Input from 'components/Input';
import Spinner from 'components/Utilities/Spinner';

import { Direction, Text, Button } from 'styles/styled-components/global.styled';
import { Table, Navigation } from 'styles/styled-components/table.styled';

type Props = {
  type?: 'withMax';
  noTableMenu?: boolean;
  loader?: boolean;
  data: any[];
  columns: string[];
  containerStyle?: React.CSSProperties;
  noPaginateTitle?: boolean;
  tableNumber?: number;
  currentNumber?: number;
  totalCount?: number;
  firstPage?: boolean;
  lastPage?: boolean;
  paginate?: (type: 'prev' | 'next') => void;
  searchValue?: (e: string) => void;
};

const TableComponent: React.FC<Props> = ({
  type,
  containerStyle,
  noTableMenu,
  loader,
  data,
  columns,
  noPaginateTitle,
  tableNumber = 0,
  currentNumber = 0,
  totalCount = 0,
  firstPage,
  lastPage,
  paginate,
  searchValue,
}) => (
  <Direction.Col className="justify-content-center">
    {!noTableMenu && (
      <Table.Container>
        <div className="p-20">
          <Direction.Row>
            <div className="flex-1">
              <Navigation.Paginate>
                <Text.SubTitle className="paginate-count light">{`${clsx({ Showing: !noPaginateTitle })}  ${
                  tableNumber > 0 ? currentNumber : 0
                } to ${tableNumber} of ${totalCount}`}</Text.SubTitle>
                <Text.SubTitle>
                  <Button.Transparent
                    type="button"
                    disabled={firstPage}
                    onClick={() => (paginate ? paginate('prev') : null)}
                  >
                    {'<'}
                  </Button.Transparent>
                </Text.SubTitle>
                <Text.SubTitle>
                  <Button.Transparent
                    type="button"
                    disabled={lastPage}
                    onClick={() => (paginate ? paginate('prev') : null)}
                  >
                    {'>'}
                  </Button.Transparent>
                </Text.SubTitle>
              </Navigation.Paginate>
            </div>
            <div className="flex-1">
              <Input type="text" name="search" placeholder="Search..." onChange={searchValue} />
            </div>
          </Direction.Row>
        </div>
      </Table.Container>
    )}
    <Table.Wrapper style={containerStyle} noTableMenu={noTableMenu} type={type}>
      {loader ? (
        <Spinner center size={20}>
          Loading data
        </Spinner>
      ) : data && data?.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              {columns?.map((val: any, key: number) => (
                <th key={key}>{val}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((items) => (
              <tr key={items.id}>
                {columns?.map((keys: any, key: number) => (
                  <td key={key}>{items[keys]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Direction.Row className="justify-content-center">
          <p>No Data Found</p>
        </Direction.Row>
      )}
    </Table.Wrapper>
  </Direction.Col>
);

export default TableComponent;
