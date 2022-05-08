import ImageUploading, {
  ImageListType,
  ImageUploadingPropsType,
} from "react-images-uploading"
import Avatar from "../avatar/avatar.component"
import Button from "../button/button.component"

type SingleImageUploadProps = {
  image: ImageListType
  onChange: (
    value: ImageListType,
    addUpdatedIndex?: number[] | undefined
  ) => void
  avatarRadius?: number
  defaultImage?: string
}

function SingleImageUpload({
  image,
  defaultImage,
  onChange,
  avatarRadius,
}: SingleImageUploadProps) {
  return (
    <ImageUploading value={image} onChange={onChange}>
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        // write your building UI
        <>
          {imageList.length === 0 && (
            <Avatar avatarRadius={avatarRadius} image={defaultImage} />
          )}
          {imageList.map((image, index) => (
            <Avatar
              image={image.dataURL}
              key={index}
              avatarRadius={avatarRadius}
            />
          ))}
          <Button
            style={isDragging ? { color: "red" } : undefined}
            onClick={onImageUpload}
            {...dragProps}
          >
            <span>อัพโหลดรูปภาพ</span>
          </Button>
          {imageList.length !== 0 && (
            <Button
              style={isDragging ? { color: "red" } : undefined}
              onClick={() => onImageRemove(0)}
              {...dragProps}
            >
              <span>ยกเลิกรูปภาพ</span>
            </Button>
          )}
        </>
      )}
    </ImageUploading>
  )
}
export default SingleImageUpload
