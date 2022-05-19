import { useEffect } from "react"
import ReactDOM from "react-dom"
import { Backdrop, ModalContainer } from "./modal.styles"
// import { CSSTransition } from "react-transition-group"
// import { useState } from "react"

type ModalProps = {
  open: boolean
  children: React.ReactNode
  onClose: () => void
  styles?: {}
}

function Modal({ open, children, onClose, styles }: ModalProps) {
  const selector = document.getElementById("backdrop-hook")!
  document.body.style.overflow = "hidden"
  const onCloseHandler = () => {
    document.body.style.overflow = ""
    onClose()
  }
  useEffect(() => {
    return () => {
      document.body.style.overflow = ""
    }
  }, [])
  let modal = (
    <>
      <Backdrop onClick={onCloseHandler} />
      <ModalContainer className='modal-container' style={styles}>
        {children}
      </ModalContainer>
    </>
  )

  if (!open) {
    modal = <></>
  }

  return ReactDOM.createPortal(
    // <CSSTransition in={open} timeout={500} unmountOnExit classNames='hello'>
    modal,
    // </CSSTransition>,
    selector
  )
}

export default Modal
