import { Checkbox, TableCell, TableRow } from "@mui/material";
import { useState } from "react";

type Permission = {
  permissionName: string;
  permissionsDefaultState: boolean;
};

const PermissionComponent = ({ permission }: { permission: Permission }) => {
  const [permissionsDefaultState, setPermissionsDefaultState] = useState(permission.permissionsDefaultState);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPermissionsDefaultState(event.target.checked);
  };

  return (
    <TableRow>
      <TableCell>{permission.permissionName}</TableCell>
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