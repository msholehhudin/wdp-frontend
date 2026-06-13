import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";

import { router } from "./routes/router";
import { AppProvider } from "./app/AppProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <RouterProvider router={router} />
  </AppProvider>,
);
