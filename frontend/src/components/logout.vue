<template>
  <main>
    <div class="logout-page">
      <div class="logout-form">
        <h1>Logout</h1>
        <form>
          <button type="submit" class="btn btn-primary" v-on:click.prevent="logout()">Logout</button>
        </form>
      </div>
    </div>
  </main>
</template>


<style>
.logout-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f1f1f1;
}

.logout-form {
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


<script>
export default {
  methods: {
    logout() {
      window.location.replace("/");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
  },
};
</script>