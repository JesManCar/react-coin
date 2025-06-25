import { Outlet } from "react-router-dom"
import Header from "../components/Header"

function Template () {
  return (
  <>
    <Header />
    <Outlet />
    </>
  )
}

export default Template