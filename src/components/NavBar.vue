<template>
  <div class="navbar-aussiepetz">
    <v-toolbar color="#f4f4f4" flat extended style="background-color: #383D43;">
      <v-app-bar-nav-icon class="d-flex d-sm-flex d-md-none" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <a href="/">
          <v-img src="@/assets/images/logo/font_logo.png" width="200px"></v-img>
        </a>
      </v-toolbar-title>
      <!-- <v-spacer></v-spacer> -->
      <!-- large View -->
      <v-toolbar-extension slot="extension" style="margin: auto;background-color:#dfe6e9;">
        <v-menu :open-on-hover="true" :offset-y="true">
          <template v-slot:activator="{ on }">
            <v-btn style="text-transform: capitalize;color: #222222;" text v-on="on">Perfect Match</v-btn>
          </template>
          <v-list style>
            <v-list-item v-for="(item, index) in matchItems" :key="index" @click="item.path">
              <v-list-item-title class="design">
                {{
                item.title
                }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu :open-on-hover="true" :offset-y="true">
          <template v-slot:activator="{ on }">
            <v-btn
              style="text-transform: capitalize;color: #222222;"
              text
              v-on="on"
              color="#10a722"
            >Pet Hub</v-btn>
          </template>
          <v-list style>
            <v-list-item v-for="(item, index) in pethubitems" :key="index" @click="item.path">
              <v-list-item-title class="design">
                {{
                item.title
                }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu :open-on-hover="true" :offset-y="true">
          <template v-slot:activator="{ on }">
            <v-btn
              text
              v-on="on"
              style="text-transform: capitalize;color: #222222;"
              color="#10a722"
            >shop</v-btn>
          </template>
          <v-list style>
            <v-list-item v-for="(item, index) in shopItems" :key="index" :to="item.path">
              <v-list-item-title class="design">{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          style="text-transform: capitalize;color: #222222;"
          text
          color="#10a722"
        >Advertise with US</v-btn>
        <v-menu :open-on-hover="true" :offset-y="true">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              text
              v-bind="attrs"
              v-on="on"
              style="text-transform: capitalize;color: #222222;"
              color="#10a722"
            >Directory</v-btn>
          </template>
          <v-list style>
            <v-list-item v-for="(item, index) in directoryItems" :key="index" @click="item.path">
              <v-list-item-title class="design">{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <!-- Changed from upper col to bottom -->

        <!-- Changes end-->
        <!-- </v-col> -->
      </v-toolbar-extension>
      <v-toolbar-items style="width: 100%" class="d-none d-sm-none d-md-flex">
        <v-col cols="12" style="text-align: end;" justify="end">
          <v-btn
            class="homeBtnClass"
            v-resize-text="{
              ratio: 2,
              minFontSize: '10px',
              maxFontSize: '90%',
              delay: 200,
            }"
            depressed
            tile
          >
            <v-icon style="margin-right: 3%;">mdi-human-greeting</v-icon>Become
            a pet host
          </v-btn>
          <v-btn
            class="homeBtnClass"
            v-resize-text="{
              ratio: 2,
              minFontSize: '5%',
              maxFontSize: '90%',
              delay: 200,
            }"
            depressed
            tile
          >
            <v-icon style="margin-right: 3%;">mdi-paw</v-icon>Aussie pets BnB
            Services
          </v-btn>
          <!-- <v-icon style="margin: 0px 1%;" color="#fff" slot="append">mdi-magnify</v-icon> -->
          <v-autocomplete
            v-model="select"
            :loading="loading"
            :items="items"
            :search-input.sync="search"
            cache-items
            class="mx-4"
            hide-no-data
            hide-details
            label="Search"
            solo
            flat
            light
            rounded
            style="align-self: center;display:inline-block;border: 1px solid rgba(54,154,204,1);"
            dense
          >
            <v-icon slot="append">mdi-magnify</v-icon>
          </v-autocomplete>
          <v-menu v-if="isLoggedIn" :open-on-hover="true" :offset-y="true">
            <template v-slot:activator="{ on }">
              <v-btn dark text v-on="on">
                Hi, {{ name }}
                <v-avatar color="white" size="50" class="ml-2">
                  <span v-if="pic == ''" class="white--text" style="font-size:1rem">{{ name_title }}</span>
                  <v-img v-else :src="pic"></v-img>
                </v-avatar>
              </v-btn>
            </template>
            <v-list dark>
              <v-list-item @click="goToDashBoard">
                <v-list-item-title class="design">Dashboard</v-list-item-title>
              </v-list-item>
              <v-list-item @click="logOut">
                <v-list-item-title class="design">Logout</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-menu v-else :open-on-hover="true" :offset-y="true">
            <template v-slot:activator="{ on }">
              <v-btn
                @click="goToLogin"
                color="#fff"
                text
                v-on="on"
                style="text-transform: capitalize;border: 3px solid #fff;padding:0px 3%;margin: 0px 1%;"
              >Login</v-btn>
            </template>
            <!-- <v-list style="border: 2px solid #FAEF63">
              <v-list-item @click="goToLogin">
                <v-list-item-title class="design">Sing In</v-list-item-title>
              </v-list-item>
              <v-list-item @click="goToSignup">
                <v-list-item-title class="design">Sing Up</v-list-item-title>
              </v-list-item>
            </v-list>-->
          </v-menu>
        </v-col>
      </v-toolbar-items>

      <!-- End View -->
      <!-- Mobile View -->
      <v-toolbar-items class="d-flex d-sm-flex d-md-none">
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
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
      width="200px"
      height="100%"
    >
      <v-app-bar style="justify-content: center;">
        <a href="/">
          <v-img
            src="@/assets/images/logo/font_logo.png"
            width="120px"
            style="filter: drop-shadow(1px 1px 1px white);"
          ></v-img>
        </a>
      </v-app-bar>
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
      <v-list dense>
        <v-list-item to="/signup">
          <v-list-item-title style="color:#827F19">Become a pet host</v-list-item-title>
        </v-list-item>
        <v-list-item to="/signup">
          <v-list-item-title style="color:#D47E11">Aussie pets BnB Services</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-divider />
      <v-menu :open-on-hover="true" :offset-y="true">
        <template v-slot:activator="{ on }">
          <v-btn
            text
            v-on="on"
            color="#10a722"
            width="100%"
            style="justify-content: start;"
            class="pl-4"
          >Perfect Match</v-btn>
        </template>
        <v-list style="border: 2px solid #FAEF63">
          <v-list-item v-for="(item, index) in matchItems" :key="index" @click="item.path">
            <v-list-item-title class="design">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu :open-on-hover="true" :offset-y="true">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            text
            v-on="on"
            color="#10a722"
            width="100%"
            style="justify-content: start;"
            class="pl-4"
          >Pet Hub</v-btn>
        </template>
        <v-list style="border: 2px solid #FAEF63">
          <v-list-item v-for="(item, index) in pethubitems" :key="index" @click="item.path">
            <v-list-item-title class="design">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu :open-on-hover="true" :offset-y="true">
        <template v-slot:activator="{ on }">
          <v-btn
            text
            v-on="on"
            color="#10a722"
            width="100%"
            style="justify-content: start;"
            class="pl-4"
          >SHOP</v-btn>
        </template>
        <v-list style="border: 2px solid #FAEF63">
          <v-list-item v-for="(item, index) in shopItems" :key="index" :to="item.path">
            <v-list-item-title class="design">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu :open-on-hover="true" :offset-y="true">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            v-bind="attrs"
            v-on="on"
            width="100%"
            color="#10a722"
            style="justify-content: start;"
            class="pl-4"
          >Directory</v-btn>
        </template>
        <v-list style="border: 2px solid #FAEF63">
          <v-list-item v-for="(item, index) in directoryItems" :key="index">
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
          <v-list-item-title>Sign In</v-list-item-title>
        </v-list-item>
        <v-list-item @click="goToSignup">
          <v-list-item-title>Sign Up</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import VueResizeText from "vue-resize-text";
import router from "../router";
import authStore from "../store/auth";
import ResizeText from "vue-resize-text";

export default {
  name: "NavBar",
  directives: {
    ResizeText
  },
  components: [VueResizeText],
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
        { title: "Events", path: "" },
        { title: "Petorama", path: "" },
        { title: "Pet Pub", path: "" },
        { title: "Pet O Vision", path: "" }
      ],
      shopItems: [
        { title: "Pet Stuff", path: "/shop" },
        { title: "Pet Food", path: "/shop" },
        { title: "Merch", path: "/shop" }
      ],
      matchItems: [
        { title: "Purrrfect Match", path: "" },
        { title: "Pet Crush", path: "" }
      ],
      directoryItems: [
        { title: "Local Vets", path: "" },
        { title: "Pet Park Location", path: "" },
        { title: "Pet News", path: "" },
        { title: "Animal Charities", path: "" },
        { title: "Pet Insurance", path: "" },
        { title: "Lost Pets Rescue", path: "" },
        { title: "Pet For Sale", path: "" },
        { title: "Stop Pet Cruelty", path: "" },
        { title: "Lost Pets", path: "" },
        { title: "Vetting Process", path: "" },
        { title: "Rewards & Prizes", path: "" },
        { title: "Winner Board", path: "" },
        { title: "Sharing", path: "" }
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
      const udata = authStore.getUserData();
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
      if (authStore.userType() === "petowner") router.push("/owner");
      else if (authStore.userType() === "host") router.push("/host");
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
.v-toolbar__extension {
  padding: 0px !important;
}
.v-btn:not(.v-btn--round).v-size--default {
  padding: 0 7px;
}
.theme--dark.v-btn.v-btn--outlined.v-btn--text {
  border-color: rgb(255, 255, 255);
  border-radius: 12px;
}
.v-btn__content {
  font-weight: 600;
  color: #faef60;
}
.v-chip.v-size--own {
  border-radius: 10px;
  font-size: 16px;
  /* height: 47px; */
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
.design {
  color: #fff;
  font-size: 0.9rem;
}
.subheader {
  display: flex;
  justify-content: space-around;
}

.nav-1 {
  display: flex;
  background-color: #383d43 !important;
  border: 1px solid #707070;
}

.upperNav {
  display: flex;
}
.homeBtnClass {
  background-color: #0fef70 !important;
  color: #fff !important;
  padding: 12px !important;
  margin: auto 1%;
  font-weight: bolder;
  width: 20%;
  border-radius: 5px;
}
</style>

<style>
.v-toolbar__extension {
  background-color: #dfe6e9;
}
</style>
