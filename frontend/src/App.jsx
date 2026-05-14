import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import DashboardHome from "./features/dashboard/pages/DashboardHome";
import ApplicantsForm from "./features/applicant/components/ApplicantsForm";
import FormState from "./components/practice/FormState";
import CoApplicantForm from "./features/co-applicant/components/CoApplicantForm";

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
    path: "/dashboard/applicant-form",
    element: <ApplicantsForm />,
  },
  {
    path : '/dashboard/co-applicant-form/:applicantId',
    element : <CoApplicantForm/>
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
