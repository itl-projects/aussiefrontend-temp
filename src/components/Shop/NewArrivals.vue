<template>
    <div>
<v-sheet
    class="mx-auto"
    max-width="100%"
  >
    <v-slide-group
      v-model="model"
      class="pa-4"
      show-arrows
    >
      <v-slide-item
        v-for="n in 15"
        :key="n"
      >
        <SingleProduct />
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
    </div>
</template>

<script>
import SingleProduct from "@/components/Shop/SingleProduct";
    export default {
        name:"NewArrival",
        components:{SingleProduct},
        data: () => ({
      model: [],
    }),
    }
</script>

<style scoped>

</style>