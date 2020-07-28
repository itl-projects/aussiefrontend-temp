<template>
  <v-app>
    <HostSidebar
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
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-col>

        <v-col cols="4" sm="1">
          <v-badge v-model="email_not" overlap color="primary" content="6">
            <v-icon>mdi-email</v-icon>
          </v-badge>
        </v-col>

        <v-col cols="4" sm="1">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-avatar size="40" v-bind="attrs" v-on="on">
                <v-img :src.sync="avatar"></v-img>
              </v-avatar>
            </template>
            <v-list>
              <v-list-item to="/">
                <v-list-item-icon class="mx-2">
                  <v-icon color="#2c7873" class="mr-2">mdi-account-edit-outline</v-icon>home
                </v-list-item-icon>
                <!-- <v-list-item-title>Home</v-list-item-title> -->
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
      <v-container  fluid>
         <!-- <v-row
          justify="center"
          align="center" >
          <v-col> -->
          <router-view></router-view>          
          <!-- </v-col>
        </v-row> -->
      </v-container>
    </v-content>
  </v-app>

</template>

<script>
import router from "../router";
import authStore from "../store/auth";
import HostSidebar from "@/components/Host/Sidebar";

export default {
  name: "HostAccount",
  components: {
    HostSidebar
  },
  data: () => ({
    miniVariant: false,
    clipped: false,
    fixed: false,
    email_not: true,
    name: "",
    avatar: "",
    menu: true,
    items: [
      {
        text: "Dashboard",
        disabled: false,
        href: "/host"
      },
      {
        text: "Message",
        disabled: true,
        href: "breadcrumbs_link_1"
      }
    ]
  }),
  beforeUpdate: function() {
    if (window.location.pathname.toString().split("/").length == 2) {
      this.items[1].disabled = true;
      this.items[1].text = "";
    } else {
      if (this.items.length == 2) {
        this.items.pop();
      }
      this.items.push({
        text: window.location.pathname.toString().split("/")[2],
        disabled: true,
        href: window.location.pathname
      });
    }
  },
  created: function() {
    let s = window.location.pathname.toString().split("/");
    this.items[1].text = s[s.length - 1];
    this.items[1].href = window.location.pathname.toString();
    const udata = authStore.getUserData();
    this.name = udata.first_name + " " + udata.last_name;
    this.avatar = udata.avatar;
    this.email = udata.email;
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  },
  methods: {
    toggleMenu: function() {
      this.menu = !this.menu;
    },
    logout: function() {
      authStore.logout();
      if (window.location.pathname === "/") {
        window.location.reload();
      } else router.replace("/");
    },
    isLoggedIn: function() {
      if (!authStore.isSignedIn()) {
        router.replace("/");
      } else {
        if (authStore.userType() == "petowner") {
          router.replace("/petowner");
        }
      }
    },
    menuChanged(val){
      this.menu = val;
    }
  },
  beforeRouteEnter(to, from, next) {
    if (!authStore.isSignedIn()) {
      router.replace("/");
      next();
    } else {
      next();
    }
  }
};
</script>

<style scoped></style>
