<template>
  <div grid-list-xs class="mt-2 p-5" style="border:1px soild">
    <v-card>
      <v-card-title>Settings</v-card-title>
      <v-tabs v-model="tab" color="#ffffff" dark background-color="#2c7873">
        <v-tab key="services">Services and Rates</v-tab>
        <v-tab key="about">About</v-tab>
        <v-tab key="experience">Experience</v-tab>
        <v-tab key="documents">Documents</v-tab>
        <v-tab key="household">Household</v-tab>
        <v-tab key="pets">Pets</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item key="services">
          <v-container>
            <ServicesAndRates />
          </v-container>
        </v-tab-item>
        <v-tab-item key="about">
          <PersonalDetails />
        </v-tab-item>
        <v-tab-item key="experience">
          <v-card-text>Balance household</v-card-text>
        </v-tab-item>
        <v-tab-item key="documents">
          <Document/>
        </v-tab-item>
        <v-tab-item key="pets">
          <v-card-text>Pets</v-card-text>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>
<script>
import ServicesAndRates from "@/components/Host/ServicesAndRates";
import PersonalDetails from "@/components/Host/PersonalDetails";
import Document from "@/components/Host/Document";
import authStore from "../../store/auth";
import router from '../../router';
export default {
  name: "Profile",
  components: { ServicesAndRates, PersonalDetails,Document },
  data: function() {
    return {
      tab: null
    };
  },

  computed: {},
  methods: {},
  created: function() {
    if (!authStore.isSignedIn()) {
      authStore.logout();
      router.replace("/");
    }else{
      let type = window.location.hash;
      if(type == "#profile"){
          this.tab = 1;
      }else if(type == "#document"){
        this.tab = 3;
      }
    }
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }
};
</script>
<style scoped>
</style>