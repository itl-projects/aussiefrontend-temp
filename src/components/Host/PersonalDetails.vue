<template>
  <v-container grid-list-xs class="mt-10 p-5" style="border:1px soild">
    <v-alert v-if="alert.show" dense border="left" :type="alert.type" dismissible>
      {{alert.message}}
    </v-alert>
    <v-row justify="space-around">
      <v-col :cols="12" :md="3">
        <picture-input
          ref="pictureInput"
          @change="onChanged"
          @remove="onRemoved"
          :width="200"
          :removable="true"
          removeButtonClass="ui red button"
          :height="200"
          :prefill="avatar"
          accept="image/jpeg, image/png, image/gif"
          buttonClass="ui button primary"
          :customStrings="{
                        upload: '<h1>Upload it!</h1>',
                        drag: 'Drag and drop your image here'}"></picture-input>
      </v-col>
      <v-col :cols="12" :md="8" class="mt-5">
        <h5>Personal Details</h5>
           <v-row>
      <v-col>
        <v-text-field
          v-model="firstName"
          label="First Name"
          value="test"
          hide-details="auto"
          required
          outlined
          dense></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="lastName"
          label="Last Name"
          hide-details="auto"
          required
          outlined
          dense></v-text-field>
      </v-col>
    </v-row>
        <v-row justify="space-around" align="center">
          <v-col :cols="12" :md="8">
            <v-label>Phone Number</v-label>
            <h4>{{contact}}</h4>
            <span>For your safety and secrurity, your phone number will not be shared</span>
          </v-col>
          <v-col v-if="phone_verified" :cols="12" :md="2">
            <span class="success--text">Verified</span>
          </v-col>
          <v-col v-else :cols="12" :md="2">
            <span class="red--text">Not Verified</span>
          </v-col>
          <v-col v-if="!phone_verified" :cols="12" :md="2" class="text-center" style="margin:auto">
            <v-btn color="success" :loading="verifyingPhone" @click="verifyPhone">Verfiy</v-btn>
          </v-col>
        </v-row>
        <v-row justify="space-around" align="center">
          <v-col :cols="12" :md="8">
            <v-label>Email Address</v-label>
            <h4>{{email}}</h4>
          </v-col>
          <v-col v-if="email_verified" :cols="12" :md="2">
            <span class="success--text">Verified</span>
          </v-col>
          <v-col v-else :cols="12" :md="2">
            <span class="red--text">Not Verified</span>
          </v-col>
          <v-col v-if="!email_verified"  :cols="12" :md="2" class="text-center" style="margin:auto">
            <v-btn color="success" :loading="verifyingEmail" @click="verifyEmail">Verfiy</v-btn>
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
              min-width="290px" >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="dateFormatted"
                  label="Birthdate"
                  @blur="date = parseDate(dateFormatted)"
                  v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col :cols="12" :md="6">
            <label for="Gender">Gender</label>
            <v-radio-group v-model="gender" row style="margin-top:0px">
              <v-radio label="Male" value="Male"></v-radio>
              <v-radio label="Female" value="Female"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <h5>Location Details</h5>
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
              hide-details
              @change="placeSelected"
              label="Place Name">
            </v-autocomplete>
          </v-col>
          <v-col :md="6" :cols="12">
            <v-text-field v-model="zipcode" label="Post code" readonly></v-text-field>
          </v-col>
        </v-row>
         <v-row>
          <v-col :md="6" :cols="12">
            <v-text-field v-model="state" label="State name" readonly></v-text-field>
          </v-col>
          <v-col :md="6" :cols="12">
            <v-text-field v-model="state_code" label="State code" readonly></v-text-field>
          </v-col>
        </v-row>
        <h5>Tell others about you</h5>
        <v-row>
          <v-col :md="9" :cols="12">
            <v-textarea solo :counter="true" v-model="hostbio" label="Desribe yourself"></v-textarea>
          </v-col>
         
        </v-row>
        <v-btn type="submit" color="success" @click="updateProfile" :loading="updateLoading">Update Profile</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import authStore from "../../store/auth";
