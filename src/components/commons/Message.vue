<template>
  <v-container fluid>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      hide-default-footer
    >
      <template v-slot:default="props">
         <v-container>
        <v-card>
          <v-card-title class="subheading font-weight-bold">All Messages</v-card-title>
          <v-divider></v-divider>
         
          <v-row>
            <v-col v-for="(item,i) in props.items" :key="item.name" cols="12" class="py-0">
              <v-row  align="center" class="py-4">
                <v-col cols="3" class="py-0" sm="1" >
                  <v-badge
                  :content="item.total_messages"
       :value="item.total_messages"
        color="orange accent-4"
        avatar
        bordered
        overlap
      >
                  <v-avatar class="ml-3" color="#707070" >
                    <img :src="img_url + item.avatar_path" :lazy-src="img_url + item.avatar_path" :alt="item.first_name" />
                  </v-avatar>
                  </v-badge>
                </v-col>
                <v-col cols="3" class="py-0 text-center" sm="2">{{item.first_name +item.last_name}}</v-col>
                <v-col cols="6"  sm="6">
                  <pre style="white-space: pre-line;">
                  {{ item.last_msg ? item.last_msg : 'no messages' }}
                  </pre>
                  </v-col>
                <v-col cols="12" class="py-0 px-4 pt-2" sm="3">
                  <v-btn color="info" class="mr-2" text style="text-transform:none" @click="showMessages(i)">View</v-btn>
                  <!-- <v-btn color="red" text style="text-transform:none">Delete</v-btn> -->
                </v-col>
              </v-row>

              <v-divider v-if="i < props.items.length-1" class="mt-1"></v-divider>
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
          ></v-pagination>
        </div>
      </template>
    </v-data-iterator>
  </v-container>
</template>


<script>
import router from '../../router';
import authStore from "@/store/auth";
import axios from "axios";
import urls from "@/axios/config";

export default {
  name: "Message",
  data() {
    return {
      img_url:urls.IMGURL,
      itemsPerPageArray: [4, 8, 12],
      page: 1,
      itemsPerPage: 5,
      items: [],
      connection:null
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    
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
    showMessages(index){
      localStorage.setItem("msg_id",this.items[index].id);
      localStorage.setItem("uname",this.items[index].username);
      localStorage.setItem("uname_img",urls.IMGURL + this.items[index].avatar_path);
      localStorage.setItem("name",this.items[index].first_name+" "+this.items[index].last_name);
      router.push({path:'/host/chat-messages/'});
    },
    getMessageList(){
        if (authStore.isSignedIn()) {
        let config = {
          headers: {
            Authorization: "Token " + authStore.userToken()
          }
        };
        axios
          .get(urls.URL+"/chats/chatlist/", config)
          .then(res => {
            if (res.data.status) {
             this.items = res.data.data;
            }
          })
          .catch(() => {
          });
      }else{
        authStore.logout();
        router.replace('/');
      }
    }
  },
  created:  function() {
   this.getMessageList();
  //  this.connection = new WebSocket(
  //     `ws://95.217.133.127:8001/chats/${authStore.getUserData().username}`
  //   );

  //   this.connection.onmessage = (e) => {
  //     this.items.forEach(el=>{
  //       if(el.username == JSON.parse(e.data).data.sender){
  //         el.total_messages = el.total_messages + 1;
  //       }
  //     })      
  //   };
  }
};
</script>

<style scoped>
</style>