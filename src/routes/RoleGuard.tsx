import React from 'react';
import { Navigate } from 'react-router-dom';

interface RoleGuardProps {
  allowedRoles: string[];
  children: React.ReactNode; 
}

const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
  const { user } = { user: { role: 'student' } };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const hasRole = true //allowedRoles.includes(user.role);

  if (!hasRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default RoleGuard;