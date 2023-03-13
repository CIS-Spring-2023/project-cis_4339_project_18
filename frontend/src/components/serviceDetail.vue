<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from 'axios'
import { useLoggedInUserStore } from '@/store/loggedInUser.js'
import { computed } from 'vue'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) }
  },
  setup() {
    const user = useLoggedInUserStore()
    return { user }
  },
  data() {
    return {
      service: {
        name: ''
      },
      services: [
        'Family Support',
        'Adult Education',
        'Youth Services Program',
        'Early Childhood Education'
      ],
      currentIndex: null,
      updatedService: '',
      newService: ''
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
    deleteService(index) {
      this.services.splice(index, 1)
    },
    showUpdateBox(index) {
      this.currentIndex = index
      this.updatedService = this.services[index]
    },
    updateService(index) {
      this.services[index] = this.updatedService
      this.currentIndex = null
      this.updatedService = ''
    },
    addService() {
      this.services.push(this.newService)
      this.newService = ''
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
          <h2
            v-if="user.isLoggedIn && user.isEditor"
            class="text-2xl font-bold"
          >
            Add Service
          </h2>

          <!-- form field -->
          <div v-if="user.isLoggedIn && user.isEditor" class="flex flex-col">
            <form @submit.prevent="addService">
              <input
                type="text"
                v-model="newService"
                placeholder="Enter new service"
                class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <button type="submit" class="bg-red-700 text-white rounded">
                Add Service
              </button>
            </form>
          </div>

          <!-- form field -->
          <div>
            <h1>Services</h1>
            <ul>
              <li v-for="(service, index) in services" :key="index">
                {{ service }}
              </li>
            </ul>
          </div>
        </div>
        <div></div>
        <div></div>
        <!-- grid container -->
        <div
          v-if="user.isLoggedIn && user.isEditor"
          class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <h2 class="text-2xl font-bold">Update Service</h2>
          <!-- form field -->
          <ul>
            <li v-for="(service, index) in services" :key="index">
              <div>{{ service }}</div>
              <div>
                <button
                  class="bg-red-700 text-white rounded"
                  @click="deleteService(index)"
                >
                  Delete Service
                </button>
                <button
                  class="bg-red-700 text-white rounded"
                  @click="showUpdateBox(index)"
                >
                  Update Service
                </button>
                <div v-if="index === currentIndex">
                  <input
                    type="text"
                    v-model="updatedService"
                    placeholder="Enter updated service"
                  />
                  <button
                    class="bg-red-700 text-white rounded"
                    @click="updateService(index)"
                  >
                    Save
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </form>
    </div>
  </main>
</template>
