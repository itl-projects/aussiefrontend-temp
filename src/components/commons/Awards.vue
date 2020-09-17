<template>
  <v-app>
    <v-col class="awardShowCase">
      <v-col cols="8" align-self="center">
        <CarouselCard
          :interval="7000"
          height="200px"
          type="card"
          arrow="always"
          style="background-color: #0FEF70C6;padding-top: 2%;"
        >
          <CarouselCardItem v-for="i in 6" :key="i">
            <v-card class="mx-auto" min-width="220" max-width="300">
              <v-img
                class="white--text align-end"
                height="200px"
                src="
                  https://source.unsplash.com/collection/190727/1600x900
                "
                lazy-src="
                  https://source.unsplash.com/collection/190727/1600x900
                "
              >
                <v-card-title class="black--text">Top 10 Australian beaches</v-card-title>
              </v-img>
            </v-card>
          </CarouselCardItem>
        </CarouselCard>
      </v-col>
      <v-col cols="4">
        <v-card
          min-height="150"
          min-width="400"
          style="background-image: url('https://source.unsplash.com/1600x900/?nature,water');background-size:cover;"
          class="mx-auto px-0 py-0"
        >
          <v-card-title
            class="white--text py-0"
            style="backgroundColor: rgba(0,0,0,0.7);font-size: 2.5ch;"
          >Invite and Earn</v-card-title>
          <v-card-subtitle
            class="my-0 pa-0 px-4 pt-4 white--text"
            style="background-color: rgba(0,0,0,0.7);font-size:1.4ch;"
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </v-card-subtitle>
          <v-card-subtitle
            class="white--text pb-0"
            style="background-color: rgba(0,0,0,0.7)"
          >Your Referral Code</v-card-subtitle>
          <div class="controlsShare px-4 py-2" style="background-color: rgba(0,0,0,0.7)">
            <v-btn color="primary" class="mr-2" dark outlined="dash">
              {{
              refCode
              }}
            </v-btn>
            <v-btn
              color="orange"
              v-clipboard:copy="refURL"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
              outlined
              class="mr-2"
              dark
            >Share</v-btn>
          </div>
        </v-card>
      </v-col>
    </v-col>
    <div class="awardSection">
      <v-col class="text-center" cols="4">
        <h2 class="heading">spin a wheel</h2>
        <div class="content spinner">
          <v-dialog class="text-center" v-model="spinWheelDialog" max-width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                style="margin-left: auto;"
                icon
                v-on="on"
                v-bind="attrs"
                @click="spinWheelDialog = true"
              >
                <v-icon color="#0FEF70C6">mdi-chevron-right</v-icon>
              </v-btn>
            </template>
            <v-card min-height="500">
              <h2
                class="text-center"
                style="padding-top: 5%;font-family: 'Poppins',san-serif;"
              >Spin the Wheel</h2>
              <h3
                class="text-center"
                style="font-family: 'Poppins',san-serif;"
              >Get a chance to win exciting products!</h3>
              <div class="wheel-wrapper">
                <div class="wheel-pointer" @click="onClickRotate">Spin</div>
                <div
                  class="wheel-bg"
                  :class="{ freeze: freeze }"
                  :style="`transform: rotate(${wheelDeg}deg)`"
                >
                  <div class="prize-list">
                    <div class="prize-item-wrapper" v-for="(item, i) in prizeList" :key="i">
                      <div
                        class="prize-item"
                        :style="
                          `transform: rotate(${(360 / prizeList.length) *
                            i}deg)`
                        "
                      >
                        <span class="check" style="z-index: -99999999999999999999999999;"></span>
                        <div class="prize-name">{{ item.name }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </v-card>
          </v-dialog>
          <p>try your luck</p>
        </div>
      </v-col>
      <v-col class="text-center" cols="4">
        <h2 class="heading">spins left</h2>
        <div class="content">3</div>
      </v-col>
      <v-col class="text-center" cols="4">
        <h2 class="heading">spins done</h2>
        <div class="content">3</div>
      </v-col>
    </div>
    <v-row class="text-center">
      <v-simple-table style="margin: 0 auto;">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Calories</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in desserts" :key="item.name">
              <td>{{ item.name }}</td>
              <td>{{ item.calories }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-row>
  </v-app>
</template>

<script>
import authStore from "../../store/auth";
import urls from "@/axios/config";
import axios from "axios";
import { CarouselCard, CarouselCardItem } from "vue-carousel-card";
import "vue-carousel-card/styles/index.css";
import VueClipboard from "vue-clipboard2";
import Vue from "vue";
Vue.use(VueClipboard);

export default {
  name: "AwardsPage",
  components: {
    CarouselCard,
    CarouselCardItem
  },
  data() {
    return {
      refCode: "",
      refURL: "",
      search: "",
      freeze: false,
      rolling: false,
      wheelDeg: 0,
      prizeNumber: 8,
      prizeListOrigin: [
        {
          icon: "https://picsum.photos/40?random=1",
          name: "$10000"
        },
        {
          icon: "https://picsum.photos/40?random=6",
          name: "Thank you3 with some text!"
        },
        {
          icon: "https://picsum.photos/40?random=6",
          name: "check"
        },
        {
          icon: "https://picsum.photos/40?random=2",
          name: "$500"
        },
        {
          icon: "https://picsum.photos/40?random=3",
          name: "$100"
        },
        {
          icon: "https://picsum.photos/40?random=6",
          name: "Thank you!"
        },
        {
          icon: "https://picsum.photos/40?random=4",
          name: "$50"
        },
        {
          icon: "https://picsum.photos/40?random=5",
          name: "$10"
        },
        {
          icon: "https://picsum.photos/40?random=6",
          name: "Thank you!"
        }
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159
        },
        {
          name: "Gingerbread",
          calories: 356
        },
        {
          name: "Jelly bean",
          calories: 375
        },
        {
          name: "Lollipop",
          calories: 392
        },
        {
          name: "Honeycomb",
          calories: 408
        },
        {
          name: "Donut",
          calories: 452
        },
        {
          name: "KitKat",
          calories: 518
        }
      ]
    };
  },
  created: function() {
    this.getReferalCode();
  },
  computed: {
    // new start
    prizeList() {
      return this.prizeListOrigin.slice(0, this.prizeListOrigin.length);
    }
    // new end
  },
  watch: {
    prizeNumber() {
      this.freeze = true;
      this.wheelDeg = 0;

      setTimeout(() => {
        this.freeze = false;
      }, 0);
    }
  },
  methods: {
    onCopy: function() {
      alert("You just copied: ");
    },
    onError: function() {
      alert("Failed to copy texts");
    },
    getReferalCode() {
      let config = {
        headers: {
          Authorization: "Token " + authStore.userToken()
        }
      };
      axios
        .get(urls.URL + "/referral/", config)
        .then(res => {
          console.log(res);
          this.refCode = res.data.data.code;
          this.refURL = res.data.data.url;
        })
        .catch(e => {
          console.log("error", e);
        });
    },
    onClickRotate() {
      if (this.rolling) {
        return;
      }
      const result = Math.floor(Math.random() * this.prizeList.length);
      this.roll(result);
    },
    roll(result) {
      this.rolling = true;
      const { wheelDeg, prizeList } = this;
      this.wheelDeg =
        wheelDeg -
        (wheelDeg % 360) +
        6 * 360 +
        (360 - (360 / prizeList.length) * result);
      setTimeout(() => {
        this.rolling = false;
        alert("You won : " + prizeList[result].name);
      }, 4500);
    }
  }
};
</script>

<style scoped>
.awardShowCase {
  display: flex;
  background-color: #0fef70c6;
  align-items: center;
  margin: 2% 0;
}

.awardSection {
  display: flex;
  margin: 2% 0;
}

.spinner {
  display: flex;
}

.heading {
  text-transform: capitalize;
  font-family: "Poppins", sans-serif;
}

.content,
.content > p {
  text-transform: capitalize;
  color: #0fef70c6;
  font-family: "Poppins", sans-serif;
  margin: auto 0;
  font-size: 1.2rem;
  margin-right: auto;
}

.wheel-wrapper {
  width: 300px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.wheel-pointer {
  width: 60px;
  height: 60px;
  border-radius: 1000px;
  background: #444d59;
  color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  line-height: 60px;
  font-family: "Poppins", sans-serif;
  z-index: 10;
  cursor: pointer;
}

.wheel-pointer::after {
  content: "";
  position: absolute;
  top: -32px;
  left: 50%;
  border-width: 0 8px 40px;
  border-style: solid;
  border-color: transparent transparent red;
  transform: translateX(-50%);
}

.wheel-bg {
  width: 100%;
  height: 100%;
  border-radius: 1000px;
  overflow: hidden;
  transition: transform 4s ease-in-out;
  background: #0fef70c6;
}
.wheel-bg > .freeze {
  transition: none;
  background: red;
}

.prize-list {
  width: 100%;
  height: 100%;
  position: relative;
  text-align: center;
}

.prize-item-wrapper {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 150px;
}

.prize-item {
  width: 100%;
  height: 100%;
  transform-origin: bottom;
  /* position: relative; */
}
.prize-item > .prize-name {
  padding: 16px 0;
  color: #fff;
  font-size: 0.7rem;
  word-wrap: break-word;
  width: 50%;
  font-family: "Poppins", sans-serif;
  margin: auto;
}

.prize-item > .check {
  position: absolute;
  width: 77px;
  height: 70%;
  top: 0;
  border-left: 25px solid transparent;
  background-color: #727272;
  right: 36px;
}
</style>
