<script>
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  props: ['id'],  
  data() {
    return {
      servicesALL: [],
      services1: {
        services: []
      },
      Check: [],
    }
  },
  mounted() {
    this.getServices()
  },
  methods: {
    handleSubmitForm() {
      if (this.services1.services.length === 0) {
        this.$router.push({ name: 'findevents' })
      } else {
        axios
          .put(`${apiURL}/events/update/${this.$route.params.id}`, this.services1)
          .then(() => {
            alert('Event has been added.')
            this.$router.push({ name: 'findevents' })
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    addService(serviceID) {
        this.services1.services.push(serviceID)
        this.Check.push(serviceID)
    },
    removeService(serviceID) {
        var ind = this.Check.indexOf(serviceID)
        this.services1.services.splice(ind,1)
        this.Check.splice(ind,1)
    },
    getServices() {
      axios.get(`${apiURL}/services`).then((res) => {
      this.servicesALL = res.data
      })
      window.scrollTo(0, 0)
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
        Add Events
      </h1>
    </div>
    <div class="px-10 py-20">
        <!-- grid container -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <h2 class="text-2xl font-bold">Services</h2>
          <!-- form field -->
          <div class="flex flex-col col-span-2">
            <div></div>
              <table class="min-w-full shadow-md rounded">
                <thead class="bg-gray-50 text-xl">
                  <tr>
                    <th class="p-4 text-left">Service Name</th>
                    <th class="p-4 text-left">Description</th>
                    <th class="p-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-300">
                  <tr v-for="service in servicesALL" :key="service._id">
                    <td class="p-2 text-left">{{ service.service_name }}</td>
                    <td class="p-2 text-left">{{ service.description }}</td>
                    <td class="p-2 text-left" v-if="! Check.includes(service._id)" >
                      <button class="bg-green-700 text-white rounded" @click="addService(service._id)">Add Service</button>
                    </td>
                    <td class="p-2 text-left" v-else>
                      <button class="bg-red-700 text-white rounded" @click="removeService(service._id)">Remove Service</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
        </div>
    </div>
    <div class="flex justify-between mt-10 mr-20">
      <button class="bg-green-700 text-white rounded" @click="handleSubmitForm()">
            Continue
      </button>
    </div>
  </main>
</template>
