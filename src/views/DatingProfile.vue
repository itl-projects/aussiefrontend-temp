<template>
  <v-app>
    <NavBar />
    <div>
      <v-row class="backgroundClass">
        <v-col cols="5">
          <v-card style="display: flex;margin: auto;">
            <v-col>
              <v-col class="containerClass">
                <div class="head">
                  <h3 class="heading">Create your dating profile</h3>
                  <span class="marker"></span>
                </div>
                <div class="formFill">
                  <v-col cols="6" class="pa-0 pr-2">
                    <div>
                      <label>Name</label>
                      <v-text-field :aria-autocomplete="false" color="#0fef70"></v-text-field>
                    </div>
                    <div>
                      <label>Place of Living</label>
                      <v-text-field :aria-autocomplete="false" color="#0fef70"></v-text-field>
                    </div>
                    <div></div>
                    <div>
                      <label>Show me</label>
                    </div>
                    <div>
                      <div class="sliderControl">
                        <label>Age Range</label>
                        <span>{{age}}</span>
                      </div>
                      <v-slider v-model="age" color="#0fef70"></v-slider>
                    </div>
                  </v-col>
                  <v-col cols="6" class="pa-0">
                    <div>
                      <label>Borthday</label>
                      <v-text-field :aria-autocomplete="false" color="#0fef70"></v-text-field>
                    </div>
                    <div>
                      <label>Mobile No.</label>
                      <v-text-field :aria-autocomplete="false" color="#0fef70"></v-text-field>
                    </div>
                    <div>
                      <div class="sliderControl">
                        <label>Distance</label>
                        <span>Distance:{{distance}}km</span>
                      </div>
                      <v-slider v-model="distance" color="#0fef70"></v-slider>
                    </div>
                  </v-col>
                </div>
                <v-btn class="createProfile" dark color="#383D43" to="/dating-home">Create</v-btn>
              </v-col>
            </v-col>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <Footer />
  </v-app>
</template>
<script>
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default {
  name: "DatingProfile",
  components: {
    NavBar,
    Footer
  },
  data() {
    return {
      datingName: null,
      birthdate: null,
      place: null,
      mobileNo: null,
      distance: 0,
      age: 0
    };
  }
};
</script>
<style  scoped>
.v-text-field {
  padding-top: 0px;
  margin: 0px;
}

.backgroundClass {
  background: url("https://source.unsplash.com/1600x900/?soulmate,dating");
  padding: 5%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.containerClass {
  margin: 5% 2%;
}

.formFill {
  display: flex;
}

.head {
  margin-bottom: 5%;
}

.head > .heading {
  font-family: "Poppins", sans-serif;
  letter-spacing: 1.23px;
}

.head > .marker {
  background-color: #0fef70;
  height: 2px;
  width: 13%;
  display: block;
}

.createProfile {
  padding: 5% 10% !important;
  border-radius: 50px;
}

.sliderControl {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sliderControl > span {
  font-size: 0.7rem;
  margin-right: 2%;
}

label {
  font-family: "Poppins", sans-serif;
}
</style>