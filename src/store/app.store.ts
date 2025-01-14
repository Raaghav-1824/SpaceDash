import {create} from "zustand";

type AuthState = { 
  isAuthenticated :boolean;
  login: () => void;
  logout : () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated : !!localStorage.getItem('token'),
    login : () =>{
        localStorage.setItem('token' , "yourtoken");
        set({isAuthenticated :true});
    },

    logout : () =>{
        localStorage.removeItem('token');
        set({isAuthenticated: false});
    },
}));

export default useAuthStore;
