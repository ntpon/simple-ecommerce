import { useEffect } from "react"
import ImageUploading, { ImageListType } from "react-images-uploading"
import Avatar from "../avatar/avatar.component"
import Button from "../button/button.component"
import { ImageItem, ImageList } from "../form/form.styles"

type MultiImageUploadProps = {
  images: ImageListType
  onChange: (
    value: ImageListType,
    addUpdatedIndex?: number[] | undefined
  ) => void
  avatarRadius?: number
  defaultImage?: string
  // setCurrentImages?: () => void
}

function MultiImageUpload({
  images,
  defaultImage,
  onChange,
  avatarRadius,
}: // setCurrentImages,
MultiImageUploadProps) {
  return (
    <ImageUploading multiple maxNumber={4} value={images} onChange={onChange}>
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
          <ImageList>
            {imageList.map((image, index) => (
              <ImageItem key={index}>
                <Avatar
                  image={image.dataURL}
                  key={index}
                  avatarRadius={avatarRadius}
                />
                <Button
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={() => onImageRemove(index)}
                  {...dragProps}
                >
                  <span>ยกเลิกรูปภาพ</span>
                </Button>
              </ImageItem>
            ))}
          </ImageList>
          <Button
            style={isDragging ? { color: "red" } : undefined}
            onClick={onImageUpload}
            {...dragProps}
          >
            <span>อัพโหลดรูปภาพ</span>
          </Button>
        </>
      )}
    </ImageUploading>
  )
}
export default MultiImageUpload
