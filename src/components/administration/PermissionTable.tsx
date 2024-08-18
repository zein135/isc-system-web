import { Grid, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
const PermissionTable = () =>{   
return(
    <Grid item xs={8}>
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

      </TableBody>
    </Table>
  </Grid>
)
}

export default PermissionTable