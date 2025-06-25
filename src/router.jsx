import { createBrowserRouter } from "react-router-dom";
import Home from './pages/Home.jsx'
import Favorites from './pages/Favorites'
import Coin from './pages/Coin.jsx'
import Error from './pages/Error'
import Template from "./layouts/Template";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Template />,
    children: [
      {index: true, element: <Home />},
      {path: "home", element: <Home />},
      {path: "coin/:id", element: <Coin />},
      {path: "favorites", element: <Favorites />},
    ]
  }
])


export default router