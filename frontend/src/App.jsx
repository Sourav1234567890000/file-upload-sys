import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import DashboardHome from "./features/dashboard/pages/DashboardHome";
import LoanForm from "./features/applicant/components/LoanForm";
import FormState from "./components/practice/FormState";

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
    path: "/dashboard/applicat-form",
    element: <LoanForm />,
  },
  {
    path: "/form",
    element: <FormState/>,
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
