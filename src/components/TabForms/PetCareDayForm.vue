<template>
  <div class="px-10 ml-5 mr-7">
    <v-row class="px-2 justify-center" align="center">
      <v-col cols="12" sm="4">
        <v-label>How Often ?</v-label>
        <!-- <v-tabs
          :prev-icon="undefined"
          :next-icon="undefined"
          v-model="tab"
          dark
          icons-and-text
          height="45px"
          fixed-tabs
        >
          <v-tab href="#tab-1">Repeat Weekly</v-tab>
          <v-tab href="#tab-2">One-Off</v-tab>
        </v-tabs>-->
        <v-tabs
          :prev-icon="undefined"
          :next-icon="undefined"
          v-model="tab"
          background-color="deep-purple accent-4"
          centered
          dark
          text
        >
          <v-tab href="#tab-1">Repeat Weekly</v-tab>

          <v-tab href="#tab-2">One-Off</v-tab>
        </v-tabs>
      </v-col>
      <v-col cols="12" sm="8" class="py-0">
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
                  :return-value.sync="start_date"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-label>Start Week</v-label>
                    <v-text-field
                      v-model="start_date"
                      label="Start Week"
                      append-icon="mdi-calendar"
                      v-bind="attrs"
                      v-on="on"
                      solo
                      hide-details
                      hide-no-data
                      hide-selected
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="start_date"
                    scrollable
                    @input="modal = false;$refs.dialog.save(start_date)"
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
              :return-value.sync="required_date"
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
    <v-row class="px-3 justify-center" align="center">
      <v-col class="py-0" cols="12" sm="4">
        <v-label>Near</v-label>
        <v-autocomplete
          v-model="place"
          :items="places"
          label="Enter suburb or address"
          name="place"
          :search-input.sync="searchPlace"
          :loading="place_loading"
          :error-messages.sync="nameErrors"
          :rules="[rules.required,rules.validPlace]"
          solo
          single-line
        >
          <v-icon slot="append">mdi-magnify-plus-outline</v-icon>
        </v-autocomplete>
      </v-col>
      <v-col cols="12" sm="4">
        <v-label>My Pet(s)</v-label>
        <!-- <v-select :items="['pet1','pet2']"  solo hide-details multiple></v-select> -->
        <v-menu v-model="menu" :close-on-content-click="closeOnContext" class="pa-0 ma-0">
          <template v-slot:activator="{ on, attrs }">
            <v-select v-bind="attrs" v-on="on" :label="petSelected" solo></v-select>
          </template>
          <v-list class="pa-0 ma-0">
            <v-list-item class="pa-0">
              <v-list-item-content class="py-0">
                <v-row style="width:300px">
                  <v-col
                    cols="12"
                    v-for="(item, i) in items"
                    :key="i"
                    :class="item.class"
                    class="py-1"
                  >
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
    </v-row>
    <v-col style="text-align:center;padding:0px;" cols="12">
      <v-btn
        style="padding: 0 10%;background-color:#0FEF70;color:#fff;"
        class="pt-5 pb-6"
        @click="showHosts"
      >Search</v-btn>
    </v-col>
  </div>
</template>

<script>
import axios from "axios";
import urls from "@/axios/config";
export default {
  name: "PetCareDayForm",
  props: ["items", "serviceType"],
  data: function() {
    return {
      closeOnContext: false,
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
      start_date: null,
      required_date: null,
      date_requireds_modal: null,
      modal: false,
      places: [],
      searchPlace: null,
      place_loading: false,
      place: "",
      petSelected: "Choose Pet(s)",
      rules: {
        required: value => !!value || "Required.",
        validPlace: v =>
          this.places.includes(v) || "please enter correct suburb or address"
      },
      nameErrors: []
    };
  },

  watch: {
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
    increment(num) {
      this.items[num].count = this.items[num].count + 1;
    },
    decrement(num) {
      if (this.items[num].count > 0)
        this.items[num].count = this.items[num].count - 1;
    },
    closeMenu() {
      this.petSelected = "";
      this.items.forEach(el => {
        if (el.count > 0) {
          if (this.petSelected == "") this.petSelected = el.title;
          else this.petSelected = this.petSelected + "," + el.title;
        }
      });
      if (this.petSelected == "") {
        this.petSelected = "Choose Pet(s)";
      }
      this.menu = false;
    },
    showHosts() {
      if (this.place == "") {
        this.nameErrors = [];
        this.nameErrors.push("Enter suburb or address");
        return;
      }
      this.$router.push({
        path: "/hostsearch",
        query: {
          city: this.place,
          start_date: this.start_date,
          service: this.serviceType
        }
      });
      // router.push("/hostsearch");
    }
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
.apply_btn_box {
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
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined):hover {
  background-color: #00d657;
  color: #faff63;
  border: 1px solid #faff63;
}
.mdi-magnify-plus-outline::before {
  content: "\F06ED";
  color: #00d657;
}
</style>
<style>
/* .v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)
  > .v-input__control
  > .v-input__slot,
.v-text-field.v-text-field--enclosed .v-text-field__details {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
} */
</style>