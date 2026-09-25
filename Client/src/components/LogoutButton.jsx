import { useNavigate } from "react-router-dom";
import api from "../services/api";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2  rounded-lg hover:bg-red-700 ml-auto"
    >
      Logout
    </button>
  );
};

export default LogoutButton;