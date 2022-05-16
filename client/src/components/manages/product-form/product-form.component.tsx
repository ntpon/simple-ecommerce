import { FormEvent, useEffect, useState } from "react"
import Button from "../../button/button.component"
import FormGroup from "../../form-group/form-group.component"
import FormInput from "../../form-input/form-input.component"
import SingleImageUpload from "../../single-image-upload/single-image-upload.component"
import { ImageListType } from "react-images-uploading"
import defaultImage from "../../../assets/images/default-product.png"
import {
  Form,
  FormInputContainer,
  ImageContainer,
  InputContainer,
  Label,
} from "../../form/form.styles"
import MultiImageUpload from "../../multi-image-upload/multi-image-upload.component"
import Select, { GroupBase, OptionsOrGroups } from "react-select"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import {
  createProduct,
  getProduct,
  reset,
  updateProduct,
} from "../../../store/product/product.slice"
import { toast } from "react-toastify"
import { ProductFormData } from "../../../store/product/product.type"
import Spinner from "../../spinner/spinner.component"
import { getAuthors } from "../../../store/author/author.slice"
import { getCategories } from "../../../store/category/category.slice"
import { getPublishers } from "../../../store/publisher/publisher.slice"
type ProductFormProps = {
  isEdit?: boolean
  id?: string
}
// const authorOptions = [
//   { value: "1", label: "นักเขียน 1" },
//   { value: "2", label: "นักเขียน 2" },
//   { value: "3", label: "นักเขียน 3" },
// ]

// const categoryOptions = [
//   { value: "1", label: "ประเภทสินค้า 1" },
//   { value: "2", label: "ประเภทสินค้า 2" },
//   { value: "3", label: "ประเภทสินค้า 3" },
// ]

// const publisherOption = [
//   { value: "1", label: "ประเภทสินค้า 1" },
//   { value: "2", label: "ประเภทสินค้า 2" },
//   { value: "3", label: "ประเภทสินค้า 3" },
// ]

type SelectValue = {
  label: string
  value: string
}

