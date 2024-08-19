import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { getPermissions } from "../../services/permissionService";
import PermissionComponent from "./PermissionComponent";

const PermissionTable = () => {

  const [Permissions, setPermissions] = useState([])

  const getData = async () => {
    const response = await getPermissions();
    setPermissions(response)
  }
  useEffect(() => {
    getData();
  }, [])

  return (

    <Table className="border-table">
      <TableHead className="large-header">
        <TableRow>
          <TableCell>
            Acción
          </TableCell>
          <TableCell>
            Permisos
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          Permissions && Permissions.map((permission) => (
            <PermissionComponent permission={permission} />
          ))
        }
      </TableBody>
    </Table>

  )
}

export default PermissionTable