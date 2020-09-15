<template>
  <div>
    <v-row>
      <v-col cols="12" class="py-0">
        <ShopSlider />
      </v-col>
    </v-row>
    <v-container fluid class="py-0">
      <v-row style="background-color:#DFE6E9;" justify="space-between">
        <v-col cols="12">
          <v-row>
            <v-col cols="8" class="pa-2 shopSearchBar">
              <v-select
                style="margin:0 2%;"
                :items="['food','carpets']"
                solo
                label="All Categories"
                no-data-text
                color="#0FEF70"
                flat
                hide-details
              />
              <v-text-field
                style="margin:0 2%;"
                solo
                append-icon="mdi-magnify"
                label="Search"
                no-data-text
                color="#0FEF70"
                flat
                hide-details
              />
            </v-col>
            <v-col cols="4" class="pa-2 shopSearchBar2">
              <v-btn dark color="#0FEF70" style="padding: 2% 8%;">Search</v-btn>
              <v-btn icon color="#0FEF70">
                <v-icon>mdi-cart</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row class="ma-4">
        <v-col class="shopFeatures">
          <v-icon style="font-size:3.5rem" class="pa-2" color="#0FEF70">mdi-truck-fast</v-icon>
          <div style="text-align: center;">
            <h3>Free</h3>
            <h3>Shipping</h3>
          </div>
        </v-col>
        <v-col class="shopFeatures">
          <v-icon style="font-size:3.5rem" class="pa-2" color="#0FEF70">mdi-currency-usd-circle</v-icon>
          <div style="text-align: center;">
            <h3>Money</h3>
            <h3>Guarantee</h3>
          </div>
        </v-col>
        <v-col class="shopFeatures">
          <v-icon style="font-size:3.5rem" class="pa-2" color="#0FEF70">mdi-wallet</v-icon>
          <div style="text-align: center;">
            <h3>Payment</h3>
            <h3>Method</h3>
          </div>
        </v-col>
        <v-col class="shopFeatures">
          <v-icon style="font-size:3.5rem" class="pa-2" color="#0FEF70">mdi-face-agent</v-icon>
          <div style="text-align: center;">
            <h3>Online</h3>
            <h3>Support</h3>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <h2
        style="color: #383D43; font-family: 'Poppins',san-serif;font-weight: bolder !important;"
      >Trending</h2>
      <ShopTrending />
    </v-container>
  </div>
</template>

<script>
import ShopSlider from "@/components/Shop/ShopSlider";
import ShopTrending from "@/components/Shop/ShopTrending";
export default {
  name: "Shop",
  components: {
    ShopSlider,
    ShopTrending
  },
  data() {
    return {
      itemsPerPageArray: [4, 8, 12],
      page: 1,
      itemsPerPage: 12,
      all_products: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 2, 3, 2, 3, 4, 4]
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(20 / this.itemsPerPage);
    }
  },
  methods: {
    nextPage() {
      if (this.page + 1 < this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 > 1) this.page -= 1;
    },
    updateItemsPerPage(input) {
      this.page = input;
    }
  }
};
</script>

<style scoped>
.shopSearchBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.shopSearchBar2 {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.shopFeatures {
  display: flex;
  flex-direction: column;
  font-family: "Poppins", sans-serif;
  align-items: center;
  box-shadow: 0px 3px 20px #00000054;
  margin: 0 2%;
  padding: 4% 0;
  border-radius: 50px;
}
</style>