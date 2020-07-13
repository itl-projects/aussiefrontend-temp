<template>
  <div>
    <v-card class="pa-0" outlined>
      <v-list-item class="pa-0">
        <v-list-item-content class="pt-0">
          <div class="overline pa-4 mb-4 white--text" style="background:#2c7873;">
            <h1>Profile</h1>
          </div>
          <div class="content px-4">
            <v-card class="d-inline-block mx-auto pt-0 mb-3 pet-box" width="220px" v-for="(item,i) in items" :key="i" @click="show(i)">
              <v-row>
                <v-col cols="12" class="pt-0">
                  <v-img width="100%" :src="item.image"></v-img>
                </v-col>
                <v-col cols="12" class="pl-5 pt-0">
                  <h3 class="mb-1">{{ item.name}}</h3>
                  <v-label>{{item.about}}</v-label>
                </v-col>
                
                <v-col cols="12" class="py-2">
                    <v-divider class="ma-0 mb-2" style="padding: 0.5px;background: rgb(223, 222, 222);"></v-divider>
                  <div style="display: flex;justify-content: space-around;">
                    <v-btn icon>
                      <v-icon>mdi-heart</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>mdi-gift</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>mdi-email</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>mdi-comment</v-icon>
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </div>
           <v-pagination
      v-model="page"
      :length="4"
      circle
      color="#2c7873"
    ></v-pagination>
        </v-list-item-content>
      </v-list-item>
    </v-card>
     <ProfileView :data="data" :dialog="dialog" @dialogClosed="dialog = false"/>
  </div>
</template>

<script>
import ProfileView from "@/components/PerfectMatch/ProfileView";
export default {
  name: "MatchProfile",
  components: {ProfileView},
  data: () => ({
    item: 1,
    dialog: false,
    data:"",
    items: [
      { name: "Name", image: "https://cdn.vuetifyjs.com/images/cards/store.jpg", about:"25 year old man Berlin, Germany Berlin, Germany" },
      { name: "Name", image: "https://cdn.vuetifyjs.com/images/cards/store.jpg", about:"25 year old man Berlin, Germany Berlin, Germany" },
      { name: "Name", image: "https://cdn.vuetifyjs.com/images/cards/store.jpg", about:"25 year old man Berlin, Germany Berlin, Germany" },
      { name: "Name", image: "https://cdn.vuetifyjs.com/images/cards/store.jpg", about:"25 year old man Berlin, Germany Berlin, Germany" },
      { name: "Name", image: "https://cdn.vuetifyjs.com/images/cards/store.jpg", about:"25 year old man Berlin, Germany Berlin, Germany" },
      { name: "Name", image: "https://cdn.vuetifyjs.com/images/cards/store.jpg", about:"25 year old man Berlin, Germany Berlin, Germany" },
      { name: "Name", image: "https://cdn.vuetifyjs.com/images/cards/store.jpg", about:"25 year old man Berlin, Germany Berlin, Germany" },
      { name: "Name", image: "https://cdn.vuetifyjs.com/images/cards/store.jpg", about:"25 year old man Berlin, Germany Berlin, Germany" },
      { name: "Name", image: "https://cdn.vuetifyjs.com/images/cards/store.jpg", about:"25 year old man Berlin, Germany Berlin, Germany" },
      { name: "Name", image: "https://cdn.vuetifyjs.com/images/cards/store.jpg", about:"25 year old man Berlin, Germany Berlin, Germany" },
      { name: "Name", image: "https://cdn.vuetifyjs.com/images/cards/store.jpg", about:"25 year old man Berlin, Germany Berlin, Germany" },
      { name: "Name", image: "https://cdn.vuetifyjs.com/images/cards/store.jpg", about:"25 year old man Berlin, Germany Berlin, Germany" }
    ],
    page: 1
  }),
  methods:{
      show: function(data){
          this.data = data + 1;
            this.dialog = true;
      }
  }
};
</script>

<style scoped>
.content{
    display:flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
.pet-box:hover{
    box-shadow: 0 0 15px 6px #bebbbb;
    cursor: pointer;
}

</style>