import { useState } from "react"

import { Box, Button, Card, CardActionArea, CardContent, Icon, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';

import ConfirmDelete from "./ConfirmDelete"
import { Role } from "../../models/roleInterface";

const RoleComponent = ({ role }: { role: Role }) => {

    const [showDelete, setShowDelete] = useState<boolean>(false)
    return (
        <>
            <Card>
                <CardActionArea>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography>
                                {role.roleName}
                            </Typography>
                            <Button
                                sx={{
                                    padding: 0,
                                    minWidth: 0,
                                    minHeight: 0,
                                    width: 24,
                                    height: 24,
                                }}
                                onClick={() => {
                                    setShowDelete(true)
                                }}>
                                <Icon sx={{
                                    fontSize: 27,
                                }}>
                                    <DeleteIcon color="primary" />
                                </Icon>
                            </Button>
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>

            {showDelete && (
                <ConfirmDelete roleName={role.roleName} setShowDelete={setShowDelete} />
            )}
        </>
    )
}

export default RoleComponent