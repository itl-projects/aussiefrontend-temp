<template>
  <div>
    <v-row>
      <v-col>
        <v-card flat tile>
          <v-window v-model="onboarding" vertical>
            <v-window-item v-for="n in pics.length" :key="`card-${n}`">
              <v-card color="white" height="60vh" flat>
                <!-- <v-row class="fill-height" align="center" justify="center" tag="v-card-text"> -->
                  <!-- <h1 style="font-size: 5rem;" class="white--text">Slide {{ n }}</h1> -->
                  <v-img :src="pics[n-1].src" height="60vh" aspect-ratio="1" contain />
                <!-- </v-row> -->
              </v-card>
            </v-window-item>
          </v-window>
          <v-card-actions class="justify-space-between mt-5">
            <v-btn text @click="prev">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-item-group v-model="onboarding" class="text-center py-4" mandatory>
              <v-item v-for="n in pics.length" :key="`btn-${n}`" v-slot:default="{ active, toggle }" style="overflow: hidden;">
                <v-card :color="active ? 'pic-active' : undefined"
                class="mx-2 my-4"
                height="100"
                width="100"
                :input-value="active" @click="toggle" >
                <v-img :src="pics[n-1].src" width="100px" height="100px"/>
              </v-card>
               
              </v-item>
            </v-item-group>
            <v-btn text @click="next">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "galleryView",
  props: ["pics","onboarding"],
  data: () => ({
    model: null,
    length: 3,
  }),
  methods: {
    next() {
      this.onboarding =
        this.onboarding + 1 === this.pics.length ? 0 : this.onboarding + 1;
    },
    prev() {
      this.onboarding =
        this.onboarding - 1 < 0 ? this.pics.length - 1 : this.onboarding - 1;
    }
  },
  computed:function(){
      this.length = this.pics.length;
  }
};
</script>

<style scoped>
.v-item-group:nth-child(2){
    display: flex !important;
    overflow-x: auto;
    overflow-y: none;
}
.pic-active{
    border: 2px dashed #e9bc07;
    transform: scale(1.2);
}
</style>