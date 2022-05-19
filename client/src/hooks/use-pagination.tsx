import { useNavigate, useSearchParams } from "react-router-dom"

function usePagination() {
  const [searchParams] = useSearchParams()
  const pageValue = searchParams.get("page") || 1
  const navigate = useNavigate()

  const handlePageChange = async (pageNumber: number) => {
    navigate({ search: `page=${pageNumber}` })
  }

  return { pageValue: Number(pageValue), handlePageChange }
}
export default usePagination
