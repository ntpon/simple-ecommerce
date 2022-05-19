import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import Header from "../../components/header/header.component"
import ProductCard from "../../components/product-card/product-card.component"
import Spinner from "../../components/spinner/spinner.component"
import { getProductsFormSearch } from "../../store/shop/shop.slice"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { ProductItem, ProductListContainer } from "../shop/shop.styles"
import { TextNotFound } from "./search.styles"

function Search() {
  const [searchParams] = useSearchParams()
  const searchValue = searchParams.get("value")
  const dispatch = useAppDispatch()
  const { isLoading, products } = useAppSelector((state) => state.shop)
  useEffect(() => {
    if (searchValue) {
      dispatch(getProductsFormSearch(searchValue))
    }
  }, [searchValue, dispatch])
  return (
    <>
      {isLoading && <Spinner />}
      <Header text={`ผลการค้นหา “${searchValue}”`} />
      <ProductListContainer>
        {products && products.length > 0 ? (
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
          ))
        ) : (
          <TextNotFound>ไม่มีข้อมูล</TextNotFound>
        )}
      </ProductListContainer>
    </>
  )
}

export default Search
