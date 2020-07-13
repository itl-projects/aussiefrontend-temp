<template>
  <div>
    <NavBar />
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-row>
              <v-col cols="12" class="py-0">
                <PetHostingFormDummy />
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
            <v-select v-bind="attrs" v-on="on" label="Budget"  class="ml-2 mt-2"
            no-data-text solo flat
          hide-details
          hide-no-data
          single-line
          ></v-select>
          </template>
          <v-list class="pa-0 ma-0">
            <v-list-item>
                   <v-row style="max-width:300px;background-color:#f4f4f4" class="text-center" justify="center" align="center" >
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
            <v-list-item-action >
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
        <v-col cols="12" sm="8">
          <v-row>
            <v-col cols="8">
              <h2 style="font-weight: normal;">
                Connecting you with
                <span style="color: #2c7873;">{{ count }} Pet Sitters</span>
                near
                <span style="color: #2c7873;">{{ near }}</span>
              </h2>
            </v-col>
            <v-col cols="4">
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
            <v-col cols="12" sm="8">
              <v-data-iterator
                :items="items"
                :items-per-page.sync="itemsPerPage"
                :page="page"
                hide-default-footer
              >
                <template v-slot:default="props">
                  <v-container>
                    <v-card v-for="(item, i) in props.items" :key="item.name" class="mb-4">
                      <v-list two-line subheader :key="i" class="pb-0">
                        <div class="top_header">
                          <v-icon color="#2c7873" class="mr-2">mdi-calendar</v-icon>
                          <v-label color="black">Recently updated calendar</v-label>
                        </div>
                        <v-list-item>
                          <v-list-item-content style="position:relative">
                            <div class="fee">
                              <p class="mb-0" style="font-size: 0.8rem;">from</p>
                              <h1 style="color:#2c7873">$ 11</h1>
                              <p style="font-size: 0.8rem;">/night</p>
                            </div>
                            <v-row>
                              <v-col cols="4" sm="4" class="py-1">
                                <v-row class="text-center">
                                  <v-col cols="12 py-1">
                                    <v-img
                                      style="border-radius:5px;"
                                      contain
                                      eager
                                      src="https://randomuser.me/api/portraits/women/85.jpg"
                                    />
                                  </v-col>
                                  <v-col cols="12 py-0">
                                    <v-btn text color="#2c7873" small class="px-0">
                                      View More
                                      <v-icon color="#2c7873" class="ml-2" small>mdi-eye</v-icon>
                                    </v-btn>
                                  </v-col>
                                </v-row>
                              </v-col>
                              <v-col cols="8" sm="8" class="py-1">
                                <h1 style="font-weight: 500;color:#2c7873">Chris. H.</h1>
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
                    ></v-pagination>
                  </div>
                </template>
              </v-data-iterator>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <Footer />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PetHostingFormDummy from "@/components/TabForms/PetHostingForm_dummy";
export default {
  name: "HostResult",
  components: {
    NavBar,
    Footer,
    PetHostingFormDummy
  },
  data: () => ({
      menu:false,
      ticksLabels: [
         "$0 AUD",
         "$200 AUD"
        ],
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
    budget:[50,100],
    budget_min: 0,
    budget_max:100,
    rating: 3,
    itemsPerPageArray: [4, 8, 12],
    page: 1,
    itemsPerPage: 5,
    count: 999,
    near: "Ultimo NSW",
    items: [
      {
        name: "Frozen Yogurt"
      },
      {
        name: "Ice cream sandwich"
      },
      {
        name: "Eclair"
      },
      {
        name: "Cupcake"
      },
      {
        name: "Gingerbread"
      },
      {
        name: "Jelly bean"
      },
      {
        name: "Lollipop"
      },
      {
        name: "Honeycomb"
      },
      {
        name: "Donut"
      },
      {
        name: "KitKat"
      }
    ]
  }),
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
    closeMenu(){
        this.menu = false;
    }
  }
};
</script>

<style >
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
</style>
