<template>
  <v-app>
    <PetOwnerSidebar
      v-bind:menu.sync="menu"
      v-bind:miniVariant.sync="miniVariant"
      v-bind:clipped.sync="clipped"
      v-bind:fixed.sync="fixed"
      @menuchanged="menuChanged"
    />
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="menu = !menu" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title>Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-row align="center" justify="end" class="mr-4">
        <v-col cols="4" sm="1">
          <v-badge color="success" content="6" overlap>
            <v-icon>mdi-bell-outline</v-icon>
          </v-badge>
        </v-col>

        <v-col cols="4" sm="1">
          <v-badge v-model="email_not" overlap color="primary" content="6">
            <v-icon>mdi-email-outline</v-icon>
          </v-badge>
        </v-col>
        <v-col cols="4" sm="1">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-avatar size="40" v-bind="attrs" v-on="on" color="#ebebeb">
                <v-img :src="avatar"></v-img>
              </v-avatar>
            </template>
            <v-list>
              <v-list-item to="/">
                <v-list-item-icon class="mx-2">
                  <v-icon color="#2c7873">mdi-account-edit-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Home</v-list-item-title>
              </v-list-item>
              <v-list-item @click="logout">
                <v-list-item-icon class="mx-2">
                  <v-icon color="#2c7873">mdi-power-standby</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-content>
      <div>
              <v-breadcrumbs :items="items"></v-breadcrumbs>
            </div>
            <v-divider></v-divider>
      <!-- <v-container class="fill-height" fluid>
        <v-row justify="center" align="center">
          <v-col> -->
            
            <v-container  fluid>
            <router-view></router-view>
            </v-container>
          <!-- </v-col>
        </v-row>
      </v-container> -->
    </v-content>
  </v-app>
</template>

<script>
import PetOwnerSidebar from "@/components/Owner/Sidebar";
import router from "../router";
import authStore from "../store/auth";
export default {
  name: "Owner",
  components: {
    PetOwnerSidebar
  },
  data: () => ({
    miniVariant: false,
    clipped: false,
    fixed: false,
    email_not: true,
    menu: true,
    name: "",
    name_title: "",
    items: [
      {
        text: "Dashboard",
        disabled: false,
        href: "/owner"
      },
      {
        text: "Message",
        disabled: true,
        href: "breadcrumbs_link_1"
      }
    ],
    avatar: ""
  }),
  methods: {
    toggleMenu: function() {
      this.menu = !this.menu;
    },
    logout: function() {
      authStore.logout();
      if (window.location.pathname === "/") {
        window.location.reload();
      } else router.push("/");
    },
     menuChanged(val){
      this.menu = val;
    }
  },
  created: function() {
    let s = window.location.pathname.toString().split("/");
    this.items[1].text = s[s.length - 1];
    this.items[1].href = window.location.pathname.toString();
    const udata = authStore.getUserData();
    this.name = udata.first_name + " " + udata.last_name;
    this.name_title = udata.first_name.charAt(0) + udata.last_name.charAt(0);
    this.email = udata.email;
    this.avatar = udata.avatar;
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }
};
</script>
<style scoped>
</style>