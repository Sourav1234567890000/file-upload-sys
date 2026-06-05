import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import DashboardHome from "./features/dashboard/pages/DashboardHome";
import FormState from "./components/practice/FormState";
import ApplicationStage from "./features/stages/1-application-stage/pages/ApplicationStage";
import CreateUser from "./features/user-management/pages/CreateUser";

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
  },
  {
    path: "/dashboard/application/:applicantId",
    element: <ApplicationStage />,
  },
  {
    path: "/dashboard/create-user",
    element: <CreateUser />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}
export default App;
