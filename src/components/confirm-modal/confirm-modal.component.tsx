import { useState } from "react"
import Button from "../button/button.component"
import FormGroup from "../form-group/form-group.component"
import Modal from "../modal/modal.component"
import { ConfirmModalContainer } from "./confirm-modal.styles"
type ConfirmModalType = {
  showModal: boolean
  onClose: () => void
  onSuccess: () => void
}
function ConfirmModal({ showModal, onClose, onSuccess }: ConfirmModalType) {
  return (
    <Modal open={showModal} onClose={onClose}>
      <ConfirmModalContainer>
        <h2>ยืนยันทำรายการ</h2>
        <p>เมื่อทำรายการแล้วจะไม่สามารถย้อนกลับได้</p>
        <FormGroup>
          <Button onClick={() => onSuccess()}>
            <span>ยืนยัน</span>
          </Button>
          <Button
            onClick={() => {
              onClose()
            }}
          >
            <span>ยกเลิก</span>
          </Button>
        </FormGroup>
      </ConfirmModalContainer>
    </Modal>
  )
}

export default ConfirmModal
