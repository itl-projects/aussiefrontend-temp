<template>
  <v-container fluid>
    <v-row>
      <v-col style="margin: 0 3%;" v-if="!showQuestion && !showResult">
        <h1 class="heading">Take a Quiz</h1>
        <v-card class="quizCard" outlined>
          <div class="upperSection">
            <h2 class="cardHeading">Before you begin</h2>
            <p
              class="cardContent"
            >Each quiz must be completed in one session; make sure you have a stable internet connection & you’re finished before exiting.</p>
            <p
              class="cardContent"
            >The quiz is in English. If you don’t pass, your results won’t be displayed</p>
          </div>
          <div class="bottomSection">
            <h2 class="cardHeading">Overview</h2>
            <div class="cardContent">
              <v-icon color="#0FEF70C6" class="mr-2">mdi-format-list-checks</v-icon>70th percentile required to pass and get a badge
            </div>
            <div class="cardContent">
              <v-icon color="#0FEF70C6" class="mr-2">mdi-clock-check-outline</v-icon>~15 minutes duration
            </div>
            <v-btn
              dark
              style="padding: 0 5%;background-color: #0FEF70C6;margin-top: 5%;"
              @click="startQuiz"
              :loading="startLoading"
            >start</v-btn>
          </div>
        </v-card>
      </v-col>

      <v-col style="margin: 2% 3%;" v-if="showQuestion && !showResult">
        <v-progress-linear color="#0FEF70C6" :value="answered_count" height="5px" class="mb-4"></v-progress-linear>

        <v-card v-if="currentQuestion">
          <v-card-title class="py-0">
            <v-row align="center">
              <v-col cols="2" sm="2">
                <h3>{{ index + 1 }} / {{ questions.length }}</h3>
              </v-col>
              <v-col cols="6" sm="8"></v-col>
              <v-col cols="3" sm="2" class="text-end">
                <div class="base-timer">
                  <svg
                    class="base-timer__svg"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g class="base-timer__circle">
                      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45" />
                      <path
                        :stroke-dasharray="circleDasharray"
                        class="base-timer__path-remaining"
                        :class="remainingPathColor"
                        d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
                      />
                    </g>
                  </svg>
                  <span class="base-timer__label">{{ formattedTimeLeft }}</span>
                </div>
              </v-col>
            </v-row>
          </v-card-title>
          <v-divider />
          <v-card-subtitle class="mt-4">
            <h3 style="display: flex;justify-content: space-between;">
              <pre
                style="white-space: pre-wrap;color: #0FEF70C6;font-family: 'Poppins',san-serif;font-weight:normal;"
              >{{ index + 1}}. {{ currentQuestion.question }}</pre>
              <h3
                style="color: #0FEF70C6;font-family: 'Poppins',san-serif;font-weight:normal;"
              >{{ index + 1 }} / {{ questions.length }}</h3>
            </h3>
          </v-card-subtitle>

          <v-card-text>
            <v-radio-group v-model="selectedOption" @change="optionSelected($event,index+1)">
              <v-radio color="#0FEF70C6" value="option_1" :label="currentQuestion.option_1"></v-radio>
              <v-radio color="#0FEF70C6" value="option_2" :label="currentQuestion.option_2"></v-radio>
              <v-radio color="#0FEF70C6" value="option_3" :label="currentQuestion.option_3"></v-radio>
              <v-radio color="#0FEF70C6" value="option_4" :label="currentQuestion.option_4"></v-radio>
            </v-radio-group>
          </v-card-text>
          <v-card-actions class="px-6">
            <v-row v-if="index < questions.length-1">
              <v-btn color="#0FEF70C6" @click="nextQuestion('next')" class="mr-6" dark>Next</v-btn>
              <v-btn color="#0FEF70C6" outlined @click="nextQuestion('skip')" dark>Skip</v-btn>
            </v-row>

            <v-btn
              v-else
              color="#0FEF70C6"
              @click="submitAnswers"
              dark
              :loading="submitLoading"
            >Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col v-if="!showQuestion && showResult">
        <h1
          class="text-center"
          style="color:#444D59;font-family: 'Poppins',san-serif;margin-bottom: 2%;"
        >Thank you !</h1>

        <v-card style="margin: auto;" max-width="350">
          <v-card-text class="mt-4 text-center" v-if="!result_report">
            <!-- <v-row>
              <v-col class="py-0" cols="12">
                <v-row>
                  <v-col class="py-0" cols="6">Wrong Answers</v-col>
                  <v-col class="py-0 text-center" cols="6">{{ result_report.wrongAnswer }}</v-col>
                </v-row>
              </v-col>
              <v-divider class="col-12" />
              <v-col class="py-0" cols="12">
                <v-row>
                  <v-col class="py-0" cols="6">Correct Answers</v-col>
                  <v-col class="py-0 text-center" cols="6">{{ result_report.correctAnswer }}</v-col>
                </v-row>
              </v-col>
              <v-divider class="col-12" />
              <v-col class="py-0" cols="12">
                <v-row>
                  <v-col class="py-0" cols="6">Total Marks</v-col>
                  <v-col class="py-0 text-center" cols="6">{{ result_report.totalMarks }}</v-col>
                </v-row>
              </v-col>
              <v-divider class="col-12" />
              <v-col class="py-0" cols="12">
                <v-row>
                  <v-col class="py-0" cols="6">Score Percentage</v-col>
                  <v-col class="py-0 text-center" cols="6">{{ result_report.scorePercentage }} %</v-col>
                </v-row>
              </v-col>
              <v-divider class="col-12" />
              <v-col class="mt-4 text-center">
                <v-btn dark color="#2c7873" to="/host">dahboard</v-btn>
              </v-col>
            </v-row>-->
            <v-avatar size="100">
              <v-img
                src="https://source.unsplash.com/1600x900/?nature,water"
                lazy-src="https://source.unsplash.com/1600x900/?nature,water"
              ></v-img>
            </v-avatar>
            <h4
              style="text-transform: capitalize;color:#0FEF70C6; margin: 8% 0;font-family:'Poppins',san-serif;font-size: 1.5rem;"
            >your quiz results</h4>
            <div class="result">
              <span>wrong answer</span>
              <span>3</span>
            </div>
            <div class="result">
              <span>correct answer</span>
              <span>3</span>
            </div>
            <div class="result">
              <span>total marks</span>
              <span>3</span>
            </div>
            <div class="result">
              <span>score percentage</span>
              <span>3</span>
            </div>
            <v-btn dark color="#0FEF70C6" class="ma-4" to="/host">dashboard</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import authStore from "../../store/auth";
