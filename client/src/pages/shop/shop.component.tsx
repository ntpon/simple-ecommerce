import { ImBooks } from "react-icons/im"
import ProductSidebar from "../../components/product-sidebar/product-sidebar.component"
import Select from "react-select"

import {
  ContentContainer,
  LeftContainer,
  MainContent,
  ProductItem,
  ProductListContainer,
  ResultTotalProduct,
  RightContent,
  SelectContainer,
  ShopContainer,
} from "./shop.styles"

import { books } from "../../book-data"
import { useEffect, useState } from "react"
import ProductCard from "../../components/product-card/product-card.component"
import Header from "../../components/header/header.component"
import { useAppDispatch, useAppSelector } from "../../store/store"
import {
  getCategories,
  getProductByCategorySlug,
  getProductsInShop,
} from "../../store/shop/shop.slice"
import { useParams } from "react-router-dom"

const options = [
  { value: "1", label: "วันที่ (ล่าสุด)" },
  { value: "2", label: "ราคา (น้อย - มาก)" },
  { value: "3", label: "ราคา (มาก - น้อย)" },
]

function Shop() {
  const [selectedOption, setSelectedOption] = useState(options[0])
  const handleChange = (e: any) => {
    setSelectedOption(e)
  }
  const { slug } = useParams()

  const dispatch = useAppDispatch()
  const { isLoading, categories, products } = useAppSelector(
    (state) => state.shop
  )

  useEffect(() => {
    if (slug) {
      dispatch(getProductByCategorySlug(slug))
    } else {
      dispatch(getProductsInShop())
    }
  }, [slug])

  useEffect(() => {
    dispatch(getCategories())
  }, [])

  return (
    <ShopContainer>
      <Header text='หนังสือทั้งหมด' icon={<ImBooks />} />
      <ContentContainer>
        <LeftContainer>
          <ProductSidebar categories={categories} />
        </LeftContainer>
        <RightContent>
          <MainContent>
            {/* <ResultTotalProduct>
              <p>แสดงหนังสือ: 1 - 8 เล่ม จากทั้งหมด 10 เล่ม</p>
              <SelectContainer>
                <span>เรียงตาม</span>
                <select name='' id=''>
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </SelectContainer>
            </ResultTotalProduct> */}
            <ProductListContainer>
              {products &&
                products.map((product) => (
                  <ProductItem key={product._id}>
                    <ProductCard
                      imageUrl={product.image.url}
                      name={product.name}
                      description={product.description}
                      price={product.price}
                      slug={product.slug}
                      product={product}
                      isLoading={isLoading}
                    />
                  </ProductItem>
                ))}
            </ProductListContainer>
          </MainContent>
        </RightContent>
      </ContentContainer>
    </ShopContainer>
  )
}
export default Shop
