import { Link } from "react-router-dom"
import styled from "styled-components"
export const HeaderMemberContainer = styled.div`
  position: relative;
`
export const HeaderMemberText = styled.h1`
  font-weight: normal;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid var(--color-primary);
  /* height: 80px; */
  margin-bottom: 15px;
  font-size: 24px;
  /* background-color: var(--color-secondary); */
  padding: 10px;

  span {
    margin-left: 10px;
  }
`
export const LinkCreate = styled(Link)`
  position: absolute;
  right: 0;
  top: 15px;
  padding: 5px 10px;
  border: 1px solid var(--color-primary-border);
  border-radius: 5px;
`
