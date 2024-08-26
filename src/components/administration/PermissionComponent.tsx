import { useState } from "react";
import { Checkbox, TableCell, TableRow } from "@mui/material";
import { Permission } from "../../models/permissionInterface";


const PermissionComponent = ({ permission }: { permission: Permission }) => {
  const [permissionsDefaultState, setPermissionsDefaultState] = useState(permission.state);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.checked)
    setPermissionsDefaultState(event.target.checked);
  };

  return (
    <TableRow>
      <TableCell>{permission.name}</TableCell>
      <TableCell>
        <Checkbox
          checked={permissionsDefaultState}
          onChange={handleCheckboxChange}
        />
      </TableCell>
    </TableRow>
  );
};

export default PermissionComponent;