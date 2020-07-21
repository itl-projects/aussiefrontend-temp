<template>
  <v-container :fluid="true" grid-list-xs class="p-0" style="position:relative">
    <carousel
      :responsive="{0:{items:1},600:{items:1},1000:{items:1}}"
      v-bind:nav="false"
      v-bind:margin="0"
      :autoplayHoverPause="true"
      v-bind:autoplay="true"
      v-bind:dots="true"
      v-bind:loop="true"
      
    >
      <div class="item" style="height:80vh">
        <div class="bottom-text">
          <h2 class="caption-heading text-primary backInLeft">
            "We Provide The Best
            <br/>Care For Your Pets"
          </h2>
          <br/>
          
        </div>
        <div class="most-bottom-text">
            <p>The best pets clinic at melbourne, more than 20.000+ customers happy.</p>
          </div>
        <v-img src="images/silder1.jpg" alt aspect-ratio="2" eager/>
      </div>
      <div class="item" style="height:80vh">
        <v-img src="images/silder2.jpg" alt aspect-ratio="2" eager/>
      </div>
      <div class="item" style="height:80vh">
        <v-img src="images/silder3.jpg" alt aspect-ratio="2" eager/>
      </div>
    </carousel>
  </v-container>
</template>
<script>
import carousel from "vue-owl-carousel";
export default {
  name: "Silder",
  components: { carousel },
  data() {
    return {
      slides: ["First", "Second", "Third"]
    };
  }
};
</script>
<style scoped>
.container {
  padding: 0px;
}

.caption-heading {
  color: #ffffff;
  font-size: 40px;
  font-weight: 800;
}
.item p {
  font-size: 21px;
  color: #ffffff;
  padding: 0;
}
.owl-carousel.owl-drag .owl-item {
  height: 70vh !important;
}
@media only screen and (max-width: 600px) {
  .caption-heading {
    position: absolute;
    top: 10%;
    left: 10%;
    color: #ffffff;
    font-size: 18px;
    font-weight: 800;
  }
  .item p {
    font-size: 18px;
    color: #ffffff;
    padding: 0;
  }
}
.front_logo {
  position: absolute;
  top: 2%;
  z-index: 999;
  width: 30%;
  left: 10px;
  overflow: auto;
  transform: rotate3d(12, -2, 24, -11deg);
}
.bottom-text {
  position: absolute;
  bottom: 10%;
  left: 0;
  z-index: 999;
  width: 100%;
  transform: translate(0%, -33px);
  text-align: center;
}
.most-bottom-text {
  position: absolute;
  bottom: 5%;
  left: 0;
  z-index: 999;
  width: 100%;
  transform: translate(0%, -33px);
  text-align: center;
}

</style>