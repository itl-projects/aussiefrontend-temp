<template>
  <v-container grid-list-xs class="mt-5">
    <v-row class="mt-5">
      <v-col cols-12>
        <div class="heading text-center">
          <h2 class="head">
            Premium services
          </h2>
        </div>
      </v-col>
    </v-row>
    <div class="premium__cards">
      <v-row v-for="m in 2" :key="m">
        <v-col v-for="n in 2" :key="n" style="display: flex;" cols="6">
          <v-card
            style="border-radius: 20px; display: flex;"
            :class="m == n ? 'greenClass' : 'greyClass'"
          >
            <v-col cols="3">
              <v-avatar
                :class="m == n ? 'greyClass' : 'greenClass'"
                style="margin: 22px 10px;"
                size="100"
              >
              </v-avatar>
            </v-col>
            <v-col cols="9">
              <div class="premiumInfo">
                <div
                  class="premiumInfo__title"
                  :style="m == n ? 'color: #383d43' : 'color: #0fef70'"
                >
                  make fetch! happen
                </div>
                <p class="premiumInfo__content">
                  If you love pets and want exciting work, apply to be a Fetch!
                  Pet Care
                </p>
                <v-btn class="premiumInfo__btn">Join Now</v-btn>
              </div>
            </v-col>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script>
export default {
  name: "Shop",
  components: {},
};
</script>
<style scoped>
.heading h2 {
  color: #383d43;
  font: normal normal bold 50px/76px Poppins;
  text-align: center;
  font-size: 1.5em;
  text-align: center;
}

.premiumInfo > .premiumInfo__title {
  color: #222222;
  font-family: "Roboto", cursive;
  text-transform: capitalize;
  font-size: 1rem;
  font-weight: bolder;
}

.premiumInfo > .premiumInfo__content {
  font-family: "Open Sans", sans-serif;
  color: #f8f8f8;
}

.premiumInfo > .premiumInfo__btn {
  border-radius: 50px;
  text-transform: capitalize;
  color: #fe6845;
}

.greenClass {
  background-color: #0fef70;
}

.greyClass {
  background-color: #383d43;
}

.premium__cards {
  padding: 0px 5% 10% 5%;
}
</style>
