<template>
  <div class="px-10 ml-5 mr-7">
    <v-row class="px-5 justify-center">
      <v-col cols="12" sm="4">
        <v-label>How Often ?</v-label>
        <v-tabs v-model="tab" centered dark icons-and-text height="45px" fixed-tabs>
          <v-tabs-slider></v-tabs-slider>
          <v-tab href="#tab-1">Repeat Weekly</v-tab>
          <v-tab href="#tab-2">One-Off</v-tab>
        </v-tabs>
      </v-col>
      <v-col cols="12" sm="8">
        <v-tabs-items v-model="tab">
          <v-tab-item :key="'tab-1'" :value="'tab-1'">
            <v-row>
              <v-col class="py-0" cols="12" sm="6">
                <v-label>Which Day(s)</v-label>
                <v-select :items="days" label="Select Day(s)" solo hide-details multiple></v-select>
              </v-col>
              <v-col class="py-0" cols="12" sm="6">
                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="date"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-label>Start Week</v-label>
                    <v-text-field
                      v-model="date"
                      label="Start Week"
                      append-icon="mdi-calendar"
                      v-bind="attrs"
                      v-on="on"
                      solo
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    scrollable
                    @input="modal = false;$refs.dialog.save(date)"
                  ></v-date-picker>
                </v-dialog>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item :key="'tab-2'" :value="'tab-2'">
            <v-label>Date Required</v-label>
            <v-dialog
              ref="dialog"
              v-model="date_requireds_modal"
              :return-value.sync="date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-row>
                  <v-col cols="12" sm="6" class="py-0">
                    <v-text-field
                      v-model="required_date"
                      label="Dates Required"
                      append-icon="mdi-calendar-plus"
                      v-bind="attrs"
                      v-on="on"
                      solo
                      hide-details
                      hide-no-data
                      hide-selected
                    ></v-text-field>
                  </v-col>
                </v-row>
              </template>
              <v-date-picker
                v-model="required_date"
                scrollable
                @input="date_requireds_modal = false;$refs.dialog.save(required_date)"
              ></v-date-picker>
            </v-dialog>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
    <v-row class="px-5 justify-center">
      <v-col class="py-0" cols="12" sm="4">
        <v-label>Start Week</v-label>
        <v-autocomplete
          :items="['Trevor Handsen', 'Alex Nelson']"
          chips
          label="Enter suburb or address"
          hide-details
          hide-no-data
          hide-selected
          solo
          single-line
        >
          <v-icon slot="append">mdi-magnify-plus-outline</v-icon>
        </v-autocomplete>
      </v-col>
      <v-col  cols="12" sm="4">
        <v-label>My Pet(s)</v-label>
        <!-- <v-select :items="['pet1','pet2']"  solo hide-details multiple></v-select> -->
           <v-menu
          v-model="menu"
          :close-on-content-click="closeOnContext"
          class="pa-0 ma-0"
         
        >
          <template v-slot:activator="{ on, attrs }">
            <v-select v-bind="attrs" v-on="on" label="Choose Pet(s)" outlined dense no-data-text
          hide-details
          hide-no-data
          single-line></v-select>
          </template>
          <v-list class="pa-0 ma-0">
            <v-list-item class="pa-0">
              <v-list-item-content class="py-0">
                <v-row style="width:300px">
              <v-col cols="12" v-for="(item, i) in items" :key="i" :class="item.class" class="py-1">
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
              </v-list-item-content>
            </v-list-item>
            <v-list-item-action class="apply_btn_box">
              <v-btn outlined @click="closeMenu" color="white">Apply</v-btn>
            </v-list-item-action>
          </v-list>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="4" class="mt-4">
        <v-btn  class="full-width" large width="100%">Search</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "PetCareDayForm",
  props:["items"],
  data: function() {
    return {
    closeOnContext:false,
    menu: false,
      tab: null,
      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thrusday",
        "Friday",
        "Sturday",
        "Sunday"
      ],
      date: null,
      required_date: null,
      date_requireds_modal:null,
      modal:false,
    };
  },
  methods:{
     increment(num) {
      this.items[num].count = this.items[num].count + 1;
    },
    decrement(num) {
      if (this.items[num].count > 0)
        this.items[num].count = this.items[num].count - 1;
    },
    closeMenu() {
      this.menu = !this.menu;
    },
  }
};
</script>

<style scoped>
.theme--dark.v-tabs {
  border: 2px solid #00d657;
  border-radius: 5px;
}
.theme--dark.v-tabs > .v-tabs-bar .v-tab {
  flex-direction: column-reverse;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: capitalize;
  background: #00d657;
}
.theme--dark.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) {
  color: #2c7873;
  background: #ffffff;
}
.v-tabs-slider {
  background-color: #faff63;
}
.v-tabs-bar__content a {
  color: #fff;
}
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

</style>