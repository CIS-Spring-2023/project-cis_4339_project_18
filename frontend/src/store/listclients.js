//The general structure of this code is from: https://hackernoon.com/build-a-single-page-web3-app-with-vue-3-vite-and-pinia 

import { defineStore } from 'pinia'

export const useClientsStore = defineStore('clients',{
  state: () => {
    return {
      Clients: [],
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
    fetchClients() {
      this.fetching = true;
      const response = fetch('../assets/clients.json');
      try {
        const result = response.json();
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
