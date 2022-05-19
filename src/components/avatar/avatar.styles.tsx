import styled from "styled-components"
type AvatarContainerProps = {
  avatarRadius?: number
}
export const AvatarContainer = styled.div<AvatarContainerProps>`
  img {
    max-width: 100%;
    max-height: 100%;
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: ${({ avatarRadius }) =>
      avatarRadius !== undefined && avatarRadius >= 0
        ? avatarRadius + "%"
        : "50%"};
    background: var(--color-secondary);
  }
  margin: 10px 0;
  /* border-radius: 5px; */
`
