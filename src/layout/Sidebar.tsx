import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import { Divider, ListItemButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import UPB_LOGO from "../assets/upb_logo.png";
import { useNavigate } from "react-router-dom";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import AssignmentInd from "@mui/icons-material/AssignmentInd";

import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  }
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const goToProfessors = () => {
    navigate("/professors");
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const goToStudents = () => {
    navigate("/students");
  };

  const goToProcess = () => {
    navigate("/process");
  };

  const goToEvents = () => {
    navigate("/events");
  };

  const goToEnrolled = () => {
    navigate("/enrolled");
  };

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <img
          src={UPB_LOGO}
          style={{ width: "100%", height: "auto", maxWidth: "125px" }}
          className="h-10 ms-6 me-1"
        />
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem key={"dashboard"} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
            onClick={goToDashboard}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <HomeIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              color="primary"
              primary={"Dashboard"}
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem key={"process"} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
            onClick={goToProcess}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <ChecklistOutlinedIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={"Procesos"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"professors"} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
            onClick={goToProfessors}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <SupervisorAccountIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={"Docentes"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"students"} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
            onClick={goToStudents}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <SchoolOutlinedIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={"Estudiantes"}
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem key={"events"} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
            onClick={goToEvents}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <LocalActivityIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={"Eventos"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
          <ListItem key={"enrolled"} disablePadding sx={{ display: "block" }}>
  <ListItemButton
      sx={{
      minHeight: 48,
      justifyContent: open ? "initial" : "center",
      px: 2.5,
    }}
    onClick={goToEnrolled}
  >
    <ListItemIcon
      sx={{
        minWidth: 0,
        mr: open ? 3 : "auto",
        justifyContent: "center",
      }}
    >
      <AssignmentInd color="primary" />
    </ListItemIcon>
              <ListItemText
                primary={"Ver Inscritos"}
                sx={{ opacity: open ? 1 : 0 }}
              />
  </ListItemButton>
</ListItem>

        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;

