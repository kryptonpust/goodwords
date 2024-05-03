import { create } from "zustand";

export type PostEditState = {
  post?: {
    id: number;
    content: string;
    categories: string[];
  };
  editPost: (postId: number, content: string, categories: string[]) => void;
  closeEditPost: () => void;
};

export const usePostEditStore = create<PostEditState>((set) => ({
    post: undefined,
    editPost: (id, content, categories) => {
        set({ post: { id, content, categories } });
    },
    closeEditPost: () => {
        set({ post: undefined });
    },
}));
