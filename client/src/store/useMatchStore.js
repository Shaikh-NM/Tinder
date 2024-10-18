import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useMatchStore = create((set) => ({
  isLoadingMyMatches: false,
  isLoadingUserProfiles: false,
  matches: [],
  userProfiles: [],
  swipeFeedback: null,

  getMyMatches: async () => {
    try {
      set({ isLoadingMyMatches: true });
      const res = await axiosInstance.get("/matches");
      set({ matches: res.data.matches });
    } catch (error) {
      set({ matches: [] });
      console.error("error in getMyMatches : ", error);
      toast.error("Failed to get matches");
    } finally {
      set({ isLoadingMyMatches: false });
    }
  },

  getUserProfiles: async () => {
    try {
      set({ isLoadingUserProfiles: true });
      const res = await axiosInstance.get("/matches/user-profiles");
      set({ userProfiles: res.data.users });
    } catch (error) {
      set({ userProfiles: [] });
      console.error("error in getUserProfiles : ", error);
      toast.error("Failed to get user profiles");
    } finally {
      set({ isLoadingUserProfiles: false });
    }
  },

  swipeLeft: async (user) => {
    try {
      set({ swipeFeedback: "passed" });
      await axiosInstance.post(`/matches/swipe-left/${user._id}`);
    } catch (error) {
      console.error("error in swipeLeft : ", error);
      toast.error("Failed to swipe left");
    } finally {
      setTimeout(() => {
        set({ swipeFeedback: null });
      }, 1500);
    }
  },

  swipeRight: async (user) => {
    try {
      set({ swipeFeedback: "liked" });
      await axiosInstance.post(`/matches/swipe-right/${user._id}`);
    } catch (error) {
      console.error("error in swipeRight : ", error);
      toast.error("Failed to swipe right");
    } finally {
      setTimeout(() => {
        set({ swipeFeedback: null });
      }, 1500);
    }
  },
}));
