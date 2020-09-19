<template>
  <v-container grid-list-xs :fluid="true">
    <v-row class="mt-5">
      <v-col>
        <div class="heading text-center">
          <h2>CLIENT REVIEWS</h2>
        </div>
      </v-col>
    </v-row>
    <v-container class>
      <v-row no-gutters style>
        <v-col align-self="center">
          <CarouselCard :interval="7000" height="300px" type="card" arrow="always">
            <CarouselCardItem v-for="i in reviews" :key="i.name">
              <div class="px-4 reviews">
                <div>{{i.desc}}</div>
                <v-avatar>
                  <v-img :src="i.image" :lazy-src="i.image"></v-img>
                </v-avatar>
                <div class="name">{{i.name}}</div>
              </div>
            </CarouselCardItem>
          </CarouselCard>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { CarouselCard, CarouselCardItem } from "vue-carousel-card";
import "vue-carousel-card/styles/index.css";
export default {
  name: "ClientReview",
  components: {
    CarouselCard,
    CarouselCardItem
  },
  data: () => ({
    reviews: [
      {
        name: "Evan You",
        desc:
          "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well.",
        image:
          "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
      },
      {
        name: "ABC You",
        desc:
          "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well.",
        image:
          "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
      },
      {
        name: "EFD You",
        desc:
          "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well.",
        image:
          "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
      },
      {
        name: "EFD You",
        desc:
          "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well.",
        image:
          "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
      },
      {
        name: "xyzs",
        desc:
          "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well.",
        image:
          "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
      }
    ]
  })
};
</script>

<style scoped>
.heading h2 {
  color: #2c7873;
  font-weight: 620;
  text-align: center;
  font-size: 1.5em;
}

.heading h2:before,
.heading h2:after {
  background-color: #2c7873;
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

.cat img {
  width: 76%;
  float: right;
  margin-right: -36px;
  margin-top: 21px;
  /* border-bottom: 2px solid #2c7873; */
}

.toy img {
  float: right;
  margin-top: -57px;
  margin-right: -15px;
  width: 62px;
}

.toy-mob:nth-child(1) {
  text-align: center;
  margin-top: 10px;
}

.cat-mob:nth-child(2) {
  padding-left: 30%;
}

.cat-mob img {
  width: 30%;
  /* margin-top: 20px; */
  /*  */
}

.toy-mob img {
  margin-top: -50px;
}

.item {
  height: 315px;
}

.avatar-box {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -25%);
  border: 2px solid #2c7873;
  border-radius: 50%;
  padding: 0;
  width: 62px;
  height: 62px;
  overflow: hidden;
  box-sizing: content-box;
}

span {
  border: 2px solid #2c7873 !important;
}

.reviews {
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: linear-gradient(
    45deg,
    rgba(88, 140, 236, 1),
    rgba(106, 106, 207, 1)
  );
}

.reviews > div {
  font-family: "Poppins", sans-serif;
  padding: 5% 0;
}

.reviews > .name {
  background-color: #0fef70c6;
  padding: 0.5% 2%;
  border-radius: 10px;
}
</style>