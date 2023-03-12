import { defineStore } from 'pinia'

export const useLoggedInUserStore = defineStore({
  id: 'loggedInUser',
// sets state to logged out and makes role for editor false
  state: () => ({
    name: "",
    isLoggedIn: false,
    isEditor: false,
  }),
// checks the user's credentials and determines if they are an editor then reroutes to home page
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
        alert("Invalid credentials. Please try again.");
      }
    },
// this for the logout to set them to false
    logout() {
      this.patch({
        name: "",
        isLoggedIn: false,
        isEditor: false,
      });
    }
  }
});
// this code checks to see if the credentials are valid and whether they are editor or viewer
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
