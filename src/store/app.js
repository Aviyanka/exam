// Utilities
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    isAuthenticated: '',
  }),

  // Mutation to update isAuthenticated state
  actions: {
    checkAuthentication() {
      // Get the token from local storage
      const token = localStorage.getItem('token');
      // Update isAuthenticated based on the token existence
      this.isAuthenticated = !!token;
    },
  },
});
