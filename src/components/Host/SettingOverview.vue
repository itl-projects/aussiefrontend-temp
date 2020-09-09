<template>
  <div>
    <v-container class="ml-12">
      <h3 style="font-size:1.5rem;color:#444D59;font-weight:bold;">Overview</h3>
      <v-label>We send SMS for booking-related notifications</v-label>
      <v-container>
        <v-card-text
          >Please send the notification that you would like to
          receive</v-card-text
        >
        <v-list :max-width="500" two-line subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title style="font-weight: bold;"
                >New Messages</v-list-item-title
              >
            </v-list-item-content>
            <v-list-item-action>
              <v-switch color="#0FEF70C6"></v-switch>
            </v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title style="font-weight: bold;"
                >Booking Status Update</v-list-item-title
              >
            </v-list-item-content>
            <v-list-item-action>
              <v-switch color="#0FEF70C6"></v-switch>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-card-actions>
          <v-btn color="#0FEF70C6" style="color:#fff;" class="settingBtn"
            >Save Changes</v-btn
          >
        </v-card-actions>
        <v-card-title
          style="padding: 5% 0 0 0;font-weight: bold; font-size: 1.5rem;"
          >Delete your Account</v-card-title
        >
        <v-card-actions
          style="display:flex;flex-direction:column;align-items:baseline;"
        >
          <v-btn
            text
            color="white"
            style="background-color: red;border-radius: 5px;padding: 1%;"
            >I want to delete my pet service profile</v-btn
          >
          <span style="color: red;">WARNING: This action not reversible</span>
        </v-card-actions>
      </v-container>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "HostSettingOverview",
};
</script>

<style scoped>
.settingBtn:hover {
  background-color: rgb(44, 120, 115) !important;
  color: #000 !important;
}
</style>
