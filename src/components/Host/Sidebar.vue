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
            <v-list-item-avatar>
              <v-img :src="avatar"></v-img>
            </v-list-item-avatar>
            <div>
              <v-list-item-title class="title">{{name}}</v-list-item-title>
              <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
            </div>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav dense shaped class="pl-0">
      <v-list-item link to="/host" exact>
        <v-list-item-icon class="mr-1 mr-lg-3">
          <v-icon>mdi-desktop-mac-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/host/profile">
        <v-list-item-icon class="mr-1 mr-lg-3">
          <v-icon>mdi-account-circle</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Profile</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/host/messages">
        <v-list-item-icon class="mr-1 mr-lg-3">
          <v-icon>mdi-email</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Message</v-list-item-title>
      </v-list-item>

      <v-list-item link to="/host/bookings">
        <v-list-item-icon class="mr-1 mr-lg-3">
          <v-icon>mdi-sticker-check</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Bookings</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/host/photos">
        <v-list-item-icon class="mr-1 mr-lg-3">
          <v-icon>mdi-image</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Photos</v-list-item-title>
      </v-list-item>
      <!-- <v-list-item link to="/host/calendar">
        <v-list-item-icon class="mr-1 mr-lg-3">
          <v-icon>mdi-calendar</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Calendar</v-list-item-title>
      </v-list-item> -->
      <v-list-item link to="/host/settings">
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
  name: "HostSidebar",
  props: ["menu","miniVariant","clipped","fixed"],
  data: () => ({
    name: "",
    avatar: "",
    email: "",
  }),
  computed: {
        my_menu: {
            get: function() {
                return this.menu
            },
            set: function(value) {
                this.$emit('menuchanged', value)
            }
        }
    },
  created: function() {
    const udata = authStore.getUserData();
    this.name = udata.first_name + " " + udata.last_name;
    this.avatar = udata.avatar;
    this.email = udata.email;
  }
};
</script>

<style scoped>
.v-list-item--dense .v-list-item__icon,
.v-list--dense .v-list-item .v-list-item__icon {
  padding-right: 5px !important;
}
</style>