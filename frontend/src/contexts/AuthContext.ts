import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const userStr = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  const isLoggedIn = !!token && !!userStr;
  const user = userStr ? JSON.parse(userStr) : null;

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return { isLoggedIn, user, token, logout };
};
