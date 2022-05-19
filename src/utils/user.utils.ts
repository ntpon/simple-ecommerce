export const getUserFromStorage = () => {
  let userData = localStorage.getItem("user")
  if (userData) {
    return JSON.parse(userData)
  }
  return userData
}
