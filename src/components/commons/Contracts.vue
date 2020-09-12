<template>
  <v-container fluid>
    <v-card-title class="font-weight-bold">Pending Contracts</v-card-title>
    <v-row>
      <v-col cols="12" sm="12" class="py-0 px-0">
        <v-data-iterator
          :items="pendings"
          :items-per-page.sync="pendingItemsPerPage"
          :page="pendingPage"
          hide-default-footer
        >
          <template v-slot:default="props">
            <div>
              <v-card
                outlined
                class="mb-2 py-0 cardDesign"
                v-for="(item,i) in props.items"
                :key="i"
              >
                <v-row>
                  <v-col style="display:flex;" class="ma-4">
                    <v-col cols="2" style="margin: auto;">
                      <v-img
                        v-if="userType=='host'"
                        max-width="80"
                        max-height="80"
                        style="margin: auto;border-radius: 100%;"
                        :src="img_url + item.petowner_details.avatar_path"
                      ></v-img>
                      <v-img
                        v-if="userType=='petowner'"
                        max-width="80"
                        max-height="80"
                        style="margin: auto;border-radius: 100%;"
                        :src="img_url + item.host_details.avatar_path"
                      ></v-img>
                    </v-col>

                    <v-col cols="8" class="py-0">
                      <v-row
                        style="align-items: center;height: 100%;justify-content: space-between;"
                      >
                        <v-col cols="12" sm="3" class="pa-0">
                          <h5
                            class="cardHead"
                            v-if="userType=='petowner'"
                          >{{ item.host_details.first_name +" "+item.host_details.last_name}}</h5>
                          <h5
                            class="cardHead"
                            v-if="userType=='host'"
                          >{{ item.petowner_details.first_name +" "+item.petowner_details.last_name}}</h5>
                          <div class="mt-2 cardBody">
                            <!-- <v-icon small>mdi-paw</v-icon> -->
                            <span>Pets:</span>
                            <a href="#">{{ item.petType}}</a>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="3" class="pa-0">
                          <h5
                            class="capitalized cardHead"
                            v-if="item.services == 'pet_hosting' || item.services == 'pet_sitting'"
                          >{{ item.services | formatName}}-{{ countDay(item.startDate,item.endDate) }} Nights</h5>
                          <h5 class="cardHead capitalized" v-else>{{ item.services | formatName}}</h5>
                          <div class="mt-2 cardBody">
                            <v-icon color="#54f499" small>mdi-calendar</v-icon>
                            <span
                              v-if="item.services == 'pet_hosting' || item.services == 'pet_sitting'"
                            >{{ item.startDate | formatDate}} - {{ item.endDate | formatDate}}</span>
                            <span v-else>{{ item.dateTime.split('T')[0] }}</span>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="3" class="pa-0">
                          <h5 class="cardHead">Ref:{{ item.contractID}}</h5>
                          <div class="mt-2 cardBody">
                            <span>Price:</span>
                            <h3 style="display:inline-block">${{item.price}}</h3>
                          </div>
                        </v-col>
                      </v-row>
                    </v-col>

                    <v-col cols="2">
                      <v-col v-if="userType == 'host' && item.contractStatus != 20000">
                        <v-btn
                          color="#0FEF70C6"
                          dark
                          style="width:100%;margin:2px;"
                          @click="updateContract(item.contractID,'accept')"
                        >Accept</v-btn>
                        <v-btn
                          color="#d63031"
                          dark
                          style="width:100%;margin:2px;"
                          @click="updateContract(item.contractID,'reject')"
                        >Decline</v-btn>
                      </v-col>
                      <v-chip
                        v-if="userType == 'host' && item.contractStatus == 20000"
                        small
                        color="red"
                        dark
                      >Contract Rejected by Owner</v-chip>
                      <v-chip
                        v-if="userType == 'petowner' && item.contractStatus != 40000"
                        small
                        color="orange"
                        dark
                      >Waiting for host to accept</v-chip>
                      <v-chip
                        v-if="userType == 'petowner' && item.contractStatus == 40000"
                        small
                        color="red"
                        dark
                      >Contract Rejected by Host</v-chip>
                    </v-col>
                  </v-col>
                </v-row>
              </v-card>
            </div>
          </template>
          <template v-slot:no-data>
            <v-card>
              <v-divider></v-divider>
              <v-row justify="center" class="py-10">
                <v-progress-circular v-if="loading" color="#2c7873" indeterminate />
                <v-label v-else>No Contracts</v-label>
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
    <!---accepted contracts-->
    <v-card-title class="font-weight-bold">Accepted Contracts</v-card-title>
    <v-row>
      <v-col cols="12" sm="12" class="py-0 px-0">
        <v-data-iterator
          :items="items"
          :items-per-page.sync="itemsPerPage"
          :page="page"
          hide-default-footer
        >
          <template v-slot:default="props">
            <div>
              <v-card
                outlined
                v-for="(item) in props.items"
                :key="item.name"
                class="mb-2 py-0 cardDesign"
              >
                <v-row>
                  <v-col style="display:flex;" class="list-item">
                    <v-col cols="2">
                      <v-img
                        v-if="userType=='host'"
                        max-height="80"
                        max-width="80"
                        style="margin: auto;border-radius: 100%;"
                        :src="img_url + item.petowner_details.avatar_path"
                      ></v-img>
                      <v-img
                        v-if="userType=='petowner'"
                        max-height="80"
                        max-width="80"
                        style="margin: auto;border-radius: 100%;"
                        :src="img_url + item.host_details.avatar_path"
                      ></v-img>
                    </v-col>

                    <v-col cols="8" class="pa-0">
                      <v-row
                        style="align-items: center;height: 100%;justify-content: space-between;"
                      >
                        <v-col cols="12" sm="3" class="pa-0">
                          <h5
                            class="cardHead"
                            v-if="userType=='petowner'"
                          >{{ item.host_details.first_name +" "+item.host_details.last_name}}</h5>
                          <h5
                            class="cardHead"
                            v-if="userType=='host'"
                          >{{ item.petowner_details.first_name +" "+item.petowner_details.last_name}}</h5>
                          <div class="mt-2 cardBody">
                            <!-- <v-icon small>mdi-paw</v-icon> -->
                            <span>Pets:</span>
                            <a
                              href="#"
                              style="white-space: pre-wrap;font-size:0.9rem;"
                            >{{ item.petType}}</a>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="3" class="pa-0">
                          <h5
                            class="capitalized cardHead"
                            v-if="item.services == 'pet_hosting' || item.services == 'pet_sitting'"
                          >{{ item.services | formatName}}-{{ countDay(item.startDate,item.endDate) }} Nights</h5>
                          <h5 class="capitalized cardHead" v-else>{{ item.services | formatName}}</h5>
                          <div class="mt-2">
                            <v-icon small>mdi-calendar</v-icon>
                            <span
                              v-if="item.services == 'pet_hosting' || item.services == 'pet_sitting'"
                              class="cardBody"
                            >{{ item.startDate | formatDate}}- {{ item.endDate | formatDate}}</span>
                            <span v-else class="cardBody">{{ item.dateTime.split('T')[0] }}</span>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="3" class="pa-0">
                          <h5 class="cardHead">Ref:{{ item.contractID}}</h5>
                          <div class="mt-2 cardBody">
                            <span>Price:</span>
                            <h3 style="display:inline-block">${{item.price}}</h3>
                          </div>
                        </v-col>
                      </v-row>
                    </v-col>

                    <v-col cols="2" v-if="userType == 'petowner' && item.contractStatus != 40000">
                      <v-btn text color="#2c7873" dark small @click="doChat(item)">Chat</v-btn>
                      <v-btn
                        text
                        color="#2c7873"
                        dark
                        small
                        @click="updateContract(item.contractID,'accept')"
                      >Book</v-btn>
                      <v-btn
                        text
                        color="red"
                        dark
                        small
                        @click="updateContract(item.contractID,'reject')"
                      >Decline</v-btn>
                    </v-col>
                    <v-chip
                      v-if="userType == 'petowner' && item.contractStatus == 40000"
                      small
                      color="red"
                      dark
                    >Contract Rejected by Host</v-chip>

                    <v-col v-if="userType == 'host' && item.contractStatus != 20000">
                      <v-btn block color="#2c7873" text dark small @click="doChat(item)">Chat</v-btn>
                      <v-chip
                        label
                        small
                        color="orange"
                        style="border-radius: 10px 0 0 10px !important"
                        class="ml-3"
                        dark
                      >Waiting for owner to book</v-chip>
                    </v-col>
                    <v-chip
                      v-if="userType == 'host' && item.contractStatus == 20000"
                      small
                      color="red"
                      dark
                    >Contract Rejected by Owner</v-chip>
                  </v-col>
                </v-row>
              </v-card>
            </div>
          </template>
          <template v-slot:no-data>
            <v-card>
              <v-divider></v-divider>
              <v-row justify="center" class="py-10">
                <v-progress-circular v-if="loading" color="#2c7873" indeterminate />
                <v-label v-else>No Accepted Contracts</v-label>
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
    <!---accepted contracts-->
    <v-card-title class="font-weight-bold">Completed Contracts</v-card-title>
    <v-row>
      <v-col cols="12" sm="12" class="py-0 px-0">
        <v-data-iterator
          :items="completed"
          :items-per-page.sync="completedItemsPerPage"
          :page="completedPage"
          hide-default-footer
        >
          <template v-slot:default="props">
            <div>
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
                              v-if="userType=='petowner'"
                            >{{ item.host_details.first_name +" "+item.host_details.last_name}}</h5>
                            <h5
                              v-if="userType=='host'"
                            >{{ item.petowner_details.first_name +" "+item.petowner_details.last_name}}</h5>
                            <div class="mt-2">
                              <!-- <v-icon small>mdi-paw</v-icon> -->
                              <span style="font-size:0.9rem">Pets:</span>
                              <a
                                href="#"
                                style="white-space: pre-wrap;font-size:0.9rem"
                              >{{ item.petType}}</a>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="3" class="py-1">
                            <h5
                              class="capitalized"
                              v-if="item.services == 'pet_hosting' || item.services == 'pet_sitting'"
                            >{{ item.services | formatName}}-{{ countDay(item.startDate,item.endDate) }} Nights</h5>
                            <h5 class="capitalized" v-else>{{ item.services | formatName}}</h5>
                            <div class="mt-2">
                              <v-icon small>mdi-calendar</v-icon>
                              <span
                                v-if="item.services == 'pet_hosting' || item.services == 'pet_sitting'"
                                style="font-size:0.8rem"
                              >{{ item.startDate | formatDate}}- {{ item.endDate | formatDate}}</span>
                              <span
                                v-else
                                style="font-size:0.8rem"
                              >{{ item.dateTime.split('T')[0] }}</span>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="3" class="py-1">
                            Ref:
                            <b>{{ item.contractID}}</b>
                            <div class="mt-2">
                              <span>Price:</span>
                              <h3 style="display:inline-block">${{item.price}}</h3>
                            </div>
                          </v-col>
                        </v-row>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </div>
          </template>
          <template v-slot:no-data>
            <v-card>
              <v-divider></v-divider>
              <v-row justify="center" class="py-10">
                <v-progress-circular v-if="loading" color="#2c7873" indeterminate />
                <v-label v-else>No Contract completed yet.</v-label>
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
import notificationsStore from "@/store/notifications";
const DateFilter = function(value) {
  return value.split("/").join("-");
};
const fixName = function(value) {
  return value.replace("_", " ");
};
export default {
  name: "Contracts",
  filters: {
    formatDate: DateFilter,
    formatName: fixName
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
      connection: null
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
    if (loc.length > 2) {
      if (this.userType == "host" && loc[1] != "host" && loc[2] == "contracts")
        router.replace({ path: "/host/contracts/" });
      else if (
        this.userType == "petowner" &&
        loc[1] != "owner" &&
        loc[2] == "contracts"
      )
        router.replace({ path: "/owner/contracts/" });
    }
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
    this.connection = new WebSocket(
      `wss://aussiepetsbnb.com.au/ws/notifications/`
    );

    this.connection.onmessage = e => {
      let data = JSON.parse(e.data);
      if (data.data) {
        if (data.data.type) {
          if (data.data.type == "contract") {
            this.getConracts();
            this.connection.send(
              JSON.stringify({ type: data.data.type, action: "delete" })
            );
            setTimeout(() => {
              notificationsStore.clearAllNotificationByType(data.data.type);
            }, 100);
          }
        }
      }
    };
    this.connection.onopen = event => {
      console.log(event);
      this.connection.send(
        JSON.stringify({
          type: "start_notification",
          user: authStore.getUsername()
        })
      );
    };
    this.getConracts();
    this.getCompltedContaracts();
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
    getConracts() {
      this.loading = true;
      let url = urls.URL;
      if (this.userType === "petowner")
        url = url + "/petowner/viewcontract/?type=contract";
      else if (this.userType === "host")
        url = url + "/host/viewcontract/?type=contract";
      let config = {
        headers: {
          Authorization: "Token " + authStore.userToken()
        }
      };
      this.pendings = [];
      this.items = [];
      axios
        .get(url, config)
        .then(res => {
          if (res.data.status) {
            res.data.data.pending;
            this.pendings = res.data.data.pending;
            this.items = res.data.data.accepted;
          }
        })
        .catch(err => {
          alert(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getCompltedContaracts() {
      this.loading = true;
      let url = urls.URL;
      if (this.userType === "petowner") url = url + "/petowner/oldcontract/";
      else if (this.userType === "host") url = url + "/host/oldcontract/";
      let config = {
        headers: {
          Authorization: "Token " + authStore.userToken()
        }
      };
      this.pendings = [];
      this.items = [];
      axios
        .get(url, config)
        .then(res => {
          // console.log(res);
          if (res.data.status) {
            res.data.data.pending;
            this.completed = res.data.data;
          }
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false;
        });
    },
    updateContract(cid, status) {
      let config = {
        headers: {
          Authorization: "Token " + authStore.userToken()
        }
      };
      let data = { contractID: cid, action: [status] };
      let url = urls.URL;
      if (this.userType === "petowner") url = url + "/petowner/updatecontract/";
      else if (this.userType === "host") url = url + "/host/updatecontract/";
      axios
        .post(url, data, config)
        .then(res => {
          if (res.data.status) {
            this.getConracts();
          }
        })
        .catch(() => {})
        .finally(() => {});
    },
    doChat(item) {
      localStorage.setItem("msg_id", item.chat_id);
      if (authStore.userType() == "host") {
        localStorage.setItem("uname", item.petowner_details.username);
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
          item.host_details.first_name + " " + item.host_details.last_name
        );
        router.replace({ path: "/owner/chat-messages/" });
      }
    }
  }
};
</script>

<style scoped>
.capitalized {
  text-transform: capitalize;
}

.cardDesign {
  margin: 1.5%;
  border-radius: 10px !important;
  border: 2px solid #d6d6d6;
}

.cardHead {
  font-size: 1.2rem;
  font-weight: 500;
  font-family: "Poppins", sans-serif;
}
.cardBody {
  font-size: 1rem;
  font-weight: 500;
  color: #54f499;
  font-family: "Poppins", sans-serif;
}

@media only screen and (max-width: 600px) {
  .list-item {
    flex-direction: column !important;
  }
}
</style>