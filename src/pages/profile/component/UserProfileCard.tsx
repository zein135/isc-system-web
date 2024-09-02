import { Button, Typography, Avatar, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const UserProfileCard = () => {
  return (
    <Paper
      elevation={5}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 3,
        backgroundColor: "white",
        borderRadius: 5,
        width: "100%",
        maxWidth: 400,
        margin: "0 auto",
      }}
    >
      <Avatar
        alt="Harriet Nunez"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYuwSeW_wPuwldJSnYf2ibAvVG2zmARUwSBw&s" // Reemplaza con la URL de la imagen
        sx={{ width: 100, height: 100, marginBottom: 2 }}
      />
      <Button
        variant="text"
        sx={{
          position: "relative",
          top: -110,
          left: 40,
          minWidth: 0,
          padding: 0.5,
          backgroundColor: "#fff",
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
          borderRadius: "50%",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        <EditIcon fontSize="small" />
      </Button>
      <Typography variant="h5" component="h1">
        Harriet Nunez
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 2 }}>
        New Client
      </Typography>
      <Button variant="contained" color="primary" sx={{ mb: 3 }}>
        Add New Appointment
      </Button>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          padding: 2,
          marginBottom: 2,
          borderRadius: 2,
          backgroundColor: "#f5f5f5",
          borderColor: "#f6f6f",
          borderWidth: 1,
        }}
      >
        <Typography variant="body2" color="textSecondary">
          Email
        </Typography>
        <Typography variant="body1">runolfsdir.gillian@hotmail.com</Typography>
      </Paper>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          padding: 2,
          marginBottom: 2,
          borderRadius: 2,
          backgroundColor: "#f5f5f5",
          borderColor: "#f6f6f",
          borderWidth: 1,
        }}
      >
        <Typography variant="body2" color="textSecondary">
          Gender
        </Typography>
        <Typography variant="body1">Female</Typography>
      </Paper>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          padding: 2,
          borderRadius: 2,
          backgroundColor: "#f5f5f5",
          borderColor: "#f6f6f",
          borderWidth: 1,
        }}
      >
        <Typography variant="body2" color="textSecondary">
          Alerts
        </Typography>
        <Typography variant="body1">Allows Marketing Notifications</Typography>
      </Paper>
    </Paper>
  );
};

export default UserProfileCard;
