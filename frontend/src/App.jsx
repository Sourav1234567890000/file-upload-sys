import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import DashboardHome from "./features/dashboard/pages/DashboardHome";
import FormState from "./components/practice/FormState";
import ApplicationStage from "./features/stages/1-application-stage/ApplicationStage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <DashboardHome />,
  },
  {
    path: "/dashboard/new-application",
    element: <ApplicationStage />,
  }
  
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}
export default App;
