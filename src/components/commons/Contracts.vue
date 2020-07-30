<template>
  <v-container fluid>
    <v-card-title class="font-weight-bold">Pending Contracts</v-card-title>
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
                      <v-img v-if="userType=='host'" :src="img_url + item.petowner_details.avatar_path"></v-img>
                       <v-img v-if="userType=='owner'" :src="img_url + item.host_details.avatar_path"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content class="py-0">
                      <v-list-item-title>
                        <v-row>
                          <v-col cols="12" sm="3" class="py-0">
                            <h5 v-if="userType=='owner'">{{ item.host_details.first_name +" "+item.host_details.last_name}}</h5>
                            <h5 v-if="userType=='host'">{{ item.petowner_details.first_name +" "+item.petowner_details.last_name}}</h5>
                            <div class="mt-2">
                              <v-icon small>mdi-paw</v-icon>Pets:
                              <a href="#">{{ item.petType}}</a>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="3" class="py-1">
                            <h5 v-if="item.services == 'pet_hosting' || item.services == 'pet_sitting'">
                              {{ item.services}}-{{ countDay(item.startDate,item.endDate) }} Nights
                              </h5>
                            <h5 v-else>{{ item.services}}</h5>
                            <div class="mt-2">
                              <v-icon small>mdi-calendar</v-icon>
                              <span v-if="item.services == 'pet_hosting' || item.services == 'pet_sitting'" style="font-size:0.8rem">
                                {{ item.startDate | formatDate}}- {{ item.endDate | formatDate}}
                                </span>
                              <span v-else style="font-size:0.8rem">{{ item.singleDate | formatDate}}</span>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="3" class="py-1">
                            Ref: 989898
                            <div class="mt-2">
                              <h3>${{item.contractStatus}}</h3>
                            </div>
                          </v-col>
                        </v-row>
                      </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action >
                      <v-row v-if="userType == 'host'">
                        <v-btn text color="#2c7873" dark small @click="updateContract(item.contractID,'accept')">Accept</v-btn>
                        <v-btn text color="red" dark small @click="updateContract(item.contractID,'reject')">Decline</v-btn>
                      </v-row>
                      <v-chip v-if="userType == 'owner'" small color="orange" dark>Waiting for host to accept</v-chip>
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
      <v-progress-circular v-if="loading" color="#2c7873" indeterminate/>
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
                      <v-img v-if="userType=='host'" :src="img_url + item.petowner_details.avatar_path"></v-img>
                       <v-img v-if="userType=='owner'" :src="img_url + item.host_details.avatar_path"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content class="py-0">
                      <v-list-item-title>
                        <v-row>
                          <v-col cols="12" sm="3" class="py-0">
                            <h5 v-if="userType=='owner'">{{ item.host_details.first_name +" "+item.host_details.last_name}}</h5>
                            <h5 v-if="userType=='host'">{{ item.petowner_details.first_name +" "+item.petowner_details.last_name}}</h5>
                            <div class="mt-2">
                              <v-icon small>mdi-paw</v-icon>Pets:
                             <a href="#">{{ item.petType}}</a>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="3" class="py-1">
                            <h5 v-if="item.services == 'pet_hosting' || item.services == 'pet_sitting'">
                              {{ item.services}}-{{ countDay(item.startDate,item.endDate) }} Nights
                              </h5>
                            <h5 v-else>{{ item.services}}</h5>
                            <div class="mt-2">
                              <v-icon small>mdi-calendar</v-icon>
                              <span v-if="item.services == 'pet_hosting' || item.services == 'pet_sitting'" style="font-size:0.8rem">
                                {{ item.startDate | formatDate}}- {{ item.endDate | formatDate}}
                                </span>
                              <span v-else style="font-size:0.8rem">{{ item.singleDate | formatDate}}</span>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="3" class="py-1">
                            Ref: 989898
                            <div class="mt-2">
                               <h3>${{item.contractStatus}}</h3>
                            </div>
                          </v-col>
                        </v-row>
                      </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-row v-if="userType == 'owner'" >
                        <v-btn text color="#2c7873" dark small @click="bookContract(item.contractID,'accept')">Book</v-btn>
                        <v-btn text color="red" dark small @click="bookContract(item.contractID,'reject')">Decline</v-btn>
                      </v-row>
                      <v-chip v-if="userType == 'host'" small color="orange" dark>Waiting for owner to book</v-chip>
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
      <v-progress-circular v-if="loading" color="#2c7873" indeterminate/>
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
  </v-container>
</template>

<script>
// import BookingUI from "@/components/commons/BookingUi";
import * as axios from "axios";
import urls from "@/axios/config";
import authStore from "@/store/auth";
const DateFilter = function(value) {
  return value.split('/').join('-');
}

export default {
  name: "Contracts",
  filters: {
    formatDate: DateFilter
  },
  props: ["userType"],
  data() {
    return {
      itemsPerPageArray: [4, 8, 12],
      page: 1,
      pendingPage: 1,
      pendingItemsPerPage: 5,
      itemsPerPage: 5,
      items: [],
      pendings:[],
      loading:true,
      img_url:urls.IMGURL
    };
  },
  computed: {
    numberOfPendingPages() {
      return Math.ceil(this.pendings.length / this.pendingItemsPerPage);
    },
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    }
  },
  created:function(){
    this.getConracts();
  },
  methods: {
    countDay(val1,val2){
      return new Date(val2).getDate()-new Date(val1).getDate();
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
      if (this.pendingPage + 1 < this.numberOfPendingPages) this.pendingPage += 1;
    },
    formerPendingPage() {
      if (this.pendingPage - 1 > 1) this.pendingPage -= 1;
    },
    updatePendingItemsPerPage(input) {
      this.pendingPage = input;
    },
    getConracts(){
      this.loading = true;
      let url = urls.URL;
      if(this.userType === "owner") url = url + "/petowner/viewcontract/";
      else if(this.userType === "host") url = url + "/host/viewcontract/";
      let config = {
          headers: {
            Authorization: "Token " + authStore.userToken()
          }
        };
      this.pendings = [];
      this.items = [];
      axios
          .get(url , config)
          .then(res => {
            console.log(res);
           if(res.data.status){
             res.data.data.forEach(el=>{
               if(el.contractStatus == 110){
                 this.pendings.push(el);
               }else{
                 this.items.push(el);
               }
             })
           }
          })
          .catch(() => {
            this.items = [];
          })
          .finally(() => {
            this.loading = false;
          });
    },
    updateContract(cid,status){
       let config = {
          headers: {
            Authorization: "Token " + authStore.userToken()
          }
        };
      let data = {contractID:cid,action:[status]}
        axios.post(urls.URL+"/host/updatecontract/",data,config)
        .then(res=>{
            if(res.data.status){
              this.getConracts();
            }
        }).catch(()=>{

        }).finally(()=>{
            
        })
    },
    bookContract(cid,status){
        console.error(cid,status);
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