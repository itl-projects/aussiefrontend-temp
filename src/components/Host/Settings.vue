<template>
  <div grid-list-xs class="mt-2 p-5">
    <v-card outlined class="pa-6">
      <v-card-title style="font-size: 2rem; color: #444D59" class="pa-0 pt-4 pb-4">Settings</v-card-title>
      <v-tabs :left="true" v-model="tab" color="#000" dark background-color="#fff">
        <v-tab style="border-radius: 10px 0px 0px 10px" class="tabs" key="services">overview</v-tab>
        <v-tab class="tabs" key="about">Balance</v-tab>
        <v-tab style="border-radius: 0px 10px 10px 0px" class="tabs" key="pets">Credits</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item key="overview">
          <v-container>
            <HostSettingOverview />
          </v-container>
        </v-tab-item>
        <v-tab-item key="balance">
          <v-card-text>Balance check</v-card-text>
          <v-container>
            <SpinWheel :items="items" :num="items.length" />
          </v-container>
        </v-tab-item>
        <v-tab-item key="aussiepetz_credits">
          <v-card-text>Balance settings</v-card-text>
        </v-tab-item>
        <!-- <v-tab-item key="personal_details">
          <PersonalDetails/>
        </v-tab-item>-->
        <v-tab-item key="settings">
          <v-card-text>Balance settings</v-card-text>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import HostSettingOverview from "@/components/Host/SettingOverview";
// import PersonalDetails from "@/components/Host/PersonalDetails";
import SpinWheel from "@/components/commons/SpinWheel";
export default {
  name: "HostSettings",
  components: {
    HostSettingOverview,
    SpinWheel
    // PersonalDetails
  },
  data: () => ({
    tab: null,
    items: [
      { name: "check 1" },
      { name: "check 2" },
      { name: "check 3" },
      { name: "check 4" },
      { name: "check 5" },
      { name: "check 6" },
      { name: "check 7" },
      { name: "check 8" },
      { name: "check 9" },
      { name: "123" },
      { name: "456" }
    ]
  })
};
</script>

<style scoped>
* {
  font-family: "Roboto", sans-serif;
}

.v-slide-group__wrapper {
  padding: 0 !important;
  margin-right: 25%;
  justify-content: unset;
}
.v-tabs-slider {
  background-color: transparent;
}

.tabs {
  border: 1px solid #d6d6d6;
  color: #000 !important;
  width: 100%;
}

.v-tab--active {
  color: #fff !important;
  background-color: #0fef70c6;
}
</style>
