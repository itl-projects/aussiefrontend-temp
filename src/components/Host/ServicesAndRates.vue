<template>
  <v-container>
    <h1>Services and Rates</h1>
    <h5>Let us know pet services(s) you would like to ogg to aussiepets</h5>
    <v-row>
      <v-col cols="12" sm="8" class="mx-auto">
        <v-form ref="form" v-model="valid">
        <v-card>
          <v-card-title>Your pet service type</v-card-title>
          <v-card-subtitle>Select the pet service you will offer</v-card-subtitle>
          <v-card-text>
            <div v-for="(item,i) in items" :key="i">
              <v-list class="py-0">
                <v-list-item two-line>
                  <v-list-item-avatar>
                    <v-icon color="#2c7873">{{datas[i].icon}}</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{datas[i].heading}}</v-list-item-title>
                    <v-list-item-subtitle>The pets stays at your place overnight</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-switch v-model="datas[i].enabled" color="#2c7873"></v-switch>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
              <v-row v-if="datas[i].enabled">
                <v-col cols="2" style="display: flex;justify-content: flex-end;">
                  <v-divider vertical class="px-4" ></v-divider>
                </v-col>
                <v-col cols="10" sm="8">
                  <v-label>
                    Base rate pet night (
                    <b>$</b>) <span style="color:red;font-size:1.2rem">*</span>
                  </v-label>
                  <v-text-field
                    placeholder="price"
                    v-model="item.base_rate_pernight"
                    dense
                    style="max-width:400px; width:300px;"
                    color="#2c7873"
                  ></v-text-field>
                  <div>
                    <v-label>Total number of pets you can take for this service:</v-label>
                    <v-text-field
                      placeholder="number of pets"
                      v-model="item.max_pet"
                      dense
                      style="max-width:400px; width:300px;"
                      color="#2c7873"
                    ></v-text-field>
                  </div>
                  <div style="display: flex;justify-content: space-between;">
                    <v-label>Additional Pet Rate</v-label>
                    <v-checkbox class="mt-0" v-model="item.additional_pet_rate" dense color="#2c7873"></v-checkbox>
                  </div>
                  <div v-if="item.additional_pet_rate">
                    <v-label>How much you charge</v-label>
                    <v-text-field
                      placeholder="price"
                      v-model="item.additional_pet_rate_charge"
                      dense
                      style="max-width:400px; width:300px;"
                      color="#2c7873"
                    ></v-text-field>
                  </div>
                  <div style="display: flex;justify-content: space-between;">
                    <v-label>Puppy Subcharge</v-label>
                    <v-checkbox class="mt-0" v-model="datas[i].puppy_charge" dense color="#2c7873"></v-checkbox>
                  </div>
                  <div v-if="datas[i].puppy_charge || item.puppy_surcharge">
                    <v-label>How much you charge</v-label>
                    <v-text-field
                      placeholder="price"
                      v-model="item.puppy_surcharge"
                      dense
                      style="max-width:400px; width:300px;"
                      color="#2c7873"
                    ></v-text-field>
                  </div>
                  <div style="display: flex;justify-content: space-between;">
                    <v-label>Discount for bulk booking</v-label>
                    <v-checkbox class="mt-0" v-model="datas[i].discount" dense color="#2c7873"></v-checkbox>
                  </div>
                  <div v-if="datas[i].discount || item.discount_bulk">
                    <v-label>How much Discount</v-label>
                    <v-text-field
                      placeholder="price"
                      v-model="item.discount_bulk"
                      dense
                      style="max-width:400px; width:300px;"
                      color="#2c7873"
                    ></v-text-field>
                  </div>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-list class="py-0 ml-sm-8">
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title>Add-on Services for {{datas[i].heading}}</v-list-item-title>
                        <v-list-item-subtitle>Please select any additional service you would like to offer</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                  <v-row v-if="datas[i].enabled" class="py-0">
                    <v-col cols="2" style="display: flex;justify-content: flex-end;">
                      <v-divider vertical class="px-4"></v-divider>
                    </v-col>
                    <v-col cols="10" sm="8">
                      <div style="display: flex;justify-content: space-between;">
                        <v-label>Dog Grooming</v-label>
                        <v-checkbox color="#2c7873" class="mt-0" v-model="item.add_on.dog_grooming" dense></v-checkbox>
                      </div>
                      <div v-if="item.add_on.dog_grooming">
                        <v-label>How much you charge</v-label>
                        <v-text-field
                          placeholder="price"
                          v-model="item.add_on.dog_price"
                          dense
                          style="max-width:400px; width:300px;"
                          color="#2c7873"
                        ></v-text-field>
                      </div>
                      <div style="display: flex;justify-content: space-between;">
                        <v-label>Dog Training</v-label>
                        <v-checkbox color="#2c7873" class="mt-0" v-model="item.add_on.dog_training" dense></v-checkbox>
                      </div>
                      <div v-if="item.add_on.dog_training">
                        <v-label>How much you charge</v-label>
                        <v-text-field
                          placeholder="price"
                          v-model="item.add_on.dog_training_price"
                          dense
                          style="max-width:400px; width:300px;"
                          color="#2c7873"
                        ></v-text-field>
                      </div>
                      <div style="display: flex;justify-content: space-between;">
                        <v-label>Dog Walking</v-label>
                        <v-checkbox color="#2c7873" class="mt-0" v-model="item.add_on.dog_walking" dense></v-checkbox>
                      </div>
                      <div v-if="item.add_on.dog_walking">
                        <v-label>How much you charge</v-label>
                        <v-text-field
                          placeholder="price"
                          v-model="item.add_on.dog_walking_price"
                          dense
                          style="max-width:400px; width:300px;"
                          color="#2c7873"
                        ></v-text-field>
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-divider></v-divider>
            </div>
            <div class="tests">
              <v-list class="py-0">
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Type of pet you would accept</v-list-item-title>
                     <v-list-item-subtitle>Select one or more type of pets from the following</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-icon color="#2c7873">mdi-information-outline</v-icon>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
              
                <v-row v-for="(item,i) in petTypes" :key="i" class="pl-8 py-2 pr-2">
                <v-col cols="11" class="py-0">
                  <v-label> {{item.title}} </v-label>
                </v-col>
                <v-col cols="1" class="py-0">
                  <v-checkbox color="#2c7873" class="mt-0" v-model="item.checked" dense></v-checkbox>
                </v-col>
              </v-row>
            </div>
            <v-divider></v-divider>
            <div class="tests">
              <v-list class="py-0">
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Pick up/drop off service</v-list-item-title>
                     <!-- <v-list-item-subtitle>Select one or more type of pets from the following</v-list-item-subtitle> -->
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-icon color="#2c7873">mdi-information-outline</v-icon>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
              <v-list class="py-0 pl-3">
                <v-list-item>
                  <v-list-item-content>
                     <v-list-item-subtitle>Pick up/drop service at client home</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-switch v-model="pick_drop_service"></v-switch>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
                <v-row v-if="pick_drop_service" class="pl-8 py-2 pr-2">
                  <v-col cols="2" style="display: flex;justify-content: flex-end;">
                  <v-divider vertical class="px-4" ></v-divider>
                </v-col>
                <v-col cols="10" class="py-0">
                  <v-label> Cost per pick up/drop off journey</v-label>
                  <v-text-field v-model="pick_drop_service_cost" placeholder="cost" dense></v-text-field>
                </v-col>
              </v-row>
            </div>
            <v-divider></v-divider>
            <div class="tests">
              <v-list class="py-0">
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Flexibility Offered</v-list-item-title>
                     <v-list-item-subtitle>Let us know if you have the flexibility to offer the followings:</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-icon color="#2c7873">mdi-information-outline</v-icon>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
              <v-list class="py-0 pl-3">
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Last-minute bookings</v-list-item-title>
                     <v-list-item-subtitle>Less then 24 hours notice</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-switch v-model="last_min_bookings"></v-switch>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
              <v-list class="py-0 pl-3">
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Long-term bookings</v-list-item-title>
                     <v-list-item-subtitle>For 1 month or longer</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-switch v-model="long_term_bookings"></v-switch>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </div>
            <v-divider></v-divider>
            <div class="cancelation_policy">
              <v-list class="py-0">
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Cancellation Policy <span style="color:red;">*</span></v-list-item-title>
                     <v-list-item-subtitle>Select the policy which is suitable for you in relation to bookings.</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-icon color="#2c7873" title="required">mdi-information-outline</v-icon>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
              <v-radio-group v-model="cancellation_policy" :mandatory="false" color="#2c7873" :rules="[rules.required]">
                <v-list class="py-0 pl-3">
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Strict</v-list-item-title>
                     <v-list-item-subtitle>Allow free cancellation up until 14 day before the start of the booking.</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-radio value="strict" color="#2c7873" ></v-radio>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
              <v-list class="py-0 pl-3">
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Moderate</v-list-item-title>
                     <v-list-item-subtitle>Allow free cancellation up until 7 day before the start of the booking.</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-radio value="moderate"  color="#2c7873"></v-radio>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
              <v-list class="py-0 pl-3">
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Flexible</v-list-item-title>
                     <v-list-item-subtitle>Allow free cancellation up until 12 noon the day before booking starts.</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-radio value="flexible" color="#2c7873"></v-radio>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
              </v-radio-group>
            </div>
            <v-divider></v-divider>
            <div class="prefrence">
                <div class="pa-2">
                  <h2>Your Preferences <span style="color:red;font-size:1.2rem">*</span></h2>
                  <v-card-text style="font-size:1rem;" class="pa-0 mt-4">
                    What information do you will need to know about a pet before accepting a booking?
                  </v-card-text>
                  <br/>
                  <v-card-text style="font-size:1rem;" class="pa-0 mt-2">
                    Just the description, temperament and any special quirks or needs... thats all
                  </v-card-text>
                  <v-textarea v-model="pref_info" rows="2" class="mt-3" dense :rules="[rules.required]"></v-textarea>
                  <v-card-text style="font-size:1rem;" class="pa-0 mt-2">
                    Where will you walk my dog? please tell us about nearby parks
                  </v-card-text>
                  <v-textarea v-model="pref_park_info" rows="2" class="mt-3" dense :rules="[rules.required]"></v-textarea>
                  <v-card-text style="font-size:1rem;" class="pa-0 mt-4">
                    What will be the estimated time that you will spend with my pet each day?
                  </v-card-text>
                  <br/>
                  <v-card-text style="font-size:1rem;" class="pa-0 mt-2">
                    I work from home excluding a few errands...pretty much 24 / 7
                  </v-card-text>
                  <v-textarea v-model="pref_time_info" rows="2" class="mt-3" dense :rules="[rules.required]"></v-textarea>
                </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-row justify="center">
              <v-btn color="#2c7873" class="white--text" width="200px" large @click="saveSettings" :disabled="!valid">Save</v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
        </v-form>
      </v-col>
    </v-row>
   <v-overlay :value="processing">
      <v-progress-circular v-if="loading" indeterminate size="64"></v-progress-circular>
      <v-row v-else
        class="text-center"
        style="background: #ffffff; border-radius: 6px;padding:20px 30px;">
        <v-col cols="12" class="m-0 p-0">
          <v-responsive
            class="text-center grey lighten-2 d-inline-flex align-center justify-center ma-3"
            height="52"
            width="52"
            style="border-radius: 50%;">
            <v-icon v-if="success" :large="true" color="success">mdi-check-outline</v-icon>
            <v-icon v-else :large="true" color="red">mdi-alert-circle</v-icon>
          </v-responsive>
          <br />
          <span v-if="success" class="success--text"> {{ alert.msg }} </span>
          <span v-else class="red--text"> {{ alert.msg }} </span>
          <br />
          <v-divider class="mt-5"></v-divider>
           <v-btn v-if="success" color="#2c7873" class="mt-5 pl-5 pr-5" @click="processing = false">Okay</v-btn>
           <v-btn v-else color="red" class="mt-5 pl-5 pr-5" @click="processing = false">Try Later</v-btn>
        </v-col>
      </v-row>
    </v-overlay>
  </v-container>
