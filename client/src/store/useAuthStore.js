import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  loading: false,
  authUser: null,
  checkingAuth: true,

  signup: async (signupData) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.post("/auth/signup", signupData);
      set({ authUser: res.data.user });
      toast.success("Account Created Successfully");
    } catch (error) {
      console.error("error in signup : ", error);
      toast.error(error.response.data.message, "Sign Up Failed");
    } finally {
      set({ loading: false });
    }
  },

  login: async (loginData) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.post("/auth/login", loginData);
      set({ authUser: res.data.user });
      toast.success("Logged In Successfully");
    } catch (error) {
      console.error("error in signup : ", error);
      toast.error(error.response.data.message, "Sign Up Failed");
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      if (res.status === 200) {
        set({ authUser: null });
      }
      toast.success("Logged Out Successfully");
    } catch (error) {
      console.error("error in logout : ", error);
      toast.error(error.response.data.message || "Failed to Logout");
    }
  },

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/me");
      set({ authUser: res.data.user });
    } catch (error) {
      set({ authUser: null });
      console.log("error in check auth : ", error);
    } finally {
      set({ checkingAuth: false });
    }
  },
}));
