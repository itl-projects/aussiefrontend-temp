<template>
  <div>
    <v-row justify="space-around" class="mt-3 p-3">
      <v-col :cols="12" :md="4">
        <v-card class="mx-auto" max-width="344" outlined>
          <v-row class="ma-0">
            <v-col cols="12">
              <span style="color:#2c7873;font-size:1.2rem;">Hi, {{name}}</span>
            </v-col>
            <v-col cols="12" class="text-center">
              <v-avatar size="150" color="#ebebeb">
                <v-img :src="avatar"></v-img>
              </v-avatar>
            </v-col>
          </v-row>

          <v-card-actions>
            <v-dialog
              v-model="dialog1"
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition"
            >
              <template v-slot:activator="{ on }">
                <div class="add-pet mx-auto">
                  <v-btn v-on="on" text color="#2c7873">
                    <span style="color:#2c7873;">Edit Profile</span>
                  </v-btn>
                </div>
              </template>
              <v-card>
                <v-toolbar dark color="#2c7873">
                  <v-btn icon dark @click="dialog1 = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-toolbar-title>Edit Profile</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>

                <v-divider></v-divider>
                <v-container grid-list-xs>
                  <v-row>
                    <v-col :cols="12" :md="12">
                      <Profile />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-dialog>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col :cols="12" :md="4">
        <v-card max-width="344" class="mx-auto">
          <v-list-item style="box-shadow: 0px 1px 5px #888888;">
            <v-list-item-content>
              <v-list-item-title
                class="headline text-center"
                style="color:#2c7873;font-weight:bold;"
              >Tell Us About Your Pets</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-card-text>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
            sed diam voluptua. ea rebum. Stet clita
          </v-card-text>
        </v-card>
      </v-col>
      <v-col :cols="12" :md="4">
        <v-card max-width="344" class="mx-auto">
          <v-list-item style="box-shadow: 0px 1px 5px #888888;">
            <v-list-item-content>
              <v-list-item-title
                class="headline text-center"
                style="color:#2c7873;font-weight:bold;"
              >Become a Sitter</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-card-text>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
            sed diam voluptua. ea rebum. Stet clita
          </v-card-text>

          <v-card-actions>
            <v-col cols="12" sm="6">
              <v-btn text color="deep-purple accent-4">Apply Now</v-btn>
            </v-col>
            <v-col cols="12" sm="6">
            <v-btn text color="deep-purple accent-4">More Information</v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="space-around" class="mt-5 p-3">
      <v-col :cols="12" :md="10">
        <v-container grid-list-xs class>
          <v-card>
            <v-row justify="space-around">
              <v-col :cols="12" :md="2" class="text-center">
                <v-dialog
                  v-model="dialog"
                  fullscreen
                  hide-overlay
                  transition="dialog-bottom-transition"
                >
                  <template v-slot:activator="{ on }">
                    <div class="add-pet">
                      <v-row justify="center">
                        <v-icon large color="#2c7873" class="mr-2">mdi-paw</v-icon>
                        <h2 style="color:#2c7873">Add Pet</h2>
                      </v-row>
                      <div
                        class="mt-3"
                        style="border-radius: 50%;display: inline-block;padding: 15px 8px;border: 1px solid rgb(190, 190, 190);"
                      >
                        <v-btn class="mx-2" v-on="on" fab dark color="#2c7873" small>
                          <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </template>
                  <v-card>
                    <v-toolbar dark color="#2c7873">
                      <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                      <v-toolbar-title>Pet Form</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-toolbar-items>
                        <v-btn dark text @click="dialog = false">Save</v-btn>
                      </v-toolbar-items>
                    </v-toolbar>

                    <v-divider></v-divider>
                    <v-container grid-list-xs>
                      <v-row>
                        <v-col :cols="12" :md="12">
                          <PetFrom />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                </v-dialog>
              </v-col>
              <v-divider vertical class="my-5 p-1" style="background: #2c7873"></v-divider>
              <v-col :cols="12" :md="3" class="text-center">
                <h1 style="color:#2c7873">Total Pets</h1>
                <p style="font-size:3rem;color:#2c7873;font-weight:800">{{petCount}}</p>
              </v-col>
            </v-row>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import PetFrom from "@/components/Owner/PetAddForm";
import Profile from "@/components/Owner/Profile";
import authStore from "../../store/auth";
import axios from "axios";
import urls from "@/axios/config";
export default {
  name: "Account",
  components: { PetFrom, Profile },
  data() {
    return {
      dialog: false,
      dialog1: false,
      notifications: false,
      sound: true,
      widgets: false,
      ownerName: "",
      name_titile: "",
      petCount: 0,
      img_url: urls.IMGURL,
      avatar:"",
    };
  },
  created: function() {
    const udata = authStore.getUserData();
    this.name = udata.first_name + " " + udata.last_name;
    this.name_title = udata.first_name.charAt(0) + udata.last_name.charAt(0);
    this.avatar = udata.avatar;
    if (authStore.isSignedIn()) {
      let config = {
        headers: {
          Authorization: "Token " + authStore.userToken()
        }
      };
      axios
        .get(urls.URL + "/petowner/viewpets/", config)
        .then(res => {
          if (res.data.status) {
            this.petCount = res.data.total_pets;
            authStore.setPetCount(this.petCount);
          }else{
            this.petCount = 0;
          }
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      console.log("not signedin");
    }
  }
};
</script>
<style scoped>
</style>