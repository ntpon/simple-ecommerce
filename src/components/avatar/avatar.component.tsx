import { AvatarContainer } from "./avatar.styles"
import imgDefault from "../../assets/images/default-avatar.png"
type AvatarProps = {
  image?: string
  avatarRadius?: number
}
function Avatar({ image = imgDefault, avatarRadius }: AvatarProps) {
  return (
    <AvatarContainer avatarRadius={avatarRadius}>
      {image ? <img src={image} alt='' /> : <img src={imgDefault} alt='' />}
    </AvatarContainer>
  )
}
export default Avatar
