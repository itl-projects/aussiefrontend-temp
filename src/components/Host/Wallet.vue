<template>
  <v-container>
    <v-row>
      <v-card style="width: 98%" elevation="5" class="cardDesign">
        <v-row class="container2">
          <v-col cols="2" class="balance">
            <div class="balanceHead">Your Balance</div>
            <div v-if="updateSection" class="balanceContent">${{amount}}</div>
          </v-col>
          <v-col cols="7">
            <div class="balanceHead">Aussie Credits</div>
            <div class="balanceContent">{{credits}}</div>
          </v-col>
          <span class="v1"></span>
          <v-col class="balanceLinks" cols="2">
            <v-dialog v-model="dialogA" width="500">
              <template v-slot:activator="{on,attrs}">
                <v-btn dark color="#0FEF70C6" v-bind="attrs" v-on="on">Add Balance</v-btn>
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
            <v-dialog v-model="dialogW" width="500">
              <template v-slot:activator="{on,attrs}">
                <v-btn dark color="red" v-bind="attrs" v-on="on">Withdraw</v-btn>
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
          </v-col>
        </v-row>
      </v-card>
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
          <v-data-table
            v-if="updateSection"
            :headers="headers"
            :items="transaction"
            :search="search"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import authStore from "@/store/auth";
import urls from "@/axios/config";

export default {
  name: "wallet",
  data() {
    return {
      credits: 0,
      amount: null,
      dialogA: false,
      dialogW: false,
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
              cd: item.credit == 0 ? "credit" : "debit",
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
.cardDesign {
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #d6d6d6;
  border-radius: 20px !important;
  opacity: 1;
  margin: 20px;
  padding: 1%;
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
</style>
