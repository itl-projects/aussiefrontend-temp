<template>
  <div>
    <v-row class="mt-2 ml-2">
      <v-col cols="12" sm="3" class="py-2">
        <v-autocomplete
          :items="['Trevor Handsen', 'Alex Nelson']"
          chips
          label="Email address"
          full-width
          no-data-text
          hide-details
          hide-no-data
          dense
          single-line
          outlined
        >
          <v-icon slot="append">mdi-magnify-plus-outline</v-icon>
        </v-autocomplete>
      </v-col>
      <v-col sm="4" cols="12" class="py-2">
        <v-row>
          <div style="display:flex">
            <v-dialog
              ref="dialog"
              v-model="drop_modal"
              :return-value.sync="drop_date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="drop_date"
                  label="Drop off"
                  append-icon="mdi-calendar-plus"
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  dense
                  no-data-text
          hide-details
          hide-no-data
          single-line
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="drop_date"
                scrollable
                @input="modal = false;$refs.dialog.save(drop_date)"
              ></v-date-picker>
            </v-dialog>
            <v-icon style="margin-top: 0px;">mdi-minus</v-icon>
            <v-dialog
              ref="pickup_dialog"
              v-model="pickup_modal"
              :return-value.sync="pickup_date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="pickup_date"
                  label="Pick up"
                  append-icon="mdi-calendar-check"
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  dense
                  no-data-text
          hide-details
          hide-no-data
          single-line
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="pickup_date"
                scrollable
                @input="pickup_modal = false;$refs.pickup_dialog.save(pickup_date)"
              ></v-date-picker>
            </v-dialog>
          </div>
        </v-row>
      </v-col>
      <v-col sm="3" cols="12" class="py-2">
        <v-menu
          v-model="menu"
          :close-on-content-click="closeOnContext"
          class="pa-0 ma-0"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-select v-bind="attrs" v-on="on" label="My Pets" outlined dense no-data-text
          hide-details
          hide-no-data
          single-line></v-select>
          </template>
          <v-list class="pa-0 ma-0">
            <v-list-item class="pa-0">
              <v-list-item-content class="py-0">
                <v-row style="width:300px">
              <v-col cols="12" v-for="(item, i) in items" :key="i" :class="item.class" class="py-1">
                <v-row class="py-0" align="center">
                  <v-col cols="8" class="pl-5 py-0">{{ item.title }}</v-col>
                  <v-col cols="4" class="py-1">
                    <v-btn x-small icon @click="decrement(i)">
                      <v-icon>mdi-minus-circle-outline</v-icon>
                    </v-btn>
                    {{ item.count }}
                    <v-btn x-small icon @click="increment(i)">
                      <v-icon>mdi-plus-circle-outline</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
              </v-list-item-content>
            </v-list-item>
           <v-list-item-action class="apply_btn_box">
              <v-btn outlined @click="closeMenu" color="white">Apply</v-btn>
            </v-list-item-action>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "PetHostingFormDummy",
  props:['items',"drop_date","pickup_date"],
  data: () => ({
    closeOnContext:false,
    menu: false,
    drop_modal:false,
    pickup_modal:false
  }),
  methods:{
     increment(num) {
      this.items[num].count = this.items[num].count + 1;
    },
    decrement(num) {
      if (this.items[num].count > 0)
        this.items[num].count = this.items[num].count - 1;
    },
    closeMenu() {
      this.menu = !this.menu;
    },
  }
};
</script>

<style scoped>
.apply_btn_box{
  width: 100%;
    background: #2c7873;
    display: flex;
    margin: 0 !important;
    padding: 7px 12px;
    text-align: center;
    justify-content: center;
}
</style>