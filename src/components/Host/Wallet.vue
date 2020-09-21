<template>
  <v-container>
    <v-row style="background-color:#45F390; border-radius: 10px;margin: 2% 0;">
      <v-col cols="4">
        <h1 class="cardHeading">Wallet</h1>
        <v-card min-height="180" min-width="250" class="cardNewDesign">
          <v-row>
            <v-col
              class="cardInfo pb-0"
              style="display:flex;flex-direction: column;justify-content: space-between;"
              cols="6"
            >
              <div class="cardLeft">
                <v-avatar min-width="20" max-width="60">
                  <v-img
                    lazy-src="https://source.unsplash.com/1600x900/?nature,water"
                    src="https://source.unsplash.com/1600x900/?nature,water"
                  />
                </v-avatar>
                <h3 class="cardHead">jack ryan</h3>
              </div>
              <div
                style="position:relative;height: 100%;width: 100%;overflow:hidden;border-radius: 25px;"
              >
                <span class="bubble1"></span>
                <span class="bubble2"></span>
              </div>
            </v-col>
            <v-col class="cardInfo" cols="6">
              <div class="upper">
                <h3 class="cardHead">your balance</h3>
                <p class="cardContent">${{amount}}</p>
              </div>

              <div class="down">
                <h3 class="cardHead">aussie credits</h3>
                <p class="cardContent">{{credits}}</p>
              </div>
            </v-col>
          </v-row>
        </v-card>
        <div class="text-center">
          <v-dialog v-model="dialogW" width="500">
            <template v-slot:activator="{on,attrs}">
              <v-btn
                v-on="on"
                v-bind="attrs"
                style="color: #0FEF70C6;margin: 0 2%;border-radius: 5px;"
              >withdraw</v-btn>
            </template>
            <v-card>
              <v-card-title class="headline grey lighten-2">Withdrwaw</v-card-title>
              <v-text-field
                v-model="withdrawMoney.debit"
                :value="withdrawMoney.debit"
                color="rgb(113, 246, 170)"
                prepend-icon="mdi-wallet"
                class="ma-2"
                autofocus
              />
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="withdrawMoneyWallet">Withdraw</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogA" width="500">
            <template v-slot:activator="{on,attrs}">
              <v-btn
                v-on="on"
                v-bind="attrs"
                style="color: #0FEF70C6;margin: 0 2%;border-radius: 5px;"
              >add money</v-btn>
            </template>
            <v-card>
              <v-card-title class="headline grey lighten-2">Add Money</v-card-title>
              <v-text-field
                v-model="addMoney.credit"
                :value="addMoney.credit"
                color="rgb(113, 246, 170)"
                prepend-icon="mdi-wallet"
                class="ma-2"
                autofocus
              />
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="addMoneyWallet">Add to Wallet</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-col>
      <v-col cols="8">
        <h1 class="cardHeading">collect rewards</h1>
        <v-row style="overflow: hidden;margin-right:0.5%;">
          <carousel :perPage="1" :navigationEnabled="true">
            <Slide style="display: flex;" v-for="n in 3" :key="n">
              <v-col v-for="n in 2" :key="n" cols="5">
                <div class="rewardsSection">
                  <v-card class="text-center pa-4 rewardCard" outlined>
                    <div class="upperSection">
                      <v-avatar
                        min-width="70"
                        min-height="60"
                        size="80"
                        style="background-color: #EFB30F;"
                      >
                        <v-icon size="50" color="#fff">mdi-trophy-variant-outline</v-icon>
                      </v-avatar>
                    </div>
                    <div class="middleSection">
                      <h2>your reward</h2>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                    <div class="bottomSection">
                      <v-btn
                        dark
                        color="#0FEF70C6"
                        style="padding: 0 10%;border-radius: 25px;"
                      >claim</v-btn>
                    </div>
                  </v-card>
                </div>
              </v-col>
            </Slide>
          </carousel>

          <!-- <v-sheet class="mx-auto" max-height="500" max-width="700">
            <v-slide-group multiple show-arrows>
              <v-slide-item v-for="n in 6" :key="n">
                <v-col v-for="n in 2" :key="n" cols="5">
                  <div class="rewardsSection">
                    <v-card class="text-center pa-4 rewardCard" outlined>
                      <div class="upperSection">
                        <v-avatar
                          min-width="70"
                          min-height="60"
                          size="80"
                          style="background-color: #EFB30F;"
                        >
                          <v-icon size="50" color="#fff">mdi-trophy-variant-outline</v-icon>
                        </v-avatar>
                      </div>
                      <div class="middleSection">
                        <h2>your reward</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                      </div>
                      <div class="bottomSection">
                        <v-btn
                          dark
                          color="#0FEF70C6"
                          style="padding: 0 10%;border-radius: 25px;"
                        >claim</v-btn>
                      </div>
                    </v-card>
                  </div>
                </v-col>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>-->
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="mt-5">
        <v-card>
          <v-card-title style="background-color:#0fef70c6;color:#fff;">
            Transactions
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              dark
              single-line
              :aria-autocomplete="false"
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table :headers="headers" :items="transaction" :search="search"></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import authStore from "@/store/auth";
import urls from "@/axios/config";
import { Carousel, Slide } from "vue-carousel";

