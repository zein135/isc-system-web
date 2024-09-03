import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

import { roles } from "./roles";
const { ADMIN, PROFESSOR, STUDENT } = roles;
export const menu = [
  {
    key: "dashboard",
    path: "/dashboard",
    text: "Dashboard",
    icon: <HomeIcon color="primary" />,
    roles: [ADMIN, PROFESSOR],
  },
  {
    key: "process",
    path: "/process",
    text: "Procesos",
    icon: <ChecklistOutlinedIcon color="primary" />,
    roles: [ADMIN, PROFESSOR],
  },
  {
    key: "professors",
    path: "/professors",
    text: "Docentes",
    icon: <SupervisorAccountIcon color="primary" />,
    roles: [ADMIN],
  },
  {
    key: "students",
    path: "/students",
    text: "Estudiantes",
    icon: <SchoolOutlinedIcon color="primary" />,
    roles: [PROFESSOR],
  },
  {
    key: "events",
    path: "/events",
    text: "Eventos",
    icon: <LocalActivityIcon color="primary" />,
    roles: [STUDENT],
  },
  {
    key: "hours",
    path: "/scholarshipHours",
    text: "Horas",
    icon: <AccessTimeIcon color="primary" />,
  },
  {
    key: "programDirector",
    path: "/programDirector",
    text: "Jefe de carrera",
    icon: <EmojiPeopleIcon color="primary" />,
    roles: [PROFESSOR],
  },
  {
    key: "CompleteScholarship",
    path: "/CompleteScholarshipHour",
    text: "Finalización de eventos",
    icon: <PendingActionsIcon color="primary" />,
  },
  {
    key: "administration",
    path: "/administration",
    text: "Administrador",
    icon: <ManageAccountsIcon color="primary" />,
    roles: [ADMIN],
  },
];
