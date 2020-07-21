<template>
  <v-container>
    <v-row>
      <v-col :cols="12" :md="12" class="text-right">
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <template v-slot:activator="{ on }">
            <div class="add-pet mr-10">
              <v-btn small class="mx-2" v-on="on" fab dark color="#2c7873">
                <v-icon dark>mdi-plus</v-icon>
              </v-btn>
              <span>Add Pet</span>
            </div>
          </template>
          <v-card>
            <v-toolbar dark color="#2c7873">
              <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Pet Form</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn dark text @click="dialog = false">Save</v-btn>
              </v-toolbar-items>
            </v-toolbar>

            <v-divider></v-divider>
            <v-container grid-list-xs>
              <v-row>
                <v-col :cols="12" :md="12">
                  <PetFrom />
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row  class="mt-3 p-3">
      <v-col :cols="12" :md="4" v-for="(data,i) in petdata" :key="i">
        <v-card class="mx-auto" max-width="400">
          <v-img class="white--text align-end" height="200px" :src="img_url +data.petImage">
            <v-card-title>{{data.petName}}</v-card-title>
          </v-img>
          <v-card-actions>
            <v-btn color="orange" text>
              <v-icon class="mr-1" dark>mdi-eye</v-icon>View
            </v-btn>

            <!-- <v-btn
                    color="orange"
                    text
                >
                    Explore
            </v-btn>-->
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center"></v-row>
  </v-container>
</template>

<script>
import PetFrom from "@/components/Owner/PetAddForm";
import axios from "axios";
import urls from "@/axios/config";
import authStore from "../../store/auth";
export default {
  name: "Pet",
  components: { PetFrom },
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      petdata: [],
      img_url: urls.IMGURL
    };
  },
  created: function(){
    this.getMyPets();
  },
  methods: {
    getMyPets: function(){
      let config = {
        headers: {
          Authorization: "Token " + authStore.userToken()
        }
      };
      axios
        .get(urls.URL + "/petowner/viewpets/", config)
        .then(res => {
          console.log(res.data);
          if (res.data.status) {
            this.petdata = res.data.data;
          }else{
            this.petCount = 0;
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
<style scoped>
.add-pet{
  display: inline-block;
    padding: 5px 10px;
    border: 2px dashed #2c7873a8;
}
</style>