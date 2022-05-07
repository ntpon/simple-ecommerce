import { ImBooks } from "react-icons/im"
import ProductSidebar from "../../components/product-sidebar/product-sidebar.component"
import Select from "react-select"

import {
  ContentContainer,
  Header,
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
import { useState } from "react"
import ProductCard from "../../components/product-card/product-card.component"

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
  return (
    <ShopContainer>
      <Header>
        <ImBooks />
        <span>สินค้าทั้งหมด</span>
      </Header>
      <ContentContainer>
        <LeftContainer>
          <ProductSidebar />
        </LeftContainer>
        <RightContent>
          <MainContent>
            <ResultTotalProduct>
              <p>แสดงหนังสือ: 1 - 8 เล่ม จากทั้งหมด 10 เล่ม</p>
              <SelectContainer>
                <span>เรียงตาม</span>
                <select name='' id=''>
                  {options.map((option) => (
                    <option value={option.value}>{option.label}</option>
                  ))}
                </select>
              </SelectContainer>
            </ResultTotalProduct>
            <ProductListContainer>
              {books.map((book) => (
                <ProductItem>
                  <ProductCard
                    imageUrl={book.thumbnailUrl}
                    name={book.title}
                    description={book.shortDescription}
                    price={250}
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
