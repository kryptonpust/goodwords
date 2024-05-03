import { create } from "zustand";

export type SignUpState = {
  firstName: string;
  lastName: string;
  dob: Date | null;
  gender: string;
  email: string;
  reset: () => void;
  setPersonalInfo: (firstName: string, lastName: string) => void;
  setAdditionalInfo: (dob: Date|null, gender: string) => void;
  setEmail: (email: string) => void;
};

export const useSignUpStore = create<SignUpState>()((set) => ({
  firstName: "",
  lastName: "",
  dob: null,
  gender: "",
  email: "",
  reset: () => set({ firstName: "", lastName: "", dob: null, email: "" }),
  setPersonalInfo: (firstName, lastName) => set({ firstName, lastName }),
  setAdditionalInfo: (dob: Date|null, gender) => set({ dob, gender }),
  setEmail: (email) => set({ email }),
}));
