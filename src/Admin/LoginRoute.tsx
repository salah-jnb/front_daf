import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import LoginPage from "./Login";
import { AppContext } from "../context/AppContext";

export default function LoginRoute() {
  const navigate = useNavigate();
  const { admin, setAdmin } = useContext(AppContext);

  if (admin) return <Navigate to="/da/contacts" replace />;

  return (
    <LoginPage
      onLogin={(adminData: any) => {
        // Login.jsx met déjà tg_admin en localStorage
        setAdmin(adminData);
        navigate("/da/contacts", { replace: true });
      }}
    />
  );
}

