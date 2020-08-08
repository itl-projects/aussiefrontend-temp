<template>
  <v-app>
    <HostSidebar
      v-bind:menu.sync="menu"
      v-bind:miniVariant.sync="miniVariant"
      v-bind:clipped.sync="clipped"
      v-bind:fixed.sync="fixed"
      @menuchanged="menuChanged"
    />
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="menu = !menu" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>

      <v-toolbar-title>Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-row align="center" justify="end" class="mr-4">
        <v-col cols="4" sm="1">
          <v-menu offset-y max-height="300px">
            <template v-slot:activator="{ on, attrs }">
              <v-badge
                overlap
                color="orange"
                :content="other_notification.count"
                :value="other_notification.count"
              >
                <v-icon v-bind="attrs" v-on="on">mdi-bell</v-icon>
              </v-badge>
            </template>
            <v-list v-if="other_notification.items.length > 0" class="py-0">
              <v-list-item
                v-for="(item,i) in other_notification.items"
                :key="'message-'+i"
                @click="showNotification(i)"
                style="border-bottom: 1px solid #dfdfdf;"
              >
                <v-list-item-title>
                  <v-row>
                    <v-col class="py-0" cols="2">
                      <v-icon v-if="item.type == 'contract'">mdi-file-document-multiple</v-icon>
                      <v-icon v-else class="mr-2">mdi-sticker-check</v-icon>
                    </v-col>
                    <v-col class="py-0" cols="10">
                      <v-row>
                        <v-col class="py-0" cols="12">
                          <span style="font-size:0.8rem">{{ item.message }}</span>
                        </v-col>
                        <v-col class="py-0" cols="12">
                         
                          <span
                            style="font-size:0.6rem;color: #2c7873;float: right;margin-top: 2px;"
                          >{{ item.date +" "+item.time }}</span>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-action>
                  <v-list-item-action-text>
                    <v-btn small text @click="clearAllNotifications">clear all</v-btn>
                  </v-list-item-action-text>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>

        <v-col cols="4" sm="1">
          <v-menu offset-y max-height="300px">
            <template v-slot:activator="{ on, attrs }">
              <v-badge
                overlap
                color="primary"
                :content="message_notification.count"
                :value="message_notification.count"
              >
                <v-icon v-bind="attrs" v-on="on">mdi-email</v-icon>
              </v-badge>
            </template>
            <v-list v-if="message_notification.items.length > 0" class="py-0">
              <v-list-item
                v-for="(item,i) in message_notification.items"
                :key="'message-'+i"
                @click="showMessage(i)"
                style="border-bottom: 1px solid #dfdfdf;"
              >
                <v-list-item-title>
                  <v-row align="center">
                    <v-col class="py-0" cols="1">
                      <v-icon class="mr-2">mdi-email</v-icon>
                    </v-col>
                    <v-col class="py-0" cols="11">
                      <v-row>
                        <v-col class="py-0" cols="12">
                          <span style="font-size:0.8rem">{{ item.message }}</span>
                        </v-col>
                        <v-col class="py-0" cols="12">
                           <span
                            style="font-size:0.7rem;color: #2c7873;float: left;margin-top: 2px;"
                          >{{ item.count }} new messages</span>
                          <span
                            style="font-size:0.7rem;color: #2c7873;float: right;margin-top: 2px;"
                          >{{ item.date +" "+item.time }}</span>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-action>
                  <v-list-item-action-text>
                    <v-btn small text @click="clearAllMessages">clear all</v-btn>
                  </v-list-item-action-text>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>

        <v-col cols="4" sm="1">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-avatar size="40" v-bind="attrs" v-on="on">
                <v-img :src.sync="avatar"></v-img>
              </v-avatar>
            </template>
            <v-list>
              <v-list-item to="/">
                <v-list-item-icon class="mx-2">
                  <v-icon color="#2c7873" class="mr-2">mdi-account-edit-outline</v-icon>home
                </v-list-item-icon>
                <!-- <v-list-item-title>Home</v-list-item-title> -->
              </v-list-item>
              <v-list-item @click="logout">
                <v-list-item-icon class="mx-2">
                  <v-icon color="#2c7873">mdi-power-standby</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-content>
      <div>
        <v-breadcrumbs :items="items"></v-breadcrumbs>
      </div>
      <v-divider></v-divider>
      <v-container fluid>
        <!-- <v-row
          justify="center"
          align="center" >
        <v-col>-->
        <router-view></router-view>
        <!-- </v-col>
        </v-row>-->
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import router from "@/router";
import authStore from "@/store/auth";
import notificationsStore from "@/store/notifications";
import HostSidebar from "@/components/Host/Sidebar";

