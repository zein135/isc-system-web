import { IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import RoleComponent from "./RoleComponent";
import { RoleTableProps } from "../../models/roleTablePropsInterface";
import { useState } from "react";


const RoleTable: React.FC<RoleTableProps> = ({ roles, onRoleSelect, setIsModalVisible}) => { // TODO: Corregir la función para recibir un parámetro

  const [selectedRole, setSelectedRole] = useState("Jefe de Carrera");

  const handleRoleClick = (roleName:  string) => {
    setSelectedRole(roleName);
    onRoleSelect(roleName);
  };

  const handleRoleDelete = (roleName: string) =>{
    //TODO: Lógica para borrar el componente
  }

  return (
    <Table className="border-table">
      <TableHead className="orange-header large-header">
        <TableRow>
          <TableCell className="flex justify-center items-center w-full">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6">Roles</Typography>
              <IconButton aria-label="add" onClick={() => setIsModalVisible(true)}>
                <PersonAddAlt1Icon fontSize="medium" style={{ color:"white" }} />
              </IconButton>
            </div>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {roles && roles.map((role, index) => (
          <TableRow key={index}>
              <RoleComponent role={role} selectedRole={selectedRole} onRoleClick={handleRoleClick} onDelete={handleRoleDelete}/>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default RoleTable