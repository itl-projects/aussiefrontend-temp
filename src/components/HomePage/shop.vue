<template>
  <v-container grid-list-xs class="mt-5">
    <v-row class="mt-5">
      <v-col cols-12>
        <div class="heading text-center">
          <h2>
            Shop at
            <font color="#000000">Aussie Pets BNB</font>
          </h2>
        </div>
      </v-col>
    </v-row>
    <v-row>
       <v-col cols="6">
          <h1 class="tag">Give the Best to your pet.</h1>
          <p>Welcome to <font color="#00d657">Aussiepetsbnbz.com.au</font> pet shop, your one-stop online pet store for all your pet's needs. At Aussiepetsnbnz.com.au, we have discount sale prices and great value on a wide range of high-quality pet care products in one place.  </p>
          <p>We have a wide range of pet supplies including Bird Cages, Bird Seed, Bird Supplies, Bird Toys, Cat Litter Crystals, Cat Scratching Post, Cat Supplies, Crystal Cat Litter, Designer Dog Beds, Dog Clippers, Dog Crates, Dog Kennels, Dog Supplies, Fish Foods, Fish Tank Filters, Fish Tank Ornaments, Flea Treatment for Dogs, Special line of Organic Dog Food, Parrot Toys, Pet doors, Pet Supplies, Puppy Pens, Puppy Training Pads, Rabbit Hutches, Reptile & Aquarium Globes, Reptile Supplies, Vegan Dog Food, Vetafarm Bird Food, Zupreem, and so much more.  </p>
          <p>Browse our categories to find the product best suited to your needs. </p>
       </v-col> 
       <v-col cols="6">
          <img src="@/assets/images/logo/font_logo.png">
       </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "Shop",
  components: {}
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
.v-application p {
    margin-bottom: 16px;
    text-align: justify;
    letter-spacing: 1px;
    color: gray;
}
.tag{
  text-align: center;
    margin-bottom: 5%;
    color: #faff63;
    -webkit-text-fill-color: #faff63;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: #00d657
}
</style>