import PictureInput from "vue-picture-input";
import axios from "axios";
import URL from "@/axios/config";
export default {
  name: "PersonalDetails",
  components: { PictureInput },
  data: function(){
    return {
    alert:{"show":false,"type":null,"message":""},
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: "",
    menu1: false,
    firstName:"",
    lastName: "",
    contact:"",
    email:"",
    gender:"",
    image:null,
    email_verified:false,
    phone_verified:true,
    hostbio:"",
    city:"",
    state:"",
    zipcode:"",
    state_code:"",
    billing_address:"",
    country:"",
    verifyingEmail:false,
    verifyingPhone:false,
    places:[],
    states:[],
    place_loading:false,
    searchPlace:null,
    latitude:0,
    longitude:0,
    updateLoading:false,
  }
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
        val && val !== this.city && this.queryPlaces(val)
      }
  },
  methods: {
    queryPlaces(v) {
        this.place_loading = true;
        axios.get(URL+'/locations/?relative=true&place_name='+v,{
      }).then((res) => {
        this.places = [];
        this.place_loading = false;
        if(res.data.status){
          res.data.data.forEach(el=>{
              this.places.push(el.place_name);
          })
        }
      });
      },
      placeSelected(){
        axios.get(URL+'/locations/?relative=true&place_name='+this.city,{
         }).then((res) => {
          this.places = [];
          this.place_loading = false;
          if(res.data.status){
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
       this.showAlert("red","Old browser. No support for Filereader API")
      }
    },
    onRemoved() {
      this.image = null;
    },
    attemptUpload() {

    },
    updateProfile: function(){
      this.updateLoading = true;
       let config = {
        headers: {
          Authorization: "Token " + authStore.userToken()
        }
      };
      const formData = new FormData();
      if(this.image != null)
        formData.append('avatar', this.image, this.image.name);

      formData.append('username',authStore.getUsername());
      formData.append('first_name', this.firstName);
      formData.append('last_name', this.lastName);
      formData.append('gender', this.gender);
      formData.append('hostbio', this.hostbio);
      formData.append('city', this.city);
      formData.append('state', this.state);
      formData.append('zipcode', this.zipcode);
      formData.append('dob', this.dateFormatted);
      formData.append('state_code', this.state_code);
      formData.append('latitude',this.latitude);
      formData.append('longitude', this.longitude);
      axios.post(URL+'/host/update/', formData, config,{
      }).then((res) => {
        this.updateLoading = false;
        if(res.data.status){
           authStore.fecthUserData();
           this.showAlert("success","profile updated successfully");
        }else{
          this.showAlert("error","Failed to update profile details")
        }
      }).catch(()=>{
        this.updateLoading = false;
         this.showAlert("error","Failed to update profile details")
      });
    },
    parseDate(date) {
      if (!date) return null;
      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    verifyEmail(){
        this.verifyingEmail = true;
        let config = {
        headers: {
          Authorization: "Token " + authStore.userToken()
        }
      };

      axios.post(URL+"/verifyemail/",{email:this.email},config)
      .then(res=>{
        if(res.data.status){
        this.showAlert("success","Email verification link has been sent to your registered email address.");
        }else{
          this.showAlert("red","Failed to send email verification link");
        }
      }).catch(()=>{
        this.showAlert("red","Failed to send email verification link");
      })
    },
    verifyPhone(){
      this.verifyingPhone = true;
    },
    showAlert(type,message){
      this.alert.show = true;
      this.alert.type = type;
      this.alert.message = message;
      setTimeout(()=>{
        this.alert.show = false;
      },5000);
    }
  },
  created: function(){
      const data = JSON.parse(authStore.userDetails());
      this.firstName = data.first_name;
      this.lastName = data.last_name;
      this.email = data.email;
      this.contact = data.phone;
      this.email_verified = data.emailverified == 1 ? true : false;
      this.phone_verified = data.phoneverified == 1 ? true : false;
      this.hostbio = data.bio.startsWith("cdata") ? "" : data.bio;
      this.city = data.city;
      if(this.city != null && this.city != "")
      this.places.push(data.city);
      this.state = data.state;
      this.zipcode = data.zipcode;
      this.state_code = data.state_code;
      this.billing_address = data.billing_address;
      this.country = data.country;
      this.dateFormatted = data.dob;
      this.avatar = data.avatar;
      this.latitude = data.latitude;
      this.longitude = data.longitude;
      if(authStore.isMale()){
        this.gender = "Male";
      }else{
        this.gender = "Female";
      }
      this.dateFormatted = data.dob ? new Date(data.dob).toISOString().substr(0,10) : new Date().toISOString().substr(0, 10);
  }
};
</script>
<style scoped>
</style>