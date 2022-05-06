import { IconContainer } from "./icon.styles"

type IconProps = {
  children: React.ReactNode
}

function Icon({ children }: IconProps) {
  return <IconContainer>{children}</IconContainer>
}
export default Icon
