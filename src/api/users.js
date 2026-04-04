import axiosInstance from "./auth-api/axiosConnect";

export const registerUser = async (data) => {
  const response = await axiosInstance.post("/users", data);
  return response.data;
};

export const loginUser = async (data) => {
  try {
    const response = await axiosInstance.get(`/users?email=${data.email}`);
    const users = response.data;
    if (!users.length) {
      return {
        success: false,
        message: "User not found",
      };
    }
    const user = users[0];
    if (user.password !== data.password) {
      return {
        success: false,
        message: "Invalid password",
      };
    }
    return {
      success: true,
      data: {
        id: user.id,
        email: user.email,
        fname: user.firstName,
        lname: user.lastName,
        kycStatus: user.kycStatus,
      },
    };
  } catch (error) {
    console.error("Login API Error:", error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
