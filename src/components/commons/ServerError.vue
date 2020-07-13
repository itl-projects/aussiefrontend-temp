<template>
    <div>
 <v-overlay :value="formSubmitting">
      <v-row
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
            <v-icon  :large="true" color="red">mdi-alert-circle</v-icon>
            
          </v-responsive>
          <br />
         
          <span class="red--text"> Sorry! Failed to create account<br/>Try after sometime </span
          >
          <br />
          <v-divider class="mt-5"></v-divider>
           <v-btn color="red" class="mt-5 pl-5 pr-5" @click="signupProgress = false">close</v-btn>
        </v-col>
      </v-row>
    </v-overlay>
    </div>
</template>

<script>
    export default {
        name:"ServerError"
    }
</script>

<style scoped>

</style>