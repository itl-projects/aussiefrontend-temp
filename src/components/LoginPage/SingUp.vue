<template>
  <v-container>
    <v-row>
      <v-col>
        <v-alert
          v-if="alert.show"
          dense
          border="left"
          :type="alert.type"
          dismissible
        >{{alert.message}}</v-alert>
      </v-col>
    </v-row>

    <v-form
      @submit.prevent="submit"
      style="margin-left: 17%;text-align:start;"
      ref="form"
      v-model="valid"
    >
      <v-row>
        <v-col class="pb-0">
          <v-text-field
            v-model="UserName"
            :error-messages.sync="nameErrors"
            :success-messages="nameSuccess"
            label="User Name"
            name="UserName"
            required
            outlined
            dense
            :rules="[rules.validUsername,rules.required]"
            @input="$v.UserName.$touch()"
            @blur="$v.UserName.$touch()"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" class="pb-0">
          <v-text-field
            v-model="email"
            :error-messages.sync="emailErrors"
            :success-messages.sync="emailSuccess"
            :rules="[rules.required]"
            label="E-mail"
            name="email"
            required
            outlined
            dense
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="FirstName"
            :error-messages.sync="firstErrors"
            :rules="[rules.required]"
            name="FirstName"
            label="First Name"
            hide-details="auto"
            required
            outlined
            dense
            @input="$v.FirstName.$touch()"
            @blur="$v.FirstName.$touch()"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="LastName"
            :error-messages="lastErrors"
            :rules="[rules.required]"
            name="LastName"
            label="Last Name"
            hide-details="auto"
            required
            outlined
            dense
            @input="$v.LastName.$touch()"
            @blur="$v.LastName.$touch()"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            v-model="phone"
            :error-messages="numricErrors"
            :success-messages="phoneSuccess"
            :rules="[rules.required]"
            label="Phone Number"
            name="phone"
            hide-details="auto"
            required
            outlined
            dense
            @input="$v.phone.$touch()"
            @blur="$v.phone.$touch()"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
            v-model="select"
            :items="items"
            :rules="[rules.required]"
            :error-messages="selectErrors"
            label="User type"
            hide-details="auto"
            required
            outlined
            dense
            @change="$v.select.$touch()"
            @blur="$v.select.$touch()"
          ></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            v-model="password"
            :error-messages="passwordErrors"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            :rules="[rules.required]"
            name="password"
            label="Password"
            hint="At least 8 characters"
            hide-details="auto"
            counter
            required
            outlined
            dense
            @click:append="show1 = !show1"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="repeatPassword"
            :rules="[rules.required]"
            :error-messages="repeatPasswordErrors"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            name="repeatPassword"
            label="Confrim Password"
            hint="At least 8 characters"
            hide-details="auto"
            counter
            required
            outlined
            dense
            @click:append="show1 = !show1"
            @input="$v.repeatPassword.$touch()"
            @blur="$v.repeatPassword.$touch()"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn
        color="#383D43"
        type="submit"
        class="signupScreenBtn mr-4 mt-5 px-10 white--text"
        :disabled="!valid"
        :loading="signupLoading"
      >Sign up</v-btn>
    </v-form>
  </v-container>
</template>
<script>
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  sameAs,
  integer,
  minLength
} from "vuelidate/lib/validators";
import axios from "axios";
import urls from "@/axios/config";
import router from "../../router";

