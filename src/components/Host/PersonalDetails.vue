<template>
  <v-container grid-list-xs class="mt-10 p-5" style="border:1px soild">
    <v-row justify="space-around">
      <v-col cols="3">
        <v-card class="md-3 pa-6">
          <picture-input
            ref="pictureInput"
            @change="onChanged"
            @remove="onRemoved"
            :width="200"
            :removable="true"
            removeButtonClass="py-2 text-small v-btn v-btn--contained px-2 red theme--dark"
            :height="200"
            :prefill.sync="avatar"
            accept="image/jpeg, image/png, image/gif"
            buttonClass="py-2 text-small v-btn v-btn--contained px-2 theme--dark orange"
            :customStrings="{
              upload: '<h1>Profile Image</h1>',
              drag: 'Drag and drop your image here',
            }"
          ></picture-input>
          <div class="profilePhotoBtn">
            <v-btn class="ma-1" @click="onChanged" width="60%" outlined color="#0FEF70C6">Change</v-btn>
            <v-btn class="ma-1" @click="onRemoved" width="60%" color="#0FEF70C6">Remove</v-btn>
          </div>
        </v-card>
      </v-col>
      <v-col :cols="12" :md="8" class="mt-5">
        <h5 class="aboutHeadings">Personal Details</h5>
        <v-row>
          <v-col>
            <v-text-field
              v-model="firstName"
              label="First Name"
              value="test"
              hide-details="auto"
              required
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="lastName"
              label="Last Name"
              hide-details="auto"
              required
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="space-around" align="center">
          <v-col cols="6" class="px-0">
            <v-card class="cardDesign" outline>
              <v-row class="container2">
                <v-col style="display:flex; flex-direction: column;justify-content: space-between;">
                  <div class="header">
                    <div class="header">Phone Number</div>
                    <div class="headerHead">+91 8011354690</div>
                  </div>

                  <div class="contentHeader">
                    For your safety and secrurity, your phone number will not be
                    shared
                  </div>
                  <div class="buttonHeader">
                    <v-btn
                      v-show="false"
                      class="ma-1"
                      width="40%"
                      height="100%"
                      outlined
                      :loading="verifyingPhone"
                      @click="verifyPhone"
                      color="#0FEF70C6"
                    >Request</v-btn>
                    <v-chip
                      v-show="!phoneverified"
                      class="ma-2"
                      style="padding:2% 8%"
                      color="#0FEF70C6"
                      text-color="white"
                    >
                      Verified
                      <v-avatar right>
                        <v-icon>mdi-checkbox-marked-circle</v-icon>
                      </v-avatar>
                    </v-chip>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <v-col cols="6" class="px-0">
            <v-card class="cardDesign" outline>
              <v-row class="container2">
                <v-col style="display:flex; flex-direction: column;justify-content: space-between;">
                  <div class="header">
                    <div class="header">Email</div>
                    <div class="headerHead">something@gmail.com</div>
                  </div>

                  <div class="contentHeader">
                    For your safety and secrurity, your phone number will not be
                    shared
                  </div>
                  <div class="buttonHeader">
                    <v-btn
                      v-show="false"
                      class="ma-1"
                      width="40%"
                      height="100%"
                      outlined
                      :loading="verifyingEmail"
                      @click="verifyemail"
                      color="#0FEF70C6"
                    >Request</v-btn>
                    <v-chip
                      v-show="!phoneverified"
                      class="ma-2"
                      style="padding:2% 8%"
                      color="#0FEF70C6"
                      text-color="white"
                    >
                      Verified
                      <v-avatar right>
                        <v-icon>mdi-checkbox-marked-circle</v-icon>
                      </v-avatar>
                    </v-chip>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="space-around">
      <v-col :md="3"></v-col>
      <v-col :cols="12" :md="8">
        <!-- <h5>About You</h5> -->
        <v-row class="mt-5" justify="space-around">
          <v-col :md="6">
            <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="dateFormatted"
                  label="Birthdate"
                  @blur="date = parseDate(dateFormatted)"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col :cols="12" :md="6">
            <label for="Gender">Gender</label>
            <v-radio-group v-model="gender" row style="margin-top:0px">
              <v-radio color="#0FEF70C6" label="Male" value="Male"></v-radio>
              <v-radio color="#0FEF70C6" label="Female" value="Female"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <h5 class="aboutHeadings">Location Details</h5>
        <v-row>
          <v-col :md="6" :cols="12">
            <!-- <v-text-field label="Place name"></v-text-field> -->
            <v-autocomplete
              v-model="city"
              :loading="place_loading"
              :items="places"
              :search-input.sync="searchPlace"
              cache-items
              hide-no-data
              outlined
              hide-details
              @change="placeSelected"
              label="Place Name"
            ></v-autocomplete>
          </v-col>
          <v-col :md="6" :cols="12">
            <v-text-field v-model="zipcode" label="Post code" outlined readonly></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col :md="6" :cols="12">
            <v-text-field v-model="state" label="State name" outlined readonly></v-text-field>
          </v-col>
          <v-col :md="6" :cols="12">
            <v-text-field v-model="state_code" label="State code" outlined readonly></v-text-field>
          </v-col>
        </v-row>
        <h5 class="aboutHeadings">Tell others about you</h5>
        <v-row>
          <v-col cols="12">
            <v-textarea solo :counter="true" v-model="hostbio" label="Desribe yourself"></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="3">
            <v-btn
              type="submit"
              color="#0FEF70C6"
              class="updateProfile"
              style="color: #fff;"
              @click="updateProfile"
              :loading="updateLoading"
            >Update Profile</v-btn>
          </v-col>
          <v-col cols="12" sm="9">
            <v-alert
              v-if="alert.show"
              dense
              border="left"
              :type="alert.type"
              dismissible
            >{{ alert.message }}</v-alert>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import authStore from "../../store/auth";
