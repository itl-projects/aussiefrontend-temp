<template>
  <div>
    <NavBar />
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-row>
              <v-col cols="12" class="py-0">
                <PetHostingFormDummy :drop_date.sync="drop_date" :pickup_date="pickup_date" />
              </v-col>

              <v-col cols="12" class="py-0">
                <v-btn
                  class="mr-3 mb-3"
                  style="float:right;"
                  color="info"
                  text
                  @click="showFilter"
                >{{filterText}}</v-btn>

                <h4 v-if="filter" class="pl-6 mt-10">More Filters</h4>
                <v-row class="py-0 px-3 mx-auto text-center" align="center" v-if="filter">
                  <v-col cols="6" sm="2" class="py-0 px-0">
                    <v-overflow-btn
                      :items="about_pet"
                      label="About my pet(s)"
                      no-data-text
                      hide-details
                      hide-no-data
                      flat
                      single-line
                      target="#dropdown-example"
                      multiple
                    ></v-overflow-btn>
                  </v-col>
                  <v-col cols="6" sm="2" class="py-0 px-0">
                    <v-overflow-btn
                      :items="about_sitter"
                      label="About the Sitter"
                      hide-details
                      hide-no-data
                      flat
                      single-line
                      target="#dropdown-example"
                      multiple
                    ></v-overflow-btn>
                  </v-col>
                  <v-col cols="6" sm="2" class="py-0 px-0">
                    <v-overflow-btn
                      :items="house_conditions"
                      label="Housing Conditions"
                      hide-details
                      hide-no-data
                      flat
                      single-line
                      target="#dropdown-example"
                      multiple
                    ></v-overflow-btn>
                  </v-col>
                  <v-col cols="6" sm="2" class="py-0 px-0">
                    <v-overflow-btn
                      :items="transport"
                      label="Transport"
                      hide-details
                      hide-no-data
                      flat
                      single-line
                      target="#dropdown-example"
                      multiple
                    ></v-overflow-btn>
                  </v-col>
                  <v-col cols="6" sm="2" class="py-0 px-0">
                    <v-menu
                      v-model="menu"
                      :close-on-content-click="false"
                      :close-on-click="false"
                      class="pa-0 ma-0"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-select
                          v-bind="attrs"
                          v-on="on"
                          label="Budget"
                          class="ml-2 mt-2"
                          no-data-text
                          solo
                          flat
                          hide-details
                          hide-no-data
                          single-line
                        ></v-select>
                      </template>
                      <v-list class="pa-0 ma-0">
                        <v-list-item>
                          <v-row
                            style="max-width:300px;background-color:#f4f4f4"
                            class="text-center"
                            align="center"
                          >
                            <v-col cols="12">
                              <span>The average rate is $50 AUD per night</span>
                            </v-col>
                            <v-col cols="12" class="py-0">
                              <span style="float:left;font-size:0.8rem">{{ticksLabels[0]}}</span>
                              <span style="float:right;font-size:0.8rem">{{ticksLabels[1]}}</span>
                              <v-range-slider v-model="budget" :max="budget_max" :min="budget_min"></v-range-slider>
                            </v-col>
                            <v-col cols="12" class="py-0">
                              <h3>${{budget[0]}} - ${{budget[1]}} AUD</h3>
                            </v-col>
                          </v-row>
                        </v-list-item>
                        <v-list-item-action>
                          <v-btn outlined @click="closeMenu" color="teal">Apply</v-btn>
                        </v-list-item-action>
                      </v-list>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-btn
                  v-if="filter"
                  class="mr-3 mb-3"
                  style="float: right;"
                  color="info"
                  text
                >clear filter</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col :cols="12">
          <v-row>
            <v-col cols="10">
              <h2 style="font-weight: normal;" class="pt-1">
                Connecting you with
                <span
                  style="color: #2c7873;text-transform: capitalize;"
                >{{ items.length }} {{service_choosen | formatName}}</span>
                near
                <span style="color: #2c7873;">{{ city }}</span>
              </h2>
            </v-col>
            <v-col cols="2">
              <v-select
                :items="['Performance', 'Location']"
                label="Sort By"
                outlined
                dense
                hide-details
              ></v-select>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col cols="12">
              <v-row
                class="text-align:center"
                v-if="items.length <= 0"
                style="flex-direction:column"
              >
                <h2 style="font-weight:100;" class="mx-auto">
                  No Host found in yout city
                  <b
                    style="font-weight:bold;"
                  >{{ city == "nothing" ? "" : city }}</b>.
                </h2>
                <br />
                <v-sheet width="100%" height="auto" title="no_data">
                  <v-img
                    contain
                    aspect-ratio="1"
                    height="200"
                    src="@/assets/images/no_data_found.svg"
                    style="background:#ffffff"
                  />
                </v-sheet>
              </v-row>
              <!-- <v-data-iterator
                v-else
                :items.sync="items"
                :items-per-page.sync="itemsPerPage"
                :page="page"
                hide-default-footer
              >
                <template v-slot:default="props">
                  <v-container>
                    <v-card v-for="(item, i) in props.items" :key="item.id" class="mb-4">
                      <v-hover v-slot:default="{ hover }">
                        <v-list
                          two-line
                          subheader
                          :key="i"
                          class="pb-0"
                          :elevation="hover ? 6 : 2"
                          :class="hover ? 'cardbox-border':''"
                        >
                          <div class="top_header">
                            <v-icon color="#2c7873" class="mr-2">mdi-calendar</v-icon>
                            <v-label color="black">Recently updated calendar</v-label>
                          </div>
                          <v-list-item>
                            <v-list-item-content
                              style="position:relative;cursor:pointer"
                              @click="showHostDetails(item.hid)"
                            >
                              <div class="fee">
                                <p class="mb-0" style="font-size: 0.8rem;">from</p>
                                <h1 style="color:#2c7873">$ {{item.price}}</h1>
                                <p style="font-size: 0.8rem;">/night</p>
                              </div>
                              <v-row>
                                <v-col cols="4" sm="4" class="py-1">
                                  <v-row class="text-center">
                                    <v-col cols="12 py-1">
                                      <v-img
                                        v-if="item.avatar_path !== null"
                                        style="border-radius:5px;"
                                        contain
                                        eager
                                        :src="img_url + item.avatar_path"
                                        :lazy-src="img_url + item.avatar_path"
                                        max-width="200px"
                                        max-height="200px"
                                      />
                                      <v-img
                                        v-else
                                        style="border-radius:5px;"
                                        contain
                                        eager
                                        src="@/assets/images/icon-people-circle.svg"
                                        lazy-src="@/assets/images/icon-people-circle.svg"
                                      />
                                    </v-col>
                                    <v-col cols="12 py-0">
                                      <v-btn
                                        text
                                        color="#2c7873"
                                        small
                                        class="px-0"
                                        @click="showHostDetails(item.hid)"
                                      >
                                        View More
                                        <v-icon color="#2c7873" class="ml-2" small>mdi-eye</v-icon>
                                      </v-btn>
                                    </v-col>
                                  </v-row>
                                </v-col>
                                <v-col
                                  cols="8"
                                  sm="8"
                                  class="py-1"
                                  :class="hover ? 'text-underline': ''"
                                >
                                  <h1
                                    style="font-weight: 500;color:#2c7873"
                                  >{{item.first_name}} {{item.last_name}}</h1>
                                  <div class="flex mt-2 mb-2">
                                    <v-icon>mdi-account-circle</v-icon>
                                    <v-icon>mdi-account-circle</v-icon>
                                    <v-icon>mdi-account-circle</v-icon>
                                    <v-icon>mdi-account-circle</v-icon>
                                  </div>
                                  <v-label
                                    class="heading"
                                    style="font-size:1.4rem"
                                  >Reliable and VERY caring dog sitter.</v-label>
                                  <div class="flex mt-2">
                                    <v-btn outlined color="#2c7873" x-small>7 Repeat guest</v-btn>
                                    <v-rating
                                      style="display: inline-block;"
                                      v-model="rating"
                                      color="warning"
                                      half-increments
                                      dense
                                      small
                                      size="18"
                                    ></v-rating>
                                    <v-btn
                                      small
                                      text
                                      color="#2c7873"
                                      style="letter-spacing: 0;text-transform: lowercase;"
                                    >28 reviews</v-btn>
                                  </div>
                                  <div class="flex">
                                    <v-chip small class="mt-2">respond within a day</v-chip>
                                    <v-chip class="ml-2 mt-2" small>92% response rate</v-chip>
                                  </div>
                                </v-col>
                              </v-row>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-hover>
                    </v-card>
                  </v-container>
                </template>

                <template v-slot:footer>
                  <div class="text-center mt-6">
                    <v-pagination
                      v-model="page"
                      :length="numberOfPages"
                      @next="nextPage"
                      @previous="formerPage"
                      @input="updateItemsPerPage"
                      circle
                      color="#2c7873"
                    ></v-pagination>
                  </div>
                </template>
              </v-data-iterator>-->
              <v-row v-else>
                <v-data-iterator
                  :items.sync="items"
                  :items-per-page.sync="itemsPerPage"
                  :page="page"
                  style="width: 100%;"
                  hide-default-footer
                >
                  <template v-slot:default="props">
                    <v-container>
                      <v-card
                        v-for="(item) in props.items"
                        :key="item.id"
                        style="margin: auto;
    border-radius: 23px 23px 0 0;"
                      >
                        <v-col class="header">
                          <v-icon color="#33DE79">mdi-calendar-month</v-icon>
                          <h4>Recently updated calendar</h4>
                        </v-col>
                        <v-row style="padding:1%;">
                          <v-col cols="2" style="align-self:center; text-align: center;">
                            <v-img
                              max-height="120px"
                              max-width="120px"
                              min-height="80px"
                              min-width="80px"
                              style="border-radius: 50%;margin:auto;"
                              src="https://cdn.vuetifyjs.com/images/john.jpg"
                              aspect-ratio="1"
                              contain
                            />
                          </v-col>
                          <v-col class="body" cols="7">
                            <div class="resultNames">
                              <div class="name">{{item.first_name}} {{item.last_name}}</div>
                              <v-icon v-for="n in 4" :key="n" color="#0FEF70">mdi-face</v-icon>
                            </div>
                            <!-- <div class="bio">Reliable and VERY caring dog sitter.</div> -->
                            <div class="rating">
                              <span class="ratingGuest">7 repeat guest</span>
                              <span v-for="n in 4" :key="n">
                                <v-icon color="#0FEF70">mdi-star</v-icon>
                              </span>
                            </div>
                            <v-col class="feedback">
                              <v-btn
                                color="#71f6aa"
                                style="color: #000; border: 1px solid #71f6aa;margin-right: 2%;"
                                outlined
                              >Respond with in a day</v-btn>
                              <v-btn
                                color="#71f6aa"
                                style="color: #000; border: 1px solid #71f6aa;margin-right: 2%;"
                                outlined
                              >92% respond rate</v-btn>
                            </v-col>
                          </v-col>

                          <v-divider vertical></v-divider>
                          <v-col class="rateInformation" cols="2">
                            <div class="information">from</div>
                            <h3 class="information">
                              <span style="color: #0FEF70;font-size: 1.8rem">$64</span>/night
                            </h3>
                            <!-- <div>
                              $64
                              <div class="information">/night</div>
                            </div>-->
                            <v-btn
                              color="#71F6AA"
                              class="white--text"
                              @click="showHostDetails(item.hid)"
                            >view more</v-btn>
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-container>
                  </template>

                  <template v-slot:footer>
                    <div class="text-center mt-6">
                      <v-pagination
                        v-model="page"
                        :length="numberOfPages"
                        @next="nextPage"
                        @previous="formerPage"
                        @input="updateItemsPerPage"
                        circle
                        color="#12EF72"
                      ></v-pagination>
                    </div>
                  </template>
                </v-data-iterator>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <Footer />
  </div>
