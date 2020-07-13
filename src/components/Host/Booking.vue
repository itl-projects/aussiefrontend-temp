<template>
  <v-container fluid>
    <v-card-title class="subheading font-weight-bold">All Booking</v-card-title>
    <v-card-text>
      <v-row class="mb-4" align="center">
        <v-col cols="12" sm="1">
          <v-label>Filter By</v-label>
        </v-col>
        <v-col cols="12" sm="3">
          <v-select
            :items="['pet1','pet2']"
            label="Status"
            color="#2c7873"
            solo
            hide-details
            multiple
          ></v-select>
        </v-col>
        <v-col cols="12" sm="3">
          <v-select
            :items="['pet1','pet2']"
            label="All Users"
            color="#2c7873"
            solo
            hide-details
            multiple
          ></v-select>
        </v-col>
      </v-row>
    </v-card-text>
    <v-row>
      <v-col cols="12" sm="8">
        <v-data-iterator
          :items="items"
          :items-per-page.sync="itemsPerPage"
          :page="page"
          hide-default-footer
        >
          <template v-slot:default="props">
            <v-container>
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
              ></v-pagination>
            </div>
          </template>
        </v-data-iterator>
      </v-col>
      <v-col cols="12" sm="4">
        <RecurringBooking />
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import RecurringBooking from "@/components/Host/RecurringBookings";
export default {
  name: "HostBooking",
  components: { RecurringBooking },
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
        "Iron"
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
          iron: "1%"
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: "8%",
          iron: "1%"
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: "6%",
          iron: "7%"
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: "3%",
          iron: "8%"
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: "7%",
          iron: "16%"
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: "0%",
          iron: "0%"
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: "0%",
          iron: "2%"
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: "0%",
          iron: "45%"
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: "2%",
          iron: "22%"
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: "12%",
          iron: "6%"
        }
      ]
    };
  },
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

<style scoped>
</style>