import PictureInput from "vue-picture-input";
import axios from "axios";
import urls from "@/axios/config";
export default {
  name: "PersonalDetails",
  components: { PictureInput },
  data: function() {
    return {
      alert: { show: false, type: null, message: "" },
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: "",
      menu1: false,
      firstName: "",
      lastName: "",
      contact: "",
      email: "",
      gender: "",
      image: null,
      email_verified: false,
      phone_verified: true,
      hostbio: "",
      city: "",
      state: "",
      zipcode: "",
      state_code: "",
      billing_address: "",
      country: "",
      verifyingEmail: false,
      verifyingPhone: true,
      places: [],
      states: [],
      place_loading: false,
      searchPlace: null,
      latitude: 0,
      longitude: 0,
      updateLoading: false,
      avatar: ""
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    }
  },
  watch: {
    date(val) {
      this.dateFormatted = val;
    },
    searchPlace(val) {
      val && val !== this.city && this.queryPlaces(val);
    }
  },
  methods: {
    queryPlaces(v) {
      this.place_loading = true;
      axios
        .get(urls.URL + "/locations/?relative=true&place_name=" + v, {})
        .then(res => {
          this.places = [];
          this.place_loading = false;
          if (res.data.status) {
            res.data.data.forEach(el => {
              this.places.push(el.place_name);
            });
          }
        });
    },
    placeSelected() {
      axios
        .get(urls.URL + "/locations/?relative=true&place_name=" + this.city, {})
        .then(res => {
          this.places = [];
          this.place_loading = false;
          if (res.data.status) {
            this.latitude = res.data.data[0].latitude;
            this.longitude = res.data.data[0].longitude;
            this.zipcode = res.data.data[0].postcode;
            this.state_code = res.data.data[0].state_code;
            this.state = res.data.data[0].state_name;
          }
        });
    },
    onChanged() {
      if (this.$refs.pictureInput.file) {
        this.image = this.$refs.pictureInput.file;
      } else {
        this.showAlert("red", "Old browser. No support for Filereader API");
      }
    },
    onRemoved() {
      this.image = null;
    },
    attemptUpload() {},
    updateProfile: function() {
      this.updateLoading = true;
      let config = {
        headers: {
          Authorization: "Token " + authStore.userToken()
        }
      };
      const formData = new FormData();
      if (this.image != null)
        formData.append("avatar", this.image, this.image.name);

      formData.append("username", authStore.getUsername());
      formData.append("first_name", this.firstName);
      formData.append("last_name", this.lastName);
      formData.append("gender", this.gender);
      if (this.hostbio) formData.append("hostbio", this.hostbio);
      if (this.city) formData.append("city", this.city);
      if (this.city) formData.append("state", this.state);
      if (this.zipcode) formData.append("zipcode", this.zipcode);
      if (this.dateFormatted) formData.append("dob", this.dateFormatted);
      if (this.state_code) formData.append("state_code", this.state_code);
      // formData.append('latitude',this.latitude);
      // formData.append('longitude', this.longitude);
      axios
        .post(urls.URL + "/host/update/", formData, config, {})
        .then(res => {
          this.updateLoading = false;
          if (res.data.status) {
            authStore.fecthUserData();
            this.showAlert("success", "profile updated successfully");
          } else {
            this.showAlert("error", "Failed to update profile details");
          }
        })
        .catch(() => {
          this.updateLoading = false;
          this.showAlert("error", "Failed to update profile details");
        });
    },
    parseDate(date) {
      if (!date) return null;
      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    verifyEmail() {
      this.verifyingEmail = true;
      let config = {
        headers: {
          Authorization: "Token " + authStore.userToken()
        }
      };

      axios
        .posturls(urls.URL + "/verifyemail/", { email: this.email }, config)
        .then(res => {
          if (res.data.status) {
            this.showAlert(
              "success",
              "Email verification link has been sent to your registered email address."
            );
          } else {
            this.showAlert("red", "Failed to send email verification link");
          }
        })
        .catch(() => {
          this.showAlert("red", "Failed to send email verification link");
        });
    },
    verifyPhone() {
      this.verifyingPhone = true;
    },
    showAlert(type, message) {
      this.alert.show = true;
      this.alert.type = type;
      this.alert.message = message;
      setTimeout(() => {
        this.alert.show = false;
      }, 5000);
    }
  },
  created: function() {
    const data = authStore.getUserData();
    this.firstName = data.first_name;
    this.lastName = data.last_name;
    this.email = data.email;
    this.contact = data.phone;
    this.email_verified = data.emailverified == 1 ? true : false;
    this.phone_verified = data.phoneverified == 1 ? true : false;
    this.hostbio = data.bio.startsWith("cdata") ? "" : data.bio;
    this.city = data.city;
    if (this.city != null && this.city != "") this.places.push(data.city);
    this.state = data.state;
    this.zipcode = data.zipcode;
    this.state_code = data.state_code;
    this.billing_address = data.billing_address;
    this.country = data.country;
    this.dateFormatted = data.dob;
    this.avatar = data.avatar.includes("null") ? "" : data.avatar;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    if (authStore.isMale()) {
      this.gender = "Male";
    } else {
      this.gender = "Female";
    }
    this.dateFormatted = data.dob
      ? new Date(data.dob).toISOString().substr(0, 10)
      : new Date().toISOString().substr(0, 10);
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }
};
</script>
<style scoped>
.text-small {
  font-size: 0.6rem !important;
}

.profilePhotoBtn {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header > .headerHead {
  font-family: "Roboto", sans-serif;
  color: #444d59;
  text-transform: uppercase;
  font-size: 0.8rem;
}

.header > .header {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 1.2rem;
  color: #444d59;
  text-transform: capitalize;
}
.container2 > .col > .contentHeader {
  /* width: 40%; */
  margin-top: 5%;
  font-size: 0.8rem;
  color: #000000;
}

.buttonHeader {
  text-align: center;
}

.cardDesign {
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #d6d6d6;
  border-radius: 20px !important;
  opacity: 1;
  margin: 20px;
}

.container2 {
  padding: 20px;
}
.container2 > .profile2 {
  display: flex;
  justify-content: space-between;
  margin: 0px 0px;
}

.aboutHeadings {
  font-size: 1.5rem;
  font-family: "Roboto", sans-serif;
}

.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  border-radius: 20px;
}

.updateProfile:hover {
  background-color: #2c7873 !important;
  color: #000 !important;
}
</style>
