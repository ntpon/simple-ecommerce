import { useEffect, useState } from "react"
import { useAppSelector } from "../store/store"
import { setHttpToken } from "../utils/http.utils"

function useAuth() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)
  const { user } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (user) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
    setHttpToken(user?.token)
    setCheckingStatus(false)
  }, [user])
  return { loggedIn, checkingStatus }
}

export default useAuth
