import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Picasso from '@omnia/picasso';

import { Table as StyledTable } from '../../styles';
import { formatter, getDecimalNumber } from '../../utils/money';

const { Pane } = Picasso;

const TableContainer = styled(Pane)`
  justify-content: center;
  padding: 15px 10px;
`;

const TitleTableData = styled(StyledTable.Td)`
  text-align: left;
`;

const TableFooterTh = styled(StyledTable.Th)`
  text-align: right;
  background-color: white;
  color: #000000;
`;

const Table = props => {
  const { investments } = props;

  const investmentsTotal = investments.reduce(
    (acc, item) => acc + getDecimalNumber(item.amount),
    0
  );

  return (
    <TableContainer>
      <StyledTable.Table>
        <thead>
          <tr>
            <StyledTable.Th>Description</StyledTable.Th>
            <StyledTable.Th>Amount</StyledTable.Th>
            <StyledTable.Th>Action</StyledTable.Th>
          </tr>
        </thead>
        <tbody>
          {investments.map(investment => {
            const { _id: investmentId } = investment;

            return (
              <tr key={investmentId}>
                <TitleTableData>{investment.description}</TitleTableData>
                <StyledTable.Td>
                  {formatter.format(getDecimalNumber(investment.amount))}
                </StyledTable.Td>
                <StyledTable.Td>
                  <Link to={`/investments/edit/${investmentId}`}>Edit</Link>
                </StyledTable.Td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <TableFooterTh>Total</TableFooterTh>
            <TableFooterTh>{formatter.format(investmentsTotal)}</TableFooterTh>
            <TableFooterTh />
          </tr>
        </tfoot>
      </StyledTable.Table>
    </TableContainer>
  );
};

Table.propTypes = {
  investments: PropTypes.instanceOf(Array).isRequired
};

export default Table;
