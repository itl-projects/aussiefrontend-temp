<template>
  <div class="px-10 mx-5">
    <v-row class="px-5 justify-center">
      <v-col cols="12" sm="3">
        <v-autocomplete
          :items="['Trevor Handsen', 'Alex Nelson']"
          chips
          label="Enter suburb or address"
          full-width
          hide-details
          hide-no-data
          hide-selected
          dense
          single-line
          outlined
        >
          <v-icon slot="append">mdi-magnify-plus-outline</v-icon>
        </v-autocomplete>
      </v-col>
      <v-col sm="3" cols="12">
        <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="Dates Required"
                  append-icon="mdi-calendar-plus"
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  dense
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                scrollable
                @input="modal = false;$refs.dialog.save(date)"
              ></v-date-picker>
            </v-dialog>
      </v-col>
      <v-col sm="3" cols="12">
              <v-menu
          v-model="menu"
          :close-on-content-click="closeOnContext"
          class="pa-0 ma-0"
         
        >
          <template v-slot:activator="{ on, attrs }">
            <v-select v-bind="attrs" v-on="on" label="Choose Pet(s)" outlined dense no-data-text
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
      <v-col sm="3" cols="12">
        <v-btn  class="full-width"  width="100%" >Search</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "PetGroomingForm",
  props:["items"],
  data: function() {
    return {
    closeOnContext:false,
    menu: false,
    date: null,
    modal:false,
    };
  },
  methods:{
     increment(num) {
      this.items[num].count = this.items[num].count + 1;
    },
    decrement(num) {
      if (this.items[num].count > 0)
        this.items[num].count = this.items[num].count - 1;
    },
    closeMenu() {
      console.log(JSON.parse(JSON.stringify(this.items)));
      this.menu = !this.menu;
    },
  }
};
</script>

<style scoped>
.apply_btn_box{
  width: 100%;
    background: #00d657;
    display: flex;
    margin: 0 !important;
    padding: 7px 12px;
    text-align: center;
    justify-content: center;
}
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background-color: #ffffff;
    color: #00d657;
    border: 2px solid #00d657;
}
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined):hover{
  background-color: #00d657;
    color: #faff63;
    border: 1px solid #faff63;
}
.mdi-magnify-plus-outline::before {
    content: "\F06ED";
    color: #00d657;
}
</style>