<template>
  <v-col style="height: 100%;" class="mt-3 pr-0">
    <div class="headSection">
      <div class="dashboard-style">Dashboard</div>
      <v-card outlined class="container2 cardDesign pa-3">
        <v-row class="profile2">
          <span class="majorTopic">Profile Complition</span>
          <span class="percentIndicator">{{profile_complition}}% Complete</span>
        </v-row>
        <div class="progressBar">
          <v-progress-linear
            style="border-radius: 10px"
            color="#0FEF70C6"
            height="10"
            :value="profile_complition"
          ></v-progress-linear>
        </div>
        <v-row class="profile2">
          <div v-show="collapsed" style="position: relative;">
            <span class="pointStyle"></span>
            <span class="topic" style="padding-left: 25px">{{pending[0].title}}</span>
          </div>
          <div v-show="collapsed">
            <span class="percentIndicator">{{pending[0].completed}}% on verified emails</span>
            <v-chip class="ma-2" :href="pending[0].link" small>Complete</v-chip>
          </div>
        </v-row>
        <div class="bottom">
          <v-expansion-panels flat>
            <v-expansion-panel>
              <v-expansion-panel-header class="collapseHeader">
                <div @click="checkCollapse"></div>
              </v-expansion-panel-header>
              <v-expansion-panel-content v-for="(items, i) in pendingProfile" :key="i">
                <div v-if="items.status===true">
                  <div style="display: flex; justify-content: space-between;">
                    <div style="position: relative;">
                      <span class="pointStyle"></span>
                      <span class="topic" style="padding-left: 20px">{{items.title}}</span>
                    </div>
                    <div>
                      <span class="percentIndicator">{{items.completed}}% on verified emails</span>
                      <v-btn small class style="margin:5px;" text :href="items.link">Complete</v-btn>
                    </div>
                  </div>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-card>
      <v-card outlined class="cardDesign">
        <v-row style="margin: 5px;padding: 5px">
          <!-- Profile Section -->
          <v-col cols="3" class="profile-left">
            <v-avatar size="150">
              <img :src="avatar" alt="user-pic" />
            </v-avatar>
            <div class="profile-edits">Edit Profile</div>
            <div class="profile-edits">View Profile</div>
          </v-col>
          <!-- Profile Details section -->
          <v-col cols="6">
            <v-row style="display: flex;flex-direction: column;">
              <v-col class="profile-right">
                <v-col cols="6">
                  <div class="container">
                    <div class="head">Name</div>
                    <div class="content">{{name}}</div>
                  </div>
                </v-col>
                <v-col cols="6">
                  <div class="container">
                    <div class="head">Awards</div>
                    <div v-for="items in awards " :key="items.icon">
                      <div class="content">
                        <v-img :src="items.icon" max-height="25px" max-width="25px"></v-img>
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="profile-right">
                <v-col cols="6">
                  <div class="container">
                    <div class="head">Credits</div>
                    <div class="content">{{credit}}</div>
                  </div>
                </v-col>
                <v-col cols="6">
                  <div class="container">
                    <div class="head">Bookings</div>
                    <div class="content">
                      <v-row>
                        <v-col sm="9" class="pa-0 pr-4 ma-0">
                          <div class="task">Total</div>
                          <div class="task">Completed</div>
                          <div class="task">Pending</div>
                        </v-col>
                        <v-col sm="3" class="pa-0 ma-0">
                          <div>{{ bookings.all }}</div>
                          <div>{{ bookings.completed }}</div>
                          <div>{{ bookings.pending }}</div>
                        </v-col>
                      </v-row>
                    </div>
                  </div>
                </v-col>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="3">
            <v-card v-show="false" class="mx-auto" max-width="344">
              <v-card-text>
                <div>Get Your Profile Ranked</div>
                <p class="display-1 text--primary">be•nev•o•lent</p>
                <p>adjective</p>
                <div class="text--primary">
                  well meaning and kindly.
                  <br />"a benevolent smile"
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="deep-purple accent-4">Learn More</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </div>
    <div v-if="upcomingBookings.length!==0" class="bodySection">
      <v-row class="profile2">
        <span class="dashboard-style2" style="margin-left: 0px">Upcoming Bookings</span>
        <span class="viewAll">View All</span>
      </v-row>
      <carousel :perPage="1" autoPlayHoverPause :autoplay="true" loop :autoplayTimeout="6000">
        <Slide v-for="(item, i) in upcomingBookings" :key="i">
          <v-card style="width: 96%" elevation="5" class="cardDesign">
            <v-row class="container2">
              <v-col cols="2" class="bookingDate">
                <v-img
                  max-height="120px"
                  max-width="120px"
                  min-height="80px"
                  min-width="80px"
                  style="border-radius: 50%;margin:auto;"
                  :src="item.img"
                  aspect-ratio="1"
                  contain
                />
              </v-col>
              <span class="v1"></span>
              <v-col style="display: flex;" cols="9">
                <v-col>
                  <v-col>
                    <div class="upcomingHead">Start Date</div>
                    <div class="upcomingContent">{{item.startDate}}</div>
                  </v-col>
                  <v-col>
                    <div class="upcomingHead">End Date</div>
                    <div class="upcomingContent">{{item.endDate}}</div>
                  </v-col>
                </v-col>
                <v-col>
                  <v-col>
                    <div class="upcomingHead">Day/Night Service</div>
                    <div class="upcomingContent">{{item.dn}}</div>
                  </v-col>
                  <v-col>
                    <div class="upcomingHead">Service Type</div>
                    <div class="upcomingContent">{{item.serviceType}}</div>
                  </v-col>
                </v-col>
                <v-col>
                  <v-col>
                    <div class="upcomingHead">Price</div>
                    <div class="upcomingContent">${{item.price}}</div>
                  </v-col>
                  <v-col>
                    <div class="upcomingHead">Booking ID</div>
                    <div class="upcomingContent">{{item.id}}</div>
                  </v-col>
                </v-col>
                <v-col>
                  <v-col>
                    <div class="upcomingHead">No. of Pets</div>
                    <div class="upcomingContent">Not given</div>
                  </v-col>
                </v-col>
              </v-col>
            </v-row>
          </v-card>
        </Slide>
      </carousel>
    </div>
    <div class="bottomSection">
      <div class="dashboard-style2">Add more about yourself</div>
      <v-row>
        <!-- Card 1 -->
        <v-col cols="4" class="px-0">
          <v-card class="cardDesign" outline>
            <v-row class="container2">
              <v-col style="display:flex; flex-direction: column;justify-content: space-between;">
                <div class="header">
                  <div class="headerHead">submit your</div>
                  <div class="header">proof of identity</div>
                </div>

                <div
                  class="contentHeader"
                >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam quas accusamus veritatis corporis, voluptas dolores animi sequi iusto sed doloremque, eaque sit neque ullam id nisi voluptate rerum enim qui.</div>
                <div class="buttonHeader">
                  <v-btn class="ma-1" width="40%" height="100%" outlined color="#0FEF70C6">Upload</v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <!-- Card 1 end -->
        <!-- Card 2 -->
        <v-col cols="4" class="px-0">
          <v-card class="cardDesign" outline>
            <v-row class="container2">
              <v-col style="display:flex; flex-direction: column;justify-content: space-between;">
                <div class="header">
                  <div class="headerHead">submit your</div>
                  <div class="header">Online Training certificate</div>
                </div>

                <div
                  class="contentHeader"
                >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam quas accusamus veritatis corporis, voluptas dolores animi sequi iusto sed doloremque, eaque sit neque ullam id nisi voluptate rerum enim qui.</div>
                <div class="buttonHeader">
                  <v-btn class="ma-1" width="40%" height="100%" outlined color="#0FEF70C6">Upload</v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <!-- Card 2 end -->
        <!-- Card 3 -->
        <v-col cols="4" class="px-0">
          <v-card class="cardDesign" outline>
            <v-row class="container2">
              <v-col style="display:flex; flex-direction: column;justify-content: space-between;">
                <div class="header">
                  <div class="headerHead">submit your</div>
                  <div class="header">add Testimonials</div>
                </div>

                <div
                  class="contentHeader"
                >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam quas accusamus veritatis corporis, voluptas dolores animi sequi iusto sed doloremque, eaque sit neque ullam id nisi voluptate rerum enim qui.</div>
                <div class="buttonHeader">
                  <v-btn class="ma-1" width="40%" height="100%" outlined color="#0FEF70C6">Request</v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <!-- Card 3 end -->
      </v-row>
    </div>
  </v-col>
