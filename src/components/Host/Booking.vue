<template>
  <v-container fluid>
    <!-- <v-card-text>
      <v-row class="mb-4" align="center">
        <v-col cols="12" sm="1">
          <v-label>Filter By</v-label>
        </v-col>
        <v-col cols="12" sm="3">
          <v-select
            :items="['pet1','pet2']"
            label="Status"
            color="#2c7873"
            solo
            hide-details
            multiple
          ></v-select>
        </v-col>
        <v-col cols="12" sm="3">
          <v-select
            :items="['pet1','pet2']"
            label="All Users"
            color="#2c7873"
            solo
            hide-details
            multiple
          ></v-select>
        </v-col>
      </v-row>
    </v-card-text> -->
    <v-row>
      <v-col cols="12" sm="8" class="py-0">
        <v-row>
          <v-col cols="12" class="py-0">
            <Booking/>
          </v-col>
          <v-col cols="12">
            <v-divider/>
          </v-col>
        
        </v-row>

      </v-col>
      <v-col cols="12" sm="4">
        <RecurringBooking />
      </v-col>
    </v-row>
    
  </v-container>
</template>


<script>
import RecurringBooking from "@/components/Host/RecurringBookings";
import Booking from "@/components/commons/Booking";
export default {
  name: "HostBooking",
  components: { RecurringBooking,Booking },
  data() {
    return {
     
    
    };
  },
  computed: {
    
  },
  methods: {
   
  }
};
</script>

<style scoped>
</style>