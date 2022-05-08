import styled from "styled-components"
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`
export const Thead = styled.thead``

export const TableBody = styled.tbody`
  width: 100%;
  border-bottom: 1px solid var(--color-primary-border);
`
export const TableRow = styled.tr`
  text-align: center;
`
export const TableColumnHead = styled.th`
  padding: 10px;
  border-collapse: collapse;
  border-bottom: 1px solid var(--color-primary-border);
`
export const TableColumnItem = styled.td`
  padding: 10px;
  img {
    width: 150px;
    height: 150px;
    object-fit: contain;
  }
  input {
    padding: 10px;
    border: 1px solid var(--color-primary-border);
    text-align: center;
  }
`
export const TableColumnAction = styled.td`
  a {
    margin-right: 10px;
  }
  svg {
    font-size: 22px;
  }
`
