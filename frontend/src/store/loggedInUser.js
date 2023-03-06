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
        const response = await apiLogin(username, password, role);
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
  if (u === "ed" && p === "ed" && role ==="viewer") {
    return Promise.resolve({ isAllowed: true, isEditor: false, name: "John Doe" });
  }
  if (u === "ed" && p === "ed" && role ==="editor") {
    return Promise.resolve({ isAllowed: true, isEditor: true, name: "John Doe" });
  }
  if (p === "ed") {
    return Promise.resolve({ isAllowed: false });
  }
  return Promise.reject(new Error("invalid credentials"));
}
