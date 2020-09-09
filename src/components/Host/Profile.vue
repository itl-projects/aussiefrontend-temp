<template>
  <div grid-list-xs class="mt-2 p-5">
    <v-card>
      <v-card-title style="font-size: 2rem;color:#444D59">Profile</v-card-title>
      <v-tabs v-model="tab" color="#000" dark background-color="#fff">
        <v-tab
          style="border-radius: 10px 0px 0px 10px"
          class="tabs"
          key="services"
          >Services & Rates</v-tab
        >
        <v-tab class="tabs" key="about">About</v-tab>
        <v-tab class="tabs" key="experience">Experience</v-tab>
        <v-tab class="tabs" key="documents">Documents</v-tab>
        <v-tab class="tabs" key="household">Household</v-tab>
        <v-tab style="border-radius: 0px 10px 10px 0px" class="tabs" key="pets"
          >Pets</v-tab
        >
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
          <Document />
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
import router from "../../router";
export default {
  name: "Profile",
  components: { ServicesAndRates, PersonalDetails, Document },
  data: function() {
    return {
      tab: null,
    };
  },

  computed: {},
  methods: {},
  created: function() {
    if (!authStore.isSignedIn()) {
      authStore.logout();
      router.replace("/");
    } else {
      let type = window.location.hash;
      if (type == "#profile") {
        this.tab = 1;
      } else if (type == "#document") {
        this.tab = 3;
      }
    }
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  },
};
</script>
<style scoped></style>

<style>
.v-slide-group__wrapper {
  padding: 0 !important;
  margin-right: 2%;
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
