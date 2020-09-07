<template>
  <v-container
    :fluid="true"
    class="p-10"
    style="background-color:#383D43; color:#ffffff; font-family: 'Roboto"
  >
    <v-row>
      <v-col cols="12" sm="6">
        <v-row>
          <v-col cols="12" md="6">
            <h2 class="ml-10 mb-3" style="color: #0FEF70;">Main Services</h2>
            <ul v-for="(mainService, i) in mainServices" :key="i">
              <v-btn
                style="text-transform: capitalize;font-weight: 300;"
                class="white--text"
                text
              >
                <a :href="mainService.path"
                  ><li>{{ mainService.name }}</li></a
                >
              </v-btn>
            </ul>
          </v-col>
          <v-col cols="12" md="6">
            <h2 class="ml-10 mb-3" style="color: #0FEF70;">Main Features</h2>
            <ul v-for="(mainFeature, i) in mainFeatures" :key="i">
              <v-btn
                style="text-transform: capitalize;font-weight: 300;"
                class="white--text"
                text
              >
                <a :href="mainFeature.path"
                  ><li>{{ mainFeature.name }}</li></a
                >
              </v-btn>
            </ul>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="6">
        <v-row>
          <v-col cols="12" md="6">
            <h2 class="ml-10 mb-3" style="color: #0FEF70;">Directories</h2>
            <ul v-for="(directories, i) in Directories" :key="i">
              <v-btn
                style="text-transform: capitalize;font-weight: 300;"
                class="white--text"
                text
              >
                <a :href="directories.path"
                  ><li>{{ directories.name }}</li></a
                >
              </v-btn>
            </ul>
          </v-col>
          <v-col cols="12" md="6">
            <h2 class="ml-10 mb-3" style="color: #0FEF70;">Company</h2>
            <ul v-for="(company, i) in Company" :key="i">
              <v-btn
                style="font-weight: 300;text-transform: capitalize; "
                class="white--text"
                text
              >
                <a :href="company.path"
                  ><li>{{ company.name }}</li></a
                >
              </v-btn>
            </ul>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="text-center mt-3">
      <v-col cols="12">
        <v-col class="justify-center">
          <h1 class="text-center" style="color: #0FEF70;">Follow Us</h1>
        </v-col>
        <v-row class="justify-center">
          <v-col cols="5" class="text-center">
            <v-btn class="mx-2" rounded color="red" fab dark small>
              <v-icon size="24px">mdi-google-plus</v-icon>
            </v-btn>
            <v-btn class="mx-2" rounded color="primary" fab dark small>
              <v-icon size="24px">mdi-facebook</v-icon>
            </v-btn>
            <v-btn class="mx-2" rounded color="pink" fab dark small>
              <v-icon size="24px">mdi-instagram</v-icon>
            </v-btn>
            <v-btn class="mx-2" rounded color="info" fab dark small>
              <v-icon size="24px">mdi-twitter</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <h4 class="text-center" style="font-weight:100">
          @Website Desgin by Innovative Tech Lab | Copyright Aussie Pets BnB
        </h4>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "Footer",
  data: () => ({
    mainServices: [
      { name: "Find a Reliable Pet Host", path: "" },
      { name: "Pet Day Care Services", path: "" },
      { name: "Pet Grooming Services", path: "" },
      { name: "Pet Trainings Services", path: "" },
      { name: "House Visits Gardens & Plants", path: "" },
      { name: "Walkies & Exercise Services", path: "" },
    ],
    mainFeatures: [
      { name: "Petorama", path: "" },
      { name: "Purrrfect Match", path: "" },
      { name: "Pet Crush", path: "" },
      { name: "Pet Pub", path: "" },
      { name: "Pet O Vision", path: "" },
      { name: "Pet Pub", path: "" },
      { name: "Live Support", path: "" },
      { name: "Need a Website", path: "" },
    ],
    Directories: [
      { name: "Local vets directory", path: "" },
      { name: "Find your pet/lost pet", path: "" },
      { name: "Adopt & Rescue A Pet", path: "" },
      { name: "Report Pet cruelty", path: "" },
      { name: "Wires", path: "" },
      { name: "Pet Insurance for sale", path: "" },
      { name: "Pet Park locations", path: "" },
      { name: "Local Pet Shop Directory", path: "" },
      { name: "Animal Charities", path: "" },
      { name: "Pet Events", path: "" },
      { name: "Positions vacant in pet space", path: "" },
    ],
    Company: [
      { name: "About Us", path: "" },
      { name: "Our mission", path: "" },
      { name: "Positions Vacant ", path: "" },
      { name: "Advertise With Us", path: "" },
      { name: "Contact Us", path: "" },
      { name: "Phone ", path: "" },
      { name: "Email", path: "" },
    ],
  }),
};
</script>
<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
ul a li {
  padding: 5px;
  font-size: medium;
}
ul a {
  text-decoration: none;
  color: #ffffff;
}
ul a:hover {
  color: #0fef70;
}
</style>
