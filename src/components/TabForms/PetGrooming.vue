<template>
  <div class="px-10 mx-5">
    <v-row class="px-3 justify-center">
      <v-col cols="12" sm="3">
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
      <v-col sm="3" cols="12">
        <v-dialog
          ref="dialog"
          v-model="modal"
          :return-value.sync="start_date"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="start_date"
              label="Dates Required"
              append-icon="mdi-calendar-plus"
              v-bind="attrs"
              v-on="on"
              solo
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="start_date"
            scrollable
            @input="modal = false;$refs.dialog.save(start_date)"
          ></v-date-picker>
        </v-dialog>
      </v-col>
      <v-col sm="3" cols="12">
        <v-menu v-model="menu" :close-on-content-click="closeOnContext" class="pa-0 ma-0">
          <template v-slot:activator="{ on, attrs }">
            <v-select v-bind="attrs" v-on="on" label="Choose Pet(s)" solo></v-select>
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
    <v-col style="text-align:center;" cols="12">
      <v-btn class="pt-5 pb-6 mb-5" @click="showHosts">Search</v-btn>
    </v-col>
  </div>
</template>

<script>
import axios from "axios";
import urls from "@/axios/config";
export default {
  name: "PetGroomingForm",
  props: ["items", "serviceType"],
  data: function() {
    return {
      closeOnContext: false,
      menu: false,
      modal: false,
      start_date: null,
      required_date: null,
      date_requireds_modal: null,
      places: [],
      searchPlace: null,
      place_loading: false,
      place: "",
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
          service: this.serviceType,
          start_date: this.start_date
        }
      });
      // router.push("/hostsearch");
    }
  }
};
</script>

<style scoped>
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
  background-color: #0fef70;
  color: #fff;
  padding: 0 10%;
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