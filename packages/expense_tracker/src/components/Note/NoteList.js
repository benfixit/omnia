import React from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Picasso from '@omnia/picasso';

import { Table } from '../../styles';
import { formatter, getDecimalNumber } from '../../utils/money';

const { Pane } = Picasso;

const TableContainer = styled(Pane)`
  justify-content: center;
  padding: 15px 10px;
`;

const TitleTableData = styled(Table.Td)`
  text-align: left;
`;

const TableFooterTh = styled(Table.Th)`
  text-align: right;
  background-color: white;
  color: #000000;
`;

const SavingsTable = props => {
  const { savings } = props;

  const estimatedSavingsTotal = savings.reduce(
    (acc, item) => acc + getDecimalNumber(item.amount),
    0
  );

  const actualSavingsTotal = savings.reduce(
    (acc, item) => acc + getDecimalNumber(item.actual),
    0
  );

  return (
    <TableContainer>
      <Table.Table>
        <thead>
          <tr>
            <Table.Th>Description</Table.Th>
            <Table.Th>Amount</Table.Th>
            <Table.Th>Actual</Table.Th>
            <Table.Th>Action</Table.Th>
          </tr>
        </thead>
        <tbody>
          {savings.map(saving => {
            const { _id: savingsId } = saving;

            return (
              <tr key={v4()}>
                <TitleTableData>{saving.description}</TitleTableData>
                <Table.Td>
                  {formatter.format(getDecimalNumber(saving.amount))}
                </Table.Td>
                <Table.Td>
                  {formatter.format(getDecimalNumber(saving.actual))}
                </Table.Td>
                <Table.Td>
                  <Link to={`/savings/edit/${savingsId}`}>Edit</Link>
                </Table.Td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <TableFooterTh>Total</TableFooterTh>
            <TableFooterTh>
              {formatter.format(estimatedSavingsTotal)}
            </TableFooterTh>
            <TableFooterTh>
              {formatter.format(actualSavingsTotal)}
            </TableFooterTh>
            <TableFooterTh />
          </tr>
        </tfoot>
      </Table.Table>
    </TableContainer>
  );
};

SavingsTable.propTypes = {
  savings: PropTypes.instanceOf(Array).isRequired
};

export default SavingsTable;