export default {
  name: "HostAccount",
  components: {
    HostSidebar
  },
  data: () => ({
    miniVariant: false,
    clipped: false,
    fixed: false,
    email_not: true,
    name: "",
    avatar: "",
    menu: true,
    items: [
      {
        text: "Dashboard",
        disabled: false,
        href: "/host"
      },
      {
        text: "Message",
        disabled: true,
        href: "breadcrumbs_link_1"
      }
    ],
    connection: null,
    other_notification: notificationsStore.getOtherNotifications,
    message_notification: notificationsStore.getMessages
  }),
  beforeUpdate: function() {
    if (window.location.pathname.toString().split("/").length == 2) {
      this.items[1].disabled = true;
      this.items[1].text = "";
    } else {
      if (this.items.length == 2) {
        this.items.pop();
      }
      this.items.push({
        text: window.location.pathname.toString().split("/")[2],
        disabled: true,
        href: window.location.pathname
      });
    }
  },
  created: function() {
    let s = window.location.pathname.toString().split("/");
    this.items[1].text = s[s.length - 1];
    this.items[1].href = window.location.pathname.toString();
    const udata = authStore.getUserData();
    this.name = udata.first_name + " " + udata.last_name;
    this.avatar = udata.avatar;
    this.email = udata.email;
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
    this.connection = new WebSocket(
      `wss://aussiepetsbnb.com.au/ws/notifications/`
    );

    this.connection.onmessage = e => {
      let data = JSON.parse(e.data);
      console.log(e);
      if (data.data) {
        if (data.data.type) {
          notificationsStore.saveMessage(data.data, data.data.type);
          if (data.data.type == "message")
            this.message_notification = notificationsStore.getMessages;
          else if (data.data.type == "contract" || data.data.type == "booking"){
            setTimeout(()=>{
              this.other_notification = notificationsStore.getOtherNotifications;
            },300);
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
  },
  methods: {
    toggleMenu: function() {
      this.menu = !this.menu;
    },
    logout: function() {
      authStore.logout();
      if (window.location.pathname === "/") {
        window.location.reload();
      } else router.replace("/");
    },
    isLoggedIn: function() {
      if (!authStore.isSignedIn()) {
        router.replace("/");
      } else {
        if (authStore.userType() == "petowner") {
          router.replace("/petowner");
        }
      }
    },
    menuChanged(val) {
      this.menu = val;
    },
    showNotification(index) {
      const type = this.other_notification.items[index].type;
      notificationsStore.clearAllNotificationByType(type);
      this.connection.send(
        JSON.stringify({type: type, action: "delete"})
      );
      this.other_notification = notificationsStore.getOtherNotifications;
      if (type == "contract") router.push("/host/contracts");
      else if (type == "booking") router.push("/host/bookings");
    },
    showMessage(index) {
      notificationsStore.deleteMessage(
        this.message_notification.items[index].message_id
      );
       
      if(this.message_notification.items[index].message_id){
        this.connection.send(
        JSON.stringify({message_id: this.message_notification.items[index].message_id, action: "delete"})
      );
      }
      this.message_notification = notificationsStore.getMessages;
      router.push("/host/messages");
    },
    clearAllMessages() {
      notificationsStore.clearAllNotifications();
      this.message_notification = notificationsStore.getMessages;
    },
    clearAllNotifications() {
      notificationsStore.clearAllOtherNotifications();
      this.other_notification = notificationsStore.getOtherNotifications;
      this.connection.send(
        JSON.stringify({type: "contract", action: "delete"})
      );
      this.connection.send(
        JSON.stringify({type: "booking", action: "delete"})
      );
      
    }
  },
  beforeRouteEnter(to, from, next) {
    if (!authStore.isSignedIn()) {
      router.replace("/");
      next();
    } else {
      next();
    }
  }
};
</script>

<style scoped></style>
