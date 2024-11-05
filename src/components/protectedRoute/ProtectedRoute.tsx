import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../redux/store";

export interface ProtectedRouteProps {
    children: JSX.Element;
}

export function ProtectedRoute ({ children }: ProtectedRouteProps) {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    return children;
}
