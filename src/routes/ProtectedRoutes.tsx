import Layout from "../layout/Layout";
import CreateProcessPage from "../pages/CreateGraduation/CreateProcessPage";
import { DashboardPage } from "../pages/dashboard/Dashboard";
import ProcessInfoPage from "../pages/graduation/ProcessInfoPage";
import CreateProfessorPage from "../pages/Professor/CreateProfessorPage";
import ProfessorPage from "../pages/ProfessorPage";
import CreateStudentPage from "../pages/Student/CreateStudentPage";
import EditStudentPage from "../pages/Student/EditStudentPage";
import StudentPage from "../pages/Student/StudentsPage";
import StudentsPage from "../pages/StudentsPage";
import RoleGuard from "./RoleGuard";

const protectedRoutes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: (
          <RoleGuard allowedRoles={["admin", "student"]}>
            <DashboardPage />
          </RoleGuard>
        ),
      },
      {
        path: "/process",
        element: (
          <RoleGuard allowedRoles={["admin", "student"]}>
            <StudentsPage />
          </RoleGuard>
        ),
      },
      {
        path: "/professors",
        element: (
          <RoleGuard allowedRoles={["admin", "student"]}>
            <ProfessorPage />
          </RoleGuard>
        ),
      },
      {
        path: "/students",
        element: (
          <RoleGuard allowedRoles={["admin", "student"]}>
            <StudentPage />
          </RoleGuard>
        ),
      },
      {
        path: "/edit-student/:id",
        element: (
          <RoleGuard allowedRoles={["admin", "student"]}>
            <EditStudentPage />
          </RoleGuard>
        ),
      },
      {
        path: "/create-professor",
        element: (
          <RoleGuard allowedRoles={["admin", "student"]}>
            <CreateProfessorPage />
          </RoleGuard>
        ),
      },
      {
        path: "/create-student",
        element: (
          <RoleGuard allowedRoles={["admin", "student"]}>
            <CreateStudentPage />
          </RoleGuard>
        ),
      },
      {
        path: "/studentProfile/:id",
        element: (
          <RoleGuard allowedRoles={["admin", "student"]}>
            <ProcessInfoPage />
          </RoleGuard>
        ),
      },
      {
        path: "/createProcess",
        element: (
          <RoleGuard allowedRoles={["admin", "student"]}>
            <CreateProcessPage />
          </RoleGuard>
        ),
      },
    ],
  },
];

export default protectedRoutes;
