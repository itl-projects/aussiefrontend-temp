<template>
  <v-container grid-list-xs class="mt-5">
    <v-row class="mt-5">
      <v-col cols="12" sm="6">
        <div class="heading text-center">
          <h2>
            Purrfect
            <font color="#000000">Match</font>
          </h2>
        </div>
      </v-col>
    </v-row>
    <v-row class="text-center">
       <v-col cols="12" sm="6" class="text-center">
          <img src="@/assets/images/logo/font_logo.png" width="200px">
       </v-col>
       <v-col cols="6">
          <p>Purrrfect match is our pet hook-up, breeding and socialising</p>
          
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