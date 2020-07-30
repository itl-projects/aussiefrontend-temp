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
                <v-row align="center" class="py-4">
                  <v-col cols="3" class="py-0" sm="1">
                    <v-badge
                      :content="item.total_messages"
                      :value="item.total_messages"
                      color="orange accent-4"
                      avatar
                      
                      overlap
                    >
                      <v-avatar class="ml-3" color="#989898">
                        <img
                          :src="img_url + item.avatar_path"
                          :lazy-src="img_url + item.avatar_path"
                          :alt="item.first_name"
                        />
                      </v-avatar>
                    </v-badge>
                  </v-col>
                  <v-col
                    cols="3"
                    class="py-0 text-center"
                    sm="2"
                  >{{item.first_name +item.last_name}}</v-col>
                  <v-col cols="6" sm="6" class="last-message-box py-1">
                    <pre style="white-space: pre-line;color:#2c7873">
                  {{ item.last_msg ? item.last_msg : 'no messages' }}
                  </pre>
                  <span class="last-message-time">{{  item.dt | formatDate }}</span>
                  </v-col>
                  <v-col cols="12" class="py-0 px-4 pt-2" sm="3">
                    <v-btn
                      color="info"
                      class="mr-2"
                      text
                      style="text-transform:none"
                      @click="showMessages(i)"
                    >View</v-btn>
                    <!-- <v-btn color="red" text style="text-transform:none">Delete</v-btn> -->
                  </v-col>
                </v-row>

                <v-divider v-if="i < props.items.length-1" class="mt-1"></v-divider>
              </v-col>
            </v-row>
          </v-card>
        </v-container>
      </template>
  <template v-slot:no-data>
    <v-card>
            <v-card-title class="subheading font-weight-bold">All Messages</v-card-title>
             <v-divider></v-divider>
    <v-row justify="center" class="py-10">
      <v-progress-circular v-if="loading" color="#2c7873" indeterminate/>
      <v-label v-else>No Message</v-label>
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
  </v-container>
</template>


<script>
import router from "../../router";
import authStore from "@/store/auth";
import axios from "axios";
import urls from "@/axios/config";
const DateFilter = function(value) {
  return new Date(value.split('.')[0]).toLocaleString().split(',')[1];
}
export default {
  name: "Message",
  filters: {
    formatDate: DateFilter
  },
  data() {
    return {
      img_url: urls.IMGURL,
      itemsPerPageArray: [4, 8, 12],
      page: 1,
      itemsPerPage: 5,
      items: [],
      connection: null,
      loading:true,
    };
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
    showMessages(index) {
      localStorage.setItem("msg_id", this.items[index].id);
      localStorage.setItem("uname", this.items[index].username);
      localStorage.setItem(
        "uname_img",
        urls.IMGURL + this.items[index].avatar_path
      );
      localStorage.setItem(
        "name",
        this.items[index].first_name + " " + this.items[index].last_name
      );
      router.push({ path: "/host/chat-messages/" });
    },
    getMessageList() {
      if (authStore.isSignedIn()) {
        let config = {
          headers: {
            Authorization: "Token " + authStore.userToken()
          }
        };
        axios
          .get(urls.URL + "/chats/chatlist/", config)
          .then(res => {
            this.loading = false;
            console.log(res);
            if (res.data.status) {
              this.items = res.data.data;
            }
          })
          .catch(() => { this.loading = false;})
          .finally(()=>{this.loading = false;});
      } else {
        authStore.logout();
        router.replace("/");
      }
    }
  },
  created: function() {
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
.last-message-box {
  background: #ededed;
  border-radius: 8px;
  padding: 0;
  padding-left: 25px;
}
.last-message-time{
  font-size: 0.8rem;
    float: right;
    margin-right: 8px;
}
</style>