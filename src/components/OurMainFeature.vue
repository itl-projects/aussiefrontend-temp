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
              <v-img :src="item.icon"  contain class="icons"></v-img>
              <v-list-item-icon class="text-center">   
                
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
                <v-img :src="item.icon" class="icons"></v-img>
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
                <v-img :src="item.icon" class="icons"></v-img>
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
                <v-img :src="item.icon" class="icons"></v-img>
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
                <v-img :src="item.icon" class="icons"></v-img>
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
      { text: "Find a Reliable Pet Host", icon: require("../assets/images/icons/dog-training.svg") },
      { text: "Day Care Services", icon:  require("../assets/images/icons/dayCareServices.svg") },
      { text: "Grooming Services", icon: require("../assets/images/icons/groomingServices.svg") },
      { text: "Pet Training Services", icon: require("../assets/images/icons/petTrainingServices.svg") },
      { text: "House Setting Services", icon: require("../assets/images/icons/houseSettingServices.svg") },
    ],
    items2: [
      { text: "Local vets directory", icon: require("../assets/images/icons/veterinary.svg") },
      { text: "Pet Park locations", icon: require("../assets/images/icons/petTrainingServices.svg") },
      { text: "Local Pet Shop Directory", icon: require("../assets/images/icons/localPetShop.svg") },
      { text: "Animal Charities", icon: require("../assets/images/icons/animalCharity.svg") },
      { text: "Pet Insurance for sale ", icon: require("../assets/images/icons/pet-insurance.svg") },
    ],
    items3: [
      { text: "Walkies & Exercise Services", icon: require("../assets/images/icons/walkiesNServices.svg") },
      { text: "Win Prizes", icon: require("../assets/images/icons/winPrizes.svg") },
      { text: "Aussie Pet BnB March", icon: require("../assets/images/icons/aussiePetBNBMarch.svg") },
      { text: "One Stop shop for Pet Products",  icon: require("../assets/images/icons/oneStopShop.svg") },
      { text: "Virtual Assistant Desk ", icon: require("../assets/images/icons/virtualAsst.svg") },
    ],
    items4: [
      { text: "Pet Tube", icon: require("../assets/images/icons/walkiesNServices.svg") },
      { text: "Pet 0 Gram", icon: require("../assets/images/icons/walkiesNServices.svg") },
      { text: "Pet Pad", icon: require("../assets/images/icons/walkiesNServices.svg") },
      { text: "Pet Events", icon: require("../assets/images/icons/event 1.svg") },
      { text: "Perfect Match Your Pets", icon: require("../assets/images/icons/perfectMatch.svg") },
    ],
    items5: [
      { text: "Find your pet / lost pets", icon: require("../assets/images/icons/lostPet.svg") },
      { text: "Adopt & Rescue A Pet", icon: require("../assets/images/icons/walkiesNServices.svg") },
      { text: "Pets Wanting New Homes", icon: require("../assets/images/icons/walkiesNServices.svg") },
      { text: "Report Pet cruelty", icon: require("../assets/images/icons/rabbit.svg") },
      { text: "Rescue Services Wild Animals", icon: require("../assets/images/icons/wild-life.svg") },
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
/* .v-icon.v-icon {
  border: 2px solid #faef60;
  border-radius: 50%;
  padding: 3px;
  font-size: 1.3rem;
} */
.icons{
  border: 2px solid #faef60;
  border-radius: 50%;
  padding: 15px;
  font-size: 1.3rem;
  max-width:30px ;
  max-height:30px;
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
