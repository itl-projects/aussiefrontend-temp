<template>
  <v-container>
    <v-row>
      <v-col :cols="12" :md="12">
        <v-tabs
          v-model="tab"
          background-color="success accent-4"
          class="elevation-2"
          dark
          :centered="true"
          :grow="true"
          :right="right"
          :prev-icon="prevIcon ? 'mdi-arrow-left-bold-box-outline' : undefined"
          :next-icon="nextIcon ? 'mdi-arrow-right-bold-box-outline' : undefined"
          :icons-and-text="icons"
        >
          <v-tabs-slider></v-tabs-slider>

          <v-tab href="#tab-1">
            Account
            <v-icon v-if="icons">mdi-account-circle</v-icon>
          </v-tab>
          <v-tab href="#tab-3">
            Aussie Wallet/Credits
            <v-icon v-if="icons">mdi-wallet</v-icon>
          </v-tab>
          <v-tab href="#tab-4">
            Message
            <v-icon v-if="icons">mdi-email</v-icon>
          </v-tab>
          <v-tab href="#tab-5">
            Pet
            <v-icon v-if="icons">mdi-paw</v-icon>
          </v-tab>
          <v-tab href="#tab-6">
            Emergency Details
            <v-icon v-if="icons">mdi-car-brake-alert</v-icon>
          </v-tab>
          <v-tab href="#tab-7">
            Booking
            <v-icon v-if="icons">mdi-account-arrow-right</v-icon>
          </v-tab>
          <v-tab href="#tab-8">
            Profile
            <v-icon v-if="male" dark>mdi-face-profile</v-icon>
            <v-icon v-else dark>mdi-face-profile-woman</v-icon>
            
          </v-tab>

          <v-tab-item value="tab-1">
            <Account />
          </v-tab-item>
          <v-tab-item value="tab-3">
            <Profile />
          </v-tab-item>
          <v-tab-item value="tab-4">
            <Profile />
          </v-tab-item>
          <v-tab-item value="tab-5">
            <Pet />
          </v-tab-item>
          <v-tab-item value="tab-6">
            <Emergency />
          </v-tab-item>
          <v-tab-item value="tab-7">
            <Profile />
          </v-tab-item>
          <v-tab-item value="tab-8">
            <Profile />
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Account from "@/components/Owner/Account";
import Profile from "@/components/Owner/Profile";
import Emergency from "@/components/Owner/Emergency";
import Pet from "@/components/Owner/Pet";
import authStore from "../../store/auth";
export default {
  name: "MainScreen",
  components: { Account, Profile, Pet,Emergency },
  data() {
    return {
      tab: null,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      icons: true,
      centered: false,
      grow: false,
      vertical: false,
      prevIcon: false,
      nextIcon: false,
      right: false,
      male:true
    };
  },
  created: function(){
    this.male = authStore.isMale();
  }
};
</script>
<style scoped>
</style>