import urls from "@/axios/config";
import axios from "axios";
import router from "../../router";
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

const TIME_LIMIT = 900;

export default {
  name: "Quiz",
  data: () => ({
    showQuestion: false,
    showResult: false,
    quizStart: false,
    questions: [],
    answers: {},
    currentQuestion: null,
    index: 0,
    selectedOption: null,
    timePassed: 0,
    timerInterval: null,
    answered_count: 0,
    skip_count: 0,
    quiz_id: null,
    result_report: null,
    startLoading: false,
    submitLoading: false
  }),
  watch: {
    timeLeft(newValue) {
      if (newValue === 0) {
        this.onTimesUp();
      }
    }
  },
  methods: {
    startQuiz() {
      this.startLoading = true;
      this.getQuestions();
    },
    showHostResult() {},
    showStartPage() {
      this.showQuestions = false;
      this.showResult = false;
    },
    optionSelected(event, number) {
      this.answers[this.currentQuestion.id] = [
        number,
        this.currentQuestion[event]
      ];
      this.questions[this.index]["optionSelected"] = event;
    },
    nextQuestion(next) {
      if (this.index + 1 < this.questions.length) {
        this.index = this.index + 1;
        this.currentQuestion = this.questions[this.index];
        this.selectedOption = this.questions[this.index].optionSelected;
        if (next !== "skip") {
          this.answered_count =
            ((this.index + 1 - this.skip_count) / this.questions.length) * 100;
        } else {
          this.skip_count = this.skip_count + 1;
        }
      }
    },
    getQuestions() {
      let config = {
        headers: {
          Authorization: "Token " + authStore.userToken()
        }
      };

      axios
        .get(urls.URL + "/host/startquiz/", config)
        .then(res => {
          this.startLoading = false;
          if (res.data.status) {
            this.quiz_id = res.data.quiz_id;
            this.questions = res.data.data;
            this.questions.forEach(el => {
              this.answers[el.id] = [0, ""];
            });
            this.currentQuestion = this.questions[0];
            this.showQuestion = true;
            this.startTimer();
          }
        })
        .catch(() => {
          this.startLoading = false;
        })
        .finally(() => {
          this.startLoading = false;
        });
    },
    submitAnswers() {
      this.submitLoading = true;
      // temporary add

      this.showQuestion = false;
      this.showResult = true;
      // end
      let data = {
        quiz_id: this.quiz_id,
        answers: JSON.stringify(this.answers)
      };
      let config = {
        headers: {
          Authorization: "Token " + authStore.userToken()
        }
      };
      clearInterval(this.timerInterval);
      axios
        .post(urls.URL + "/host/submitquiz/", data, config)
        .then(res => {
          console.log("ress-->>", res);
          if (res.data.status) {
            this.result_report = res.data.data;
            this.showQuestion = false;
            this.showResult = true;
          }
        })
        .catch(() => {})
        .finally(() => {
          this.submitLoading = false;
        });
    },
    onTimesUp() {
      clearInterval(this.timerInterval);
      this.submitAnswers();
    },

    startTimer() {
      this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
    }
  },
  computed: {
    circleDasharray() {
      return `${(this.timeFraction * FULL_DASH_ARRAY).toFixed(0)} 283`;
    },

    formattedTimeLeft() {
      const timeLeft = this.timeLeft;
      const minutes = Math.floor(timeLeft / 60);
      let seconds = timeLeft % 60;

      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      return `${minutes}:${seconds}`;
    },

    timeLeft() {
      return TIME_LIMIT - this.timePassed;
    },

    timeFraction() {
      const rawTimeFraction = this.timeLeft / TIME_LIMIT;
      return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
    },

    remainingPathColor() {
      const { alert, warning, info } = COLOR_CODES;

      if (this.timeLeft <= alert.threshold) {
        return alert.color;
      } else if (this.timeLeft <= warning.threshold) {
        return warning.color;
      } else {
        return info.color;
      }
    }
  },
  created: function() {
    if (authStore.userType() !== "host") {
      router.back();
    }
  }
};
</script>

