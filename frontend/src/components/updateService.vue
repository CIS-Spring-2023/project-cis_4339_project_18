<template>
  <div>
    <h1>Update Service</h1>
    <form @submit.prevent="updateService">
      <div>
        <label>Service Name:</label>
        <input type="text" v-model="service.service" />
      </div>
      <div>
        <label>Organization:</label>
        <input type="text" v-model="service.org" />
      </div>
      <button type="submit">Update</button>
    </form>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email, alpha, numeric } from '@vuelidate/validators'
import VueMultiselect from 'vue-multiselect'
import axios from 'axios'
import { DateTime } from 'luxon'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  props: ['id'],
  name: 'UpdateService',
  data() {
    return {
      service: {
        service: '',
        org: ''
      }
    }
  },
  mounted() {
    this.getService()
  },
  methods: {
    async getService() {
      const res = await axios.get(`/services${this.$route.params.id}`)
      this.service = res.data
    },
    async updateService() {
      await axios
        .put(`${apiURL}/services/update/${this.$route.params.id}`, this.service)
        .then(() => {
          alert('Update has been saved.')
          this.$router.back()
        })
      this.$router.push({
        name: 'serviceDetail',
        params: { id: this.$route.params.id }
      })
    }
  }
}
</script>
