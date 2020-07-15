<template>
  <div>
    <v-row>
      <v-col cols="12" class="py-0">
        <ShopSlider />
      </v-col>
    </v-row>
    <v-container fluid class="py-0">
      <v-row class="yellow" justify="space-between">
        <v-col cols="12" sm="6">
          <v-row>
            <v-col cols="5" class="pr-0">
              <v-select
                :items="['food','carpets']"
                solo
                label="All Categories"
                style="border-radius:0"
                no-data-text
                hide-details
              />
            </v-col>
            <v-col cols="5" class="pl-1">
              <v-text-field
                solo
                append-icon="mdi-magnify"
                style="border-radius:0"
                label="search"
                no-data-text
                hide-details
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="2" class="text-end">
          <div style="display:flex;justify-content: flex-end;">
            <div class="test" style="position:relative;">
              <v-icon color="#ffffff" x-large>mdi-cart</v-icon>
              <v-btn class="cart-count" small fab color="white black--text">
                <v-label>0</v-label>
              </v-btn>
            </div>
            <v-card-title class="white--text pa-0 text-center" style="display:inline-block;">
              Your cart
              <br />items
            </v-card-title>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row style="border:1.5px solid rgba(44, 120, 115, 0.22);" >
        <v-col style="display: flex;">
          <v-icon style="font-size:3rem" class="pa-2" color="#2c7873">mdi-truck-fast</v-icon>
          <div style="display:inline-block">
            <h3>Free Shipping</h3>
            <span style="font-size:0.7rem;display: inherit;">free</span>
          </div>
        </v-col>
        <v-col style="display: flex;">
          <v-divider class="mr-4" vertical />
          <v-icon style="font-size:3rem" class="pa-2" color="#2c7873">mdi-currency-usd-circle</v-icon>
          <div style="display:inline-block">
            <h3>Money Guarantee</h3>
            <span style="font-size:0.7rem;display: inherit;">30 Day Back</span>
          </div>
        </v-col>
        <v-col style="display: flex;">
          <v-divider class="mr-4" vertical />
          <v-icon style="font-size:3rem" class="pa-2" color="#2c7873">mdi-wallet</v-icon>
          <div style="display:inline-block">
            <h3>Payment Method</h3>
            <span style="font-size:0.7rem;display: inherit;">Secure system</span>
          </div>
        </v-col>
        <v-col style="display: flex;">
          <v-divider class="mr-4" vertical />
          <v-icon style="font-size:3rem" class="pa-2" color="#2c7873">mdi-face-agent</v-icon>
          <div style="display:inline-block">
            <h3>Online Support</h3>
            <span style="font-size:0.7rem;display: inherit;">24 Hours On Day</span>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid>
      <h2>NEW ARRIVALS / BEST SELLING PRODUCTS</h2>
      <v-container fluid>
        <v-row style="border:1.5px solid rgba(44, 120, 115, 0.22);">
          <v-col cols="12" class="pa-0">
            <NewArrival />
          </v-col>
        </v-row>
      </v-container>
    </v-container>
    <v-container fluid class="py-0">
      <v-row>
        <v-col cols="12" sm="4"></v-col>
        <v-col cols="12" sm="8">
          <div class="teal py-4 px-2">
            <h1 class="white--text">All Products</h1>
          </div>
                <v-data-iterator
                :items="all_products"
                :items-per-page.sync="itemsPerPage"
                :page="page"
                hide-default-footer
              >
              <template v-slot:default="props">
                   <v-row>
                   <v-col class="py-0" cols="6" sm="3" v-for="(item,i) in props.items" :key="i">
              <SingleProduct />
              </v-col>
            
                   </v-row>
               </template>

                <template v-slot:footer>
                  <div class="text-center mt-6">
                    <v-pagination
                      v-model="page"
                      :length="numberOfPages"
                      @next="nextPage"
                      @previous="formerPage"
                      @input="updateItemsPerPage"
                      circle
                    ></v-pagination>
                  </div>
                </template>
              </v-data-iterator>
          
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ShopSlider from "@/components/Shop/ShopSlider";
import NewArrival from "@/components/Shop/NewArrivals";
import SingleProduct from "@/components/Shop/SingleProduct";
export default {
  name: "Shop",
  components: {
    ShopSlider,
    NewArrival,
    SingleProduct
  },
  data() {
    return {
      itemsPerPageArray: [4, 8, 12],
      page: 1,
      itemsPerPage: 12,
      all_products:[1,2,3,4,5,6,7,8,9,10,11,1,2,3,2,3,4,4]
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
.cart-count {
  position: absolute;
  left: -25px;
  top: 20px;
  box-shadow: none !important;
}
</style>