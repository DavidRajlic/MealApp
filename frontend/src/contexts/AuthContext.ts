import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const userStr = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  const isLoggedIn = !!token && !!userStr;
  let user = null;
  try {
    user = userStr ? JSON.parse(userStr) : null;
  } catch (e) {
    console.error("Invalid JSON in localStorage 'user':", e);
    localStorage.removeItem("user");
  }

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return { isLoggedIn, user, token, logout };
};
