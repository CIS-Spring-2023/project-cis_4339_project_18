<script>
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API
import { useLoggedInUserStore } from "@/store/loggedInUser";

export default {
  name: 'App',
  data() {
    return {
      orgName: 'Dataplatform'
    }
  },
  setup() {
    const user = useLoggedInUserStore();
    return { user };
  },
  created() {
    if (this.user.isLoggedIn) {
      axios.get(`${apiURL}/org`).then((res) => {
        this.orgName = res.data.name
      })
    } else {
      //If user isn't logged in, they are redirected to the login page
      this.$router.push({ name: 'login'})
    }
  }
}
</script>
<template>
  <main class="flex flex-row">
    <div id="_container" class="h-screen">
      <header class="w-full">
        <section class="text-center">
          <img class="m-auto" src="@\assets\DanPersona.svg" />
        </section>
        <nav class="mt-10">
          <ul class="flex flex-col gap-4">
            <li>
              <router-link to="/">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >dashboard</span
                >
                Dashboard
              </router-link>
            </li>
            <li>
              <!--If user is logged in and their role is editor they can see and visit the Client Intake Form tab-->
              <router-link v-if="user.isLoggedIn && user.role === 'editor'" to="/intakeform">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >people</span
                >
                Client Intake Form
              </router-link>
            </li>
            <li>
              <!--If user is logged in and their role is editor they can see and visit the Create Event tab-->              
              <router-link v-if="user.isLoggedIn && user.role === 'editor'" to="/eventform">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >event</span
                >
                Create Event
              </router-link>
            </li>
            <li>
              <router-link v-if="user.isLoggedIn" to="/serviceDetail">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >event</span
                >
                Services
              </router-link>
            </li>
            <!-- Removed the update service tab because it was unecessary-->
            <li>
              <router-link v-if="user.isLoggedIn && user.role === 'editor'" to="/newService">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >event</span
                >
                New Service
              </router-link>
            </li>
            <li>
              <router-link v-if="user.isLoggedIn" to="/findclient">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >search</span
                >
                Find Client
              </router-link>
            </li>
            <li>
              <router-link v-if="user.isLoggedIn" to="/findevents">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >search</span
                >
                Find Event
              </router-link>
            </li>
            <li>
              <li v-if="user.isLoggedIn">
                <router-link to="/logout">
                  <span
                    style="position: relative; top: 6px"
                    class="material-icons"
                    >logout</span
                  >
                  Logout
                </router-link>
              </li>
              <li v-else>
                <router-link to="/login">
                  <span
                    style="position: relative; top: 6px"
                    class="material-icons"
                    >login</span
                  >
                  Login
                </router-link>
              </li>
            </li>
          </ul>
        </nav>
      </header>
    </div>
    <div class="grow w-4/5">
      <section
        class="justify-end items-center h-24 flex"
        style="background: linear-gradient(250deg, #c8102e 70%, #efecec 50.6%)"
      >
        <h1 class="mr-20 text-3xl text-white">{{ this.orgName }}</h1>
      </section>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>
<style>
#_container {
  background-color: #c8102e;
  color: white;
  padding: 18px;
}
</style>





