<template>
  <v-row>
    <div id="example">
      <carousel-3d :controls-visible="true" :clickable="false">
        <slide v-for="(slide, i) in slides" :key="i">
          <figure>
            <img src="https://placehold.it/360x270" />
            <figcaption>
              The sky is the limit only for those who aren't afraid to fly! The
              sky is the limit only for those who aren't afraid to fly!
            </figcaption>
          </figure>
        </slide>
      </carousel-3d>
    </div>
  </v-row>
</template>
<script>
import {Carousel3d, Slide} from "vue-carousel-3d";
export default {
  name: "ClientReview",
  components: {
      Carousel3d,
      Slide
  },

  data: () => ({
    el: "example",
    slides: 7,
    reviews: [
      {
        name: "Evan You",
        desc:
          "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well.",
        image:
          "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light",
      },
      {
        name: "ABC You",
        desc:
          "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well.",
        image:
          "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light",
      },
      {
        name: "EFD You",
        desc:
          "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well.",
        image:
          "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light",
      },
      {
        name: "EFD You",
        desc:
          "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well.",
        image:
          "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light",
      },
      {
        name: "xyzs",
        desc:
          "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well.",
        image:
          "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light",
      },
    ],
  }),
  methods: {
    onAfterSlideChange(index) {
      console.log(
        "@onAfterSlideChange Callback Triggered",
        "Slide Index " + index
      );
    },
    onBeforeSlideChange(index) {
      console.log(
        "@onBeforeSlideChange Callback Triggered",
        "Slide Index " + index
      );
    },
    onLastSlide(index) {
      console.log("@onLastSlide Callback Triggered", "Slide Index " + index);
    },
  },
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

.carousel-3d-container figure {
  margin: 0;
}

.carousel-3d-container figcaption {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  bottom: 0;
  position: absolute;
  bottom: 0;
  padding: 15px;
  font-size: 12px;
  min-width: 100%;
  box-sizing: border-box;
}
</style>
