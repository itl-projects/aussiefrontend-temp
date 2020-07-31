<template>
  <v-container>
   
        <v-card>
          <v-card-title class="subheading font-weight-bold py-1">
            <v-row align="center">
              <v-col cols="3" class="py-0" sm="1">
                <v-avatar class="ml-3" color="#707070">
                  <img :src="reciever.avatar" :lazy-src="reciever.avatar" alt="ABC" />
                </v-avatar>
              </v-col>
              <v-col cols="6" class="py-0" sm="6">{{ reciever.name }}</v-col>
            </v-row>
          </v-card-title>
          <v-divider></v-divider>
          <!-- <v-content> -->
          <v-container class="py-0" style="position:relative">
            <v-row id="message-box" class="message-box-container py-2">
              <v-col v-for="(item,i) in messages" :key="i" cols="12" class="py-0">
                <v-row class="py-0" :class="item.sender == current_uname ? 'message-end' : ''">
                  <v-col cols="2" sm="1" class="px-sm-0 text-end">
                    <v-avatar class="px-sm-0" width="32" height="32">
                      <img
                        v-if="item.sender == current_uname"
                        :src="avatar"
                        :lazy-src="avatar"
                        alt="ABC"
                      />
                      <img v-else :src="reciever.avatar" :lazy-src="reciever.avatar" alt="ABC" />
                    </v-avatar>
                  </v-col>
                  <div
                    class="px-4 chat-message mb-6"
                    style="max-width:50%;position:relative;width:auto;"
                  >
                    <pre class="message">{{ item.message.trim() }}</pre>
                    <span style="float: right;font-size: 0.9rem;">{{ item.time | formatDate }}</span>
                  </div>
                </v-row>
              </v-col>
            </v-row>
            <v-row align="center" class="message-bottom-container">
              <v-col cols="11" class="py-1">
                <v-textarea
                  @keydown="keyEntered"
                  v-model="message_text"
                  :rows="1"
                  solo
                  dense
                  min-rows="1"
                  clear-icon="mdi-close"
                  clearable
                  placeholder="your message"
                  hide-details
                  auto-grow
                ></v-textarea>
              </v-col>
              <v-col cols="1">
                <v-btn small fab dark color="orange" @click="sendMessage">
                  <v-icon dark>mdi-send</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
          <!-- </v-content> -->
        </v-card>
  
  </v-container>
</template>


<script>
import router from '../../router';
import authStore from "@/store/auth";
import axios from "axios";
import urls from "@/axios/config";
const DateFilter = function(value) {
  return new Date(`12 11 ${value}`).toLocaleString().split(',')[1];
}
export default {
  name: "MessageBox",
  filters: {
    formatDate: DateFilter
  },
  data() {
    return {
      connection: null,
      message_text: "",
      uname: "",
      current_uname: "",
      token: "",
      el_box: null,
      avatar: "",
      reciever: {
        name: "",
        avatar: "",
        uname: ""
      },
      messages: [{
        
      }]
    };
  },
  methods: {
    keyEntered(event) {
      if (event.key == "Enter" && event.shiftKey == false) {
        event.preventDefault();
        this.sendMessage();
      }
    },
    sendMessage() {
      if (this.message_text.length <= 0) {
        return;
      }
      let time = new Date().toISOString().split("T");
      let msg = JSON.stringify({
        type: "message",
        message: this.message_text.toString().trim(),
        sender: this.current_uname,
        receiver: this.uname,
        date: time[0],
        time: time[1].split(".")[0]
      });
     

      this.connection.send(msg);
    },
    fetchAllMessages(){
        if (authStore.isSignedIn()) {
        let config = {
          headers: {
            Authorization: "Token " + authStore.userToken()
          }
        };
        axios
          .get(urls.URL+"/chats/chathistory/?chat_id="+localStorage.getItem('msg_id'), config)
          .then(res => {
            if (res.data.status) {
                res.data.data.forEach(element => {
                    this.messages.push(element);
                });
                if(res.data.pages.next){
                    this.fetchPageMessages(res.data.pages.next);
                }
             setTimeout(()=>{
                this.el_box = document.getElementById("message-box");
                this.el_box.scrollTop = this.el_box.scrollHeight;
             },100);
            }
          })
          .catch(() => {
          });
      }else{
        authStore.logout();
        router.replace('/');
      }
    },
    fetchPageMessages(page){
        if (authStore.isSignedIn()) {
        let config = {
          headers: {
            Authorization: "Token " + authStore.userToken()
          }
        };
        axios
          .get(page, config)
          .then(res => {
            if (res.data.status) {
                res.data.data.forEach(element => {
                    this.messages.push(element);
                });
                if(res.data.pages.next){
                    this.fetchPageMessages(res.data.pages.next);
                }
             setTimeout(()=>{
                this.el_box = document.getElementById("message-box");
                this.el_box.scrollTop = this.el_box.scrollHeight;
             },100);
            }
          })
          .catch(() => {
          });
      }else{
        authStore.logout();
        router.replace('/');
      }
    },
    sendBack(){
        router.back();
    }
  },
  created: function() {
      if(!localStorage.getItem('msg_id')){
          this.sendBack();
      }
    this.uname = localStorage.getItem("uname");
    this.avatar = authStore.getUserData().avatar;
    this.current_uname = authStore.getUserData().username;
    this.reciever.uname = localStorage.getItem("uname");
    this.reciever.name = localStorage.getItem("name");
    this.reciever.avatar = localStorage.getItem("uname_img");
    this.token = authStore.userToken();
    this.fetchAllMessages();

    this.connection = new WebSocket(
      `wss://aussiepetsbnb.com.au/ws/chats/${this.uname}/${this.current_uname}/`
    );

    this.connection.onmessage = (e) => {
      this.messages.push(JSON.parse(e.data).data);
       setTimeout(() => {
        this.message_text = null;
        this.el_box.scrollTop = this.el_box.scrollHeight;
      }, 300);
      
    };
    this.connection.onopen = function(event) {
      console.log(event);
    };
  },
  mounted: function() {
    
  },
  beforeDestroy: function() {
    localStorage.removeItem("name");
    localStorage.removeItem("uname");
    localStorage.removeItem("uname_img");
    localStorage.removeItem("msg_id");
  }
};
</script>

<style scoped>
.message-box-container {
  background: #f1f1f1;
  height: 500px;
  overflow-y: auto;
  /* position: relative; */
}
.chat-message::before {
  content: "";
  width: 20px;
  height: 20px;
  background: #ffffff;
  position: absolute;
  left: 5px;
  top: 15px;
  -webkit-clip-path: polygon(0 0, 100% 50%, 0 100%);
  clip-path: polygon(0 0, 100% 50%, 0 100%);
  transform: rotate(65deg);
}
.message-bottom-container {
  position: absolute;
  width: 100%;
  bottom: -65px;
  background: #dddfde;
}
.message {
  width: fit-content;
  height: 101%;
  background: #fff;
  padding: 10px 20px;
  white-space: pre-wrap;
}
.message-end {
  justify-content: flex-end;
}
</style>