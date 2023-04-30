import { defineStore } from 'pinia'
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API
export const useLoggedInUserStore = defineStore({
  id: 'loggedInUser',

  state: () => ({
    name: "",
    isLoggedIn: false,
    role: '',
  }),

  actions: {
    async login(username, password) {
      try {
        const response = await axios.post(`${apiURL}/login`, {username, password});
        this.$patch({
          isLoggedIn: true,
          role: response.data.role,
          name: response.data.username,
        })
        this.$router.push("/");
      } catch(error) {
        alert("Invalid Credentials")
      }
    },
// this for the logout to set them to false
    logout() {
      this.patch({
        name: "",
        isLoggedIn: false,
        role: '',
      });
    }
  }
});
