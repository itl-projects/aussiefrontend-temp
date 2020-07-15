<template>
    <div>
       <v-carousel :show-arrows="false" hide-delimiters  continuous cycle>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>

    </div>
</template>

<script>
    export default {
        name:"ShopSlider",
        data() {
    return {
        items: [
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
        ],
        }
    }
    }
</script>

<style scoped>
.container {
  padding: 0px;
}

.item p {
  font-size: 21px;
  color: #ffffff;
  padding: 0;
}
.owl-carousel.owl-drag .owl-item {
  height: 40vh !important;
}

</style>