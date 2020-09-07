<template>
  <v-row style="height:100%">
    <v-col cols="4" style="padding: 0px">
      <v-card class="mx-0 pa-0" style="height: 100%;">
        <v-list
          height="100%"
          style="background-color: #2E3134;padding: 10px;color:#fff;"
        >
          <v-list-item-group v-model="itemcheck">
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-avatar>
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                />
              </v-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-col>
    <v-col cols="8" style="padding: 0px">
      <v-card style="height: 100%;padding: 0px 10px;">
        <v-row
          style="background-color: #444D59; padding: 10px;color: #fff;align-items: center;justify-content: space-between;"
        >
          <div class="userActive">
            <v-avatar>
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-avatar>
            <h4>user1</h4>
          </div>
          <v-btn class="ma-2" text icon color="#0FEF70C6">
            <v-icon>mdi-star</v-icon>
          </v-btn>
        </v-row>

        <div class="bottomControls">
          <div class="chattingScreen">
            <div class="other">
              <v-avatar>
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                />
              </v-avatar>
              <div class="otherMsg">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Voluptatem reiciendis repudiandae voluptatibus sapiente, facere
                esse dicta natus doloribus laudantium provident, distinctio
                quibusdam hic voluptas. Quidem eum recusandae modi quaerat?
                Veniam.
              </div>
            </div>
            <div class="me">
              <div class="me-right">
                <div class="meMsg">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Voluptatem reiciendis repudiandae voluptatibus sapiente,
                  facere esse dicta natus doloribus laudantium provident,
                  distinctio quibusdam hic voluptas. Quidem eum recusandae modi
                  quaerat? Veniam.
                </div>
                <v-avatar>
                  <img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="John"
                  />
                </v-avatar>
              </div>
            </div>
          </div>
          <div class="bottomControlsMsg">
            <v-text-field>
              <v-icon slot="prepend">mdi-face</v-icon>
              <v-icon slot="append" color="#0FEF70C6">mdi-arrow-right</v-icon>
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
    formatDate: DateFilter,
  },
  data() {
    return {
      img_url: urls.IMGURL,
      items: [
        { text: "Real-Time", icon: "mdi-clock" },
        { text: "Audience", icon: "mdi-account" },
        { text: "Conversions", icon: "mdi-flag" },
      ],
      connection: null,
      loading: true,
      itemcheck: 1,
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
            Authorization: "Token " + authStore.userToken(),
          },
        };
        axios
          .get(urls.URL + "/chats/chatlist/", config)
          .then((res) => {
            this.loading = false;
            // console.log(res);
            if (res.data.status) {
              this.items = res.data.data;
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
  },
  // created: function() {
  //   this.getMessageList();
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
  // },
};
</script>

<style scoped>
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

.chattingScreen > .other {
  display: flex;
  margin: 3% 0px;
  align-items: flex-end;
}

.chattingScreen > .other > .otherMsg {
  background-color: #0fef70c6;
  width: 50%;
  height: 50%;
  color: #fff;
  padding: 2%;
  font-size: 0.8rem;
}

.chattingScreen > .me {
  display: flex;
  margin: 3% 0px;
  align-items: flex-end;
  text-align: end;
}

.chattingScreen > .me > .me-right {
  display: flex;
  align-items: flex-end;
}
.chattingScreen > .me > .me-right > .meMsg {
  background-color: #eaecf2;
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
</style>
<style>
.container {
  padding: 0px;
}
</style>
