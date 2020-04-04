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

const ChargeTable = props => {
  const { charges } = props;

  const chargeTotal = charges.reduce(
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
            <Table.Th>Type</Table.Th>
            <Table.Th>Action</Table.Th>
          </tr>
        </thead>
        <tbody>
          {charges.map(charge => {
            const { _id: chargeId } = charge;

            return (
              <tr key={chargeId}>
                <TitleTableData>{charge.description}</TitleTableData>
                <Table.Td>
                  {formatter.format(getDecimalNumber(charge.amount))}
                </Table.Td>
                <Table.Td>{charge.type.title}</Table.Td>
                <Table.Td>
                  <Link to={`/charges/edit/${chargeId}`}>Edit</Link>
                </Table.Td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <TableFooterTh>Total</TableFooterTh>
            <TableFooterTh>{formatter.format(chargeTotal)}</TableFooterTh>
            <TableFooterTh />
          </tr>
        </tfoot>
      </Table.Table>
    </TableContainer>
  );
};

ChargeTable.propTypes = {
  charges: PropTypes.instanceOf(Array).isRequired
};

export default ChargeTable;
