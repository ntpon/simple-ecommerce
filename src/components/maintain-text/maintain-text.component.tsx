import img from "../../assets/images/maintain.jpg"
import { MaintainContainer } from "./maintain-text.styles"
function MaintainText() {
  return (
    <MaintainContainer>
      <img src={img} alt='maintain' />
      <p>ขออภัย...</p>
      <p>ระบบกำลังดำเนินการพัฒนา</p>
    </MaintainContainer>
  )
}

export default MaintainText
