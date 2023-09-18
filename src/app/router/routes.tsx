import Home from "../../pages/MainPage/Home";
import CatByIdPage from "../../pages/CatByIdPage/CatByIdPage";

export const HOME_URL = "/";
export const CAT_BY_ID_URL = "/:catId";

const routes = [
  {
    path: HOME_URL,
    element: <Home />,
  },
  {
    path: CAT_BY_ID_URL,
    element: <CatByIdPage />,
  },
];

export default routes;
