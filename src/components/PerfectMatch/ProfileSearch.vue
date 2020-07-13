<template>
  <div>
    <v-card class="pa-0" max-width="100%" outlined>
      <v-list-item class="pa-0">
        <v-list-item-content class="pt-0">
          <div class="overline pa-4 mb-4 text-center white--text" style="background:#2c7873;">
            <h1>Profile Search</h1>
          </div>
          <div class="content">
            <v-list shaped>
              <v-list-item-group color="primary">
                <v-list-item v-for="(item, i) in items" :key="i">
                  <v-list-item-content>
                    <v-row>
                      <v-col class="py-0" cols="12">
                        <v-label>Pet Types</v-label>
                        <v-select
                          :items="['pet1','pet2']"
                          label="Choose Pet(s)"
                          solo
                          hide-details
                          multiple
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </div>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions class="justify-center">
        <v-btn color="warning" width="100%">Filter</v-btn>
      </v-card-actions>
    </v-card>
   
  </div>

</template>

<script>


export default {
  name: "ProfileSearch",
  
  data: () => ({
    item: 1,
    items: [
      { text: "Real-Time", icon: "mdi-clock" },
      { text: "Audience", icon: "mdi-account" },
      { text: "Conversions", icon: "mdi-flag" }
    ]
  })
};
</script>

<style lang="stylus" scoped></style>