</template>

<script>
import authStore from "../../store/auth";
import urls from "@/axios/config";
import axios from "axios";
export default {
  name: "ServicesAndRates",
  data: () => ({
    alert:{msg:""},
    puppyCharge: false,
    discount: false,
    additionalCharge: false,
    processing:true,
    loading: true,
    success:false,
    items: [],
    pick_drop_service:false,
    cancellation_policy: "",
    valid:true,
    rules:{required: value => !!value || 'Required.'},
    datas: [
      {
        icon: "mdi-home-variant-outline",
        pet_charges: false,
        puppy_charge: false,
        discount: false,
        heading: "Pet Hosting",
        title: "pet_hosting",
        enabled: false
      },
      {
        icon: "mdi-paw",
        pet_charges: false,
        puppy_charge: false,
        discount: false,
        heading: "Pet Sitting",
        title: "pet_sitting",
        enabled: false
      },
      {
        icon: "mdi-dog",
        pet_charges: false,
        puppy_charge: false,
        discount: false,
        heading: "Pet day Care",
         title: "pet_day_care",
        enabled: false
      },
      {
        icon: "mdi-home-account",
        pet_charges: false,
        puppy_charge: false,
        discount: false,
        heading: "House Visit",
         title: "house_visits",
        enabled: false
      },
      {
        icon: "mdi-dog-service",
        pet_charges: false,
        puppy_charge: false,
        discount: false,
        heading: "Excersice Walk Service",
         title: "excersice_walk_service",
        enabled: false
      },
      {
        icon: "mdi-dog-side",
        pet_charges: false,
        puppy_charge: false,
        discount: false,
        heading: "Pet Training",
        title: "pet_training",
        enabled: false
      },
      {
        icon: "mdi-hair-dryer",
        pet_charges: false,
        puppy_charge: false,
        discount: false,
        heading: "Pet Grooming",
        title: "pet_grooming",
        enabled: false
      }
    ],
    petTypes:[],
    last_min_bookings: false,
    long_term_bookings: false,
    pref_info: "",
    pref_park_info:"",
    pref_time_info: "",
    types_of_pet : [],
    pick_drop_service_cost:0
  }),
  
  mounted() {
    this.getServices();
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  },
  methods: {
    getServices() {
      let config = {
        headers: {
          Authorization: "Token " + authStore.userToken()
        }
      };
      axios.get(urls.URL + "/host/services/", config).then(res => {
        if (res.data.status)
          this.items.push(
            JSON.parse(res.data.data[0].pet_hosting.replace(/'/g, '"'))
          );
        this.items.push(
          JSON.parse(res.data.data[0].pet_sitting.replace(/'/g, '"'))
        );
        this.items.push(
          JSON.parse(res.data.data[0].pet_day_care.replace(/'/g, '"'))
        );
        this.items.push(
          JSON.parse(res.data.data[0].house_visits.replace(/'/g, '"'))
        );
        this.items.push(
          JSON.parse(res.data.data[0].exercise_walk_service.replace(/'/g, '"'))
        );
        this.items.push(
          JSON.parse(res.data.data[0].pet_training.replace(/'/g, '"'))
        );
        this.items.push(
          JSON.parse(res.data.data[0].pet_grooming.replace(/'/g, '"'))
        );

      this.pick_drop_service =  res.data.data[0].pick_drop_service;
      this.last_min_bookings =  res.data.data[0].last_min_bookings;
      this.long_term_bookings =  res.data.data[0].long_term_bookings;
      this.cancellation_policy =  res.data.data[0].cancellation_policy;
      this.pref_info =  res.data.data[0].pref_info;
      this.pref_park_info =  res.data.data[0].pref_park_info;
      this.pref_time_info =  res.data.data[0].pref_time_info;
      this.types_of_pet = JSON.parse(res.data.data[0].type_of_pet);
      this.pick_drop_service_cost = res.data.data[0].pick_drop_service_cost;
      this.getpetTypes();
      this.setEnableChecks();
      }).finally(()=>{
        this.processing = false;
        this.loading = false;
      });
      // console.log(URL);
      // this.loading = false;
    },
    getpetTypes(){
    let config = {
        headers: {
          Authorization: "Token " + authStore.userToken()
        }
      };
      axios.get(urls.URL +"/pet/type/?type=Dog", config).then(res => {
        if(res.data.status){
          res.data.data.forEach(el => {
              this.petTypes.push({ title: el.subType, checked: this.types_of_pet.includes(el.subType) });       
          });
          this.petTypes.push({ title: "Cats", checked: this.types_of_pet.includes("Cats") });
          this.petTypes.push({ title: "Birds", checked: this.types_of_pet.includes("Birds")});
          this.petTypes.push({ title: "Rabbit / Guinea Pig", checked: this.types_of_pet.includes("Rabbit / Guinea Pig") });
        }else{
          this.petTypes = [];
        }
        })
        .catch(err => {
          console.log(err);
        });
    },
    setEnableChecks() {
      this.items.forEach((el, i) => {
        if (el.optional === "off" || el.optional == "") {
          this.datas[i].enabled = false;
        }else{
          this.datas[i].enabled = true;
        }
      });
    },
    getSelectedPetypes(){
      let arr  = [];
      this.petTypes.forEach(el=>{
        if(el.checked){
          arr.push(el.title);
        }
      })
      return arr;
    },
    saveSettings() {
      this.processing = true;
      this.loading = true;
     
      this.processing = true;
      this.loading = true;
      let config = {
        headers: {
          Authorization: "Token " + authStore.userToken()
        }
      };
      let active_services = this.applyChecks();
      const type_of_pets = this.getSelectedPetypes();

      let status = false;
      this.items.forEach((arr,i)=>{
        if(arr.optional == "on" && arr.base_rate_pernight == ""){
            this.alert.msg = "Please provide "+this.datas[i].heading+" Base Price";
            status = true;
            return ;
        }
      });
      if(status){
        this.success = false;
        this.loading = false;
        return;
      }

      let data_to_save = {
        pet_hosting: JSON.stringify(this.items[0]),
        pet_sitting: JSON.stringify(this.items[1]),
        pet_day_care: JSON.stringify(this.items[2]),
        house_visits: JSON.stringify(this.items[3]),
        exercise_walk_service: JSON.stringify(this.items[4]),
        pet_training: JSON.stringify(this.items[5]),
        pet_grooming: JSON.stringify(this.items[6]),
        type_of_pet: JSON.stringify(type_of_pets),
        pick_drop_service: this.pick_drop_service,
        pick_drop_service_cost: this.pick_drop_service_cost,
        last_min_bookings: this.last_min_bookings ,
        long_term_bookings: this.long_term_bookings ,
        cancellation_policy: this.cancellation_policy,
        pref_info : this.pref_info,
        pref_park_info: this.pref_park_info,
        pref_time_info : this.pref_time_info,
        active_services : JSON.stringify(active_services)
      };
      // console.log(data_to_save);
      axios.post(urls.URL + "/host/services/",data_to_save, config).then(res => {
        if(res.data.status){
          this.alert.msg = "Success! Setting has been saved successfully";
          this.success = true;
        }else{
          this.alert.msg = "Sorry! Failed to save settings";
          this.success = false;
        }
      })
      .catch(err=>{
      this.alert.msg = "Sorry! Failed to save settings";
       this.success = false;
        console.log(err);
      }).finally(()=>{
        this.loading = false;
      });
    },
    applyChecks(){
      let active_services = [];
      this.datas.forEach((el,i)=>{
          if(el.enabled){
            active_services.push(this.datas[i].title);
            this.items[i].optional = "on";
          }else{
            this.items[i].optional = "off";
          }
      });
      return active_services;
    }
  }
};
</script>

<style scoped>
</style>