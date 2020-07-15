<template>
    <div>
        <v-card
    :loading="loading"
    class="mx-2 my-2"
    width="200px"
  >
    <v-img
      height="150px"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title class="pt-1 pb-0">Cafe Badilico</v-card-title>

    <v-card-text class="py-0">
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>
        <div class="grey--text ml-4">4.5 (413)</div>
      </v-row>

      <div class="my-2 subtitle-1">
        <b>$</b> <span>200</span>
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions class="pa-0">
      <v-btn block
        color="deep-purple lighten-2"
        text >
        View Product

      </v-btn>
    </v-card-actions>
  </v-card>
    </div>
</template>

<script>

    export default {
        name:"SingleProduct",
        data:()=>({
            loading:false
        })

    }
</script>

<style scoped>

</style>