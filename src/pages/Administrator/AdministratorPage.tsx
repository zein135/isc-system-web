import "../../components/administration/AdministratorPageComponents.css"
import { Grid } from "@mui/material";
import RollTable from "../../components/administration/RollTable";
import PermissionTable from "../../components/administration/PermissionTable";

const AdminsitratorPage = () => {
    return(<>
     <Grid container spacing={6}>
        <RollTable/>
        <PermissionTable/>
      </Grid>
    
    </>);
}

export default AdminsitratorPage