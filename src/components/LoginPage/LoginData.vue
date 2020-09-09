<template>
  <v-container :fluid="true">
    <v-row no-gutters style="background-color: #F1F1F170">
      <v-card style="display:flex;margin: 5% 10%;padding: 5% 10%;">
        <v-col
          :cols="6"
          class="text-center pa-0"
          style="border-radius: 0px;border: 0.5px solid #00000029"
        >
          <div class="login-image">
            <img class="v-image" src="images/cat1.png" lazy-src="images/cat1.png" />
          </div>
        </v-col>
        <v-col :cols="6" class="text-center pa-0">
          <div class="login-form">
            <v-tabs v-model="tab" background-color="#fff" centered dark icons-and-text>
              <v-tab
                style="margin-left: 0px;font-family: 'Poppins', sans-serif;font-weight: 600;"
                href="#tab-1"
                @click="signin"
              >Sign In</v-tab>
              <v-tab
                style="font-family: 'Poppins', sans-serif;font-weight: 600;"
                href="#tab-2"
                @click="signup"
              >Sign Up</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
              <v-tab-item value="tab-1" class="mt-0">
                <v-alert
                  v-if="alert.show"
                  dense
                  border="left"
                  type="error"
                  dismissible
                  class="mx-sm-10 text-start"
                >{{alert.message}}</v-alert>
                <form
                  ref="loginForm"
                  style="margin-left: 15%;text-align: left;"
                  @submit="submit"
                  class="form-size"
                >
                  <v-text-field
                    v-model="email"
                    :rules="emailrule"
                    :error-messages="errorEmail"
                    label="Enter E-mail / Mobile number"
                    outlined
                    required
                    dense
                    hide-details="auto"
                  ></v-text-field>
                  <v-text-field
                    class="mt-3"
                    v-model="password"
                    :rules="passwordrule"
                    :error-messages="errorPass"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    label="Enter Password"
                    outlined
                    dense
                    @click:append="show1 = !show1"
                    required
                  ></v-text-field>
                  <div class="ma-0" style="text-align: start;">
                    <!-- <a>Forgot password ?</a> -->
                    <v-btn
                      text
                      class="pl-0"
                      small
                      color="#0FEF70"
                      style="font-family: 'Poppins', sans-serif;"
                      @click="showForgotPasswordBox"
                    >Forgot password ?</v-btn>
                  </div>
                  <v-btn
                    dark
                    color="#383D43"
                    class="mt-4 loginScreenBtn"
                    type="submit"
                    :loading="logging_in"
                  >Login</v-btn>
                </form>
              </v-tab-item>
              <v-tab-item value="tab-2" style="padding:0 15px">
                <!-- Sing up Form Components -->
                <SingUp />
              </v-tab-item>
            </v-tabs-items>
          </div>
        </v-col>
      </v-card>
    </v-row>
    <v-overlay :value="formSubmitting">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-overlay :value="forgotProgress">
      <v-progress-circular v-if="forgotLoading" indeterminate size="64"></v-progress-circular>
      <v-row
        v-else
        class="text-center"
        style="background: #ffffff; border-radius: 6px;padding:20px 30px;"
      >
        <v-col cols="12" class="m-0 p-0">
          <v-responsive
            class="text-center grey lighten-2 d-inline-flex align-center justify-center ma-3"
            height="52"
            width="52"
            style="border-radius: 50%;"
          >
            <v-icon v-if="forgotSuccess" :large="true" color="success">mdi-check-outline</v-icon>
            <v-icon v-else :large="true" color="red">mdi-alert-circle</v-icon>
          </v-responsive>
          <br />
          <h1 v-if="forgotSuccess" class="success--text">Success!</h1>
          <h1 v-else class="red--text">Sorry!</h1>
          <br />
          <span v-if="forgotSuccess" class="success--text">
            We have sent password reset link to your registred email
            <br />address. Follow the link to reset your link.
          </span>
          <div v-else>
            <p v-if="no_email" class="red--text">
              Unable to find account linked with
              <br />
              <span class="red lighten-4 mx-1 px-1" style="border-radius: 5px;">{{forgotEmail}}</span> email address.
            </p>
            <span v-else class="red--text">
              Failed to send password reset link.
              <br />Try after sometime
            </span>
          </div>
          <br />
          <v-divider class="mt-5"></v-divider>
          <v-btn
            v-if="forgotSuccess"
            color="success"
            class="mt-5 pl-5 pr-5"
            @click="forgotProgress = false"
          >done</v-btn>
          <v-btn
            v-else
            color="red"
            class="mt-5 pl-5 pr-5"
            @click="forgotProgress = false;forgotEmail = ''"
          >close</v-btn>
        </v-col>
      </v-row>
    </v-overlay>

    <div class="forgot-dialog">
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="headline success white--text" primary-title>Forgot passowrd form</v-card-title>

          <v-card-text>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="forgotEmail"
                  :rules="emailrule"
                  :error-messages="errorForgotEmail"
                  label="Enter E-mail / Mobile number"
                  outlined
                  required
                  dense
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" class="white--text" dark @click="dialog = false">close</v-btn>
            <v-btn class="ma-3" color="#2c7873" dark @click="sendPasswordResetLink">send</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email, password } from "vuelidate/lib/validators";
import SingUp from "@/components/LoginPage/SingUp";
import axios from "axios";
import urls from "@/axios/config";
import router from "../../router";
import authStore from "../../store/auth";

