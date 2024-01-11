import { createBrowserRouter } from "react-router-dom";
import MainMenu from "../pages/menu";
import LocalMp from "../pages/local-mp";
import AIGpt from "../pages/ai-gpt";
import Editor from "../pages/editor";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainMenu />,
  },
  {
    path: "/local-mp",
    element: <LocalMp />,
  },
  {
    path: "/ai-gpt",
    element: <AIGpt />,
  },
  {
    path: "/editor",
    element: <Editor />,
  },
]);

export default router;
