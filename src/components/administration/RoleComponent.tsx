import { useState } from "react"

import { Box, Button, Card, CardActionArea, CardContent, Collapse, Icon, IconButton, styled, Typography, useMediaQuery } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ConfirmDelete from "../common/ConfirmDelete"
import PermissionTable from "./PermissionTable";
import { ExpandMoreProps } from "../../models/expandMorePropsInterface";
import { RoleComponentProps } from "../../models/roleComponentProps";

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const RoleComponent : React.FC<RoleComponentProps> = ({ role, selectedRole, onRoleClick, onDelete }) => {

    const[expanded, setExpanded] = useState(false)
    const [showDelete, setShowDelete] = useState<boolean>(false)
    const isSmall = useMediaQuery((theme : any) => theme.breakpoints.down('sm'));
    
    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setShowDelete(true);
    }

    return (
        <>
            <Card sx={{ maxWidth: isSmall ? 700 : '100%', backgroundColor: selectedRole === role.roleName ? 'LightGray' : 'inherit',}}>
                <CardActionArea onClick={() => onRoleClick(role.roleName)}>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography
                            sx={{
                                fontWeight: selectedRole === role.roleName ? 'bold' : 'normal',
                            }}
                        >
                            {role.roleName}
                        </Typography>
                            <Box>
                                {isSmall && (
                                    <ExpandMore
                                        expand={expanded}
                                        onClick={handleExpandClick}
                                        aria-expanded={expanded}
                                        aria-label="show more"
                                    >
                                        <ExpandMoreIcon />
                                    </ExpandMore>
                                )}
                    
                                <Button
                                    sx={{
                                        padding: 0,
                                        minWidth: 0,
                                        minHeight: 0,
                                        width: 24,
                                        height: 24,
                                    }}
                                onClick={handleDeleteClick}>
                                    <Icon sx={{
                                        fontSize: 27,
                                    }}>
                                        <DeleteIcon color="primary" />
                                    </Icon>
                                </Button>
                            </Box>
                        </Box>
                    </CardContent>
                </CardActionArea>
                {isSmall && (
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <PermissionTable />
                        </CardContent>
                    </Collapse>
                )}
            </Card>

            {showDelete && (
                <ConfirmDelete roleName={role.roleName} isVisible={showDelete} setIsVisible={setShowDelete} onDelete={() => onDelete(role.roleName)}/>
            )}
        </>
    )
}

export default RoleComponent