export default {
  name: "LoginData",
  mixins: [validationMixin],
  components: { SingUp },
  validations: {
    email: { required, email },
    password: { required, password }
  },
  data: () => ({
    type_text: "Login",
    type_text_info: "login credentials",
    show1: false,
    tab: "tab-1",
    email: "",
    password: "",
    errorEmail: [],
    errorPass: [],
    value: "",
    passwordrule: [v => !!v || "Password is required"],
    emailrule: [v => !!v || "E-mail/Mobile number is required"],
    formSubmitting: false,
    dialog: false,
    forgotProgress: false,
    forgotLoading: false,
    forgotSuccess: false,
    forgotEmail: "",
    no_email: false,
    errorForgotEmail: [],
    show_error: false,
    message: "",
    logging_in: false,
    alert: { show: false, message: "" }
  }),
  watch: {
    email: function(val) {
      this.email = val;
    },
    password: function(val) {
      this.password = val;
    }
  },
  created: function() {
    if (authStore.isSignedIn()) {
      if (authStore.userType() == "petowner") router.replace("/owner");
      else if (authStore.userType() == "host") router.replace("/host");
    }
    if (window.location.pathname === "/signup") {
      this.tab = "tab-2";
      this.signup();
    }
  },
  methods: {
    submit: function(e) {
      var ep_emailval = this.email;
      var password = this.password;
      var username;
      if (this.vaildNumber(ep_emailval)) {
        if (
          ep_emailval.length < 10 ||
          ep_emailval.length > 10 ||
          !this.vaildNumber(ep_emailval)
        ) {
          this.errorEmail.pop();
          this.errorEmail.push("Please enter a valid phone number.");
        } else {
          username = ep_emailval;
        }
      } else {
        if (this.validEmail(ep_emailval) == false) {
          this.errorEmail.pop();
          this.errorEmail.push("Please enter valid email address.");
        } else {
          username = ep_emailval;
        }
      }
      if (username != null && password != null) {
        this.formSubmitting = true;
        let data = {
          phone: username,
          password: password
        };
        if (username.includes("@")) {
          data = {
            email: username,
            password: password
          };
        }

        this.logging_in = true;
        axios
          .post(urls.URL + "/login/", data)
          .then(res => {
            this.logging_in = false;
            this.formSubmitting = false;
            if (res.data.status) {
              authStore.saveUserData(res.data);
              if (res.data.type == "petowner") router.replace("/owner");
              else if (res.data.type == "host") router.replace("/host");
            } else {
              this.alert.show = true;
              this.alert.message = "Error !  Wrong login credentials.";
              setTimeout(() => {
                this.alert.show = false;
                this.alert.message = "";
              }, 5000);
            }
          })
          .catch(() => {
            this.logging_in = false;
            this.formSubmitting = false;
          });
      }
      e.preventDefault();
    },

    validEmail: function(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    vaildNumber: function(value) {
      var re = /^\d*$/;
      return re.test(value);
    },
    signin: function() {
      this.type_text = "Login";
      this.type_text_info = "login credentials";
      router.replace("/login");
    },
    signup: function() {
      this.type_text = "Signup";
      this.type_text_info = "signup details";
      router.replace("/signup");
    },
    showForgotPasswordBox: function() {
      this.dialog = true;
    },
    sendPasswordResetLink: function() {
      if (this.vaildNumber(this.forgotEmail)) {
        // console.log("is phone");
        if (
          this.forgotEmail.length < 10 ||
          this.forgotEmail.length > 10 ||
          !this.vaildNumber(this.forgotEmail)
        ) {
          this.errorForgotEmail.pop();
          this.errorForgotEmail.push("Please enter a valid phone number.");
          return;
        }
      } else {
        //   console.log("is email");
        if (!this.validEmail(this.forgotEmail)) {
          this.errorForgotEmail.pop();
          this.errorForgotEmail.push("Please enter valid email address.");
          return;
        }
      }

      const data = { email: this.forgotEmail };
      this.dialog = false;
      this.forgotProgress = true;
      this.forgotLoading = true;

      axios
        .post(urls.URL + "/forgot/", data)
        .then(res => {
          if (res.data.status) {
            this.forgotSuccess = true;
          } else {
            this.no_email = true;
            this.forgotSuccess = false;
          }
        })
        .catch(() => {
          this.no_email = false;
          this.forgotSuccess = false;
        })
        .finally(() => {
          this.forgotLoading = false;
        });
    }
  }
};
</script>
<style scoped>
.v-tab--active {
  color: #000 !important;
  background-color: #fff;
  border-bottom: 3px solid #0fef70;
}

.v-tab[data-v-273daedc] {
  height: 50%;
}

.container {
  padding: 0%;
}
.col {
  padding: 20px;
}
.col-12 {
  padding: 20px;
}

.v-image {
  width: 100%;
}
.login-form {
  width: 90%;
  margin: auto;
  margin-top: 27px;
  padding-bottom: 30px;
}
.v-tab {
  max-width: 100%;
}
.v-tab-items {
  padding: 0 15px !important;
}
.form-size {
  width: 100%;
  padding: 10px;
  margin: auto;
}

.theme--dark.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active),
.theme--dark.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) > .v-icon,
.theme--dark.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) > .v-btn,
.theme--dark.v-tabs > .v-tabs-bar .v-tab--disabled {
  color: #000;
}

.loginScreenBtn {
  text-transform: capitalize;
  border-radius: 20px;
}

@media only screen and (max-width: 600px) {
  .login-form {
    width: 100%;
    margin: auto;
    margin-top: 27px;
    padding: 10px;
  }
  .form-size {
    width: 100%;
    padding: 10px;
    margin: auto;
  }
}
</style>
