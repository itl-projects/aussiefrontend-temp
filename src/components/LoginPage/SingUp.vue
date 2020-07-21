<template>
<v-container>
  <v-form @submit.prevent="submit" class="mt-2" ref="form" v-model="valid">
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
          :error-messages="emailErrors"
          :success-messages="emailSuccess"
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
          :error-messages="firstErrors"
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
    <v-btn color="#00D657" type="submit" class="mr-4 mt-5 px-10 white--text" :disabled="!valid">Sign up</v-btn>
  </v-form>
  <v-overlay :value="signupProgress">
      <v-progress-circular v-if="signupLoading" indeterminate size="64"></v-progress-circular>
      <v-row v-else
        class="text-center"
        style="background: #ffffff; border-radius: 6px;padding:20px 30px;">
        <v-col cols="12" class="m-0 p-0">
          <v-responsive
            class="text-center grey lighten-2 d-inline-flex align-center justify-center ma-3"
            height="52"
            width="52"
            style="border-radius: 50%;">
            <v-icon v-if="signupSuccess" :large="true" color="success">mdi-check-outline</v-icon>
            <v-icon v-else :large="true" color="red">mdi-alert-circle</v-icon>
          </v-responsive>
          <br />
          <span v-if="signupSuccess" class="success--text"> Success! Account has been created successfully
          <br/>Now Signin to access your account.
          </span>
          <span v-else class="red--text">Sorry! Failed to create account<br/>Try after sometime </span>
          <br />
          <v-divider class="mt-5"></v-divider>
          <v-btn v-if="signupSuccess" color="success" class="mt-5 pl-5 pr-5" @click="goToLogin">done</v-btn>
           <v-btn v-else color="red" class="mt-5 pl-5 pr-5" @click="signupProgress = false">close</v-btn>
        </v-col>
      </v-row>
    </v-overlay>
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
    nameSuccess:[],
    phoneSuccess:[],
    emailSuccess:[],
    signupProgress:false,
    signupLoading:false,
    signupSuccess:false,
    rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          validUsername: v => v.length >= 3 || "Username must be of minimum 3 character",
        },
        nameErrors:[],
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
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    phoneErrors(){
      const errors = [];
      if (!this.$v.phone.$dirty) return errors;
      !this.$v.phone.phone && errors.push("Enter a valid mobile number");
      !this.$v.phone.required && errors.push("Mobile number is required");
      return errors;
    },
    numricErrors() {
      const errors = [];
      if (!this.$v.phone.$dirty) return errors;
      !this.$v.phone.integer && errors.push("Must be valid number");
      !this.$v.phone.minLength && errors.push("phone length must be 10");
      !this.$v.phone.required && errors.push("phone number is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength && errors.push("Password must contain atleast 8 characters");
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
    reset () {
        this.$refs.form.reset()
      },
    UserName(val){
      if(val.length > 3 && !val.includes(" ")){
      let data = {username: val};
      axios.post(urls.URL+"/validate/",data).then(res=>{
        this.nameErrors = [];
        this.nameSuccess =  [];
        if(res.data.status){
            this.nameSuccess.push(res.data.data.status);
        }
        else if(!res.data.status){
          this.nameErrors.push(res.data.errors.username[0]);
        }
      }).catch((err)=>{
        console.log(err)
      })
      }else{
        this.nameErrors.push("Not a valid username");
      }
    },
    
    email(val){
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if(val.length > 10 && re.test(val)){
      
      this.emailSuccess = [];
      let data = {email: val};

      axios.post(urls.URL+"/validate/",data).then(res=>{
        if(!res.data.status){
          this.emailErrors = res.data.errors.email;
        }else if(res.data.status){
            this.emailSuccess.push(res.data.data.status);
        }
      }).catch((err)=>{
        console.log(err)
      })
      }
    },
    phone(val){
      let phone_re = /^(\+\d{1,3}[- ]?)?\d{10}$/;
      
      if(val.length > 9 && phone_re.test(val)){
        this.phoneSuccess = [];
      let data = {phone: val};
      axios.post(urls.URL+"/validate/",data).then(res=>{
        if(!res.data.status){
          this.phoneErrors = res.data.errors.phone;
        }else if(res.data.status){
            this.phoneSuccess.push(res.data.data.status);
        }
      }).catch((err)=>{
        console.log(err)
      })
      }else{
        this.phoneSuccess = [];
        this.phoneErrors.push("Enter a valid phone number");
      }
    },
  },
  methods: {
    goToLogin(){
      this.signupProgress = false;
      router.replace("/login");
      window.location.reload();
    },
    submit() {
      if(!this.valid){
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
        url = urls.URL+"/petowner/register/";
      } else if (type == "Host") {
        url = urls.URL+"/host/register/";
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
        this.signupProgress = true;
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
            this.signupLoading = false;
            if(res.data.status){
            this.signupSuccess = true;
            }else{
            //  if(res.data.errors.username){
               
            //  }
            }
          })
          .catch(e => {
          this.signupLoading = false;
          this.signupSuccess = false;
          console.log(e);
          });
      } else {
        this.$v.$touch();
      }
    },
    clearForm(){
      this.UserName = "";
      this.FirstName = "";
      this.LastName = "";
      this.email = "";
      this.phone = "";
      this.password = "";
      this.repeatPassword = "";
      this.select = "";
    }
  }
};
</script>
<style scoped>
</style>