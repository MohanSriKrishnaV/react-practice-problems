
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ element, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem("user")); // Example: { role: "admin" }

  if (!user) {
    return <Navigate to="/" />; // Redirect to login
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <h3>Access Denied</h3>; // Or redirect to unauthorized page
  }

  return element; // Render the actual component
}
