<template>
  <div>
    <template>
      <v-card style="display: flex;min-height:100vh">
        <HostSidebar v-if="menu" :menu="menu" />
        <v-container fluid class="py-0 pl-0 pr-0">
          <v-row class="pl-3" style="justify-content: space-between;">
            <v-col class="pa-0">
              <v-toolbar color="white" flat>
                <v-app-bar-nav-icon @click="toggleMenu"></v-app-bar-nav-icon>
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
                            <v-icon color="#2c7873" class="mr-2">mdi-account-edit-outline</v-icon>
                            home
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
              </v-toolbar>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <div>
            <v-breadcrumbs :items="items"></v-breadcrumbs>
          </div>
          <v-divider></v-divider>
          <v-container fluid>
            <router-view></router-view>
          </v-container>
        </v-container>
      </v-card>
    </template>
  </div>
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
    email_not: true,
    name:"",
    avatar:"",
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
  beforeUpdate: function(){
    if(window.location.pathname.toString().split("/").length == 2){
      this.items[1].disabled = true;
      this.items[1].text = "";
    }else{
      if(this.items.length == 2){
        this.items.pop();
      }
        this.items.push(
           {
        text: window.location.pathname.toString().split("/")[2],
        disabled: true,
        href: window.location.pathname
      }
        )
    
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
      }else{
        if(authStore.userType() == "petowner"){
          router.replace("/petowner")
        }
      }
    }
  },
  beforeRouteEnter(to,from,next){
    if (!authStore.isSignedIn()) {
        router.replace("/");
        next();
      }
      else{
        next();
      }
  }
};
</script>

<style scoped></style>
