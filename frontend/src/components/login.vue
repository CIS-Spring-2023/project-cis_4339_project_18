<script>
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API
import { useLoggedInUserStore } from "@/store/loggedInUser"
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  data: () => {
    return {
      username: "",
      password: "",
    }
  },
  validations() {
    return {
      username: { required },
      password: { required }
    }
  },
  setup() {
    const store = useLoggedInUserStore()
    return {
      v$: useVuelidate({ $autoDirty: true }),
      store,
    }
  }
};

</script>
<template>
  <main>
    <div class="login-page">
      
      <div class="login-form">
        <h1>Login</h1>
        <form>
          <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" class="form-control">
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" class="form-control">
          </div>
          <button type="submit" class="btn btn-primary" v-on:click.prevent="store.login(username, password)">Login</button>
        </form>
      </div>
    </div>
  </main>
</template>

<style>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f1f1f1;
}

.login-form {
  width: 400px;
  padding: 40px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

h1 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 2.5rem;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-control {
  padding: 10px;
  font-size: 1.2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.2s ease-in-out;
}

.form-control:focus {
  outline: none;
  border-color: #0069d9;
  box-shadow: 0 0 5px rgba(0, 105, 217, 0.5);
}

.btn {
  padding: 10px 20px;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  background-color: #0069d9;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.btn:hover {
  background-color: #0051a8;
}
</style>
