<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) }
  },
  data() {
    return {
      service: {
        name: ''
      },
      services: [
        { id: 1, name: 'Family Support' },
        { id: 2, name: 'Adult Education' },
        { id: 3, name: 'Youth Services Program' },
        { id: 4, name: 'Early Childhood Education' }
      ],
      newServiceName: ''
    }
  },
  methods: {
    async handleSubmitForm() {
      // Checks to see if there are any errors in validation
      const isFormCorrect = await this.v$.$validate()
      // If no errors found. isFormCorrect = True then the form is submitted
      if (isFormCorrect) {
        axios
          .post(`${apiURL}/events`, this.event)
          .then(() => {
            alert('Event has been added.')
            this.$router.push({ name: 'findevents' })
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    addService: function () {
      // Generate a unique ID for the new item
      const newId = this.services.length + 1
      // Create a new service object with the entered name and the generated ID
      const newService = { id: newId, name: this.newServiceName }
      // Add the new service to the list
      this.services.push(newService)
      // Clear the input field
      this.newServiceName = ''
    }
  },
  // sets validations for the various data properties
  validations() {
    return {
      service: {
        name: { required }
      }
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
        Services
      </h1>
    </div>
    <div class="px-10 py-20">
      <!-- @submit.prevent stops the submit event from reloading the page-->
      <form @submit.prevent="handleSubmitForm">
        <!-- grid container -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <h2 class="text-2xl font-bold">Add Service</h2>

          <!-- form field -->
          <div class="flex flex-col">
            <form @submit.prevent="addService">
              <input
                type="text"
                v-model="newServiceName"
                placeholder="Enter service name"
                class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <button class="bg-red-700 text-white rounded" type="submit">
                Add service
              </button>
            </form>
          </div>

          <!-- form field -->
          <div>
            <h1>Services</h1>
            <ul>
              <li v-for="service in services" :key="service.id">
                {{ service.name }}
              </li>
            </ul>
          </div>
        </div>
        <div></div>
        <div></div>
        <!-- grid container -->
        <div
          class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <h2 class="text-2xl font-bold">Update Service</h2>
          <!-- form field -->
        </div>
      </form>
    </div>
  </main>
</template>