function ProductForm({ isEdit, id = "" }: ProductFormProps) {
  const [image, setImage] = useState<ImageListType>([])
  const [images, setImages] = useState<ImageListType>([])
  const [imagePreview, setImagePreview] = useState("")
  // const [currentImages, setCurrentImages] = useState([])

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const [price, setPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)

  const [categoriesSelect, setCategoriesSelect] = useState<SelectValue[]>()
  const [authorsSelect, setAuthorsSelect] = useState<SelectValue[]>()
  const [publisherSelect, setPublisherSelect] = useState<SelectValue>()

  const dispatch = useAppDispatch()

  const { product, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.product
  )

  const { authors: authorOptions } = useAppSelector((state) => state.author)
  const { categories: categoryOptions } = useAppSelector(
    (state) => state.category
  )
  const { publishers: publisherOptions } = useAppSelector(
    (state) => state.publisher
  )

  useEffect(() => {
    dispatch(getAuthors())
  }, [])
  useEffect(() => {
    dispatch(getCategories())
  }, [])
  useEffect(() => {
    dispatch(getPublishers())
  }, [])

  useEffect(() => {
    if (isEdit) {
      dispatch(getProduct(id))
    }
  }, [])

  // useEffect(() => {
  //   if(authorOptions){

  //   }
  //   if(categoryOptions){

  //   }
  // }, [authorOptions, categoryOptions, publisherOptions])

  useEffect(() => {
    if (isEdit && product) {
      setName(product.name)
      setDescription(product.description)
      setImagePreview(product.image.url)
      setPrice(product.price)
      setQuantity(product.quantity)
      setCategoriesSelect(
        product.categories.map((c) => {
          return { label: c.name, value: c._id }
        })
      )
      setAuthorsSelect(
        product.authors.map((a) => {
          return { label: a.name, value: a._id }
        })
      )
      setPublisherSelect({
        label: product.publisher.name,
        value: product.publisher._id,
      })

      setImages(
        product.images.map((image) => {
          return { public_id: image.public_id, dataURL: image.url }
        })
      )
    }
  }, [product])

  useEffect(() => {
    if (isError) {
      toast.error(message)
      dispatch(reset())
    }
    if (isSuccess) {
      toast.success(message)
      dispatch(reset())
    }
  }, [isError, isSuccess, message, dispatch])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const productForm: ProductFormData = {
      name,
      description,
      image: image[0] && image[0].file ? image[0].file : "",
      images,
      price,
      quantity,
      authors: authorsSelect?.map((author) => author.value),
      categories: categoriesSelect?.map((category) => category.value),
      publisher: publisherSelect?.value,
      currentImages: images.map((image) => image.public_id),
    }
    // console.log(images)
    // console.log(productForm)
    // return
    if (isEdit) {
      dispatch(updateProduct({ productId: id, productData: productForm }))
    } else {
      dispatch(createProduct(productForm))
    }
  }

  const onChangeImage = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    setImage(imageList as never[])
  }
  const onChangeMutiImage = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    setImages(imageList as never[])
  }

  return (
    <>
      {isLoading && <Spinner />}
      <Form onSubmit={handleSubmit} encType='multipart/form-data'>
        <InputContainer>
          <FormGroup>
            <FormInput
              label='ชื่อสินค้า'
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </FormGroup>
          <FormGroup>
            <ImageContainer style={{ alignItems: "flex-start" }}>
              <span>รูปภาพสินค้าที่เกี่ยวข้อง (สูงสุด 4 ภาพ)</span>
              <MultiImageUpload
                images={images}
                onChange={onChangeMutiImage}
                avatarRadius={0}
                defaultImage={defaultImage}
              />
            </ImageContainer>
          </FormGroup>
          <FormGroup>
            <FormInputContainer>
              <Label>ประเภทสินค้า</Label>
              <Select
                isMulti
                options={categoryOptions?.map((category) => {
                  return { value: category._id, label: category.name }
                })}
                className='form-select'
                placeholder=''
                value={categoriesSelect}
                onChange={(e) => {
                  setCategoriesSelect(e as SelectValue[])
                }}
              />
            </FormInputContainer>
          </FormGroup>
          <FormGroup>
            <FormInputContainer>
              <Label>ผู้เขียน</Label>
              <Select
                isMulti
                options={authorOptions?.map((author) => {
                  return { value: author._id, label: author.name }
                })}
                className='form-select'
                placeholder=''
                value={authorsSelect}
                onChange={(e) => {
                  setAuthorsSelect(e as SelectValue[])
                }}
              />
            </FormInputContainer>
          </FormGroup>
          <FormGroup>
            <FormInputContainer>
              <Label>สำนักพิมพ์</Label>
              <Select
                options={publisherOptions?.map((publisher) => {
                  return { value: publisher._id, label: publisher.name }
                })}
                className='form-select'
                placeholder=''
                onChange={(e) => {
                  setPublisherSelect(e as SelectValue)
                }}
                value={publisherSelect}
              />
            </FormInputContainer>
          </FormGroup>
          <FormGroup>
            <FormInput
              label='ราคา'
              type='number'
              min={1}
              onChange={(e) => setPrice(Number(e.target.value))}
              value={price}
            />
          </FormGroup>
          <FormGroup>
            <FormInput
              label='จำนวนที่มี'
              type='number'
              min={1}
              onChange={(e) => setQuantity(Number(e.target.value))}
              value={quantity}
            />
          </FormGroup>
          <FormGroup>
            <FormInput
              label='รายละเอียด'
              inputType='textarea'
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </FormGroup>

          <Button type='submit'>
            <span>บันทึกข้อมูล</span>
          </Button>
        </InputContainer>
        <ImageContainer>
          <span>รูปภาพหลัก</span>
          <SingleImageUpload
            image={image}
            onChange={onChangeImage}
            defaultImage={imagePreview ? imagePreview : defaultImage}
            avatarRadius={0}
          />
        </ImageContainer>
      </Form>
    </>
  )
}

export default ProductForm
