import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";

import ProcessInfoPage from './pages/ProcessInfoPage';
import ErrorPage from "./pages/ErrorPage";
import { getProcess, getStundentById } from "./services/processServicer";
import StudentsPage from "./pages/StudentsPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./layout/Layout";
import DashboardPage from "./pages/DashboardPage";
import CreateProcessPage from './pages/createProcessPage';
import ProfessorPage from "./pages/ProfessorPage";
import CreateProfessorPage from "./pages/CreateProfessorPage";

function loader() {
  return getProcess();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getStudentProcess =({ params }: any) => {
  const studentId = Number(params.id); 
  return getStundentById(studentId);
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },{
        index: true,
        path: '/dashboard',
        element: <DashboardPage/>
      },
      {
        path: '/home',
        loader: loader,
        element: <StudentsPage />,
      },
      {
        path: '/professors',
        loader: loader,
        element: <ProfessorPage />,
      },
      {
        path: '/create-professor',
        loader: loader,
        element: <CreateProfessorPage />,
      },
      {
        path: '/studentProfile/:id',
        loader: getStudentProcess,
        element: <ProcessInfoPage />,
      },
      {
        path: '/createProcess',
        loader: loader,
        element: <CreateProcessPage/>,
      },
    ]
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
  return (
    <RouterProvider router={router} />
  );
}

export default App
