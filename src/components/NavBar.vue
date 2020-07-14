<template>
  <div class="navbar-aussiepetz">
    <v-toolbar dark color="#00D657" flat >
      <v-app-bar-nav-icon class="d-flex d-sm-flex d-md-none" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <a href="/">
        <v-img src="@/assets/images/logo/font_logo.png" width="120px" style="filter: drop-shadow(1px 1px 1px white);"></v-img>
        </a>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- large View -->
      <v-toolbar-items class="d-none d-sm-none d-md-flex">
        <v-autocomplete
          v-model="select"
          :loading="loading"
          :items="items"
          :search-input.sync="search"
          cache-items
          class="mx-4"
          single-line
          hide-no-data
          hide-details
          label="Search"
          solo
          flat
          light
          rounded
          style="align-self: center;"
          dense
        >
          <v-icon slot="append">mdi-magnify</v-icon>
        </v-autocomplete>
        <v-chip class="text-center mr-2 nav-chip" color="white" outlined ripple text-color="#FAEF63">Become a host pet</v-chip>
        <v-chip class="text-center nav-chip" color="white" outlined ripple text-color="#FAEF63">Aussie pets BnB Services</v-chip>
        <v-btn text to="/perfect-match">Perfect Match</v-btn>
        <v-menu :open-on-hover="true" :offset-y="true">
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on">Pet Hub</v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in pethubitems" :key="index">
              <router-link to="#">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </router-link>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn style="text-transform: capitalize;" text to>Shop</v-btn>
        <v-btn style="text-transform: capitalize;" text to>Advertise with US</v-btn>
        <v-menu :open-on-hover="true" :offset-y="true">
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on" style="text-transform: capitalize;">Directory</v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in pethubitems" :key="index">
              <router-link to="#">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </router-link>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu v-if="isLoggedIn" :open-on-hover="true" :offset-y="true">
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on">
              Hi, {{ name }}
              <v-avatar color="orange" size="50" class="ml-2">
                <span class="white--text" style="font-size:1rem">{{ name_title }}</span>
              </v-avatar>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="goToDashBoard">
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logOut">
              <v-list-item-title>Signout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu v-else :open-on-hover="true" :offset-y="true">
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on" style="text-transform: capitalize;">Account</v-btn>
          </template>
          <v-list>
            <v-list-item @click="goToLogin">
              <v-list-item-title>Sing In</v-list-item-title>
            </v-list-item>
            <v-list-item @click="goToSignup">
              <v-list-item-title>Sing Up</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
      <!-- End View -->
      <!-- Mobile View -->
      <v-toolbar-items class="d-flex d-sm-flex d-md-none">
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <!-- End Mobile View -->
    <v-navigation-drawer
      v-model="drawer"
      :absolute="true"
      :fixed="true"
      :app="true"
      :clipped="true"
      class="overflow-hidden d-flex d-sm-flex d-md-none"
      style="z-index:99"
    >
      <v-list-item v-if="isLoggedIn">
        <v-list-item-avatar>
          <v-avatar color="orange" size="40" class="ml-2">
            <span class="white--text">{{ name_title }}</span>
          </v-avatar>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-menu :open-on-hover="true" :offset-y="true">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on" width="100%">Directory</v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in pethubitems" :key="index">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-divider></v-divider>

      <v-list v-if="isLoggedIn" dense>
        <v-list-item @click="goToDashBoard">
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logOut">
          <v-list-item-title>Signout</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-list v-else dense>
        <v-list-item @click="goToLogin">
          <v-list-item-title>Sing In</v-list-item-title>
        </v-list-item>
        <v-list-item @click="goToSignup">
          <v-list-item-title>Sing Up</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import router from "../router";
import authStore from "../store/auth";
export default {
  name: "NavBar",
  data() {
    return {
      loading: false,
      items: [],
      isLoggedIn: false,
      name_title: "",
      name: "",
      pic: "",
      search: null,
      select: null,
      states: [
        "Alabama",
        "Alaska",
        "American Samoa",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "District of Columbia",
        "Federated States of Micronesia",
        "Florida",
        "Georgia",
        "Guam",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Marshall Islands",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Northern Mariana Islands",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Palau",
        "Pennsylvania",
        "Puerto Rico",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virgin Island",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming"
      ],
      drawer: null,
      item: [
        { title: "Home", icon: "dashboard" },
        { title: "About", icon: "question_answer" },
        { title: "About", icon: "question_answer" },
        { title: "About", icon: "question_answer" },
        { title: "About", icon: "question_answer" },
        { title: "About", icon: "question_answer" },
        { title: "About", icon: "question_answer" },
        { title: "About", icon: "question_answer" },
        { title: "About", icon: "question_answer" },
        { title: "About", icon: "question_answer" },
        { title: "About", icon: "question_answer" },
        { title: "About", icon: "question_answer" }
      ],
      pethubitems: [
        { title: "Click Me", path: "" },
        { title: "Click Me", path: "" },
        { title: "Click Me", path: "" },
        { title: "Click Me 2", path: "" }
      ],
      check: ""
    };
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    }
  },
  created: function() {
    if (authStore.isSignedIn()) {
      this.isLoggedIn = true;
      const udata = JSON.parse(authStore.userDetails());
      this.name = udata.first_name + " " + udata.last_name;
      this.pic = "" + udata.avatar;
      this.name_title = udata.first_name.charAt(0) + udata.last_name.charAt(0);
    } else {
      this.isLoggedIn = false;
    }
  },
  methods: {
    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.states.filter(e => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    },
    goToDashBoard() {
      if(authStore.userType() === "petowner")
         router.push("/owner");
      else if(authStore.userType() === "host")
           router.push("/host");
    },
    goToLogin() {
      router.push("/login");
    },
    goToSignup() {
      router.push("/signup");
    },
    logOut() {
      authStore.logout();
      if (window.location.pathname === "/") {
        window.location.reload();
      } else router.push("/");
    }
  }
};
</script>

<style scoped>
.v-btn:not(.v-btn--round).v-size--default {
  padding: 0 7px;
}
.v-list.v-link-item {
  background: #dfdddd !important;
  cursor: pointer !important;
}
.v-list.v-link-item > a {
  color: #323232 !important;
  text-decoration: none !important;
}
.theme--dark.v-btn.v-btn--outlined.v-btn--text {
  border-color: rgb(255, 255, 255);
  border-radius: 12px;
}
.v-btn__content {
  font-weight: 600;
}
.v-chip.v-size--own {
  border-radius: 10px;
  font-size: 16px;
  height: 47px;
  margin-top: 8px;
  margin-left: 10px;
}
.v-toolbar__content {
  padding: 23px !important;
}
.headline {
  font-size: 0.5rem !important;
}
.nav-chip {
  align-self: center;
  cursor: pointer;
  padding: 18px;
  border-color: #fff;
}

</style>
