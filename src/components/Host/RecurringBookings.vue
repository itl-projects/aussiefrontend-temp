<template>
  <div>
    <v-card>
      <v-tabs v-model="tab" grow>
        <v-tab key="booking_details">Booking Details</v-tab>
        <v-tab key="photos">Photos</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item key="booking_details">
          <v-container>
            <v-card-title class="pa-0 pl-1">Radhika S.</v-card-title>
            <v-card-text class="pa-0">
              <v-icon small>mdi-map-marker</v-icon>Address of the pet owner, india
            </v-card-text>
            <v-row justify="space-around" class="text-center">
              <v-col>
                <v-btn class="ma-2" outlined fab color="teal" small>
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
                <br />Booking
              </v-col>
              <v-col>
                <v-btn class="ma-2" outlined fab color="teal" small>
                  <v-icon color="#2c7873">mdi-android-messages</v-icon>
                </v-btn>
                <br />View Conversations
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-card-title class="pa-0 pl-1">Pet Hosting - 3 Nights</v-card-title>
            <v-list>
              <v-list-item-subtitle>Booking Status</v-list-item-subtitle>
              <v-list-item class="px-0">
                <v-label>Customer Cancelled</v-label>
              </v-list-item>
              <v-list-item-subtitle>Service Type</v-list-item-subtitle>
              <v-list-item class="px-0">
                <v-label>Pet Hosting at- Sitters Home</v-label>
              </v-list-item>
              <v-divider class="mb-3"></v-divider>
              <v-list-item-subtitle>For These Days</v-list-item-subtitle>

              <v-list-item class="px-0">
                <v-row align="center" class="text-center" justify="center">
                  <v-col cols="12" sm="5" class="py-0">
                    <v-text-field append-icon="mdi-calendar" readonly></v-text-field>
                  </v-col>
                  <v-col sm="2" class="py-0">
                    <h1>-</h1>
                  </v-col>
                  <v-col cols="12" sm="5" class="py-0">
                    <v-text-field append-icon="mdi-calendar" readonly></v-text-field>
                  </v-col>
                </v-row>
              </v-list-item>
              <v-divider class="mb-3"></v-divider>
              <v-list-item-subtitle>Pets</v-list-item-subtitle>
              <v-list-item class="px-0">
                <v-label>Indi</v-label>
              </v-list-item>
              <v-divider class="mb-3"></v-divider>
              <v-list-item-subtitle>
                Payment Cancelation Policy
                <v-icon>mdi-information-outline</v-icon>
              </v-list-item-subtitle>
              <v-list-item class="px-0">
                <v-label>Modrate</v-label>
              </v-list-item>
              <v-divider class="mb-3"></v-divider>
              <v-list-item-subtitle>Pets</v-list-item-subtitle>
              <v-list-item class="px-0">
                <v-label>Indi</v-label>
              </v-list-item>
              <v-divider class="mb-3"></v-divider>
              <v-list-item class="px-0" style="justify-content:space-between">
                <v-list-item-content>
                  <v-label color="info">View Payment Details</v-label>
                </v-list-item-content>
                <v-list-item-action class="ma-0">
                  <v-icon color="info">mdi-chevron-right</v-icon>
                </v-list-item-action>
              </v-list-item>
              <v-divider class="mb-3"></v-divider>
              <v-list-item>
                <v-list-item-content>
                  <h4>Estimated Total</h4>
                </v-list-item-content>
                <v-list-item-action class="ma-0">
                  <h2>$229</h2>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-container>
        </v-tab-item>
        <v-tab-item key="photos">
          <v-card-text>Photos settings</v-card-text>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "RecurringBooking",
  props: ["data"],
  data: () => ({
    tab: null
  })
};
</script>

<style scoped>
</style>