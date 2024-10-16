import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useUserStore = create((set) => ({
  loading: false,

  updateProfile: async (updateData) => {
    try {
      set({ loading: true });
      await axiosInstance.put("/user/update", updateData);
      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.error("error in updateProfile : ", error);
      toast.error(error.response.data.message || "Error in Updating Profile");
    } finally {
      set({ loading: false });
    }
  },
}));
