import axiosInstance from "./auth-api/axiosConnect";

export const getProducts = async () => {
  try {
    const response = await axiosInstance.get("/products");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
