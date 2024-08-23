import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import RoleComponent from "./RoleComponent";
import RoleComponentXs from "./RoleComponentXS";

type Role = {
  roleName: string;
};

interface RoleTableProps {
roles: Role[];
smallSize: boolean;
}


const RoleTable: React.FC<RoleTableProps> = ({ roles, smallSize }) => { // Corregir la función para recibir un parámetro

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
            {smallSize ? (
              <RoleComponent role={role} />
            ) : (
              <RoleComponentXs role={role} />
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default RoleTable