import { defineStore } from 'pinia'

export const useLoggedInUserStore = defineStore({
  id: 'loggedInUser',

  state: () => ({
    name: "",
    isLoggedIn: false,
    isEditor: false,
  }),

  actions: {
    async login(username, password, role) {
      try {
        const response = await axios.post('http://localhost:3000/login', { username, password, role });
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

function apiLogin(u, p, role) {
  if (role ==="viewer") {
    return Promise.resolve({ isAllowed: true, isEditor: false });
  }
  if (role ==="editor") {
    return Promise.resolve({ isAllowed: true, isEditor: true });
  }
}
