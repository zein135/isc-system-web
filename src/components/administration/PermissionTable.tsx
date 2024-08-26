import React, { useEffect, useState  } from "react";
import { Switch, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import getPermissions from "../../services/permissionsService";
import { Section } from "../../models/sectionInterface";


const PermissionTable = () => {
  const [sections, setSections] = useState<Section[]>([]);

  const fetchPermissions = async () => {
    const response = await getPermissions();
    setSections(response);
  }
  useEffect(() => {
    fetchPermissions();
  }, []);

  const handleSwitchChange = (sectionIndex:number, permissionIndex:number) => (event:any) => {
    const newSections = [...sections];
    newSections[sectionIndex].permissions[permissionIndex].state = event.target.checked;
    setSections(newSections);
  };
  return (
      <Table className="border-table">
        <TableHead className="large-header">
          <TableRow>
            <TableCell>Acción</TableCell>
            <TableCell>Permisos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sections.length > 0 ? (
            sections.map((section, sectionIndex) => (
              <React.Fragment key={sectionIndex}>
                <TableRow>
                  <TableCell colSpan={2}>
                    <Typography variant="h6">{section.subtitle}</Typography>
                  </TableCell>
                </TableRow>
                {section.permissions.map((permission:any, permissionIndex:number) => (
                  <TableRow key={permissionIndex}>
                    <TableCell>{permission.accion}</TableCell>
                    <TableCell>
                      <Switch
                        checked={permission.state}
                        onChange={handleSwitchChange(sectionIndex, permissionIndex)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2}>No data available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
  )
}

export default PermissionTable