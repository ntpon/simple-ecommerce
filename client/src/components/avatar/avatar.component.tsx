import { AvatarContainer } from "./avatar.styles"
import img from "../../assets/images/default-avatar.png"
type AvatarProps = {
  image?: string
  avatarRadius?: number
}
function Avatar({ image = img, avatarRadius }: AvatarProps) {
  return (
    <AvatarContainer avatarRadius={avatarRadius}>
      <img src={image} alt='' />
    </AvatarContainer>
  )
}
export default Avatar
