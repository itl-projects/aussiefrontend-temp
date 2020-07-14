<template>
  <v-container grid-list-xs class="mt-5">
    <v-row>
      <v-col cols="12">
        <div class="heading text-center">
          <h2>ALL FEATURES & SERVICES</h2>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="4" class="content-center">
        <v-list flat>
          <v-list-item-group v-model="item" color="#2C7873">
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-icon class="text-center">
                <!-- <v-icon v-text="item.icon"></v-icon> -->
                <v-avatar style="border:2px solid #323232;">
                  <v-img src="@/assets/images/Frame.svg" width="32px" aspect-ratio="1" contain class="pa-3 ma-3"/>
                </v-avatar>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col cols="12" sm="4" class="content-center">
        <div class="image-feature content-center">
          <img src="@/assets/images/img_1.png" alt="sevices" />
        </div>
      </v-col>
      <v-col cols="12" :sm="4" class="content-center">
        <v-list flat>
          <v-list-item-group v-model="item" color="#2C7873">
            <v-list-item v-for="(item, i) in items2" :key="i">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
    <v-row >
      <v-col cols="12" :sm="4" class="content-center">
        <v-list flat>
          <v-list-item-group v-model="item" color="#2C7873">
            <v-list-item v-for="(item, i) in items3" :key="i">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col cols="12" sm="4" class="content-center">
        <v-list flat >
          <v-list-item-group v-model="item" color="#2C7873">
            <v-list-item v-for="(item, i) in items4" :key="i">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col cols="12" sm="4" class="content-center">
        <v-list flat>
          <v-list-item-group v-model="item" color="#2C7873">
            <v-list-item v-for="(item, i) in items5" :key="i">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>

    <v-row class="mt-5">
      <v-col cols="12">
        <div class="heading text-center">
          <h2>
            Aussie Petz
            <font color="#000000">is Quick & Easy</font>
          </h2>
        </div>
      </v-col>
    </v-row>
    <v-row justify="space-around" class="mt-3">
      <v-col cols="12" sm="4" v-for="(quickeasy, i) in QuickEasy" :key="i">
        <v-card>
          <v-card-text class="text-center">
            <v-avatar color="#00D657" size="150" style="background:#2c7873">
              <v-icon style="color:#FAEF63; font-size: 5rem;font-weight:bold">{{
                quickeasy.icon
              }}</v-icon>
            </v-avatar>
          </v-card-text>

          <v-card-title class="text-center" style="display: block">{{
            quickeasy.title
          }}</v-card-title>
          <v-card-text class="text-justify">{{ quickeasy.desc }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "OurMainFeature",
  data: () => ({
    item:[],
    items: [
      { text: "Find a Reliable Pet Host", icon: "mdi-magnify" },
      { text: "Day Care Services", icon: "mdi-cards-heart" },
      { text: "Grooming Services", icon: "mdi-trophy" },
      { text: "Pet Training Services", icon: "mdi-cart" },
      { text: "House Setting Services", icon: "mdi-headset" },
    ],
    items2: [
      { text: "Local vets directory", icon: "mdi-magnify" },
      { text: "Pet Park locations", icon: "mdi-cards-heart" },
      { text: "Local Pet Shop Directory", icon: "mdi-trophy" },
      { text: "Animal Charities", icon: "mdi-cart" },
      { text: "Pet Insurance for sale ", icon: "mdi-headset" },
    ],
    items3: [
      { text: "Walkies & Exercise Services", icon: "mdi-magnify" },
      { text: "Win Prizes", icon: "mdi-cards-heart" },
      { text: "Aussie Pet BnB March", icon: "mdi-trophy" },
      { text: "One Stop shop for Pet Products", icon: "mdi-cart" },
      { text: "Virtual Assistant Desk ", icon: "mdi-headset" },
    ],
    items4: [
      { text: "Pet Tube", icon: "mdi-magnify" },
      { text: "Pet 0 Gram", icon: "mdi-cards-heart" },
      { text: "Pet Pad", icon: "mdi-trophy" },
      { text: "Pet Events", icon: "mdi-cart" },
      { text: "Perfect Match Your Pets", icon: "mdi-headset" },
    ],
    items5: [
      { text: "Find your pet / lost pets", icon: "mdi-magnify" },
      { text: "Adopt & Rescue A Pet", icon: "mdi-cards-heart" },
      { text: "Pets Wanting New Homes", icon: "mdi-trophy" },
      { text: "Report Pet cruelty", icon: "mdi-cart" },
      { text: "Wires", icon: "mdi-headset" },
    ],

    QuickEasy: [
      {
        title: "Search for your requirement",
        desc:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et",
        icon: "mdi-magnify",
      },
      {
        title: "Make a Booking",
        desc:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et",
        icon: "mdi-weight",
      },
      {
        title: "Enjoy Peace of Mind",
        desc:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et",
        icon: "mdi-paw",
      },
    ],
  }),
};
</script>
<style scoped>
.image-feature img {
  width: 70%;
}
.heading h2 {
  color: #2c7873;
  font-weight: 800;
  text-align: center;
  font-size: 1.5em;
}

.heading h2:before,
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
}
.v-list-item__icon {
  margin: 5px 0;
}
.v-icon.v-icon {
  border: 2px solid #52de97;
  border-radius: 50%;
  padding: 3px;
  font-size: 1.3rem;
}
.theme--light.v-icon {
  color: #2c7873;
}
.v-application--is-ltr .v-list-item__action:first-child,
.v-application--is-ltr .v-list-item__icon:first-child {
  margin-right: 13px;
}
.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  /* color: rgba(0, 0, 0, 0.87) !important; */
  color: #2c7873 !important;
}
.v-list-item .v-list-item__title, .v-list-item .v-list-item__subtitle{
  font-weight: bold;
}
.content-center{
  display: flex;
    justify-content: center;
}
</style>