</template>

<script>
import authStore from "@/store/auth";
import axios from "axios";
import urls from "@/axios/config";

import { Carousel, Slide } from "vue-carousel";

export default {
  name: "HostDashboard",
  components: {
    Carousel,
    Slide
  },
  data() {
    return {
      dialog: false,
      dialog1: false,
      notifications: false,
      sound: true,
      widgets: false,
      name: "",
      email: "",
      avatar: "",
      profile_complition: 0,
      collapsed: true,
      upcomingBookings: [],
      awards: [],
      bookings: [],
      credit: 0,
      pending: [
        {
          title: "Email Verification",
          completed: "0",
          link: "/host/profile#profile",
          status: false
        },
        {
          title: "Address Proof",
          completed: "0",
          link: "/host/profile#document",
          status: false
        },
        {
          title: "Admin Verification",
          completed: "0",
          link: "",
          status: false
        },
        {
          title: "Phone Verification",
          completed: "0",
          link: "/host/profile#profile",
          status: false
        },
        {
          title: "Profile Photo",
          completed: "0",
          link: "/host/profile#profile",
          status: false
        },
        {
          title: "Basic Profile Info",
          completed: "0",
          link: "/host/profile#profile",
          status: false
        },
        {
          title: "Services and Rates",
          completed: "0",
          link: "/host/profile",
          status: false
        },
        {
          title: "Id Proof",
          completed: "0",
          link: "/host/profile#document",
          status: false
        },
        {
          title: "Quiz",
          completed: "0",
          link: "/host/quiz",
          status: false
        },
        {
          title: "Invite 5 Friends",
          completed: "0",
          link: "/host/profile#awardsBadges",
          status: false
        }
      ]
    };
  },
  created: function() {
    this.getProfileCompletedInfo();
    this.getUpComingBookings();
    this.getUserData();
    const udata = authStore.getUserData();
    console.log("check---", udata);
    this.name = udata.first_name + " " + udata.last_name;
    this.avatar = udata.avatar;
    this.email = udata.email;
  },
  computed: {
    pendingProfile: function() {
      return this.pending.filter(function(u) {
        return u.status;
      });
    }
  },
  methods: {
    getUserData() {
      let config = {
        headers: {
          Authorization: "Token " + authStore.userToken()
        }
      };
      axios.get(urls.URL + "/userdata", config).then(res => {
        console.log("User DATA", res);
        this.credit = res.data.wallet.credit;
        const award = res.data.awards;
        award.forEach(element => {
          this.awards.push({
            icon: "http://18.223.188.111:70/" + "cdata/" + element.icon
          });
        });
        this.bookings = res.data.bookings;
      });
    },
    checkCollapse() {
      this.collapsed = !this.collapsed;
    },
    identityProofApproved() {
      console.log("to check aprroved status of identity");
    },
    getUpComingBookings() {
      let config = {
        headers: {
          Authorization: "Token " + authStore.userToken()
        }
      };

      axios.get(urls.URL + "/host/bookings/upcoming/", config).then(res => {
        console.log("upcoming data", res);
        const bookings = res.data.data;
        bookings.forEach(event => {
          const data = {
            id: event.oid.oid,
            img: urls.URL + event.oid.avatar,
            startDate: event.startDate,
            endDate: event.endDate,
            price: event.price,
            petType: event.petType,
            no_of_pet: event.no_of_pets,
            serviceType: event.services,
            dn: event.day_or_night
          };
          this.upcomingBookings.push(data);
        });
        console.log("Upcoming_bookings", this.upcomingBookings);
      });
    },
    getProfileCompletedInfo() {
      let config = {
        headers: {
          Authorization: "Token " + authStore.userToken()
        }
      };
      axios
        .get(urls.URL + "/host/completion/", config)
        .then(res => {
          console.log(res);
          if (res.data.status) {
            this.profile_complition = res.data.data.profile_completion;
            if (res.data.pending.address_proof) {
              this.pending[1].completed = res.data.pending.address_proof;
              this.pending[1].status = true;
            }

            if (res.data.pending.admin_verification) {
              this.pending[2].completed = res.data.pending.admin_verification;
              this.pending[2].status = true;
            }
            if (res.data.pending.email_verification) {
              this.pending[0].completed = res.data.pending.email_verification;
              this.pending[0].status = true;
            }
            if (res.data.pending.phone_verification) {
              this.pending[3].completed = res.data.pending.phone_verification;
              this.pending[3].status = true;
            }
            if (res.data.pending.profile_photo) {
              this.pending[4].completed = res.data.pending.profile_photo;
              this.pending[4].status = true;
            }
            if (res.data.pending.basic_profile_info) {
              this.pending[5].completed = res.data.pending.basic_profile_info;
              this.pending[5].status = true;
            }
            if (res.data.pending.service_and_rates) {
              this.pending[6].completed = res.data.pending.service_and_rates;
              this.pending[6].status = true;
            }
            if (res.data.pending.id_proof) {
              this.pending[7].completed = res.data.pending.id_proof;
              this.pending[7].status = true;
            }
            if (res.data.pending.quiz) {
              this.pending[8].completed = res.data.pending.quiz;
              this.pending[8].status = true;
            }
            if (res.data.pending.invite_5_friends) {
              this.pending[9].completed = res.data.pending.invite_5_friends;
              this.pending[9].status = true;
            }
          }
          console.log(this.pending);
        })
        .catch(err => {
          console.log(err);
        });
    },
    openProfilePage() {}
  },
  trainingApproved() {
    console.log("to check aprroved status of training");
  }
};
</script>

