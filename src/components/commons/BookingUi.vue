<template>
  <v-data-iterator
    :items="items"
    :items-per-page.sync="itemsPerPage"
    :page="page"
    hide-default-footer
  >
    <template v-slot:default="props">
      <v-container class="py-0">
        <v-card v-for="(item,i) in props.items" :key="item.name" class="mb-2">
          <v-list two-line subheader :key="i" class="pb-0">
            <v-list-item>
              <v-list-item-avatar>
                <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>
                  <v-row>
                    <v-col cols="12" sm="4" class="py-1">
                      <h5>Peter H.</h5>
                      <div class="mt-2">
                        <v-icon small>mdi-paw</v-icon>Pets:
                        <a href="#">Indi</a>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="4" class="py-1">
                      <h5>Pet Hosting-2 Nights</h5>
                      <div class="mt-2">
                        <v-icon small>mdi-calendar</v-icon>
                        <span style="font-size:0.8rem">20-04-202 - 23-05-2020</span>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="4" class="py-1">
                      Ref: 989898
                      <div class="mt-2">
                        <h3>$ {{item.calories}}</h3>
                      </div>
                    </v-col>
                  </v-row>
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="info">mdi-chevron-right</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-container>
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
          color="#2c7873"
        ></v-pagination>
      </div>
    </template>
  </v-data-iterator>
</template>

<script>
export default {
  name: "BookingUI",
  props: ["items"],
  data: () => ({
    itemsPerPageArray: [4, 8, 12],
    page: 1,
    itemsPerPage: 5
  }),
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
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

<style  scoped>
</style>