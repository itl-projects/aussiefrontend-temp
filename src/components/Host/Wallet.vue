<template>
  <v-container>
    <h2>Wallet</h2>
    <v-row>
      <v-card style="width: 98%" elevation="5" class="cardDesign">
        <v-row class="container2">
          <v-col cols="2" class="bookingDate">
            <div>Your Balance</div>
            <div>$200</div>
          </v-col>
          <v-divider></v-divider>
          <v-col cols="7">
            <div class="bookHead">Pet Hosting</div>
            <div class="bookContent">150</div>
          </v-col>
          <span class="v1"></span>
          <v-col class="bookingDetails" cols="2">
            <v-btn>Add Balance</v-btn>
            <v-btn>Credit History</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
    <v-row>
      <v-col cols="12" class="mt-5">
        <v-simple-table class="table-border">
          <template v-slot:default>
            <thead style="background: #383D43;border-radius: 10px">
              <tr>
                <th class="text-left white--text">Proof Type</th>
                <th class="text-left white--text">Document Type</th>
                <th class="text-center white--text">Uploaded On</th>
                <th class="text-center white--text">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in desserts" :key="item.name">
                <td class="text-left">{{ item.name }}</td>
                <td class="text-left">{{ item.calories }}</td>
                <td class="text-center">{{ item.calories }}</td>
                <td class="text-center">
                  <!-- <v-btn small color="orange" dark text>download</v-btn> -->
                  <v-btn small color="red" dark text>remove</v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
.cardDesign {
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #d6d6d6;
  border-radius: 20px !important;
  opacity: 1;
  margin: 20px;
}

.container2 > .bookingDate {
  text-align: center;
  font-size: 2rem;
  text-transform: uppercase;
  color: #0fef70c6;
  font-family: "Roboto", sans-serif;
}

.container2 > .bookingDetails {
  font-size: 1.5rem;
  margin: auto;
  font-weight: 500;
  color: #444d59;
  text-align: center;
}

.container2 > .col > .bookHead {
  font-size: 1.2rem;
  margin-bottom: 10px;
  font-weight: 500;
  font-family: "Roboto", sans-serif;
}
.container2 > .col > .bookContent {
  font-size: 0.8rem;
  color: #3a3a3a;
  width: 80%;
}
</style>