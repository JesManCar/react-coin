import { Link } from "react-router-dom"
import styles from './Nav.module.css'

function Nav () {
  return (
    <nav>
      <Link to={"/"}>Home </Link>
      <Link to={"/favorites"}>Favoritos </Link>
    </nav>
  )
}

export default Nav