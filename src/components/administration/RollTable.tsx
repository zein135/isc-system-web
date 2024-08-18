import { Grid, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"

const RollTable = () =>{
 return (<Grid item xs={3} >
    <Table className="border-table">
      <TableHead className="orange-header large-header">
        <TableRow>
          <TableCell>
            Roles
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>

      </TableBody>
    </Table>
  </Grid>)
}

export default RollTable