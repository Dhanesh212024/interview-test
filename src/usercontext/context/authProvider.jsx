import { AuthContext } from "./authContext";
import { registerUser } from "../../api/users";
import { loginUser } from "../../api/users";

export default function AuthProvider({ children }) {
  const addData = async (data) => {
    try {
      const payload = {
        ...data,
        kycStatus: "pending",
        createdAt: new Date().toISOString(),
      };

      await registerUser(payload);

      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  };

  const login = async (data) => {
    try {
      const response = await loginUser(data);
      console.log(response);
      

      if (response?.success) {
        localStorage.setItem("user", JSON.stringify(response.data));

        return { success: true };
      }
      alert("Invalid credentials");
    } catch (error) {
      console.error("Login Error:", error.message);
      return {
        success: false,
        message: error.message,
      };
    }
  };

  return (
    <AuthContext.Provider value={{ addData, login }}>
      {children}
    </AuthContext.Provider>
  );
}
