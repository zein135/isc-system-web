import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import ProcessInfoPage from "./pages/graduation/ProcessInfoPage";
import ErrorPage from "./pages/ErrorPage";
import { getProcess, getStundentById } from "./services/processServicer";
import StudentsPage from "./pages/StudentsPage";
import LoginPage from "./pages/auth/LoginPage";
import Layout from "./layout/Layout";

import CreateProcessPage from "./pages/CreateGraduation/CreateProcessPage";
import ProfessorPage from "./pages/ProfessorPage";
import CreateProfessorPage from "./pages/Professor/CreateProfessorPage";
import { RequireAuth } from "./layout/RequireAuth";
import { DashboardPage } from "./pages/dashboard/Dashboard";

function loader() {
  return getProcess();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getStudentProcess = ({ params }: any) => {
  const studentId = Number(params.id);
  return getStundentById(studentId);
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        index: true,
        path: "/dashboard",
        element: (
          <RequireAuth>
            <DashboardPage />
          </RequireAuth>
        ),
      },
      {
        path: "/home",
        loader: loader,
        element: (
          <RequireAuth>
            <StudentsPage />
          </RequireAuth>
        ),
      },
      {
        path: "/professors",
        loader: loader,
        element: (
          <RequireAuth>
            <ProfessorPage />
          </RequireAuth>
        ),
      },
      {
        path: "/create-professor",
        loader: loader,
        element: (
          <RequireAuth>
            <CreateProfessorPage />
          </RequireAuth>
        ),
      },
      {
        path: "/studentProfile/:id",
        loader: getStudentProcess,
        element: (
          <RequireAuth>
            <ProcessInfoPage />
          </RequireAuth>
        ),
      },
      {
        path: "/createProcess",
        loader: loader,
        element: (
          <RequireAuth>
            <CreateProcessPage />
          </RequireAuth>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
