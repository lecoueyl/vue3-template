import { defineStore } from 'pinia';

// eslint-disable-next-line import/prefer-default-export
export const useStore = defineStore('account', {
  state: () => ({
    username: '',
  }),
  getters: {
    hasLoggedIn: (state) => !!state.username,
  },
  actions: {
    async login({ username }) {
      this.username = username;
    },
  },
});
