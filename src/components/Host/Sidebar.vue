<template>
  <v-navigation-drawer
    :mini-variant.sync="miniVariant"
    :clipped.sync="clipped"
    :fixed.sync="fixed"
    app
    v-model.lazy="my_menu"
    color="#383D43"
    dark
    permanent
    width="230px"
    style="border-radius: 0;"
  >
    <v-list>
      <v-list-item class="px-2 bg-primary" to="/">
        <h1 v-if="miniVariant">AP</h1>
        <v-img
          style="height: 76px;"
          v-else
          src="@/assets/images/logo/font_logo.png"
          width="12"
          contain
          class="mx-sm-5"
        ></v-img>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item link class="pa-4">
        <v-list-item-content>
          <div style="display:flex;flex-wrap:wrap;flex-direction: column;">
            <v-list-item-avatar style="margin: 0px;">
              <v-img style="position: relative;" :src="avatar"></v-img>
            </v-list-item-avatar>
            <div style="text-align: center;">
              <v-list-item-title class="user-title">{{ name }}</v-list-item-title>
              <v-list-item-subtitle class="user-edit">Edit Profile</v-list-item-subtitle>
            </div>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>
    <v-col class="slider-options">
      <v-list nav flat dense class="pl-0">
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
        <v-list-item link to="/host/contracts">
          <v-list-item-icon class="mr-1 mr-lg-3">
            <v-icon>mdi-file-document-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Contracts</v-list-item-title>
        </v-list-item>
        <!-- <v-list-item link to="/host/bookings">
          <v-list-item-icon class="mr-1 mr-lg-3">
            <v-icon>mdi-sticker-check</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Bookings</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/host/canceled-bookings">
          <v-list-item-icon class="mr-1 mr-lg-3">
            <v-icon>mdi-file-cancel</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Canceled Bookings</v-list-item-title>
        </v-list-item>-->
        <v-list-item>
          <!-- <v-list-item-title> -->
          <v-list-group style="width: 100%;">
            <template v-slot:activator>
              <v-list-item-icon class="mr-1 mr-lg-3">
                <v-icon>mdi-image</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Booking</v-list-item-title>
            </template>
            <v-list-item link to="/host/bookings">
              <v-list-item-icon class="mr-1 mr-lg-3">
                <v-icon>mdi-sticker-check</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Bookings</v-list-item-title>
            </v-list-item>
            <v-list-item link to="/host/canceled-bookings">
              <v-list-item-icon class="mr-1 mr-lg-3">
                <v-icon>mdi-file-cancel</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Canceled Bookings</v-list-item-title>
            </v-list-item>
          </v-list-group>
          <!-- </v-list-item-title> -->
        </v-list-item>
        <v-list-item link to="/host/photos">
          <v-list-item-icon class="mr-1 mr-lg-3">
            <v-icon>mdi-image</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Photos</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/host/wallet">
          <v-list-item-icon class="mr-1 mr-lg-3">
            <v-icon>mdi-image</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Wallet</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/host/settings">
          <v-list-item-icon class="mr-1 mr-lg-3">
            <v-icon>mdi-tools</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list nav dense flat>
        <v-list-item link to="/host/settings">
          <v-list-item-icon class="mr-1 mr-lg-3">
            <v-icon>mdi-human-greeting</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Support</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-btn class="ma-2" outlined color="inherit">Logout</v-btn>
    </v-col>
  </v-navigation-drawer>
</template>

<script>
import authStore from "../../store/auth";
export default {
  name: "HostSidebar",
  props: ["menu", "miniVariant", "clipped", "fixed"],
  data: () => ({
    name: "",
    avatar: "",
    email: ""
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
    this.avatar = udata.avatar;
    this.email = udata.email;
  }
};
</script>

<style scoped>
.v-list-item--dense .v-list-item__icon,
.v-list--dense .v-list-item .v-list-item__icon {
  padding-right: 5px !important;
  color: #0fef70c6;
}

.v-list-item--active .v-list-item__title {
  color: #fff !important;
  font-weight: 500 !important;
  font-size: 1rem !important;
  font: normal normal bold 21px/25px Roboto;
  letter-spacing: 1.05px;
}
.v-list-item {
  padding-left: 20%;
}
.v-icon {
  color: #fff;
}

.v-list-item__title {
  color: #fff;
  font: normal normal normal 21px/25px Roboto;
  letter-spacing: 1.05px;
}

.user-title {
  color: #fff;
  font: normal normal medium 24px/35px Poppins;
  text-transform: capitalize;
  font-weight: 500;
  font-size: 1.2rem;
}
.user-edit {
  color: #0fef70c6 !important;
  font: normal normal bold 16px/25px Poppins;
  font-size: 0.7rem;
}

.slider-options {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
}

.notify {
  width: 10px;
  height: 10px;
  background-color: #fbc531;
  position: absolute;
  border-radius: 10px;
  left: 125px;
  top: 29px;
}
</style>
