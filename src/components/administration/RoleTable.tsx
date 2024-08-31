import { IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import RoleComponent from "./RoleComponent";
import { RoleTableProps } from "../../models/roleTablePropsInterface";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

const RoleTable: React.FC<RoleTableProps> =  ({ roles,setIsModalVisible }) => { // TODO: Corregir la función para recibir un parámetro

  return (
    <Table className="border-table">
      <TableHead className="orange-header large-header">
        <TableRow>
          <TableCell className="flex justify-center items-center w-full">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6">Roles</Typography>
              <IconButton aria-label="add" onClick={() => setIsModalVisible(true)}>
                <PersonAddAlt1Icon style={{ fontSize: 35, color:"white" }} />
              </IconButton>
            </div>
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