export default {
  name: "wallet",
  components: {
    Carousel,
    Slide
  },
  data() {
    return {
      credits: 0,
      amount: null,
      dialogA: false,
      dialogW: false,
      rewardControls: 0,
      transaction: [],
      addMoney: {
        credit: 0
      },
      withdrawMoney: {
        debit: 0
      },
      search: "",
      headers: [
        { text: "ID", value: "id" },
        { text: "Time", value: "time" },
        { text: "Type", value: "type" },
        { text: "Credit/Debit", value: "cd" },
        { text: "amount", value: "amount" },
        { text: "Total Bal", value: "total_bal" }
      ]
    };
  },
  created: function() {
    this.getWalletData();
    this.getWalletTrasaction();
  },

  watch: {
    amount: {
      handler: ""
    }
  },

  methods: {
    getWalletData() {
      let config = {
        headers: {
          Authorization: "Token " + authStore.userToken()
        }
      };
      axios
        .get(urls.URL + "/host/wallet/", config)
        .then(res => {
          this.amount = res.data.data.amount;
        })
        .catch(e => {
          console.log("error", e);
        });
    },

    addMoneyWallet() {
      let config = {
        headers: {
          Authorization: "Token " + authStore.userToken()
        }
      };

      axios
        .post(urls.URL + "/host/wallet/", this.addMoney, config)
        .then(res => {
          console.log(res.data.status);
          if (res.data.status) {
            this.dialogA = false;
            console.log("success");
          }
        })
        .catch(e => {
          console.log(e);
        });
      this.getWalletData();
    },

    withdrawMoneyWallet() {
      let config = {
        headers: {
          Authorization: "Token " + authStore.userToken()
        }
      };

      axios
        .post(urls.URL + "/host/wallet/", this.withdrawMoney, config)
        .then(res => {
          console.log(res.data);
          if (res.data.status) {
            this.dialogW = false;
            console.log("success");
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    getWalletTrasaction() {
      let config = {
        headers: {
          Authorization: "Token " + authStore.userToken()
        }
      };
      axios
        .get(urls.URL + "/host/wallet/transactions/", config)
        .then(res => {
          const walletData = res.data.data;
          // console.log(walletData);
          walletData.forEach(item => {
            const data = {
              id: null,
              type: null,
              time: item.transaction_dt,
              cd: item.credit == 0 ? "Credit" : "Debit",
              amount: null,
              total_bal: item.total_balance
            };
            this.transaction.push(data);
          });
          console.log(this.transaction);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style scoped>
:root {
  --gradient: linear-gradient(
    45deg,
    #845ec2,
    #d65db1,
    #ff6f91,
    #ff9671,
    #ffc75f,
    #f9f871
  );
}

.cardDesign {
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #d6d6d6;
  border-radius: 20px !important;
  opacity: 1;
  margin: 20px;
  padding: 1%;
}

.cardHeading {
  text-transform: capitalize;
  color: #fff;
  font-weight: 400;
}

.cardNewDesign {
  box-shadow: 1px 5px 15px #2d3436 !important;
  border-radius: 25px !important;
  margin: 5% 0;

  background-image: linear-gradient(
    45deg,
    #845ec2,
    #d65db1,
    #ff6f91,
    #ff9671,
    #ffc75f,
    #f9f871
  );
  border-radius: 2px;
  background-size: 500%;
  animation: bg-animation 10s infinite alternate;
  transition-property: background;
}

.container2 > .balanceLinks {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.container2 > .col > .balanceHead {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #444d59;
  text-transform: capitalize;
  text-align: center;
  font-weight: 500;
  font-family: "Roboto", sans-serif;
}

.container2 > .col > .balanceContent {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: #0fef70c6;
  font-family: "Roboto", sans-serif;
}
.container2 > .col > .bookContent {
  font-size: 0.8rem;
  color: #3a3a3a;
  width: 80%;
}

.cardLeft {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.cardHead {
  text-transform: uppercase;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-size: 1.2em;
}

.cardInfo {
  position: relative;
  overflow: hidden;
}

.cardInfo > div > .bubble1 {
  position: absolute;
  background-color: #3a3a3a;
  /* background-color: #0fef70; */
  width: 100px;
  height: 100px;
  left: -15%;
  bottom: -8%;
  border-radius: 100%;
}
.cardInfo > div > .bubble2 {
  position: absolute;
  /* background-color: #0fef70; */
  background-color: #3a3a3a;

  width: 100px;
  height: 100px;
  bottom: -30%;
  right: 30%;
  border-radius: 100%;
}

.cardInfo > .upper,
.cardInfo > .down {
  margin-top: 9px;
  text-align: center;
}

.cardContent {
  font-family: "Poppins", sans-serif;
  font-weight: bolder;
  font-size: 1.3em;
  color: #0fef70c6;
}

.rewardCard {
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 20px !important;
}

.middleSection {
  text-transform: capitalize;
  color: #383d43;
}

.middleSection > p {
  font-size: 0.8em;
}

@keyframes bg-animation {
  0% {
    background-position: left;
  }
  100% {
    background-position: right;
  }
}
</style>
