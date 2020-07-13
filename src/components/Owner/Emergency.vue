<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col cols="5">
        <v-card class="mx-auto" max-width="300">
          <v-img src="@/assets/images/OSP_Emergency_stop.svg" height="245px" width="100%"></v-img>

          <v-card-title>Emergency condition</v-card-title>

          <v-card-text>I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! 
              </v-card-text>
        </v-card>
        
      </v-col>
      <v-col cols="5">
        <v-row>
          <v-col cols="12">
            <v-text-field label="Emergency Email" required outlined dense hide-details="auto"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Emergency Contact" required outlined dense hide-details="auto"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              outlined
              label="Any additional informations"
              rows="5"
              counter="250"
              hide-details="auto"
            ></v-textarea>
          </v-col>
        </v-row>

        <v-btn color="warning">update details</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
export default {
  name: "Emergency",
  mixins: [validationMixin]
};
</script>

<style scoped>
.v-image {
  width: 70%;
}
</style>