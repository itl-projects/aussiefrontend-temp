<template>
  <div>
    <NavBar />
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="3" class="text-center">
          <v-avatar size="200px">
            <v-img :src="avatar" />
          </v-avatar>
        </v-col>
        <v-col cols="12" sm="5">
          <h1 style="font-weight: 500; color: #2c7873;">Chris. H.</h1>
          <div class="flex mt-2 mb-2">
            <v-icon>mdi-account-circle</v-icon>
            <v-icon>mdi-account-circle</v-icon>
            <v-icon>mdi-account-circle</v-icon>
            <v-icon>mdi-account-circle</v-icon>
          </div>
          <v-label class="heading" style="font-size: 1.4rem;">Reliable and VERY caring dog sitter.</v-label>
          <div class="flex mt-2">
            <v-btn outlined color="#2c7873" x-small>7 Repeat guest</v-btn>
            <v-rating
              style="display: inline-block;"
              v-model="rating"
              color="warning"
              half-increments
              dense
              small
              size="18"
            ></v-rating>
            <v-btn
              small
              text
              color="#2c7873"
              style="letter-spacing: 0; text-transform: lowercase;"
            >28 reviews</v-btn>
          </div>
          <div class="flex">
            <v-chip small class="mt-2">respond within a day</v-chip>
            <v-chip class="ml-2 mt-2" small>92% response rate</v-chip>
          </div>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card>
            <v-card-title>
              <v-row justify="space-between" class="py-0">
                <v-col cols="6" class="py-0">
                  <h2 style="font-weight: 200;">{{ serviceSelected }}</h2>
                </v-col>
                <v-col cols="6" class="py-0 text-end">
                  <h2 style="color: #2c7873; display: inline-block;">$43</h2>
                  <span style="font-size: 0.7rem; vertical-align: super;">/night</span>
                </v-col>
              </v-row>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-container>
                <v-form ref="form" v-model="valid">
                  <v-label>I'm looking for</v-label>
                  <v-select v-model="serviceSelected" :items="serviceType" outlined dense></v-select>
                  <v-spacer></v-spacer>
                  <v-label>My Pet(s)</v-label>
                  <v-menu v-model="menu" :close-on-content-click="closeOnContext" class="pa-0 ma-0">
                    <template v-slot:activator="{ on, attrs }">
                      <v-select
                        v-bind="attrs"
                        v-on="on"
                        :label="petSelected"
                        outlined
                        dense
                        no-data-text
                        hide-details
                        hide-no-data
                        single-line
                      ></v-select>
                    </template>
                    <v-list class="pa-0 ma-0">
                      <v-list-item class="pa-0">
                        <v-list-item-content class="py-0">
                          <v-row style="width: 300px;">
                            <v-col
                              cols="12"
                              v-for="(item, i) in petTypes"
                              :key="i"
                              :class="item.class"
                              class="py-1 pr-4"
                            >
                              <v-row class="py-0" align="center">
                                <v-col cols="7" class="pl-5 py-0">{{ item.title }}</v-col>
                                <v-col cols="5" class="py-1 text-end">
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
                  <v-spacer></v-spacer>
                  <v-btn
                    :disabled="valid"
                    color="#2c7873"
                    class="mt-8 white--text"
                    block
                  >Contact Host</v-btn>
                </v-form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card width="100%">
            <v-tabs v-model="tab" background-color="teal" dark fixed-tabs center-active show-arrows>
              <v-tabs-slider color="orange"></v-tabs-slider>
              <v-tab key="about">About</v-tab>
              <v-tab key="services_rates">Services and Rates</v-tab>
              <v-tab key="photos">Photos</v-tab>
              <v-tab key="rating">Rating and Review</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item key="about">
                <v-card flat>
                  <v-card-text
                    class="px-10"
                    style="font-size: 1.2rem;white-space: pre-line;"
                  >{{about}}</v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item key="services_rates">
                <v-card flat>
                  <v-card-text>Services and rates</v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item key="photos">
                <v-card flat>
                  <v-card-text>
                    <v-container fluid>
                      <v-row>
                        <v-col v-for="i in 10" :key="i" cols="12" md="3">
                          <v-img
                            :src="`https://picsum.photos/500/300?image=${i * 5 + 10}`"
                            :lazy-src="`https://picsum.photos/10/6?image=${i * 5 + 10}`"
                            aspect-ratio="1"
                            style="cursor: pointer;"
                            @click="showDialog(i-1)"
                          ></v-img>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item key="rating">
                <v-card flat>
                  <v-row>
                    <v-col cols="12" sm="4">
                      <v-container class="pt-5">
                        <v-label class="mt-4">Ratings</v-label>
                        <v-card class="mt-6">
                          <v-row>
                            <v-col cols="4" class="py-0">
                              <span class="reading-header">Dog Heads</span>
                            </v-col>
                            <v-col cols="6" class="py-0">
                             <v-rating
                                v-model="dog_rating"
                                half-increments
                                style="line-height: 3rem;"
                                half-icon
                                readonly
                              >
                                <template v-slot:item="props">
                                  <v-icon
                                    :color="props.isFilled ? 'orange' : 'grey lighten-1'"
                                  >mdi-dog</v-icon>
                                </template>
                              </v-rating>
                            </v-col>
                            <v-col cols="2" class="py-0">
                              <span class="rating-count">{{dog_rating}}</span>
                            </v-col>
                          </v-row>
                        </v-card>
                        <v-card class="mt-2">
                          <v-row>
                            <v-col cols="4" class="py-0">
                              <span class="reading-header">Puppy Heads</span>
                            </v-col>
                            <v-col cols="6" class="py-0">
                              <v-rating
                                v-model="puppy_rating"
                                half-increments
                                style="line-height: 3rem;"
                                half-icon
                                readonly
                              >
                                <template v-slot:item="props">
                                  <v-icon
                                    :color="props.isFilled ? 'orange' : 'grey lighten-1'"
                                  >mdi-dog</v-icon>
                                </template>
                              </v-rating>
                            </v-col>
                            <v-col cols="2" class="py-0">
                              <span class="rating-count">{{puppy_rating}}</span>
                            </v-col>
                          </v-row>
                        </v-card>
                      </v-container>
                    </v-col>
                    <v-divider vertical class="my-4" />
                    <v-col cols="12" sm="7">
                      <v-list three-line>
                        <template v-for="(item, index) in items">
                          <v-subheader v-if="item.header" :key="item.header" v-text="item.header"></v-subheader>
                          <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>
                          <v-list-item v-else :key="item.title">
                            <v-list-item-avatar>
                              <v-img :src="item.avatar"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-title v-html="item.title"></v-list-item-title>
                              <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                              <v-list-item-content class="py-0">
                                <v-row class="pl-2 mt-2">
                                  <v-rating dense readonly v-model="item.rating" class="ml-0 pl-0 py-0"  half-increments  small color="orange">
                                </v-rating>
                                <span class="review-rating-count">({{item.rating}})</span>
                                </v-row>
                              </v-list-item-content>
                            </v-list-item-content>
                          </v-list-item>
                        </template>
                      </v-list>
                    </v-col>
                  </v-row>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <Footer />
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="#2c7873" flat style="border-radius:0" dense>
          <v-toolbar-title>Host Pics</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <galleryView :pics="pics" :onboarding="onboarding" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import galleryView from "@/components/commons/PictureGallery";
