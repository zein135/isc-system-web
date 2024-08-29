import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import RoleComponent from "./RoleComponent";
import { RoleTableProps } from "../../models/roleTablePropsInterface";


const RoleTable: React.FC<RoleTableProps> = ({ roles }) => { // TODO: Corregir la función para recibir un parámetro

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
              <RoleComponent role={role} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default RoleTable