<style scoped lang="scss">
.base-timer {
  display: inline-block;
  position: relative;
  width: 75px;
  height: 75px;

  &__svg {
    transform: scaleX(-1);
  }

  &__circle {
    fill: none;
    stroke: none;
  }

  &__path-elapsed {
    stroke-width: 7px;
    stroke: grey;
  }

  &__path-remaining {
    stroke-width: 7px;
    stroke-linecap: round;
    transform: rotate(90deg);
    transform-origin: center;
    transition: 1s linear all;
    fill-rule: nonzero;
    stroke: currentColor;

    &.green {
      color: rgb(65, 184, 131);
    }

    &.orange {
      color: orange;
    }

    &.red {
      color: red;
    }
  }

  &__label {
    position: absolute;
    width: 75px;
    height: 75px;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
  }
}

.quizCard {
  padding: 3%;
  border: 1px solid #d6d6d6 !important;
  border-radius: 20px !important;
}

.heading {
  font-family: "Poppins", sans-serif;
  color: #444d59;
  margin-bottom: 1%;
}

.cardHeading {
  font-family: "Poppins", sans-serif;
  color: #0fef70c6;
  font-weight: 400;
  margin-bottom: 1%;
}

.cardContent {
  font-family: "Poppins", sans-serif;
  color: #383d43;
}

.result {
  text-transform: capitalize;
  display: flex;
  justify-content: space-between;
}
.result > span {
  font-family: "Poppins", sans-serif;
}
</style>