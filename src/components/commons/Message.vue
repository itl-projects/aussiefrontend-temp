<template>
  <v-row style="height:100%">
    <v-col cols="3" style="padding:0px">
      <v-card flat class="mx-0 pa-0" style="height: 100%;border-radius: 0;">
        <v-list height="100%" style="background-color: #2E3134;color:#fff;">
          <v-list-item-group v-model="itemcheck">
            <v-list-item
              @click="ourReload(item)"
              style="margin: 4%;padding: 2%;"
              v-for="(item, i) in items"
              :key="i"
            >
              <v-avatar tile size="65">
                <img :src="item.avatar" alt="John" />
              </v-avatar>
              <v-list-item-content style="margin-left: 5%;" class="chatsStyle">
                <v-list-item-title>{{ item.first_name + " " + item.last_name }}</v-list-item-title>
              </v-list-item-content>
              <span>{{item.newMsg}}</span>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-col>
    <v-col cols="9" style="padding: 0px">
      <v-card style="height: 100%;padding: 0px 10px;">
        <v-row
          style="background-color: #444D59; padding: 10px;color: #fff;align-items: center;justify-content: space-between;"
        >
          <div class="userActive">
            <v-avatar tile>
              <img
                v-show="otherUser.avatar == null ? false : true"
                :src="otherUser.avatar  ? otherUser.avatar : defaultImage"
                :alt="otherUser.username"
              />
            </v-avatar>
            <h4 class="chatsStyle">{{otherUser.first_name + " " + otherUser.last_name}}</h4>
          </div>
          <v-btn class="ma-2" text icon color="#0FEF70C6">
            <v-icon>mdi-star</v-icon>
          </v-btn>
        </v-row>

        <div class="msgScroller">
          <div v-for="chat in messagesHistory" :key="chat.id" class="chattingScreen">
            <div v-if="chat.sender===loginUser" class="me">
              <div class="me-right">
                <div class="meMsg" style="text-align:end;">{{chat.message}}</div>
                <v-avatar>
                  <img :src="loginUserAvatar" alt="John" />
                </v-avatar>
              </div>
              <span style="font-size:0.85rem;margin: auto;color:#B5B5B5;">{{chat.time}}</span>
            </div>
            <v-col v-else style="text-align: left;display: flex;flex-direction: column;">
              <div class="other">
                <v-avatar>
                  <img :src="items[chat.chat - 1].avatar" alt="John" />
                </v-avatar>
                <div class="otherMsg">{{chat.message}}</div>
              </div>
              <span style="font-size:0.85rem;margin: auto;color:#B5B5B5;">{{chat.time}}</span>
            </v-col>
          </div>
        </div>
        <div class="bottomControls">
          <div class="bottomControlsMsg">
            <v-text-field v-model="userMessage" :value="userMessage">
              <v-icon slot="prepend">mdi-face</v-icon>
              <v-icon slot="append" @click="sendMessage" color="#0FEF70C6">mdi-arrow-right</v-icon>
            </v-text-field>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import router from "../../router";
