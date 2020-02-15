import React from 'react';
import styled from 'styled-components';
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

const IncomeTable = props => {
  const { incomes } = props;

  const incomesTotal = incomes.reduce(
    (acc, item) => acc + getDecimalNumber(item.amount),
    0
  );

  return (
    <TableContainer>
      <Table.Table>
        <thead>
          <tr>
            <Table.Th>Description</Table.Th>
            <Table.Th>Amount</Table.Th>
            <Table.Th>Action</Table.Th>
          </tr>
        </thead>
        <tbody>
          {incomes.map(income => {
            const { _id: incomeId } = income;

            return (
              <tr key={incomeId}>
                <TitleTableData>{income.description}</TitleTableData>
                <Table.Td>
                  {formatter.format(getDecimalNumber(income.amount))}
                </Table.Td>
                <Table.Td>
                  <Link to={`/incomes/edit/${incomeId}`}>Edit</Link>
                </Table.Td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <TableFooterTh>Total</TableFooterTh>
            <TableFooterTh>{formatter.format(incomesTotal)}</TableFooterTh>
            <TableFooterTh />
          </tr>
        </tfoot>
      </Table.Table>
    </TableContainer>
  );
};

IncomeTable.propTypes = {
  incomes: PropTypes.instanceOf(Array).isRequired
};

export default IncomeTable;
