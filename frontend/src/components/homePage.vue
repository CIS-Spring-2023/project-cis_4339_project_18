<script>
import { DateTime } from 'luxon'
import axios from 'axios'
import AttendanceChart from './barChart.vue'
import zipChart from './pieChart.vue'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  components: {
    AttendanceChart,
    zipChart
  },

  data() {
    return {
      recentEvents: [],
      labels: [],
      chartData: [],
      pieLabels: [],
      pieData: [],
      pieColors: [],
      loading: false,
      loadingPie: false,
      errorBar: null,
      errorPie: null
    }
  },

  mounted() {
    this.getAttendanceData()
    this.getClientData()
  },

  methods: {
    async getAttendanceData() {
      try {
        this.errorBar = null
        this.loading = true
        const response = await axios.get(`${apiURL}/events/attendance`)
        this.recentEvents = response.data
        this.labels = response.data.map(
          (item) => `${item.name} (${this.formattedDate(item.date)})`
        )
        this.chartData = response.data.map((item) => item.attendees.length)
      } catch (err) {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          this.errorBar = {
            title: 'Server Response',
            message: err.message
          }
        } else if (err.request) {
          // client never received a response, or request never left
          this.errorBar = {
            title: 'Unable to Reach Server',
            message: err.message
          }
        } else {
          // There's probably an error in your code
          this.errorBar = {
            title: 'Application Error',
            message: err.message
          }
        }
      }
      this.loading = false
    },

    formattedDate(datetimeDB) {
      const dt = DateTime.fromISO(datetimeDB, {
        zone: 'utc'
      })
      return dt
        .setZone(DateTime.now().zoneName, { keepLocalTime: true })
        .toLocaleString()
    },

    // method to allow click through table to event details
    editEvent(eventID) {
      this.$router.push({ name: 'eventdetails', params: { id: eventID } })
    },

    async getClientData() {
      try {
        this.errorPie = null
        this.loadingPie = true
        const response = await axios.get(`${apiURL}/clients`) 
        const allzip = response.data.map(client => client.address.zip) // Getting the zip of all clients and putting them in the array allzip
        const frequency = {}
        // This for loop counts the number of times each unique zip is in the allzip array, each unique zip and its frequency is added to the frequency object
        // The code for this for loop comes from the first response in this post -> https://stackoverflow.com/questions/5667888/counting-the-occurrences-frequency-of-array-elements 
        for (const num of allzip) {
          frequency[num] = frequency[num] ? frequency[num] + 1 : 1
        }
        this.pieLabels = Object.keys(frequency)
        this.pieData = Object.values(frequency)
        //Creating background color for each section of the pie chart
        const colors = []
        this.pieLabels.forEach(() => {
          // This code for generating random colors is from the first answer in: https://stackoverflow.com/questions/1484506/random-color-generator 
          var letters = '0123456789ABCDEF'
          var color = '#'
          for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]
          }
          colors.push(color)
        }
        )
        this.pieColors = colors
      } catch (err) {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          this.errorPie = {
            title: 'Server Response',
            message: err.message
          }
        } else {
          // There's probably an error in your code
          this.errorPie = {
            title: 'Application Error',
            message: err.message
          }
        }
      }
      this.loadingPie = false
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
        Welcome
      </h1>
      <br />
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <div class="ml-10"></div>
        <div class="flex flex-col col-span-2">
          <table class="min-w-full shadow-md rounded">
            <thead class="bg-gray-50 text-xl">
              <tr class="p-4 text-left">
                <th class="p-4 text-left">Event Name</th>
                <th class="p-4 text-left">Event Date</th>
                <th class="p-4 text-left">Number of Attendees</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-300">
              <tr
                @click="editEvent(event._id)"
                v-for="event in recentEvents"
                :key="event._id"
              >
                <td class="p-2 text-left">{{ event.name }}</td>
                <td class="p-2 text-left">{{ formattedDate(event.date) }}</td>
                <td class="p-2 text-left">{{ event.attendees.length }}</td>
              </tr>
            </tbody>
          </table>
          <div>
            <AttendanceChart
              v-if="!loading && !errorBar"
              :label="labels"
              :chart-data="chartData"
            ></AttendanceChart>

            <!-- Start of loading animation -->
            <div class="mt-40" v-if="loading">
              <p
                class="text-6xl font-bold text-center text-gray-500 animate-pulse"
              >
                Loading...
              </p>
            </div>
            <!-- End of loading animation -->

            <!-- Start of error alert -->
            <div class="mt-12 bg-red-50" v-if="errorBar">
              <h3 class="px-4 py-1 text-4xl font-bold text-white bg-red-800">
                {{ errorBar.title }}
              </h3>
              <p class="p-4 text-lg font-bold text-red-900">
                {{ errorBar.message }}
              </p>
            </div>
            <!-- End of error alert -->

          </div>
          <div>
            <zipChart
              v-if="!loadingPie && !errorPie"
              :pieLabel="pieLabels"
              :pieChartData="pieData"
              :pieColor="pieColors"
            ></zipChart>

            <!-- Start of loading animation -->
            <div class="mt-40" v-if="loadingPie">
              <p
                class="text-6xl font-bold text-center text-gray-500 animate-pulse"
              >
                Loading...
              </p>
            </div>
            <!-- End of loading animation -->

            <!-- Start of error alert -->
            <div class="mt-12 bg-red-50" v-if="errorPie">
              <h3 class="px-4 py-1 text-4xl font-bold text-white bg-red-800">
                {{ errorPie.title }}
              </h3>
              <p class="p-4 text-lg font-bold text-red-900">
                {{ errorPie.message }}
              </p>
            </div>
            <!-- End of error alert -->
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
