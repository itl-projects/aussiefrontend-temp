<template>
  <v-navigation-drawer
    :mini-variant.sync="miniVariant"
      :clipped.sync="clipped"
      :fixed.sync="fixed"
      app
    v-model.lazy="my_menu"
    color="#2c7873"
    dark
    style="border-radius: 0;"
  >
    <v-list>
      <v-list-item class="px-2 bg-primary" to="/">
        <h1 v-if="miniVariant">AP</h1>
        <v-img v-else src="@/assets/images/logo/font_logo.png" width="12" class="mx-sm-5"></v-img>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item link class="pa-1">
        <v-list-item-content>
          <div style="display:flex;flex-wrap:wrap">
            <v-list-item-avatar color="#ebebeb">
              <v-img :src="avatar"></v-img>
            </v-list-item-avatar>
            <div>
              <v-list-item-title class="title">{{name}}</v-list-item-title>
              <v-list-item-subtitle>{{email}}</v-list-item-subtitle>
            </div>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav dense shaped class="pl-0">
      <v-list-item link key="dashboard" to="/owner" exact>
        <v-list-item-icon class="mr-1 mr-lg-3">
          <v-icon>mdi-view-dashboard-variant-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>
      <v-list-item link key="profile" to="/owner/profile">
        <v-list-item-icon class="mr-1 mr-lg-3">
          <v-icon>mdi-account-edit-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Profile</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon class="mr-1 mr-lg-3">
          <v-icon>mdi-wallet</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Aussie Wallet/Credits</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/owner/messages">
        <v-list-item-icon class="mr-1 mr-lg-3">
          <v-icon>mdi-email</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Message</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/owner/pets">
        <v-list-item-icon class="mr-1 mr-lg-3">
          <v-icon>mdi-paw</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Pet</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/owner/bookings">
        <v-list-item-icon class="mr-1 mr-lg-3">
          <v-icon>mdi-sticker-check</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Booking</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/owner/settings">
        <v-list-item-icon class="mr-1 mr-lg-3">
          <v-icon>mdi-tools</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Settings</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import authStore from "../../store/auth";

export default {
  name: "PetOwnerSidebar",
  props: ["menu", "miniVariant", "clipped", "fixed"],
  data: () => ({
    name: "",
    name_title: "",
    email: "",
    avatar: ""
  }),
  computed: {
    my_menu: {
      get: function() {
        return this.menu;
      },
      set: function(value) {
        this.$emit("menuchanged", value);
      }
    }
  },
  created: function() {
    const udata = authStore.getUserData();
    this.name = udata.first_name + " " + udata.last_name;
    this.name_title = udata.first_name.charAt(0) + udata.last_name.charAt(0);
    this.email = udata.email;
    this.avatar = udata.avatar;
  },
  methods: {}
};
</script>

<style scoped>
</style>