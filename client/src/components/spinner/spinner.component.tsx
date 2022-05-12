import ReactDOM from "react-dom"

import { Watch } from "react-loader-spinner"
import Modal from "../modal/modal.component"
import { SpinnerBackdrop, Backdrop } from "./spinner.styles"

function Spinner() {
  const selector = document.getElementById("loading-hook")!

  return ReactDOM.createPortal(
    <>
      <Backdrop />
      <SpinnerBackdrop>
        <Watch color='var(--color-primary-loading)' />
      </SpinnerBackdrop>
    </>,
    selector
  )
}

export default Spinner