import * as axios from "axios";
import URL from "@/axios/config";

export default {
  name: "HostDetailPage",
  components: {
    NavBar,
    Footer,
    galleryView
  },
  data() {
    return {
      valid: true,
      dialog: false,
      closeOnContext: false,
      menu: false,
      tab: null,
      rating: 3,
      serviceSelected: "",
      serviceType: [
        "Pet Sitting",
        "Pet Day care",
        "House Visiting",
        "Dog Walking"
      ],
      petTypes: [],
      petSelected: "Choose Pet(s)",
      pics: [],
      onboarding: 0,
      about: "",
      avatar: "",
      hostbio: "",
      dog_rating: 4.5,
      puppy_rating: 3.5,
      items: [
        { header: "Reviews" },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Brunch this weekend?",
          subtitle:
            "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
            rating: 4.5
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle:
            "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
            rating: 3.5
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          title: "Oui oui",
          subtitle:
            "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",
            rating: 2.2
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
          title: "Birthday gift",
          subtitle:
            "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?",
            rating: 1.2
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
          title: "Recipe to try",
          subtitle:
            "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
            rating: 4.5
        }
      ]
    };
  },
  created: function() {
    this.getHostDetails();
    this.serviceSelected = this.serviceType[0];
    this.getPetsType();
    for (let i = 1; i <= 10; i++) {
      this.pics.push({
        src: `https://picsum.photos/500/300?image=${i * 5 + 10}`,
        "lazy-src": `https://picsum.photos/10/6?image=${i * 5 + 10}`
      });
    }
  },
  methods: {
    increment(num) {
      this.petTypes[num].count = this.petTypes[num].count + 1;
    },
    decrement(num) {
      if (this.petTypes[num].count > 0)
        this.petTypes[num].count = this.petTypes[num].count - 1;
    },
    closeMenu() {
      this.petSelected = "";
      this.petTypes.forEach(el => {
        if (el.count > 0) {
          if (this.petSelected == "") this.petSelected = el.title;
          else this.petSelected = this.petSelected + "," + el.title;
        }
      });
      if (this.petSelected == "") {
        this.petSelected = "Choose Pet(s)";
      }
      this.menu = !this.menu;
    },
    getPetsType() {
      let type = "Dog";
      const url = URL + "/pet/type/?type=" + type;
      axios
        .get(url)
        .then(res => {
          res.data.data.forEach(el => {
            if (el.typeid % 2 == 0)
              this.petTypes.push({ title: el.subType, count: 0 });
            else
              this.petTypes.push({
                title: el.subType,
                count: 0,
                class: "grey lighten-4"
              });
          });

          this.petTypes.push({ title: "Cats", count: 0 });
          this.petTypes.push({
            title: "Birds",
            count: 0,
            class: "grey lighten-4"
          });
          this.petTypes.push({ title: "Rabbit / Guinea Pig", count: 0 });
        })
        .catch(err => {
          console.log(err);
        });
    },
    showDialog(index) {
      this.onboarding = index;
      this.dialog = true;
    },
    getHostDetails() {
      const host_id = "auzh100720100008";
      axios.get(URL + "/petowner/gethost/?hid=" + host_id).then(res => {
        if (res.data.status) {
          this.avatar = "https://aussiepetsbnb.com.au"+res.data.data.avatar;
          this.about = res.data.data.hostbio;
        }
      });
    }
  }
};
</script>

<style scoped>
.apply_btn_box {
  width: 100%;
  background: #2c7873;
  display: flex;
  margin: 0 !important;
  padding: 7px 12px;
  text-align: center;
  justify-content: center;
}
.reading-header {
  height: 100%;
  width: 100%;
  display: inline-block;
  line-height: 3rem;
  padding-left: 5px;
  color: #fff;
  background: #2c7873;
}
.rating-count {
  height: 100%;
  width: 100%;
  display: inline-block;
  background: orange;
  color: #ffffff;
  line-height: 3rem;
  text-align: center;
  font-size: 1.5rem;
}
.review-rating-count{
  font-size: 0.8rem;
    display: inline-block;
    line-height: 1.2rem;
    margin-left: 2px;;
}
</style>
