import styled from "styled-components"
import Modal from "../modal/modal.component"
export const SpinnerBackdrop = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  padding: 2rem;
  border-radius: 2px;
  z-index: 6;
`
export const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.4);
  position: fixed;
  z-index: 5;
`
