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
        //If login POST goes through, the user is logged in and their role is stored in the role
          isLoggedIn: true,
          role: response.data.role,
          name: response.data.username,
        })
        this.$router.push("/");
      } catch(error) {
        //If wrong username or password, an alert tells the user their creditials are wrong
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
