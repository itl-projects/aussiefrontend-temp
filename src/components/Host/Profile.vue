<template>
  <div grid-list-xs class="mt-2 p-5" style="border:1px soild">
    <v-card>
      <v-card-title>Settings</v-card-title>
      <v-tabs v-model="tab" color="#ffffff" dark background-color="#2c7873">
        <v-tab key="services">Services and Rates</v-tab>
        <v-tab key="about">About</v-tab>
        <v-tab key="experience">Experience</v-tab>
        <v-tab key="photo_gallery">Photo Gallery</v-tab>
        <v-tab key="household">Household</v-tab>
        <v-tab key="pets">Pets</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item key="services">
         <v-container>
              <ServicesAndRates/>
         </v-container>
        </v-tab-item>
         <v-tab-item key="about">
          <PersonalDetails/>
        </v-tab-item>
        <v-tab-item key="experience">
          <v-card-text>Balance household</v-card-text>
        </v-tab-item>
        <v-tab-item key="photo_gallery">
          <v-card-text>Balance settings</v-card-text>
        </v-tab-item>
        <v-tab-item key="settings">
          <v-card-text>Balance settings</v-card-text>
        </v-tab-item>
        <v-tab-item key="pets">
          <v-card-text>Balance settings</v-card-text>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    
  </div>
</template>
<script>
import authStore from '../../store/auth';
import ServicesAndRates from "@/components/Host/ServicesAndRates";
import PersonalDetails from "@/components/Host/PersonalDetails";
export default {
  name: "Profile",
  components:{ServicesAndRates,PersonalDetails},
  data: function(){
    return {
      tab:null,
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: "",
    menu1: false,
    firstName:"this",
    lastName: "last",
    contact:"",
    email:"",
    gender:""
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
    }
  },

  methods: {
    
    onChanged() {
      console.log("New picture loaded");
      if (this.$refs.pictureInput.file) {
        this.image = this.$refs.pictureInput.file;
      } else {
        console.log("Old browser. No support for Filereader API");
      }
    },
    onRemoved() {
      this.image = "";
    },
    attemptUpload() {
      // if (this.image){
      // FormDataPost('http://localhost:8001/user/picture', this.image)
      //     .then(response=>{
      //     if (response.data.success){
      //         this.image = '';
      //         console.log("Image uploaded successfully ✨");
      //     }
      //     })
      //     .catch(err=>{
      //     console.error(err);
      //     });
      // }
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  },
  created: function(){
      const data = JSON.parse(authStore.userDetails());
      this.firstName = data.first_name;
      this.lastName = data.last_name;
      this.email = data.email;
      this.contact = data.phone;
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