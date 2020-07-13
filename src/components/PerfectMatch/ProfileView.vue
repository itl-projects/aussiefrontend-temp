
<template>
  <div>
    <v-bottom-sheet v-model="dialog">
      <v-sheet >
        <v-card>
          <v-toolbar dark color="#2c7873" dense>
            <v-btn icon dark @click="dialogClosed">
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
            <v-toolbar-title>{{data}}</v-toolbar-title>
          </v-toolbar>
          <v-row class="px-3 pb-10">
            <v-col cols="12" sm="2">
                <v-skeleton-loader v-if="profile"
      class="mx-auto"
      max-width="300"
      type="card"
    ></v-skeleton-loader>
              <v-card v-else class="d-inline-block mx-auto pt-0 pet-box pb-10" width="220px">
                <v-row>
                  <v-col cols="12" class="pt-0">
                    <v-img width="100%" :src="item.image"></v-img>
                  </v-col>
                  <v-col cols="12" class="pl-5 pt-0">
                    <h3 class="mb-1">{{ item.name}}</h3>
                    <v-label>{{item.about}}</v-label>
                  </v-col>

                  <v-col cols="12" class="py-2">
                    <v-divider
                      class="ma-0 mb-2"
                      style="padding: 0.5px;background: rgb(223, 222, 222);"
                    ></v-divider>
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
            </v-col>
            <v-col cols="12" sm="5">
                  <v-skeleton-loader v-if="profile"
      class="mx-auto"
      max-width="300"
      type="list-item-three-line"
    ></v-skeleton-loader>
              <v-list v-else>
                <v-subheader>Open in</v-subheader>
                <v-list-item v-for="tile in 7" :key="tile">
                  <v-list-item-title>Name</v-list-item-title>
                  <v-divider></v-divider>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col cols="12" sm="5">
              <v-row>
                <v-col cols="12">
                  <v-card class="pa-0" max-width="100%" outlined>
                    <v-list-item class="pa-0">
                      <v-list-item-content class="pt-0">
                        <div class="mb-4 white--text" style="background:#2c7873;">
                          <v-row>
                            <v-col cols="9" sm="9">
                              <h2 class="ml-3" style="text-align:start">Profile Search</h2>
                            </v-col>
                            <v-col cols="3" sm="3">
                              <v-btn icon class="mr-2" dark>
                                <v-icon>mdi-chevron-left</v-icon>
                              </v-btn>
                              <v-btn icon dark>
                                <v-icon>mdi-chevron-right</v-icon>
                              </v-btn>
                            </v-col>
                          </v-row>
                        </div>
                        <div class="content">
                              <v-skeleton-loader v-if="profile"
      class="mx-auto"
      max-width="300"
      type="image"
    ></v-skeleton-loader>
                          <v-list v-else shaped>
                            <v-list-item-group color="primary" style="display:flex">
                              <v-list-item v-for="(item, i) in pics" :key="i">
                                <v-list-item-content>
                                  <v-img
                                    src="https://cdn.vuetifyjs.com/images/cards/store.jpg"
                                    width="50px"
                                  />
                                </v-list-item-content>
                              </v-list-item>
                            </v-list-item-group>
                          </v-list>
                        </div>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                </v-col>
                <v-col cols="12">
                  <v-card class="pa-0" max-width="100%" outlined>
                    <v-list-item class="pa-0">
                      <v-list-item-content class="pt-0">
                        <div class="mb-4 white--text" style="background:#2c7873;">
                          <v-row>
                            <v-col cols="9" sm="9">
                              <h2 class="ml-3" style="text-align:start">Rating</h2>
                            </v-col>
                          </v-row>
                        </div>
                          <v-skeleton-loader v-if="profile"
      class="mx-auto"
      max-width="300"
      type="list-item-three-line"
    ></v-skeleton-loader>
                        <div v-else class="content ml-3" style="text-align:start">
                           <v-rating
          v-model="rating"
          color="yellow darken-3"
          background-color="grey darken-1"
          empty-icon="$ratingFull"
          half-increments
          readonly=""
        ></v-rating>
                        </div>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </v-card>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  name: "ProfileView",
  props: ["dialog", "data"],
  data: function() {
    return {
      profile:[],
      item: {
        image: "https://cdn.vuetifyjs.com/images/cards/store.jpg",
        name: "Name",
        about: "25 year old man Berlin, Germany Berlin, Germany"
      },
      rating: 4.5,
      pics: [1, 2, 3, 4]
    };
  },
  methods: {
    dialogClosed() {
      this.dialog = false;
      this.$emit("dialogClosed");
    }
  }
};
</script>

<style lang="stylus" scoped></style>