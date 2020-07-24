<template>
  <v-container>
    <v-card>
      <v-card-title>Settings</v-card-title>
      <v-tabs v-model="tab" color="#ffffff" dark background-color="#2c7873">
        <v-tab key="overview">Overview</v-tab>
        <v-tab key="balance">Balance</v-tab>
        <v-tab key="aussiepetz_credits">Aussiepetz Credits</v-tab>
        <!-- <v-tab key="personal_details">Personal Details</v-tab> -->
        <v-tab key="settings">Settings</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item key="overview">
         <v-container>
              <HostSettingOverview/>
         </v-container>
        </v-tab-item>
         <v-tab-item key="balance">
          <v-card-text>Balance</v-card-text>
        </v-tab-item>
        <v-tab-item key="aussiepetz_credits">
          <v-card-text>Balance settings</v-card-text>
        </v-tab-item>
        <!-- <v-tab-item key="personal_details">
          <PersonalDetails/>
        </v-tab-item> -->
        <v-tab-item key="settings">
          <v-card-text>Balance settings</v-card-text>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
import HostSettingOverview from '@/components/Host/SettingOverview';
// import PersonalDetails from "@/components/Host/PersonalDetails";
export default {
  name: "HostSettings",
  components:{HostSettingOverview,
  // PersonalDetails
  },
  data: () => ({
    tab: null
  })
};
</script>

<style scoped>
</style>