export const getUserFromStorage = () => {
  let userData = localStorage.getItem("user")
  console.log(userData)
  if (userData) {
    return JSON.parse(userData)
  }
  return userData
}
