import ReactDOM from "react-dom"
import { Backdrop, ModalContainer } from "./modal.styles"
// import { CSSTransition } from "react-transition-group"
// import { useState } from "react"

type ModalProps = {
  open: boolean
  children: React.ReactNode
  onClose: () => void
}

function Modal({ open, children, onClose }: ModalProps) {
  const selector = document.getElementById("backdrop-hook")!
  document.body.style.overflow = "hidden"
  const onCloseHandler = () => {
    document.body.style.overflow = ""
    onClose()
  }
  return ReactDOM.createPortal(
    // <CSSTransition in={open} timeout={500} unmountOnExit classNames='hello'>
    <>
      <Backdrop onClick={onCloseHandler} />
      <ModalContainer>{children}</ModalContainer>
    </>,
    // </CSSTransition>,
    selector
  )
}

export default Modal
