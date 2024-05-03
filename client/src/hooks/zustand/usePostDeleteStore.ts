import { create } from "zustand";

export type PostDeleteState = {
  postId: number | null;
  deletePost: (postId: number) => void;
  closeDeletePost: () => void;
};

export const usePostDeleteStore = create<PostDeleteState>((set) => ({
  postId: null,
  deletePost: (postId) => {
    set({ postId });
  },
  closeDeletePost: () => {
    set({ postId: null });
  },
}));


