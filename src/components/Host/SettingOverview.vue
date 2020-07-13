<template>
  <div>
    <v-container>
      <h3>Overview</h3>
      <v-label>We send SMS for booking-related notifications</v-label>
      <v-container>
        <v-card>
          <v-card-text>Please send the notification that you would like to receive</v-card-text>
          <v-list two-line subheader>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>New Messages</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-switch></v-switch>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Booking Status Update</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-switch></v-switch>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-card-actions style="justify-content: center;">
              <v-btn color="#2c7873" dark>Save Changes</v-btn>
          </v-card-actions>
        </v-card>
        <v-card class="mt-3">
            <v-card-title>Delete your Account</v-card-title>
            <v-card-text></v-card-text>
            <v-card-actions style="justify-content: flex-end;">
                <v-btn text color="red">I want to delete my pet service profile</v-btn>
            </v-card-actions>
        </v-card>
      </v-container>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "HostSettingOverview"
};
</script>

<style scoped>
</style>