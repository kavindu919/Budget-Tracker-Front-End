import axiosInstance from "@/lib/axios";

export const fetchUserProfile = async () => {
  try {
    const res = await axiosInstance.get("/auth/profile");
    return res.data;
  } catch (error: any) {
    const errorMessage =
      error?.message || error?.response?.data?.message || "Login failed";
    throw new Error(errorMessage);
  }
};
export const fetchUserLogout = async () => {
  try {
    const res = await axiosInstance.post("/auth/logout");
    return res.data;
  } catch (error: any) {
    const errorMessage =
      error?.message || error?.response?.data?.message || "Login failed";
    throw new Error(errorMessage);
  }
};
export const fetchUserLogin = async (email: string, password: string) => {
  try {
    const res = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    return res.data;
  } catch (error: any) {
    const errorMessage =
      error?.message || error?.response?.data?.message || "Login failed";
    throw new Error(errorMessage);
  }
};
export const fetchUserRegister = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const res = await axiosInstance.post("/auth/register", {
      name,
      email,
      password,
    });
    return res.data;
  } catch (error: any) {
    const errorMessage =
      error?.message || error?.response?.data?.message || "Login failed";
    throw new Error(errorMessage);
  }
};
