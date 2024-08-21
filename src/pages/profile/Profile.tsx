import React, { useEffect, useState } from "react";
import { Grid, Paper, Box, Tab, Tabs } from "@mui/material";
import UserProfileCard from "./component/UserProfileCard";
import { useParams } from "react-router-dom";
import { getUserById } from "../../services/studentService";
import TutoringCard from "./component/ProcessCard";
import TaskList from "./component/TaskList";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Profile: React.FC = () => {
  const { id } = useParams();
  // @ts-ignore
  const [userProfile, setUserProfile] = useState<User | null>(null);

  const fetchUserProfile = async (id: string) => {
    const response = await getUserById(Number(id));
    setUserProfile(response);
  };
  useEffect(() => {
    if (id) {
      fetchUserProfile(id);
    }
  }, [id]);

  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={3}>
          <UserProfileCard />
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <TutoringCard
                    count={5}
                    percentage={35.67}
                    label="Tutorias Finalizadas"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TutoringCard
                    count={5}
                    percentage={35.67}
                    label="Tutorias En Progreso"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TutoringCard
                    count={5}
                    percentage={35.67}
                    label="Revisiones Finalizadas"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TutoringCard
                    count={5}
                    percentage={35.67}
                    label="Revisiones Progreso"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs value={value} onChange={handleChange}>
                    <Tab label="Tutorias" {...a11yProps(0)} />
                    <Tab label="Revisiones" {...a11yProps(1)} />
                  </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                  <TaskList />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  <TaskList />
                </CustomTabPanel>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