export default {
  name: "SingUp",
  mixins: [validationMixin],
  validations: {
    FirstName: { required, name },
    LastName: { required, name },
    UserName: { required, name, minLength: minLength(5) },
    email: { required, email },
    phone: { required, integer, minLength: minLength(10) },
    select: { required },
    password: { required, minLength: minLength(8) },
    repeatPassword: {
      sameAsPassword: sameAs("password")
    }
  },
  data: () => ({
    alert: { show: false, type: null, message: "" },
    valid: true,
    show1: false,
    UserName: "",
    FirstName: "",
    LastName: "",
    email: "",
    phone: "",
    password: "",
    repeatPassword: "",
    select: null,
    requiredRule: [],
    items: ["Host", "PetOwner"],
    menu: false,
    nameSuccess: [],
    phoneSuccess: [],
    emailSuccess: [],
    signupLoading: false,
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters",
      validUsername: v =>
        v.length >= 3 || "Username must be of minimum 3 character"
    },
    nameErrors: [],
    emailErrors: [],
    phoneErrors: []
  }),

  computed: {
    selectErrors() {
      const errors = [];
      if (!this.$v.select.$dirty) return errors;
      !this.$v.select.required && errors.push("user type is required");
      return errors;
    },

    firstErrors() {
      const errors = [];
      if (!this.$v.FirstName.$dirty) return errors;
      !this.$v.FirstName.required && errors.push("First Name is required.");
      return errors;
    },
    lastErrors() {
      const errors = [];
      if (!this.$v.LastName.$dirty) return errors;
      !this.$v.LastName.required && errors.push("Last Name is required.");
      return errors;
    },

    numricErrors() {
      const errors = [];
      if (!this.$v.phone.$dirty) return errors;
      !this.$v.phone.integer && errors.push("Must be valid number");
      !this.$v.phone.minLength && errors.push("Not a valid phone number");
      !this.$v.phone.required && errors.push("phone number is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Password must contain atleast 8 characters");
      !this.$v.password.required && errors.push("password is required");
      return errors;
    },
    repeatPasswordErrors() {
      const errors = [];
      if (!this.$v.repeatPassword.$dirty) return errors;
      !this.$v.repeatPassword.sameAsPassword &&
        errors.push("password not match");
      return errors;
    }
  },
  watch: {
    reset() {
      this.$refs.form.reset();
    },
    UserName(val) {
      if (val.length > 3 && !val.includes(" ")) {
        let data = { username: val };
        axios
          .post(urls.URL + "/validate/", data)
          .then(res => {
            this.nameErrors = [];
            this.nameSuccess = [];
            if (res.data.status) {
              this.nameSuccess = [res.data.data.status];
            } else if (!res.data.status) {
              this.nameErrors = res.data.errors.username;
            }
          })
          .catch(() => {});
      } else {
        this.nameErrors = ["Not a valid username"];
      }
    },

    email(val) {
      this.emailErrors = [];
      this.emailSuccess = [];
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (val.length > 10 && re.test(val)) {
        let data = { email: val };
        axios
          .post(urls.URL + "/validate/", data)
          .then(res => {
            if (!res.data.status) {
              this.emailErrors = res.data.errors.email;
            } else if (res.data.status) {
              this.emailSuccess = [res.data.data.status];
            }
          })
          .catch(() => {});
      } else {
        this.emailErrors = ["Enter valid email address"];
      }
    },
    phone(val) {
      this.phoneErrors = [];
      this.phoneSuccess = [];
      let data = { phone: val };
      axios
        .post(urls.URL + "/validate/", data)
        .then(res => {
          if (!res.data.status) {
            this.phoneErrors = res.data.errors.phone;
          } else if (res.data.status) {
            this.phoneSuccess = [res.data.data.status];
          }
        })
        .catch(() => {});
    }
  },
  methods: {
    goToLogin() {
      this.signupProgress = false;
      router.replace("/login");
      window.location.reload();
    },
    submit() {
      if (!this.valid) {
        return;
      }
      var username = this.UserName;
      var first_name = this.FirstName;
      var last_name = this.LastName;
      var email = this.email;
      var phone = this.phone;
      var password = this.password;
      var type = this.select;
      var url;
      if (type == "PetOwner") {
        url = urls.URL + "/petowner/register/";
      } else if (type == "Host") {
        url = urls.URL + "/host/register/";
      } else {
        this.$v.$touch();
      }

      if (
        username != null &&
        first_name != null &&
        last_name != null &&
        email != null &&
        phone != null &&
        password != null &&
        type != null
      ) {
        this.signupLoading = true;
        axios
          .post(url, {
            username,
            first_name,
            last_name,
            email,
            phone,
            password
          })
          .then(res => {
            if (res.data.status) {
              this.showAlert(
                "success",
                "Success! you account has been created successfully."
              );
            } else {
              if (res.data.errors.username) {
                this.nameErrors = res.data.errors.username;
              }
              if (res.data.errors.email) {
                this.emailErrors = res.data.errors.email;
              }
              if (res.data.errors.phone) {
                this.phoneErrors = res.data.errors.phone;
              }
              if (res.data.errors.password) {
                this.numricErrors.push(res.data.errors.password);
              }

              //this.showAlert("red","Error! Failed to create account.")
            }
          })
          .catch(() => {
            this.showAlert(
              "red",
              "Error! Server not responding. Try after sometime."
            );
          })
          .finally(() => {
            this.signupLoading = false;
          });
      } else {
        this.$v.$touch();
      }
    },
    clearForm() {
      this.UserName = "";
      this.FirstName = "";
      this.LastName = "";
      this.email = "";
      this.phone = "";
      this.password = "";
      this.repeatPassword = "";
      this.select = "";
    },
    showAlert(type, message) {
      this.alert.show = true;
      this.alert.type = type;
      this.alert.message = message;
      setTimeout(() => {
        this.alert.show = false;
      }, 5000);
    }
  }
};
</script>
<style scoped>
.signupScreenBtn {
  text-transform: capitalize;
  border-radius: 20px;
}
</style>