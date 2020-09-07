<template>
  <v-container grid-list-xs class="mt-5">
    <v-row>
      <v-col cols="12">
        <div class="heading text-center">
          <h2>ALL FEATURES & SERVICES</h2>
        </div>
      </v-col>
    </v-row>
    <!-- changes start -->
    <v-row>
      <v-col v-for="n in 3" :key="n" cols="4">
        <v-list flat class="carousel-items">
          <v-list-item-group v-model="item" style="padding: 10% 0%" color="#2C7873">
            <v-list-item
              style="margin: 10% auto;color: #383D43 !important;"
              v-for="(item, i) in items3"
              :key="i"
            >
              <v-list-item-avatar class="pa-2">
                <v-img :src="item.icon" contain></v-img>
              </v-list-item-avatar>
              <v-list-item-content style>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
    <!-- end changes -->

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
      <v-card
        style="display: flex;border-radius: 50px;box-shadow: 0px 6px 20px #0000004D;padding: 5% 5%;"
      >
        <v-col cols="12" sm="4" v-for="(quickeasy, i) in QuickEasy" :key="i">
          <v-card-text class="text-center">
            <v-avatar color="#0FEF70" size="150" style="background:#0FEF70">
              <v-icon style="color:#fff; font-size: 5rem;font-weight:bold">{{ quickeasy.icon }}</v-icon>
            </v-avatar>
          </v-card-text>

          <v-card-title
            class="text-center"
            style="display: block; color: #00d657;font: normal normal bold 32px/38px Roboto; font-size: 1.5vw;"
          >{{ quickeasy.title }}</v-card-title>
          <v-card-text
            style="font: normal normal 600 24px/40px Baloo Tamma 2;color:#9E9E9E;width: 70%; text-align: center;margin: auto;"
            class="text-justify"
          >{{ quickeasy.desc }}</v-card-text>
        </v-col>
      </v-card>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "OurMainFeature",

  data: () => ({
    item: [],
    items: [
      {
        text: "Find a Reliable Pet Host",
        icon: require("../assets/images/icons/dog-training.svg")
      },
      {
        text: "Day Care Services",
        icon: require("../assets/images/icons/dayCareServices.svg")
      },
      {
        text: "Grooming Services",
        icon: require("../assets/images/icons/groomingServices.svg")
      },
      {
        text: "Pet Training Services",
        icon: require("../assets/images/icons/petTrainingServices.svg")
      },
      {
        text: "House Setting Services",
        icon: require("../assets/images/icons/houseSettingServices.svg")
      }
    ],
    items2: [
      {
        text: "Local vets directory",
        icon: require("../assets/images/icons/veterinary.svg")
      },
      {
        text: "Pet Park locations",
        icon: require("../assets/images/icons/petTrainingServices.svg")
      },
      {
        text: "Local Pet Shop Directory",
        icon: require("../assets/images/icons/localPetShop.svg")
      },
      {
        text: "Animal Charities",
        icon: require("../assets/images/icons/animalCharity.svg")
      },
      {
        text: "Pet Insurance for sale ",
        icon: require("../assets/images/icons/pet-insurance.svg")
      }
    ],
    items3: [
      {
        text: "Walkies & Exercise Services",
        icon: require("../assets/images/icons/walkiesNServices.svg")
      },
      {
        text: "Aussie Pet BnB March",
        icon: require("../assets/images/icons/aussiePetBNBMarch.svg")
      },
      {
        text: "One Stop shop for Pet Products",
        icon: require("../assets/images/icons/oneStopShop.svg")
      },
      {
        text: "Virtual Assistant Desk ",
        icon: require("../assets/images/icons/virtualAsst.svg")
      }
    ],
    items4: [
      {
        text: "Pet Tube",
        icon: require("../assets/images/icons/walkiesNServices.svg")
      },
      {
        text: "Pet 0 Gram",
        icon: require("../assets/images/icons/walkiesNServices.svg")
      },
      {
        text: "Pet Pad",
        icon: require("../assets/images/icons/walkiesNServices.svg")
      },
      {
        text: "Pet Events",
        icon: require("../assets/images/icons/event 1.svg")
      },
      {
        text: "Perfect Match Your Pets",
        icon: require("../assets/images/icons/perfectMatch.svg")
      }
    ],
    items5: [
      {
        text: "Find your pet / lost pets",
        icon: require("../assets/images/icons/lostPet.svg")
      },
      {
        text: "Adopt & Rescue A Pet",
        icon: require("../assets/images/icons/walkiesNServices.svg")
      },
      {
        text: "Pets Wanting New Homes",
        icon: require("../assets/images/icons/walkiesNServices.svg")
      },
      {
        text: "Report Pet cruelty",
        icon: require("../assets/images/icons/rabbit.svg")
      },
      {
        text: "Rescue Services Wild Animals",
        icon: require("../assets/images/icons/wild-life.svg")
      }
    ],

    QuickEasy: [
      {
        title: "Search for your requirement",
        desc:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et",
        icon: "mdi-magnify"
      },
      {
        title: "Make a Booking",
        desc:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et",
        icon: "mdi-weight"
      },
      {
        title: "Enjoy Peace of Mind",
        desc:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et",
        icon: "mdi-paw"
      }
    ]
  })
};
</script>
<style scoped>
.image-feature img {
  width: 70%;
}
.heading h2 {
  color: #383d43;
  font: normal normal bold 50px/76px Poppins;
  text-align: center;
  font-size: 1.5em;
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
.v-application--is-ltr .v-list-item__avatar:first-child {
  margin-right: 16px;
}
.theme--light.v-icon {
  color: #fff;
}
.v-application--is-ltr .v-list-item__action:first-child,
.v-application--is-ltr .v-list-item__icon:first-child {
  margin-right: 13px;
}
.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  /* color: rgba(0, 0, 0, 0.87) !important; */
  color: #2c7873 !important;
}
.v-list-item .v-list-item__title,
.v-list-item .v-list-item__subtitle {
  font-weight: bold;
}
.v-image__image {
  background-size: none !important;
}
.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
  border-radius: 4px;
}
.carousel-items {
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 6px 20px #0000006e;
  /* margin: 10% auto; */
  width: fit-content;
  padding: 0px 0.5vw;
}
.carousel-slides {
  display: flex;
  justify-content: space-around;
}
</style>
