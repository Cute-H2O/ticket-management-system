import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const userRole = ref(null);
  
  const login = (role) => {
    userRole.value = role;
  };
  
  const logout = () => {
    userRole.value = null;
  };
  
  const isAdmin = () => {
    return userRole.value === 'admin';
  };
  
  return {
    userRole,
    login,
    logout,
    isAdmin
  };
});