import { defineStore } from 'pinia'
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API
export const useLoggedInUserStore = defineStore({
  id: 'loggedInUser',

  state: () => ({
    name: "",
    isLoggedIn: false,
    isEditor: false,
  }),

  actions: {
    async login(username, password) {
      try {
        const response = await axios.post(`${apiURL}/login`, { username, password});
        this.$patch({
          isLoggedIn: response.isAllowed,
          isEditor: response.isEditor,
          name: response.name,
        })
        this.$router.push("/");
      } catch(error) {
        console.log(error)
      }
    },

    logout() {
      this.patch({
        name: "",
        isLoggedIn: false,
        isEditor: false,
      });
    }
  }
});
