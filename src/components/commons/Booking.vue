<template>
  <v-container fluid>
    
          <v-card-title class="subheading font-weight-bold mb-2 py-0">Ongoing Booking</v-card-title>
    
            <v-row>
              <v-col cols="12" sm="12" class="py-0">
                <v-data-iterator
                  :items="items"
                  :items-per-page.sync="itemsPerPage"
                  :page="page"
                  hide-default-footer
                >
                  <template v-slot:default="props">
                    <v-container>
                      <v-card v-for="(item,i) in props.items" :key="item.name" class="mb-2 py-0">
                        <v-list two-line subheader :key="i" class="pb-0">
                          <v-list-item class="list-item">
                            <v-list-item-avatar color="#707070">
                              <v-img
                                v-if="userType=='host'"
                                :src="img_url + item.petowner_details.avatar_path"
                              ></v-img>
                              <v-img
                                v-if="userType=='petowner'"
                                :src="img_url + item.host_details.avatar_path"
                              ></v-img>
                            </v-list-item-avatar>

                            <v-list-item-content class="py-0">
                              <v-list-item-title>
                                <v-row>
                                  <v-col cols="12" sm="3" class="py-0">
                                    <h5
                                      v-if="userType=='owner'"
                                    >{{ item.host_details.first_name +" "+item.host_details.last_name}}</h5>
                                    <h5
                                      v-if="userType=='host'"
                                    >{{ item.petowner_details.first_name +" "+item.petowner_details.last_name}}</h5>
                                    <div class="mt-2">
                                      <v-icon small>mdi-paw</v-icon>Pets:
                                      <a href="#">{{ item.petType}}</a>
                                    </div>
                                  </v-col>
                                  <v-col cols="12" sm="4" class="py-1">
                                    <h5
                                      v-if="item.services == 'pet_hosting' || item.services == 'pet_sitting'"
                                    >{{ item.services}}-{{ countDay(item.startDate,item.endDate) }} Nights</h5>
                                    <h5 v-else>{{ item.services}}</h5>
                                    <div class="mt-2">
                                      <v-icon small>mdi-calendar</v-icon>
                                      <span
                                        v-if="item.services == 'pet_hosting' || item.services == 'pet_sitting'"
                                        style="font-size:0.8rem"
                                      >{{ item.startDate | formatDate}}- {{ item.endDate | formatDate}}</span>
                                      <span
                                        v-else
                                        style="font-size:0.8rem"
                                      >{{ item.singleDate | formatDate}}</span>
                                    </div>
                                  </v-col>
                                  <v-col cols="12" sm="3" class="py-1">
                                    Ref: 989898
                                    <div class="mt-2">
                                      <h3>${{item.price}}</h3>
                                    </div>
                                  </v-col>
                                </v-row>
                              </v-list-item-title>
                            </v-list-item-content>

                            <v-list-item-action>
                              <v-row v-if="userType == 'owner'">
                                <v-btn text color="#2c7873" dark small @click="doChat(item)">Chat</v-btn>
                                <v-btn v-if="item.contractStatus == 21101" text color="#2c7873" dark small  @click="updateBooking(item.contractID,'complete')">Completed</v-btn>
                              </v-row>
                              <v-row v-if="userType == 'host'">
                                <v-btn color="#2c7873" text dark small @click="doChat(item)">Chat</v-btn>
                                <v-btn v-if="item.contractStatus == 41101" text color="#2c7873" dark small  @click="updateBooking(item.contractID,'complete')">Completed</v-btn>
                              </v-row>
                              
                            </v-list-item-action>
                          </v-list-item>
                        </v-list>
                      </v-card>
                    </v-container>
                  </template>
                  <template v-slot:no-data>
                    <v-card>
                      <v-divider></v-divider>
                      <v-row justify="center" class="py-10">
                        <v-progress-circular v-if="loading" color="#2c7873" indeterminate />
                        <v-label v-else>No Running Bookings</v-label>
                      </v-row>
                    </v-card>
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
                </v-data-iterator>
              </v-col>
            </v-row>
          
     <v-divider class="mt-6" />
     <v-card-title class="font-weight-bold">Scheduled Bookings</v-card-title>
    <v-row>
      <v-col cols="12" sm="12" class="py-0">
        <v-data-iterator
          :items="pendings"
          :items-per-page.sync="pendingItemsPerPage"
          :page="pendingPage"
          hide-default-footer
        >
          <template v-slot:default="props">
            <v-container>
              <v-card v-for="(item,i) in props.items" :key="item.name" class="mb-2 py-0">
                <v-list two-line subheader :key="i" class="pb-0">
                  <v-list-item class="list-item">
                    <v-list-item-avatar color="#707070">
                      <v-img
                        v-if="userType=='host'"
                        :src="img_url + item.petowner_details.avatar_path"
                      ></v-img>
                      <v-img
                        v-if="userType=='petowner'"
                        :src="img_url + item.host_details.avatar_path"
                      ></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content class="py-0">
                      <v-list-item-title>
                        <v-row>
                          <v-col cols="12" sm="3" class="py-0">
                            <h5
                              v-if="userType=='owner'"
                            >{{ item.host_details.first_name +" "+item.host_details.last_name}}</h5>
                            <h5
                              v-if="userType=='host'"
                            >{{ item.petowner_details.first_name +" "+item.petowner_details.last_name}}</h5>
                            <div class="mt-2">
                              <v-icon small>mdi-paw</v-icon>Pets:
                              <a href="#">{{ item.petType}}</a>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="4" class="py-1">
                            <h5
                              v-if="item.services == 'pet_hosting' || item.services == 'pet_sitting'"
                            >{{ item.services}}-{{ countDay(item.startDate,item.endDate) }} Nights</h5>
                            <h5 v-else>{{ item.services}}</h5>
                            <div class="mt-2">
                              <v-icon small>mdi-calendar</v-icon>
                              <span
                                v-if="item.services == 'pet_hosting' || item.services == 'pet_sitting'"
                                style="font-size:0.8rem"
                              >{{ item.startDate | formatDate}}- {{ item.endDate | formatDate}}</span>
                              <span
                                v-else
                                style="font-size:0.8rem"
                              >{{ item.singleDate | formatDate}}</span>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="3" class="py-1">
                            Ref: 989898
                            <div class="mt-2">
                              <h3>${{item.price}}</h3>
                            </div>
                          </v-col>
                        </v-row>
                      </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-row>
                         <v-btn text color="#2c7873" dark small @click="doChat(item)" class="mr-2">Chat</v-btn>
                        <v-btn
                          text
                          color="red"
                          dark
                          small
                          @click="updateBooking(item.contractID,'reject')"
                        >Cancel</v-btn>
                      </v-row>
                     
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-container>
          </template>
          <template v-slot:no-data>
            <v-card>
              <v-divider></v-divider>
              <v-row justify="center" class="py-10">
                <v-progress-circular v-if="loading" color="#2c7873" indeterminate />
                <v-label v-else>No Scheduled Bookings</v-label>
              </v-row>
            </v-card>
          </template>
          <template v-slot:footer>
            <div class="text-center mt-6">
              <v-pagination
                v-model="pendingPage"
                :length="numberOfPendingPages"
                @next="nextPendingPage"
                @previous="formerPendingPage"
                @input="updatePendingItemsPerPage"
                circle
                color="#2c7873"
              ></v-pagination>
            </div>
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>

    <v-divider class="mt-6" />
    <!---Complted Bookings-->
    <v-card-title class="font-weight-bold">Completed Bookings</v-card-title>
    <v-row>
      <v-col cols="12" sm="12" class="py-0">
        <v-data-iterator
          :items="completed"
          :items-per-page.sync="completedItemsPerPage"
          :page="completedPage"
          hide-default-footer
        >
          <template v-slot:default="props">
            <v-container>
              <v-card v-for="(item,i) in props.items" :key="item.name" class="mb-2 py-0">
                <v-list two-line subheader :key="i" class="pb-0">
                  <v-list-item class="list-item">
                    <v-list-item-avatar color="#707070">
                      <v-img
                        v-if="userType=='host'"
                        :src="img_url + item.petowner_details.avatar_path"
                      ></v-img>
                      <v-img
                        v-if="userType=='petowner'"
                        :src="img_url + item.host_details.avatar_path"
                      ></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content class="py-0">
                      <v-list-item-title>
                        <v-row>
                          <v-col cols="12" sm="3" class="py-0">
                            <h5
                              v-if="userType=='owner'"
                            >{{ item.host_details.first_name +" "+item.host_details.last_name}}</h5>
                            <h5
                              v-if="userType=='host'"
                            >{{ item.petowner_details.first_name +" "+item.petowner_details.last_name}}</h5>
                            <div class="mt-2">
                              <v-icon small>mdi-paw</v-icon>Pets:
                              <a href="#">{{ item.petType}}</a>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="4" class="py-1">
                            <h5
                              v-if="item.services == 'pet_hosting' || item.services == 'pet_sitting'"
                            >{{ item.services}}-{{ countDay(item.startDate,item.endDate) }} Nights</h5>
                            <h5 v-else>{{ item.services}}</h5>
                            <div class="mt-2">
                              <v-icon small>mdi-calendar</v-icon>
                              <span
                                v-if="item.services == 'pet_hosting' || item.services == 'pet_sitting'"
                                style="font-size:0.8rem"
                              >{{ item.startDate | formatDate}}- {{ item.endDate | formatDate}}</span>
                              <span
                                v-else
                                style="font-size:0.8rem"
                              >{{ item.singleDate | formatDate}}</span>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="3" class="py-1">
                            Ref: 989898
                            <div class="mt-2">
                              <h3>${{item.price}}</h3>
                            </div>
                          </v-col>
                        </v-row>
                      </v-list-item-title>
                    </v-list-item-content>

                  </v-list-item>
                </v-list>
              </v-card>
            </v-container>
          </template>
          <template v-slot:no-data>
            <v-card>
              <v-divider></v-divider>
              <v-row justify="center" class="py-10">
                <v-progress-circular v-if="loading" color="#2c7873" indeterminate />
                <v-label v-else>No Bookings completed yet.</v-label>
              </v-row>
            </v-card>
          </template>
          <template v-slot:footer>
            <div class="text-center mt-6">
              <v-pagination
                v-model="completedPage"
                :length="numberOfCompletedPages"
                @next="nextCompletedPage"
                @previous="formerCompletedPage"
                @input="updateCompletedItemsPerPage"
                circle
                color="#2c7873"
              ></v-pagination>
            </div>
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import router from "../../router";
import * as axios from "axios";
import urls from "@/axios/config";
import authStore from "@/store/auth";
const DateFilter = function(value) {
  return value.split("/").join("-");
};

