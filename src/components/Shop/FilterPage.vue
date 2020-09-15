<template>
  <v-app>
    <v-container style="display: flex;" fluid>
      <v-col style="flex: 0.15" class="pl-0 pt-0 pb-0">
        <template>
          <v-card outlined height="100%" style="overflow: hidden;">
            <h2 class="fliterHead">Filter</h2>
            <v-navigation-drawer width="auto" permanent>
              <v-list nav dense>
                <v-list-item link>
                  <v-list-item-title>Product 1</v-list-item-title>
                </v-list-item>
                <v-list-item link>
                  <v-list-item-title>Product 1</v-list-item-title>
                </v-list-item>
                <v-list-item link>
                  <v-list-item-title>Product 1</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-navigation-drawer>
          </v-card>
        </template>
      </v-col>
      <v-col style="flex: 0.85">
        <div class="products">
          <div class="header">
            <h1>Products</h1>
            <div class="sortProducts">
              <span>Sort By</span>
              <v-icon right color="#0FEF70">mdi-arrow-left-right</v-icon>
            </div>
          </div>
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
        </div>
      </v-col>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "Products",
  components: {},
  created() {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }
};
</script>

<style scoped>
.products > .header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.products > .header > h1 {
  font-family: "Poppins", sans-serif;
  color: #383d43;
}
.fliterHead {
  margin: 0 5%;
  font-family: "Poppins", sans-serif;
  color: #383d43;
}

.products > .header > .sortProducts {
  background-color: #f1f1f1;
  padding: 2px 10px;
  font-size: 0.9rem;
  cursor: pointer;
  margin: 0 2%;
  font-weight: bold;
  background: #f1f1f1 0% 0% no-repeat padding-box;
  border-radius: 20px;
}

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
</style>