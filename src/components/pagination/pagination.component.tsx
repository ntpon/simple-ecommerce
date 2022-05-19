import { useState } from "react"
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi"
import {
  PaginationContainer,
  PaginationItem,
  PaginationLists,
} from "./pagination.styles"
type PaginationProps = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}
function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  const limitPageNumber = 5
  const [maxPageNumber, setMaxPageNumber] = useState(limitPageNumber)
  const [minPageNumber, setMinPageNumber] = useState(0)

  const pages = Array.from(Array(totalPages).keys())

  const handleNextPage = () => {
    onPageChange?.(page + 1)
    if (page + 1 > maxPageNumber) {
      setMaxPageNumber(maxPageNumber + limitPageNumber)
      setMinPageNumber(minPageNumber + limitPageNumber)
    }
  }

  const handlePrevPage = () => {
    onPageChange?.(page - 1)
    if ((page - 1) % limitPageNumber === 0) {
      setMaxPageNumber(maxPageNumber - limitPageNumber)
      setMinPageNumber(minPageNumber - limitPageNumber)
    }
  }
  return (
    <PaginationContainer>
      <PaginationLists>
        <PaginationItem
          onClick={handlePrevPage}
          style={page === 1 ? { display: "none" } : { display: "initial" }}
        >
          ก่อนหน้า
        </PaginationItem>
        {page > maxPageNumber && (
          <PaginationItem
            onClick={handlePrevPage}
            style={page === 1 ? { display: "none" } : { display: "initial" }}
          >
            &hellip;
          </PaginationItem>
        )}
        {pages.map((p) => {
          if (p < maxPageNumber && p + 1 > minPageNumber) {
            return (
              <PaginationItem
                className={`${p + 1 === page ? "active" : ""}`}
                key={p}
                onClick={() => onPageChange?.(p + 1)}
              >
                {p + 1}
              </PaginationItem>
            )
          } else {
            return null
          }
        })}
        {pages.length > maxPageNumber && (
          <PaginationItem>&hellip;</PaginationItem>
        )}
        <PaginationItem
          onClick={handleNextPage}
          style={
            page === totalPages ? { display: "none" } : { display: "initial" }
          }
        >
          ถัดไป
        </PaginationItem>
      </PaginationLists>
    </PaginationContainer>
  )
}

export default Pagination
