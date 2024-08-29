import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  Params,
  LoaderFunction,
  LoaderFunctionArgs,
} from "react-router-dom";

import ProcessInfoPage from "./pages/graduation/ProcessInfoPage";
import ErrorPage from "./pages/ErrorPage";
import { getProcess, getStudentById } from "./services/processServicer";
import LoginPage from "./pages/auth/LoginPage";
import Layout from "./layout/Layout";

import CreateProcessPage from "./pages/CreateGraduation/CreateProcessPage";
import ProfessorPage from "./pages/Professor/ProfessorPage";
import CreateProfessorPage from "./pages/Professor/CreateProfessorPage";
import { RequireAuth } from "./layout/RequireAuth";
import { DashboardPage } from "./pages/dashboard/Dashboard";
import StudentPage from "./pages/Student/StudentsPage";
import CreateStudentPage from "./pages/Student/CreateStudentPage";
import EditStudentPage from "./pages/Student/EditStudentPage";
import Profile from "./pages/profile/Profile";
import GraduationProcessPage from "./pages/graduation/GraduationProcessPage";
import AdministratorPage from "./pages/Administrator/AdministratorPage";

import publicRoutes from "./routes/PublicRoutes";
import protectedRoutes from "./routes/ProtectedRoutes";
import AuthGuard from "./routes/AuthGuard";
function loader() {
  return getProcess();
}

interface StudentParams extends Params {
  id: string;
}

const getStudentProcess: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs<StudentParams>) => {
  const studentId = Number(params.id);
  return getStudentById(studentId);
};

const router = createBrowserRouter([
  ...publicRoutes,
  {
    element: <AuthGuard />,
    children: protectedRoutes,
  },
]);

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         index: true,
//         element: <Navigate to="/login" replace />,
//       },
//       {
//         index: true,
//         path: "/dashboard",
//         element: (
//           <RequireAuth>
//             <DashboardPage />
//           </RequireAuth>
//         ),
//       },
//       {
//         path: "/process",
//         loader: loader,
//         element: (
//           <RequireAuth>
//             <StudentsPage />
//           </RequireAuth>
//         ),
//       },
//       {
//         path: "/professors",
//         loader: loader,
//         element: (
//           <RequireAuth>
//             <ProfessorPage />
//           </RequireAuth>
//         ),
//       },
//       {
//         path: "/students",
//         loader: loader,
//         element: (
//           <RequireAuth>
//             <StudentPage />
//           </RequireAuth>
//         ),
//       },
//       {
//         path: "/edit-student/:id",
//         loader: loader,
//         element: (
//           <RequireAuth>
//             <EditStudentPage />
//           </RequireAuth>
//         ),
//       },
//       {
//         path: "/create-professor",
//         loader: loader,
//         element: (
//           <RequireAuth>
//             <CreateProfessorPage />
//           </RequireAuth>
//         ),
//       },
//       {
//         path: "/create-student",
//         loader: loader,
//         element: (
//           <RequireAuth>
//             <CreateStudentPage />
//           </RequireAuth>
//         ),
//       },
//       {
//         path: "/studentProfile/:id",
//         loader: getStudentProcess,
//         element: (
//           <RequireAuth>
//             <ProcessInfoPage />
//           </RequireAuth>
//         ),
//       },
//       {
//         path: "/createProcess",
//         loader: loader,
//         element: (
//           <RequireAuth>
//             <CreateProcessPage />
//           </RequireAuth>
//         ),
//       },
//     ],
//   },
//   {
//     path: "/login",
//     element: <LoginPage />,
//   },
//   {
//     path: "*",
//     element: <ErrorPage />,
//   },
// ]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
