import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import RoleComponent from "./RoleComponent";
import { RoleTableProps } from "../../models/roleTablePropsInterface";
import { useState } from "react";


const RoleTable: React.FC<RoleTableProps> = ({ roles, onRoleSelect }) => { // TODO: Corregir la función para recibir un parámetro

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
          <TableCell>
            Roles
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