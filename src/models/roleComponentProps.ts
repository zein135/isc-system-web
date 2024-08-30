import { Role } from "./roleInterface";

export interface RoleComponentProps {
    role: Role;
    selectedRole: string;
    onRoleClick: (roleName: string) => void;
    onDelete: (roleName : string) => void;
}