<style scoped>
:colors {
  --fontHead: "Roboto", sans-serif;
}

.border-below {
  border-bottom: 1px solid #e3e3e3;
}

.percentIndicator {
  color: #0fef70c6;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
}

.cardDesign {
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #d6d6d6;
  border-radius: 20px !important;
  opacity: 1;
  margin: 20px;
}

.dashboard-style {
  margin: 5px 20px;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  font-size: 1.5rem;
  color: #444d59;
  /* padding: 10px; */
}

.dashboard-style2 {
  margin: 5px 20px;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 1.5rem;
  color: #444d59;
}

.profile-left {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 20px;
  text-transform: uppercase;
}

.profile-left > .v-avatar {
  margin-bottom: 20px;
}

.profile-left > div {
  margin: 5px auto;
}

.container > .head {
  color: #3a3a3a;
  text-transform: capitalize;
  font-family: "Poppins", sans-serif;
}

.container > .content {
  font-family: "Poppins", sans-serif;
  color: #0fef70c6;
  font-weight: 500;
  text-transform: capitalize;
}

.task {
  font-family: "Poppins", sans-serif;
  color: #3a3a3a;
  font-weight: 100;
  font-size: 0.9rem;
  padding-left: 12px;
  text-transform: capitalize;
}

.profile-left > .profile-edits {
  color: #58a77a;
  font-weight: 400;
  font-family: "Roboto", sans-serif;
}

