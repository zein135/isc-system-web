import "../../components/administration/AdministratorPageComponents.css"
import { Grid, useMediaQuery } from "@mui/material";
import RoleTable from "../../components/administration/RoleTable";
import PermissionTable from "../../components/administration/PermissionTable";

const AdminsitratorPage = () => {
  const isSmallScreen = useMediaQuery('(max-width:600px)'); // ajusta el valor según sea necesario

  return (
    <Grid container spacing={6}>
      <Grid item xs={!isSmallScreen ? 3 : 12}>
        <RoleTable smallSize={!isSmallScreen} />
      </Grid>
      <Grid item xs={8}>
        {isSmallScreen ? null : <PermissionTable />}
      </Grid>
    </Grid>
  );
}

export default AdminsitratorPage