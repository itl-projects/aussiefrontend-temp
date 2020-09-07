<template>
  <v-container fluid>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      hide-default-footer
    >
      <template v-slot:default="props">
        <v-card>
          <v-card-title class="subheading font-weight-bold">All</v-card-title>
          <v-divider></v-divider>
          <!-- <v-content> -->
          <v-row>
            <v-col
              v-for="(item, i) in props.items"
              :key="item.name"
              cols="12"
              class="py-0"
            >
              <v-row
                :class="{ 'blue--text': sortBy === true }"
                align="center"
                class="py-2"
              >
                <v-col cols="1" class="py-0">
                  <v-avatar class="ml-3">
                    <img
                      src="https://cdn.vuetifyjs.com/images/john.jpg"
                      alt="ABC"
                    />
                  </v-avatar>
                </v-col>
                <v-col cols="1" class="py-0">ABC</v-col>
                <v-col cols="7" class="py-0">{{ item.name }}</v-col>
                <v-col cols="12" class="py-0" sm="2">
                  <v-btn
                    color="info"
                    class="mr-2"
                    text
                    style="text-transform:none"
                    >View</v-btn
                  >
                  <v-btn color="red" text style="text-transform:none"
                    >Delete</v-btn
                  >
                </v-col>
              </v-row>

              <v-divider
                v-if="i < props.items.length - 1"
                class="mt-1"
              ></v-divider>
            </v-col>
          </v-row>
          <!-- </v-content> -->
        </v-card>
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
  </v-container>
</template>

<script>
export default {
  name: "messages",
  data() {
    return {
      itemsPerPageArray: [4, 8, 12],
      page: 1,
      itemsPerPage: 5,
      keys: [
        "Name",
        "Calories",
        "Fat",
        "Carbs",
        "Protein",
        "Sodium",
        "Calcium",
        "Iron",
      ],
      items: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: "14%",
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: "8%",
          iron: "1%",
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: "6%",
          iron: "7%",
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: "3%",
          iron: "8%",
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: "7%",
          iron: "16%",
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: "0%",
          iron: "0%",
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: "0%",
          iron: "2%",
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: "0%",
          iron: "45%",
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: "2%",
          iron: "22%",
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: "12%",
          iron: "6%",
        },
      ],
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
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
    },
  },
};
</script>

<style scoped></style>