</template>

<script>
// import axios from "axios";
// import URL from "@/axios/config";
import router from "@/router";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PetHostingFormDummy from "@/components/TabForms/PetHostingForm_dummy";
import axios from "axios";
import urls from "@/axios/config";
import ResizeText from "vue-resize-text";

const fixName = function(value) {
  return value.replace("_", " ");
};
export default {
  name: "HostResult",
  directives: {
    ResizeText
  },
  components: {
    NavBar,
    Footer,
    PetHostingFormDummy
  },
  filters: {
    formatName: fixName
  },
  data: () => ({
    services: [
      "pet_hosting",
      "pet_sitting",
      "pet_day_care",
      "house_visits",
      "exercise_walk_service",
      "pet_training",
      "pet_grooming"
    ],
    service_choosen: "",
    menu: false,
    img_url: urls.IMGURL,
    ticksLabels: ["$0 AUD", "$200 AUD"],
    filter: false,
    filterText: "More Filters",
    about_pet: [
      "Doesn’t get along with Dogs",
      "Doesn’t get along with Cats",
      "Doesn’t get along with Children"
    ],
    about_sitter: ["Administer Medicine", "Police Check", "Fast Response"],
    house_conditions: [
      "No Apartments",
      "House with large backyard",
      "Fenced Backyard"
    ],
    transport: ["Pick-up and drop-off", "Access to emergency transport"],
    budget: [50, 100],
    budget_min: 0,
    budget_max: 100,
    rating: 3,
    itemsPerPageArray: [4, 8, 12],
    page: 1,
    itemsPerPage: 5,
    count: 999,
    near: "Ultimo NSW",
    items: [],
    city: "nothoing",
    zipcode: 0,
    pet_type: "nothoing",
    lowerPrice: "nothing",
    upperPrice: "nothoing",
    lowerRating: "nothoing",
    upperRating: "nothoing",
    service: "nothoing",
    start_date: "",
    pickup_date: null,
    drop_date: null,
    times: "nothing",
    max_pet: 10
  }),
  watch: {
    address() {
      //this.fetchHosts();
    },
    start_date() {
      //  this.fetchHosts();
    },
    times() {
      // this.fetchHosts();
    }
  },
  mounted: function() {
    this.address =
      this.$route.query.address == undefined ? "" : this.$route.query.address;
    this.start_date =
      this.$route.query.start_date == undefined
        ? ""
        : this.$route.query.start_date;
    this.times =
      this.$route.query.times == undefined ? "" : this.$route.query.times;
    this.city =
      this.$route.query.city == undefined ? "" : this.$route.query.city;
    this.service_choosen =
      this.$route.query.service == undefined
        ? this.services[0]
        : this.$route.query.service;
    this.fetchHosts();
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    }
  },
  methods: {
    nextPage() {
      if (this.page + 1 < this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 > 1) this.page -= 1;
    },
    updateItemsPerPage(input) {
      this.page = input;
    },
    showFilter() {
      if (!this.filter) this.filterText = "Less Filters";
      else this.filterText = "More Filters";
      this.filter = !this.filter;
    },
    closeMenu() {
      this.menu = false;
    },
    showHostDetails(host_id) {
      router.push({
        path: "/hostdetail",
        query: {
          city: this.city,
          query: host_id,
          service: this.service_choosen
        }
      });
    },
    fetchHosts() {
      // &pet_type=${this.pet_type}&lowerPrice=${this.lowerPrice}&upperPrice=${this.upperPrice}}&lowerRating=${this.lowerRating}&upperRating=${this.upperRating}
      let data = `service=${this.service_choosen}&city=${this.city}`;

      axios.get(urls.URL + "/hostsearch/?" + data).then(res => {
        console.log(res);
        if (res.data.status) {
          this.items = res.data.data;
        }
      });
    }
  },
  created() {
    // console.log(this.address,this.start_date)
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }
};
</script>

