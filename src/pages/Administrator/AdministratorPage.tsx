import { useEffect, useState } from "react";
import { Grid, IconButton, useMediaQuery } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import "../../components/administration/AdministratorPageComponents.css";
import RoleTable from "../../components/administration/RoleTable";
import PermissionTable from "../../components/administration/PermissionTable";
import AddTextModal from "../../components/common/AddTextModal";
import { getRoles, addRole } from "../../services/roleService";

const AdministratorPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [roles, setRoles] = useState([]);
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const rolesData = await getRoles();
        setRoles(rolesData);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

  const handleCreate = async (roleName: string) => {
    try {
      await addRole({ roleName, id: roles.length + 1 });
      const updateRoles = await getRoles();
      setRoles(updateRoles);
    } catch (error) {
      console.error("Error creating role:", error);
    }
  };
  return (
    <Grid container spacing={6}>
      <Grid item xs={!isSmallScreen ? 3 : 12}>
        <RoleTable roles = {roles} smallSize={!isSmallScreen}/>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '16px' }}>
          <IconButton aria-label="add" onClick={() => setIsModalVisible(true)}>
            <AddCircleIcon color="primary" style={{ fontSize: 40 }} />
          </IconButton>
        </div>
      </Grid>
      <Grid item xs={8}>
        {isSmallScreen ? null : <PermissionTable />}
      </Grid>
        <AddTextModal
          isVisible={isModalVisible}
          setIsVisible={setIsModalVisible}
          onCreate={handleCreate}
        />
    </Grid>
  );
}
export default AdministratorPage
