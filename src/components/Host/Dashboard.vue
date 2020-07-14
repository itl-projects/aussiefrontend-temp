<template>
 
    <v-row justify="space-around" class="mt-3 pr-0">
      <v-col :cols="12" :md="3">
        <v-card class="mx-auto" max-width="344" outlined>
          <v-row class="ma-0">
            <v-col cols="12">
              <span style="color:#2c7873;font-size:1.2rem;">Hi, {{name}}</span>
            </v-col>
            <v-col cols="12" class="text-center">
              <v-avatar size="150">
                <v-img :src="avatar"></v-img>
              </v-avatar>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-dialog
              v-model="dialog1"
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition">
              <template v-slot:activator="{ on }">
                <div class="add-pet mx-auto">
                  <v-row justify="space-around">
                    <v-btn v-on="on" text color="#2c7873" small>
                      <span style="color:#2c7873;">Edit Profile</span>
                    </v-btn>
                    <v-btn v-on="on" text color="#2c7873" small>
                      <span style="color:#2c7873;">View Profile</span>
                    </v-btn>
                  </v-row>

                  <v-row  justify="space-around" >
                    <v-col cols="9">
                      <span style="font-size:0.8rem">Profile complition</span>
                      <v-progress-linear color="#2c7873" height="10" :value="profile_complition" striped rounded></v-progress-linear>
                    </v-col>
                    <v-col cols="3" class="mt-4">
                      <v-label style="font-size:0.8rem;">{{profile_complition}}%</v-label>
                    </v-col>
                  </v-row>
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
                
                  <v-row>
                    <v-col :cols="12" :md="12">
                      <Profile />
                    </v-col>
                  </v-row>
                
              </v-card>
            </v-dialog>
          </v-card-actions>
        </v-card>
        <v-card class="mx-auto mt-2">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                class="text-center pa-2"
                style="color:#2c7873;font-weight:bold;font-size:1.2rem;"
              >Personal Details</v-list-item-title>
              <v-divider></v-divider>
            </v-list-item-content>
          </v-list-item>
          <v-card-text class="py-2">
            <h3 class="mt-0 mb-3">Keep Your details updated</h3>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
            sed diam voluptua. ea rebum. Stet clita.
            <br />
            <v-btn text small color="#2c7873" class="mx-0 px-2">Update Profile</v-btn>
          </v-card-text>
        </v-card>
        <v-card class="mx-auto mt-2">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                class="text-center pa-2"
                style="color:#2c7873;font-weight:bold;font-size:1.2rem;"
              >Get Approved As A Sitter</v-list-item-title>
              <v-divider></v-divider>
            </v-list-item-content>
          </v-list-item>
          <v-card-text class="py-2">
            <h3 class="mt-2 mb-3">Submit Your Online Training certificate</h3>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
            sed diam voluptua. ea rebum. Stet clita.
            <br />
            <v-row align="center" class="px-0 mx-0" justify="space-around">
              <v-col cols="6" class="px-0">
                <v-btn
                  text
                  color="#2c7873"
                  small
                  class="mx-0 px-0"
                  style="font-size:0.8rem;letter-spacing: -0.5px;"
                >Go To Online Courses</v-btn>
              </v-col>
              <v-col cols="6">
                <v-chip
                  class="ma-2"
                  close
                  color="teal"
                  text-color="white"
                  close-icon="mdi-checkbox-marked-circle"
                  small
                >Approved</v-chip>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card class="mx-auto mt-2">
          <v-card-text class="py-2">
            <h3 class="mt-2 mb-3">Submit Your Proof of identity</h3>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
            sed diam voluptua. ea rebum. Stet clita
            <br />
            <v-chip
              class="my-2"
              close
              color="teal"
              text-color="white"
              close-icon="mdi-checkbox-marked-circle"
              small
            >Approved</v-chip>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col :cols="12" :md="6">
        <v-row justify="center" class="pb-10">
          <h3 class="mb-15">Bookings</h3>
          <v-col cols="12" class="my-10">
            <v-row justify="center" class="text-center">
              <v-col cols="4">
                <v-label>
                  4
                  <v-icon large>mdi-dog</v-icon>
                </v-label>
              </v-col>
              <v-col cols="4">
                <v-label>
                  0
                  <v-icon large color="warning">mdi-trophy-variant</v-icon>
                </v-label>
              </v-col>
              <v-col cols="4">
                <v-label>
                  4
                  <v-icon large>mdi-dog</v-icon>
                </v-label>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-card class="mx-auto mt-2">
              <v-card-text class="py-2">
                <h3 class="mt-0 mb-3">Add Testimonials</h3>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                sed diam voluptua. ea rebum. Stet clita.
                <br />
                <v-btn text small color="#2c7873" class="mx-0 px-2">Request Testimonials</v-btn>
              </v-card-text>
            </v-card>
            <v-card class="mx-auto mt-2">
              <v-card-text class="py-2">
                <h3 class="mt-0 mb-3">Boost Your Ranking</h3>
                <v-row>
                  <v-col cols="6">
                    <v-btn height="60px" color="#2c7873" style="width:100%;text-transform: capitalize;letter-spacing:0px;" small outlined>Update calendar</v-btn>
                  </v-col>
                  <v-col cols="6">
                   <v-btn height="60px" color="#2c7873" style="width:100%;text-transform: capitalize;letter-spacing:0px;" small outlined>Apply for Badges</v-btn>
                  </v-col>
                  <v-col cols="6">
                    <v-card>
                        <v-btn height="60px" color="#2c7873" style="width:100%;text-transform: capitalize;letter-spacing:0px;" small outlined>Verify Email <br/>& Mobile</v-btn>
                    </v-card>
                  </v-col>
                  <v-col cols="6">
                    <v-card>
                        <v-btn height="60px" color="#2c7873" style="width:100%;text-transform: capitalize;letter-spacing:0px;" small outlined>Upload Photos</v-btn>
                    </v-card>
                  </v-col>
                </v-row>

              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card class="mx-auto mt-2">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    class="text-center pa-2"
                    style="color:#2c7873;font-weight:bold;font-size:1.2rem;"
                  >Improve Your Profile</v-list-item-title>
                  <v-divider></v-divider>
                </v-list-item-content>
              </v-list-item>
              <v-card-text class="py-2">
                <h3 class="mt-0 mb-3">Get A Policy Check</h3>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                sed diam voluptua. ea rebum. Stet clita.
                <br />
                <v-row justify="space-between">
                  <v-col>
                    <v-btn text small color="#2c7873" class="mx-0 px-2">Apply</v-btn>
                  </v-col>
                  <v-col>
                    <v-btn text small color="#2c7873" class="mx-0 px-2">Upload Police Check</v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6"></v-col>
        </v-row>
      </v-col>

      <v-col :cols="12" :md="3">
        <v-card class="mx-auto mt-2">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                class="text-center pa-2"
                style="color:#2c7873;font-weight:bold;font-size:1.2rem;"
              >Balance</v-list-item-title>
              <v-divider></v-divider>
            </v-list-item-content>
          </v-list-item>
          <v-card-text class="py-2">
            <h3 class="mt-0 mb-3">Keep Your details updated</h3>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
            sed diam voluptua. ea rebum. Stet clita.
            <br />
            <v-btn text small color="#2c7873" class="mx-0 px-2">Request payment</v-btn>
          </v-card-text>
        </v-card>
        <v-card class="mx-auto mt-2">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                class="text-center pa-2"
                style="color:#2c7873;font-weight:bold;font-size:1.2rem;"
              >Aussie BnBs credits</v-list-item-title>
              <v-divider></v-divider>
            </v-list-item-content>
          </v-list-item>
          <v-card-text class="py-2">
            <h3 class="mt-0 mb-3">Discounts</h3>
            <h1 class="text-center">$0.00</h1>
            <br />
            <v-btn text small color="#2c7873" class="mx-0 px-2">Redeem Credits</v-btn>
          </v-card-text>
        </v-card>
        <v-card class="mx-auto mt-2">
          <v-card-text class="py-2">
            <h3 class="mt-0 mb-3">Share the love</h3>Invite your friends and when they will signup using your link, they will get $30 Aussie BnBs Credits!
          </v-card-text>
        </v-card>
        <v-card class="mx-auto mt-2">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                class="text-center pa-2"
                style="color:#2c7873;font-weight:bold;font-size:1.2rem;"
              >Settings</v-list-item-title>
              <v-divider></v-divider>
            </v-list-item-content>
          </v-list-item>
          <v-card-text class="py-2">
            <h3 class="mt-0 mb-3">Notifications</h3>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
            sed diam voluptua. ea rebum. Stet clita.
            <br />
            <v-btn text small color="#2c7873" class="mx-0 px-2">Update Settings</v-btn>
          </v-card-text>
        </v-card>
        <v-card class="mx-auto mt-2">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                class="text-center pa-2"
                style="color:#2c7873;font-weight:bold;font-size:1.2rem;"
              >Pets</v-list-item-title>
              <v-divider></v-divider>
            </v-list-item-content>
          </v-list-item>
          <v-card-text class="py-2">
            <h3 class="mt-0 mb-3">Tell Us About Your Pets</h3>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
            sed diam voluptua. ea rebum. Stet clita.
            <br />
            <v-btn text small color="#2c7873" class="mx-0 px-2">Add Pet</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

