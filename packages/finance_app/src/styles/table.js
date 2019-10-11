import styled from 'styled-components';

const Table = styled.table`
  border: thin solid #888888;
  border-collapse: collapse;
  width: 70%;
`;

const Td = styled.td`
  border: thin solid #888888;
  padding: 5px 2px;
  text-align: left;
`;

const Th = styled.th`
  border: thin solid #888888;
  padding: 5px 2px;
  text-align: left;
`;

export { Table, Td, Th };
