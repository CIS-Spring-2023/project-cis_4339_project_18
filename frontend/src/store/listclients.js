//The general structure of this code is from: https://hackernoon.com/build-a-single-page-web3-app-with-vue-3-vite-and-pinia 

import { defineStore } from 'pinia'

export const useClients = defineStore({
  state: () => {
    return {
      newArrivals: [],
      fetching: false
    }
  },

  getters: {
    results(state) {
      return state.Clients;
    },

    isFetching(state) {
      return state.fetching;
    }
  },

  actions: {
    async fetchClients() {
      this.fetching = true;
      const response = await fetch('/assets/clients.json');
      try {
        const result = await response.json();
        this.Clients = result;
      } catch (err) {
        this.Clients = [];
        console.error('Error loading clients:', err);
        return err;
      }

      this.fetching = false;
    }
  }
})
