import styled from "styled-components"
export const RegisterContainer = styled.form`
  h2 {
    font-size: 24px;
    text-align: center;
    font-weight: normal;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--color-primary);
  }
  p {
    text-align: center;
  }
  min-width: 500px;
  @media (max-width: 500px) {
    min-width: 100%;
    width: 300px;
  }
`
