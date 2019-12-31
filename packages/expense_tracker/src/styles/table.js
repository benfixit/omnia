import styled from 'styled-components';

const Table = styled.table`
  border: thin solid #888888;
  border-collapse: collapse;
  width: 70%;
  tr:nth-child(even) {
    background-color: #f0edeb;
  }
  tr:nth-child(odd) {
    background-color: #ffffff;
  }
`;

const Td = styled.td`
  border: thin solid #888888;
  padding: 5px;
  text-align: right;
  color: ${props => {
    if (props.status === 'negative') {
      return '#990000';
    }
    if (props.status === 'positive') {
      return '#009900';
    }
    return '';
  }};
`;

const Th = styled.th`
  border: thin solid #888888;
  background-color: #a09280;
  color: white;
  padding: 5px 2px;
  text-align: center;
`;

export { Table, Td, Th };