.profile-right {
  display: flex;
  text-align: center;
}

.profile-right > .col > .row {
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  margin: auto;
}

.profile-right > .col > .container {
  text-align: start;
}

.head {
  margin-bottom: 3px;
  font-weight: 900;
}

.container2 {
  padding: 20px;
}

.container2 > .profile2 {
  display: flex;
  justify-content: space-between;
  margin: 0px 0px;
}

.container2 > .profile2 > .majorTopic {
  color: #444d59;
  font-weight: 500;
  font-family: "Roboto", sans-serif;
  font-size: 1.2rem;
}

.container2 > .profile2 > div > .topic {
  color: #444d59;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
}

.bodySection > .profile2 {
  display: flex;
  justify-content: space-between;
  margin: 0px 0px;
  padding: 0px 20px;
}

.bodySection > .profile2 > .viewAll {
  margin: auto 0px;
  color: #0fef70c6;
}

.container2 > .progressBar {
  margin: 10px auto;
}

.upcomingHead {
  color: #444d59;
  font-family: "Roboto", sans-serif;
  text-transform: capitalize;
  letter-spacing: 1.05px;
}

.upcomingContent {
  color: #0fef70c6;
  font-family: "Roboto", sans-serif;

  letter-spacing: 0.85px;
}

.pointStyle {
  width: 15px;
  height: 15px;
  background-color: #0fef70c6;
  border-radius: 10px;
  position: absolute;
  margin-top: 3%;
}

.v-expansion-panels {
  border-radius: 40px;
}

.v-expansion-panel-header {
  min-height: 0px;
  padding: 0px;
}

.container2 > .bottom {
  text-align: center;
}

.accordion-caret {
  background-image: linear-gradient(to top right, transparent 50%, #727272 50%);
  width: 0.5rem;
  height: 0.5rem;
  transform: rotate(-45deg);
}

.v-application--is-ltr .v-expansion-panel-header {
  text-align: center;
  display: list-item;
}

.v1 {
  border-left: 0.5px solid black;
}

.header > .headerHead {
  font-family: "Roboto", sans-serif;
  color: #444d59;
  text-transform: uppercase;
  font-size: 0.8rem;
}

.header > .header {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 1.2rem;
  margin-bottom: 18%;
  color: #444d59;
  text-transform: capitalize;
}

.container2 > .col > .contentHeader {
  /* width: 40%; */
  font-size: 0.8rem;
  color: #000000;
}

.buttonHeader {
  margin-top: 20px;
  text-align: center;
}
</style>