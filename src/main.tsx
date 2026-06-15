import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { AppProvider } from "./app/AppProvider";
import { seedStorage } from "./lib/seed";

seedStorage();

async function prepare() {
  const { worker } = await import("./mocks/browser");
  return worker.start({
    onUnhandledRequest: "bypass",
  });
}

prepare().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>,
  );
});