import authStore from "@/store/auth";
import axios from "axios";
import urls from "@/axios/config";
const DateFilter = function(value) {
  return new Date(value.split(".")[0]).toLocaleString().split(",")[1];
};
export default {
  name: "Message",
  filters: {
    formatDate: DateFilter
  },
  // watch:{
  //   messagesHistory: function(new, old){
  //     this.messagesHistory =
  //   }
  // },
  data() {
    return {
      loginUser: authStore.getUserData().username,
      loginUserAvatar: authStore.getAvatar(),
      // otherUsername: null,
      // otherUserAvtar: null,
      otherUser: {
        avatar: "null"
      },
      img_url: urls.IMGURL,
      items: [],
      connection: null,
      defaultImage:
        "https://fthmb.tqn.com/9ijL7Te-9w3r_V8Qcad7CypECsM=/960x0/filters:no_upscale()/CL_Charcoal-56a192413df78cf7726c188b.png",
      userMessage: "",
      loading: true,
      itemcheck: 1,
      messagesHistory: []
    };
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
      if (authStore.userType() == "host")
        router.push({ path: "/host/chat-messages/" });
      else router.push({ path: "/owner/chat-messages/" });
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
            if (res.data.status) {
              const chatlist = res.data.data;
              chatlist.forEach(chat => {
                const chatItem = {
                  avatar: "http://18.223.188.111:70/" + chat.avatar_path,
                  first_name: chat.first_name,
                  last_name: chat.last_name,
                  newMsg: chat.total_messages,
                  uid: chat.user_id,
                  id: chat.id,
                  username: chat.username
                };

                this.items.push(chatItem);
              });
            }
          })
          .catch(() => {
            this.loading = false;
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        authStore.logout();
        router.replace("/");
      }
    },
    keyEntered(event) {
      if (event.key == "Enter" && event.shiftKey == false) {
        event.preventDefault();
        this.sendMessage();
      }
    },
    sendMessage() {
      console.log("message sent!");
      let time = new Date().toISOString().split("T");
      this.connection.send(
        JSON.stringify({
          type: "message",
          message: this.userMessage.toString().trim(),
          sender: this.loginUser,
          receiver: this.otherUsername,
          date: time[0],
          time: time[1].split(".")[0]
        })
      );
      this.userMessage = "";
    },
    ourReload(item) {
      this.otherUser = item;
      console.log("check other user", this.otherUser);
      this.messagesHistory = [];
      //connection
      this.connection = new WebSocket(
        `wss://api.aussiepetsbnb.com.au/ws/chats/${
          authStore.getUserData().username
        }/${this.otherUser.username}/`
      );
      this.connection.onmessage = e => {
        console.log("Message:", e);
        const msgRecieved = JSON.parse(e.data).data;

        this.messagesHistory.push(msgRecieved);
      };
      this.connection.onopen = function(event) {
        console.log("Open Socket", event);
      };
      //connection end
      this.connection.onclose = function(event) {
        console.log("Close Socket", event);
      };
      this.fetchAllMessages(item.id);
    },
    fetchAllMessages(id) {
      if (authStore.isSignedIn()) {
        let config = {
          headers: {
            Authorization: "Token " + authStore.userToken()
          }
        };
        axios
          .get(urls.URL + "/chats/chathistory/?chat_id=" + id, config)
          .then(res => {
            console.log(res);
            if (res.data.status) {
              res.data.data.forEach(element => {
                // element['avatar'] =
                this.messagesHistory.push(element);
              });

              if (res.data.pages.next) {
                this.fetchPageMessages(res.data.pages.next);
              }
              setTimeout(() => {
                this.el_box = document.getElementById("message-box");
                this.el_box.scrollTop = this.el_box.scrollHeight;
              }, 100);
            }
          })
          .catch(() => {});
      } else {
        authStore.logout();
        router.replace("/");
      }
    }
  },
  created: function() {
    this.getMessageList();

    if (authStore.userType() == "host")
      router.replace({ path: "/host/chat-messages/" });
    else router.replace({ path: "/owner/chat-messages/" });

    // this.connection.onmessage = e => {
    //   this.items.forEach(el => {
    //     if (el.username == JSON.parse(e.data).data.sender) {
    //       el.total_messages = el.total_messages + 1;
    //     }
    //   });
    // };
  }
};
</script>

<style scoped>
.msgScroller {
  overflow-y: auto;
  height: 85vh;
}

.msgScroller::-webkit-scrollbar {
  display: none;
}
.last-message-box {
  background: #ededed;
  border-radius: 8px;
  padding: 0;
  padding-left: 25px;
}
.last-message-time {
  font-size: 0.8rem;
  float: right;
  margin-right: 8px;
}

.userActive {
  display: flex;
  align-items: center;
}

.bottomControls {
  bottom: 0;
  position: absolute;
  width: 96%;
}
.bottomControlsMsg {
  box-shadow: 0px -4px 8px #0000000f;
}

.chattingScreen > .col > .other {
  display: flex;
  align-items: flex-end;
}

.chattingScreen {
  overflow-y: auto;
}

.chatsStyle > .col {
  margin: 3% 0px;
}

.chattingScreen > .col > .other > .otherMsg {
  background-color: #0fef70c6;
  width: 50%;
  height: 50%;
  color: #fff;
  padding: 2%;
  font-size: 0.8rem;
  border-radius: 10px;
  margin-left: 1%;
}

.chattingScreen > .me {
  margin: 3% 0px;
  align-items: flex-end;
  text-align: center;
}

.chattingScreen > .me > .me-right {
  display: flex;
  align-items: flex-end;
}
.chattingScreen > .me > .me-right > .meMsg {
  background-color: #eaecf2;
  margin-right: 1%;
  border-radius: 10px;
  width: 50%;
  height: 50%;
  color: #fff;
  padding: 2%;
  font-size: 0.8rem;
  margin-left: auto;
  color: #63697b;
}

.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  color: grey !important;
}

.chatsStyle {
  font-family: "Roboto", sans-serif;
  text-transform: capitalize;
  font-weight: 500;
  margin-left: 20%;
}
</style>
<style>
.container {
  padding: 0px;
}
</style>