<style scoped>
.top_header {
  text-align: center;
  padding: 5px 10px;
  background: #2c787340;
  color: #ffffff !important;
}
.fee {
  position: absolute;
  top: 10px;
  right: 0%;
  text-align: end;
}
.theme--light.v-overflow-btn.theme--light.v-overflow-btn
  > .v-input__control
  > .v-input__slot {
  border-color: #ffffff !important;
}
.text-underline > h1 {
  text-decoration: underline;
}

.header {
  background-color: #383d43;
  color: #fff;
  display: flex;
  border-radius: 100px 100px 0 0;
}

.header > h4 {
  font-weight: 300 !important;
  font-family: "Poppins", sans-serif !important;
}

.header > i {
  margin-left: auto;
}
.header > h4 {
  margin-left: 1%;
  margin-right: auto;
}

.body > .resultNames {
  display: flex;
  align-items: center;
}

.body > .resultNames > .name {
  font-size: 1.5rem;
  margin-right: 1%;
  color: #383d43;
  font-family: "Poppins", sans-serif;
  font-weight: bold !important;
}

.body > .bio {
  font-size: 1.2rem;
  color: #383d43;
  text-transform: lowercase;
  font-family: "Poppins", sans-serif;
}

.body > .rating {
  margin-top: 1%;
}
.body > .rating > .ratingGuest {
  border: 1px solid #71f6aa;
  padding: 0% 2%;
  border-radius: 5px;
  margin-right: 2%;
  font-family: "Poppins", sans-serif;
}

.body > .feedback {
  /* margin: 3% 0; */
  display: flex;
  padding-left: 0;
}

.body > .feedback > .feedbackBtn {
  background-color: #0fef70;
  padding: 1% 4%;
  font-family: "Poppins", sans-serif;
  border-radius: 8px;
  color: #fff;
  margin-right: 1%;
}

.body > .linkProfile {
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  color: #0fef70;
  font-weight: 600;
  cursor: pointer;
  display: inline;
}

.rateInformation {
  margin: auto;
  color: #0fef70;
  font-size: 2rem;
  text-align: center;
  font-weight: bolder;
}

.rateInformation > .information {
  color: #383d43;
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: capitalize;
}
</style>
