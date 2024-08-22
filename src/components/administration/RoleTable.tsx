import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { getRoles } from "../../services/roleService";
import RoleComponent from "./RoleComponent";
import RoleComponentXs from "./RoleComponentXS";

function RoleTable({ smallSize }: { smallSize: boolean }) { // Corregir la función para recibir un parámetro

  const [roles, setRoles] = useState([])

  const getData = async () => {
    const response = await getRoles();
    setRoles(response)
  }
  useEffect(() => {
    getData();
  }, [])

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
        {roles && roles.map((role) => (
          <TableRow>
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