</template>
<script>
import Profile from "@/components/Host/PersonalDetails";
import authStore from "@/store/auth";
import axios from "axios";
import URL from "@/axios/config";

export default {
  name: "HostDashboard",
  components: { Profile },
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
      avatar:"",
      profile_complition:0
    };
  },
  created: function() {
    this.getProfileCompletedInfo();
    const udata = JSON.parse(authStore.userDetails());
    this.name = udata.first_name + " " + udata.last_name;
    this.avatar = udata.avatar;
    if (authStore.getPetCount()) {
      this.petCount = authStore.getPetCount();
    } else {
      if (authStore.isSignedIn()) {
        let config = {
          headers: {
            Authorization: "Token " + authStore.userToken()
          }
        };
        axios
          .get(URL+"/petowner/viewpets/", config)
          .then(res => {
            if (res.data.message == "#2c7873") {
              this.petCount = res.data.data.length;
              authStore.setPetCount(this.petCount);
            }
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  },
  methods:{
    identityProofApproved(){
      console.log('to check aprroved status of identity')
    },
    getProfileCompletedInfo(){
      let config = {
          headers: {
            Authorization: "Token " + authStore.userToken()
          }
        };
        axios.get(URL+"/host/completion/",config)
        .then(res=>{
          if(res.data.status){
            this.profile_complition = res.data.data.profile_completion;
          }
        }).catch(err=>{console.log(err)});
    },
    openProfilePage(){

    }
  },
  trainingApproved(){
    console.log('to check aprroved status of training')
  }
};
</script>
<style scoped>
</style>