<template>
  <v-app>
    <NavBar />
    <v-container>
      <v-col>
        <v-btn to="/petcrush" outlined color="#383D43" style="margin-left: 1%;">
          Move to Pet Crush
          <v-icon color="#0FEF70" right>mdi-arrow-right-bold-circle</v-icon>
        </v-btn>
        <v-col v-for="n in 4" :key="n" class="pa-0 mt-4 profileClass">
          <v-col cols="3" v-for="n in 4" :key="n">
            <v-card
              class="cardDes"
              min-width="230"
              max-width="250"
              min-height="320"
              max-height="500"
            >
              <v-img
                max-height="250"
                min-height="280"
                max-width="100%"
                min-width="100%"
                src="https://source.unsplash.com/500x900/?women-dating,men-dating"
                lazy-src="https://source.unsplash.com/1600x900/?women-dating,men-dating"
              >
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
              <div class="profileInfo">
                <span>emma watson</span>
                <span class="age">Age 21</span>
              </div>
              <div class="location">L.A , USA</div>
              <div class="controls">
                <v-dialog v-model="dialog" width="1200">
                  <template v-slot:activator="{on, attrs}">
                    <v-btn class="viewProfile" v-on="on" v-bind="attrs">View profile</v-btn>
                  </template>
                  <v-card
                    min-height="250"
                    max-height="500"
                    style="display: flex;border-radius: 20px;"
                  >
                    <v-col cols="4" class="pa-0 image">
                      <carousel :perPage="1">
                        <slide v-for="n in 3" :key="n">
                          <v-img
                            max-height="500"
                            max-width="auto"
                            src="https://source.unsplash.com/500x900/?women-dating,men-dating"
                            lazy-src="https://source.unsplash.com/500x900/?women-dating,men-dating"
                          ></v-img>
                        </slide>
                      </carousel>
                    </v-col>
                    <v-col cols="8" class="information">
                      <div class="upperSection">
                        <div class="head">
                          <h2>emma watson</h2>
                          <span>age 21</span>
                        </div>
                        <div class="fromLocation">
                          <v-icon color="#000" left>mdi-water-alert-outline</v-icon>Australia
                        </div>
                      </div>
                      <div class="bottomSection">
                        <div class="details">
                          <div class="hobbies">
                            Hobbies:
                            <span>Travelling,Reading,Watching movies</span>
                          </div>
                          <div class="about">
                            <h2>About Me</h2>
                            <p>Taking care of others, helping people, and making people smile. Yes, I know that sounds cheesy but I try really hard to brighten the day of everyone I meet, even if it’s just by asking a cashier how they are or holding the door open for someone. I try to always think about that quote by the Dalai Lama: ‘Be kind whenever possible. It is always possible</p>
                          </div>
                        </div>
                        <v-btn
                          color="#0FEF70"
                          style="border-radius: 20px;color: #fff;padding: 1% 5%;text-transform: capitalize;"
                        >
                          Liked
                          <v-icon color="#000">mdi-heart</v-icon>
                        </v-btn>
                      </div>
                    </v-col>
                  </v-card>
                </v-dialog>
                <v-icon
                  v-model="likeProfile"
                  v-show="likeProfile"
                  @click="likeProfile = !likeProfile"
                  color="red"
                  style="transform: scale(1.2); transition: ease-in;"
                >mdi-cards-heart</v-icon>
                <v-icon
                  v-model="likeProfile"
                  v-show="!likeProfile"
                  @click="likeProfile = !likeProfile"
                  color="red"
                >mdi-heart-outline</v-icon>
              </div>
            </v-card>
          </v-col>
        </v-col>
      </v-col>
    </v-container>
    <Footer />
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Carousel, Slide } from "vue-carousel";

export default {
  name: "DatingHome",
  components: {
    NavBar,
    Footer,
    Carousel,
    Slide
  },
  data() {
    return {
      likeProfile: false
    };
  }
};
</script>

<style scoped>
.profileClass {
  display: flex;
  justify-content: space-evenly;
}

.cardDes {
  box-shadow: 0px 3px 6px #0000000d;
  border-radius: 20px !important;
}

.profileInfo {
  font-family: "Poppins", sans-serif;
  text-transform: capitalize;
  font-size: 1rem;
  display: flex;
  color: #000;
  font-weight: bold;
  margin-top: 5%;
  justify-content: space-between;
  padding: 0 5%;
}

.profileInfo > .age {
  color: #0fef70;
  font-weight: normal;
}

.location {
  font-size: 0.8rem;
  color: #0fef70;
  padding: 0 5%;
}

.controls {
  padding: 0 5%;
  margin-top: 5%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5%;
  padding-bottom: 5%;
}

.controls > .viewProfile {
  color: #fff !important;
  background-color: #0fef70 !important;
  border-radius: 50px;
  font-size: 0.8rem !important;
  padding: 0 10%;
  transform: scale(0.8);
  transform-origin: left;
}

.information {
  padding: 2%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.information > .upperSection > .head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.information > .upperSection > .head > h2 {
  text-transform: capitalize;
  color: #383d43;
  font-size: 2rem !important;
  font-family: "Poppins", sans-serif;
  font-weight: bolder !important;
}
.information > .upperSection > .head > span {
  font-size: 1.3rem;
  text-transform: capitalize;
  color: #0fef70;
  font-family: "Poppins", sans-serif;
}

.information > .upperSection > .fromLocation {
  font-size: 1.5rem;
  color: #0fef70;
}

.bottomSection > .details > .hobbies {
  font-size: 1.2rem;
  color: #383d43;
  font-weight: bold;
  margin-bottom: 2%;
  font-family: "Poppins", sans-serif;
}
.bottomSection > .details > .hobbies > span {
  color: #0fef70;
  font-weight: normal;
  font-family: "Poppins", sans-serif;
}

.bottomSection > .details > .about > h2,
.bottomSection > .details > .about > p {
  color: #383d43;
  font-family: "Poppins", sans-serif;
}
</style>
<style>
/* Not Efficent way */
.VueCarousel-pagination[data-v-438fd353] {
  position: absolute;
  bottom: 0;
}
</style>