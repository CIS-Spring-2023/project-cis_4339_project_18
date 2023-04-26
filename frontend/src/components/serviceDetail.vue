<script>
import useVuelidate from '@vuelidate/core'
import { DateTime } from 'luxon'
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) }
  },
  data() {
    return {
      services: [],
      service: {
        service_name: ''
        //org is not necessary here
      } // added service property
    }
  },
  mounted() {
    this.getServices()
  },
  methods: {
    //Removed unecessary methods that came from the nwService.vue
    // better formattedDate
    formattedDate(datetimeDB) {
      const dt = DateTime.fromISO(datetimeDB, {
        zone: 'utc'
      })
      return dt
        .setZone(DateTime.now().zoneName, { keepLocalTime: true })
        .toLocaleString()
    },
    // abstracted method to get events
    getServices() {
      axios.get(`${apiURL}/services`).then((res) => {
        this.services = res.data
      })
      window.scrollTo(0, 0)
    },
    editService(serviceID) {
      this.$router.push({ name: 'updateService', params: { id: serviceID } })
    },
    deleteService(serviceID) {
      axios.delete(`${apiURL}/services/${serviceID}`).then(() => {
        this.getServices()
      })
    }
  }
}
</script>

<template>
  <main>
    <div>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        List of Services
      </h1>
    </div>

    <hr class="mt-10 mb-10" />
    <!-- Display Found Data -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
    >
      <div class="ml-10">
        <h2 class="text-2xl font-bold">List of Services</h2>
      </div>
      <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left">Service Name</th>
              <th class="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-300">
            <tr v-for="service in services" :key="service._id">
              <td class="p-2 text-left">{{ service.service_name }}</td>
              <!-- Changed it from service.service.service_name to service.service_name so that the actual name of the service would be displayed-->
              <td class="p-2 text-left">
                <button @click="editService(service._id)">Edit</button>
                <button @click="deleteService(service._id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
