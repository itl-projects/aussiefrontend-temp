<template>
  <v-container>
    <v-row>
      <v-col :cols="12" :md="12" class="text-right">
        <div class="add-pet mr-10">
              <v-btn small class="mx-2" fab dark color="#2c7873" @click="addPet">
                <v-icon dark>mdi-plus</v-icon>
              </v-btn>
              <span>Add Pet</span>
            </div>
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-card>
            <v-toolbar dark color="#2c7873">
              <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Pet Form</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <!-- <v-btn dark text @click="dialog = false">Save</v-btn> -->
              </v-toolbar-items>
            </v-toolbar>

            <v-divider></v-divider>
            <v-container grid-list-xs>
              <v-row>
                <v-col :cols="12" :md="12">
                  <PetFrom :petData.sync="petData" v-if="dialog"/>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row  class="mt-3 p-3">
      <v-col :cols="12" :md="4" v-for="(data,i) in petsData" :key="i">
        <v-card class="mx-auto" max-width="400">
          <v-img class="white--text align-end" height="200px" :src="data.petImage | imagePath">
            <v-card-title>{{data.petName}}</v-card-title>
          </v-img>
          <v-card-actions>
            <v-btn color="orange" text @click="editPet(i)">
              <v-icon class="mr-1" dark>mdi-eye</v-icon>Edit
            </v-btn>
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
const createPath = function(value) {
  return "https://aussiepetsbnb.com.au"+ value;
}
export default {
  name: "Pet",
  components: { PetFrom },
  filters: {
    imagePath: createPath
  },
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      petsData: [],
      img_url: urls.IMGURL,
      petData:{},
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
            this.petsData = res.data.data;
          }else{
            this.petCount = 0;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    editPet(index){
      this.petData = this.petsData[index];
      this.dialog = true;
    },
    addPet(){
      this.petData = {};
      this.dialog = true;
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