export default {
  name: "Booking",
  filters: {
    formatDate: DateFilter
  },
  data() {
    return {
      itemsPerPageArray: [4, 8, 12],
      page: 1,
      pendingPage: 1,
      completedPage: 1,
      pendingItemsPerPage: 5,
      completedItemsPerPage: 5,
      itemsPerPage: 5,
      items: [],
      pendings: [],
      loading: true,
      img_url: urls.IMGURL,
      completed: [],
      userType:""
    };
  },

  computed: {
    numberOfPendingPages() {
      return Math.ceil(this.pendings.length / this.pendingItemsPerPage);
    },
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    numberOfCompletedPages() {
      return Math.ceil(this.completed.length / this.completedItemsPerPage);
    }
  },
  created: function() {
    this.userType = authStore.userType();
    const loc = window.location.pathname.toString().split("/");
     if (this.userType == "host" && (loc[1] !="host" && loc[2] == 'contracts'))
      router.replace({ path: "/host/bookings/" });
    else if(this.userType == "petowner" && (loc[1] !="owner" && loc[2] == 'contracts')) router.replace({ path: "/owner/bookings/" });
    
    this.getBookings();
  },
  methods: {
    countDay(val1, val2) {
      return new Date(val2).getDate() - new Date(val1).getDate();
    },
    nextPage() {
      if (this.page + 1 < this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 > 1) this.page -= 1;
    },
    updateItemsPerPage(input) {
      this.page = input;
    },
    nextPendingPage() {
      if (this.pendingPage + 1 < this.numberOfPendingPages)
        this.pendingPage += 1;
    },
    formerPendingPage() {
      if (this.pendingPage - 1 > 1) this.pendingPage -= 1;
    },
    updatePendingItemsPerPage(input) {
      this.pendingPage = input;
    },
    nextCompletedPage() {
      if (this.completedPage + 1 < this.numberOfCompletedPages)
        this.completedPage += 1;
    },
    formerCompletedPage() {
      if (this.completedPage - 1 > 1) this.completedPage -= 1;
    },
    updateCompletedItemsPerPage(input) {
      this.completedPage = input;
    },
    getBookings() {
      this.loading = true;
      let url = urls.URL;
      if (this.userType === "petowner") url = url + "/petowner/viewcontract";
      else if (this.userType === "host") url = url + "/host/viewcontract";
      let config = {
        headers: {
          Authorization: "Token " + authStore.userToken()
        }
      };
      this.pendings = [];
      this.items = [];
      axios
        .get(url + "?type=booking", config)
        .then(res => {
          // console.log(res);
          if (res.data.status) {
            res.data.data.pending;
            this.pendings = res.data.data.scheduled;
            this.items = res.data.data.ongoing;
          }
        })
        .catch(() => {
          // this.items = [];
        })
        .finally(() => {
          this.loading = false;
        });
    },
    updateBooking(cid, status) {
      let config = {
        headers: {
          Authorization: "Token " + authStore.userToken()
        }
      };
      let data = { contractID: cid, action: [status] };
      axios
        .post(urls.URL + "/host/updatecontract/", data, config)
        .then(res => {
          if (res.data.status) {
            this.getBookings();
          }
        })
        .catch(() => {})
        .finally(() => {});
    },
    doChat(item) {
      localStorage.setItem("msg_id", 0);
      if (authStore.userType() == "host") {
        localStorage.setItem(
          "uname",
          item.petowner_details.username
        );
        localStorage.setItem(
          "uname_img",
          urls.IMGURL + item.petowner_details.avatar_path
        );
        localStorage.setItem(
          "name",
          item.petowner_details.first_name +
            " " +
            item.petowner_details.last_name
        );
        router.replace({ path: "/host/chat-messages" });
      } else {
        localStorage.setItem("uname", item.host_details.username);
        localStorage.setItem(
          "uname_img",
          urls.IMGURL + item.host_details.avatar_path
        );
        localStorage.setItem(
          "name",
          item.host_details.first_name +
            " " +
            item.host_details.last_name
        );
        router.replace({ path: "/owner/chat-messages/" });
      }
    }
  }
};
</script>

<style scoped>
@media only screen and (max-width: 600px) {
  .list-item {
    flex-direction: column !important;
  }
}
</style>