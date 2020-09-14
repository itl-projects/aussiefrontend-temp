<template>
  <v-app>
    <NavBar />
    <v-container>
      <v-btn style="margin: 1% 0;" outlined>
        <v-icon color="#0FEF70" left>mdi-arrow-left-bold-circle</v-icon>back
      </v-btn>
      <v-row style="margin: 5% 0;">
        <v-col cols="3" v-for="n in 4" :key="n">
          <v-card min-height="250" max-height="280" class="petCard">
            <div class="img">
              <v-avatar size="120" min-height="150">
                <v-img
                  src="https://source.unsplash.com/1600x900/?nature,water"
                  lazy-src="https://source.unsplash.com/1600x900/?nature,water"
                ></v-img>
              </v-avatar>
            </div>
            <div class="bottomSection">
              <h2 class="petName">Pepsi</h2>
              <div class="choose">
                <v-col>
                  <v-btn
                    block
                    style="border-radius: 20px; padding: 1% 10%;"
                    dark
                    color="#0FEF70"
                  >Select</v-btn>
                </v-col>
                <v-col>
                  <v-dialog v-model="dialog" width="800">
                    <template v-slot:activator="{ on,attrs}">
                      <v-btn
                        v-on="on"
                        v-bind="attrs"
                        block
                        style="border-radius: 20px; padding: 1% 10%;"
                        outlined
                        color="#0FEF70"
                      >Edit</v-btn>
                    </template>
                    <v-card
                      min-height="250"
                      max-height="500"
                      style="display: flex;border-radius: 20px;"
                    >
                      <v-col cols="4" class="pa-0 image">
                        <v-img
                          max-height="500"
                          max-width="auto"
                          src="https://source.unsplash.com/600x900/?nature,water"
                          lazy-src="https://source.unsplash.com/600x900/?nature,water"
                        ></v-img>
                      </v-col>
                      <v-col cols="8" class="formEdit"></v-col>
                    </v-card>
                  </v-dialog>
                </v-col>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <Footer />
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
export default {
  name: "PetCrush",
  components: {
    NavBar,
    Footer
  },
  data() {
    return {
      dialog: false
    };
  }
};
</script>

<style scoped>
.petCard {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.img {
  text-align: center;
}
.petCard > .bottomSection > .petName {
  font-family: "Poppins", sans-serif;
  text-align: center;
}

.petCard > .bottomSection > .choose {
  text-align: center;
  padding: 5%;
  display: flex;
  justify-content: space-between;
}
</style>