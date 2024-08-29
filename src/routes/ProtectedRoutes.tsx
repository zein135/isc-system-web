import Layout from "../layout/Layout";
import { DashboardPage } from "../pages/dashboard/Dashboard";
import RoleGuard from "./RoleGuard";

const protectedRoutes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/dashboard',
                element: (
                    <RoleGuard allowedRoles={['admin', 'student']}>
                        <DashboardPage />
                    </RoleGuard>),
            },
        ]
    }
];

export default protectedRoutes;