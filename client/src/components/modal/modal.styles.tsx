import styled from "styled-components"
export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem;
  background: white;
  border-radius: 2px;
  box-shadow: 0px 30px 20px rgba(0, 0, 0, 0.4);
  z-index: 4;
`
export const Backdrop = styled.div`
  position: fixed;
  /* overflow-y: scroll; */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  background-color: rgb(0, 0, 0, 0.4);
  animation: appear 0.4s linear;
`
