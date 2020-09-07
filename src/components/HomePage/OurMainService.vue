<template>
  <v-container :fluid="true" grid-list-xs>
    <v-row no-gutters>
      <v-container grid-list-xs>
        <v-row>
          <v-col>
            <div class="mainServicesHead text-center">
              <h2>Our Main Service</h2>
              <h4 class="sub">Sub Heading</h4>
            </div>
          </v-col>
        </v-row>
        <div class="div-box">
          <v-row>
            <v-col cols="12">
              <v-tabs-items v-model="tab">
                <v-tab-item :key="'tab-1'" :value="'tab-1'">
                  <PetHostingForm :items="items" :serviceType="services[0]" />
                </v-tab-item>
                <v-tab-item :key="'tab-2'" :value="'tab-2'">
                  <PetHostingForm :items="items" :serviceType="services[1]" />
                </v-tab-item>
                <v-tab-item :key="'tab-3'" :value="'tab-3'">
                  <PetCareDayForm :items="items" :serviceType="services[2]" />
                </v-tab-item>
                <v-tab-item :key="'tab-4'" :value="'tab-4'">
                  <PetCareDayForm :items="items" :serviceType="services[3]" />
                </v-tab-item>
                <v-tab-item :key="'tab-5'" :value="'tab-5'">
                  <PetCareDayForm :items="items" :serviceType="services[4]" />
                </v-tab-item>
                <v-tab-item :key="'tab-6'" :value="'tab-6'">
                  <PetGroomingForm :items="items" :serviceType="services[5]" />
                </v-tab-item>
                <v-tab-item :key="'tab-7'" :value="'tab-7'">
                  <PetGroomingForm :items="items" :serviceType="services[6]" />
                </v-tab-item>
              </v-tabs-items>
            </v-col>
            <v-col cols="12" style="text-align: center;">
              <v-btn
                class="ma-2"
                tile
                style="padding-right: 10% !important;padding-left: 10% !important;"
                color="#0FEF70"
                dark
              >
                <span>Search</span>
              </v-btn>
            </v-col>
            <v-col>
              <v-tabs
                v-model="tab"
                background-color="#ffffff"
                dark
                icons-and-text
                height="100%"
                style="display:flex;justify-content:center"
              >
                <v-tab href="#tab-1">
                  pet hosting
                  <v-img
                    src="@/assets/images/Frame.svg"
                    max-width="52px"
                    max-height="40px"
                    contain
                  ></v-img>
                </v-tab>

                <v-tab href="#tab-2">
                  Pet Sitting
                  <br />At Pet’s home
                  <v-img
                    src="@/assets/images/tab-2.svg"
                    max-width="52px"
                    max-height="40px"
                    contain
                  ></v-img>
                </v-tab>

                <v-tab href="#tab-3">
                  Pet Day Care
                  <br />Services
                  <v-img
                    src="@/assets/images/tab-3.svg"
                    max-width="52px"
                    max-height="40px"
                    contain
                  ></v-img>
                </v-tab>
                <v-tab href="#tab-4">
                  House Visits
                  <br />gardens/plants
                  <v-img
                    src="@/assets/images/tab-4.svg"
                    max-width="52px"
                    max-height="40px"
                    contain
                  ></v-img>
                </v-tab>
                <v-tab href="#tab-5">
                  Exercise &
                  <br />walkies services
                  <v-img
                    src="@/assets/images/tab-5.svg"
                    max-width="52px"
                    max-height="40px"
                    contain
                  ></v-img>
                </v-tab>
                <v-tab href="#tab-6">
                  Pet Grooming
                  <br />Services
                  <v-img
                    src="@/assets/images/tab-6.svg"
                    max-width="52px"
                    max-height="40px"
                    contain
                  ></v-img>
                </v-tab>
                <v-tab href="#tab-7">
                  Pet Training
                  <br />services
                  <v-img
                    src="@/assets/images/tab-7.svg"
                    max-width="52px"
                    max-height="40px"
                    contain
                  ></v-img>
                </v-tab>
              </v-tabs>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import PetHostingForm from "@/components/TabForms/PetHostingForm";
import PetCareDayForm from "@/components/TabForms/PetCareDayForm";
import PetGroomingForm from "@/components/TabForms/PetGrooming";
import * as axios from "axios";
import urls from "@/axios/config";

export default {
  name: "OurMainService",
  components: { PetHostingForm, PetCareDayForm, PetGroomingForm },
  data() {
    return {
      services: [
        "pet_hosting",
        "pet_sitting",
        "pet_day_care",
        "house_visits",
        "exercise_walk_service",
        "pet_training",
        "pet_grooming",
      ],
      items: [],
      date: null,
      pickup_date: null,
      modal: false,
      pickup_modal: false,
      tab: null,
      icons: false,
      centered: true,
      grow: false,
      vertical: false,
      prevIcon: false,
      nextIcon: false,
      right: false,
      tabs: 7,
    };
  },
  created() {
    this.getPetsType();
  },
  methods: {
    getPetsType() {
      let type = "Dog";
      const url = urls.URL + "/pet/type/?type=" + type;
      axios
        .get(url)
        .then((res) => {
          res.data.data.forEach((el) => {
            if (el.typeid % 2 == 0)
              this.items.push({ title: el.subType, count: 0 });
            else
              this.items.push({
                title: el.subType,
                count: 0,
                class: "grey lighten-4",
              });
          });

          this.items.push({ title: "Cats", count: 0 });
          this.items.push({
            title: "Birds",
            count: 0,
            class: "grey lighten-4",
          });
          this.items.push({ title: "Rabbit / Guinea Pig", count: 0 });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
 .mainServicesHead > h2 {
  color: #383d43;
  text-transform: uppercase;
  font: normal normal bold 50px/76px Poppins;
  text-align: center;
  font-size: 2em;
}

.mainServicesHead > .sub {
  font-family: "Poppins", sans-serif;
  color: #383d43;
}

/* .heading h2:before,
.heading h2:after {
  background-color: #faef60;
  content: "";
  display: inline-block;
  height: 2px;
  position: relative;
  vertical-align: middle;
  width: 5%;
}

.heading h2:before {
  right: 0.5em;
  margin-left: -50%;
}

.heading h2:after {
  left: 0.5em;
  margin-right: -50%;
} */
.col-border {
  border: 1px solid #00d657;
  border-radius: 10px;
}
.v-slide-group__wrapper {
  height: 100px;
}
.v-tabs-bar__content a {
  border-radius: 10px;
  height: 70px;
  margin-top: 0px;
  color: #ffffff;
}
.v-tabs-items {
  margin-top: 45px;
}

.theme--dark.v-tabs > .v-tabs-bar__content .v-tab--active {
  background: #fff;
}

.theme--dark.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) > .v-icon {
  color: #00d657;
}

.v-slide-group__wrapper {
  height: 100px;
}
.v-tabs {
  height: 100%;
}
.theme--dark.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) {
  color: #00d657;
  background: #ffffff;
}
.theme--dark.v-tabs > .v-tabs-bar .v-tab {
  flex-direction: column-reverse;
  box-shadow: 0px 3px 10px #0000003b;
  border-radius: 50px;
  margin-right: 5px;
  font-size: 0.65rem;
  font-weight: 500;
  text-transform: capitalize;
  /* min-width: 140px; */
  margin: 0 1%;
  background: #2c7873;
  height: 100%;
}
.v-tabs--icons-and-text > .v-tabs-bar {
  height: 85px !important;
}
</style>
