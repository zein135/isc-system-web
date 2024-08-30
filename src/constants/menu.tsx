import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";

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
    icon: <LocalActivityIcon color="primary" />,
  },
  {
    key: "interns",
    path: "/interns",
    text: "Ver Becarios",
    icon: <EmojiPeopleIcon color="primary" />,
  },
  {
    key: "administration",
    path: "/administration",
    text: "Administrador",
    icon: <ManageAccountsIcon color="primary" />,
  },
];
