import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { getProcess, getStundentById } from "./services/processServicer";


import publicRoutes from "./routes/PublicRoutes";
import protectedRoutes from "./routes/ProtectedRoutes";
import AuthGuard from "./routes/AuthGuard";
function loader() {
  return getProcess();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getStudentProcess = ({ params }: any) => {
  const studentId = Number(params.id);
  return getStundentById(studentId);
};

const router = createBrowserRouter([
  ...publicRoutes,
  {
    element: <AuthGuard />,
    children: protectedRoutes,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
