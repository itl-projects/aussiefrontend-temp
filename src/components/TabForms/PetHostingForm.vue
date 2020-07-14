<template>
  <div>
    <v-row class="px-8 mt-10 ml-10">
      <v-col cols="12" sm="3">
        <v-autocomplete
          chips
          v-model="place"
          :items="places"
          label="Enter suburb or address"
          :search-input.sync="searchPlace"
          :loading="place_loading"
          full-width
          hide-details
         
          dense
          single-line
          outlined>
          <v-icon slot="append">mdi-magnify-plus-outline</v-icon>
        </v-autocomplete>
      </v-col>
      <v-col sm="4" cols="12">
        <v-row>
          <div style="display:flex">
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="Drop off"
                  append-icon="mdi-calendar-plus"
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  dense
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                scrollable
                @input="modal = false;$refs.dialog.save(date)"
              ></v-date-picker>
            </v-dialog>
            <v-icon style="margin-top: -25px;">mdi-minus</v-icon>
            <v-dialog
              ref="pickup_dialog"
              v-model="pickup_modal"
              :return-value.sync="pickup_date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="pickup_date"
                  label="Pick up"
                  append-icon="mdi-calendar-check"
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  dense
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="pickup_date"
                scrollable
                @input="pickup_modal = false;$refs.pickup_dialog.save(pickup_date)"
              ></v-date-picker>
            </v-dialog>
          </div>
        </v-row>
      </v-col>
      <v-col sm="3" cols="12">
        <v-menu
          v-model="menu"
          :close-on-content-click="closeOnContext"
          class="pa-0 ma-0"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-select v-bind="attrs" v-on="on" label="My Pets" outlined dense></v-select>
          </template>
          <v-list class="pa-0 ma-0">
            <v-row style="max-width:300px">
              <v-col cols="12" v-for="(item, i) in items" :key="i" :class="item.class" class="py-0">
                <v-row class="py-0" align="center">
                  <v-col cols="8" class="pl-5 py-0">{{ item.title }}</v-col>
                  <v-col cols="4" class="py-1">
                    <v-btn x-small icon @click="decrement(i)">
                      <v-icon>mdi-minus-circle-outline</v-icon>
                    </v-btn>
                    {{ item.count }}
                    <v-btn x-small icon @click="increment(i)">
                      <v-icon>mdi-plus-circle-outline</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-list-item-action class="apply_btn_box">
              <v-btn outlined @click="closeMenu" color="white">Apply</v-btn>
            </v-list-item-action>
          </v-list>
        </v-menu>
      </v-col>
      <v-col sm="2" cols="12">
        <v-btn @click="showHosts" >Search</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import router from "../../router";
import axios from "axios";
import URL from "@/axios/config";

export default {
  name: "PetHostingForm",
  props:["items"],
  data: () => ({
    closeOnContext:false,
    date:null,
    pickup_date:null,
    modal:false,
    pickup_modal:false,
    menu: false,
    places:[],
    searchPlace:null,
    place_loading:false,
    place:""
  }),
  watch:{
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
    increment(num) {
      this.items[num].count = this.items[num].count + 1;
    },
    decrement(num) {
      if (this.items[num].count > 0)
        this.items[num].count = this.items[num].count - 1;
    },
    closeMenu() {
      console.log()
      this.menu = false;
    },
    showHosts() {
        router.push("/hostsearch");
    },
  }
};
</script>

<style scoped>
.apply_btn_box{
  width: 100%;
    background: #00d657;
    display: flex;
    margin: 0 !important;
    padding: 7px 12px;
    text-align: center;
    justify-content: center;
}
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background-color: #ffffff;
    color: #00d657;
    border: 2px solid #00d657;
}
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined):hover{
  background-color: #00d657;
    color: #faff63;
    border: 1px solid #faff63;
}
.mdi-magnify-plus-outline::before {
    content: "\F06ED";
    color: #00d657;
}
.mdi-calendar-plus::before {
    content: "\F00F3";
    color: #00d657;
}
</style>