<template>
  <div>
    <div style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);">
        <v-row align="center">
            <v-col cols="6">
                <v-img src="@/assets/images/dogs.png" width="100%"></v-img>
            </v-col>
            <v-col cols="6">
                <h1>Whoops, something's up!</h1>
                <v-label>For Question contact us at<v-btn class="pl-1" color="teal" text style="text-transform:lowercase">exv-btnmple@example.com</v-btn>
                    </v-label>
            </v-col>
        </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageNotFound"
};
</script>

<style scoped>
</style>