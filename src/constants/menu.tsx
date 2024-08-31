import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import EventIcon from '@mui/icons-material/Event';

export const menu = [
  {
    key: "dashboard",
    path: "/dashboard",
    text: "Dashboard",
    icon: <HomeIcon color="primary" />,
  },
  {
    key: "process",
    path: "/process",
    text: "Procesos",
    icon: <ChecklistOutlinedIcon color="primary" />,
  },
  {
    key: "professors",
    path: "/professors",
    text: "Docentes",
    icon: <SupervisorAccountIcon color="primary" />,
  },
  {
    key: "students",
    path: "/students",
    text: "Estudiantes",
    icon: <SchoolOutlinedIcon color="primary" />,
  },
  {
    key: "events",
    path: "/events",
    text: "Eventos",
    icon: <EventIcon color="primary" />,
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
  },
  {
    key: "CompleteScholarship",
    path: "/CompleteScholarshipHour",
    text: "Finalizar",
    icon: <PendingActionsIcon color="primary" />,
  },
  {
    key: "administration",
    path: "/administration",
    text: "Administrador",
    icon: <ManageAccountsIcon color="primary" />,
  },
];
