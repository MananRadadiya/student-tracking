import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, user } = useSelector((s) => s.auth);

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const route = user.role === 'admin' ? '/dashboard/admin' : user.role === 'faculty' ? '/dashboard/faculty' : '/dashboard/student';
    return <Navigate to={route} replace />;
  }

  return children;
}
