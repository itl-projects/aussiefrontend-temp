<template>
  <v-app>
    <v-row v-for="n in 3" :key="n">
      <v-col cols="3" v-for="n in 4" :key="n">
        <v-card class="trendingCard" max-width="230" max-height="400" outlined>
          <div class="upperSection">
            <v-img
              max-width="230"
              max-height="300"
              class="imgProduct"
              src="https://source.unsplash.com/900x900/?cat-food,dog-food"
              lazy-src="https://source.unsplash.com/900x900/?cat-food,dog-food"
            ></v-img>
          </div>
          <div class="bottomSection">
            <div class="head">
              <div>product title</div>
              <span>
                4.5
                <v-icon small color="#f0932b">mdi-star</v-icon>
              </span>
            </div>
            <div class="price">
              <span>$200</span>
            </div>
            <div class="controls">
              <v-btn
                color="#0FEF70"
                dark
                small
                style="font-size: 0.8rem;padding: 0 10%;border-radius: 20px;"
              >Add to cart</v-btn>
              <v-btn icon color="#FF0909">
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <div class="link">
      <v-btn text to="/shop/products">Check to see more products...</v-btn>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "ShopTrending"
};
</script>

<style scoped>
.trendingCard {
  box-shadow: 0px 3px 6px #0000000d;
  border: 1px solid #f1f1f1 !important;
  border-radius: 20px !important;
  margin: auto;
}

.upperSection > .imgProduct {
  border-radius: 20px 20px 0 0;
}

.bottomSection {
  padding: 5%;
  margin: 5% 0;
}

.bottomSection > .head {
  display: flex;
  justify-content: space-between;
  text-transform: capitalize;
  font-size: 1rem;
  align-items: center;
}

.bottomSection > .head > div,
.bottomSection > .head > span,
.bottomSection > .price > span {
  font-family: "Poppins", sans-serif;
}

.bottomSection > .head > span,
.bottomSection > .price > span {
  color: #0fef70;
  font-size: 0.9rem;
}

.bottomSection > .controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.link {
  font-family: "Poppins", sans-serif;
  color: #0fef70;
  font-weight: bold;
  text-align: end;
  margin: 3%;
}
</style>