<template>
  <v-app>
    <HostSidebar
      v-bind:menu.sync="menu"
      v-bind:miniVariant.sync="miniVariant"
      v-bind:clipped.sync="clipped"
      v-bind:fixed.sync="fixed"
      @menuchanged="menuChanged"
    />

    <v-content>
      <div>
        <v-row>
          <v-col cols="10" style="padding-left: 3%;">
            <v-autocomplete
              class="mx-4"
              hide-no-data
              hide-details
              label="Search"
              solo
              flat
              light
              background-color="#F1F1F1"
              append-icon="mdi-magnify"
              style="align-self: center;width: 40%;border-radius:15px:margin-left:10% !important"
              dense
            />
          </v-col>
          <v-col cols="2">
            <v-col style="display:flex; justify-content: space-evenly;">
              <v-btn icon>
                <v-icon>mdi-bell</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-email</v-icon>
              </v-btn>
            </v-col>
          </v-col>
        </v-row>
      </div>
      <v-divider></v-divider>
      <!-- <v-container class="fill-height"> -->
      <!-- <v-row
          justify="center"
          align="center" >
      <v-col>-->
      <router-view></router-view>
      <!-- </v-col>
      </v-row>-->
      <!-- </v-container> -->
    </v-content>
  </v-app>
</template>

<script>
import router from "@/router";
import authStore from "@/store/auth";
import notificationsStore from "@/store/notifications";
import HostSidebar from "@/components/Host/Sidebar";
// import HostSidebar2 from "@/components/Host/Sidebar2";

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
          else if (
            data.data.type == "contract" ||
            data.data.type == "booking"
          ) {
            setTimeout(() => {
              this.other_notification =
                notificationsStore.getOtherNotifications;
            }, 300);
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
      this.connection.send(JSON.stringify({ type: type, action: "delete" }));
      this.other_notification = notificationsStore.getOtherNotifications;
      if (type == "contract") router.push("/host/contracts");
      else if (type == "booking") router.push("/host/bookings");
    },
    showMessage(index) {
      notificationsStore.deleteMessage(
        this.message_notification.items[index].message_id
      );

      if (this.message_notification.items[index].message_id) {
        this.connection.send(
          JSON.stringify({
            message_id: this.message_notification.items[index].message_id,
            action: "delete"
          })
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
        JSON.stringify({ type: "contract", action: "delete" })
      );
      this.connection.send(
        JSON.stringify({ type: "booking", action: "delete" })
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

<style scoped>
.theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  background: red !important;
}
</style>
