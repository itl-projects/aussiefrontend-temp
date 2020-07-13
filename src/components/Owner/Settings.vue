<template>
  <v-container>
    <v-card>
      <v-card-title>Settings</v-card-title>
      <v-tabs v-model="tab">
        <v-tab key="general">General</v-tab>
        <v-tab key="notification">Notification</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item key="general">
          <v-card-text>general settings</v-card-text>
        </v-tab-item>
         <v-tab-item key="notification">
          <v-card-text>notification settings</v-card-text>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Settings",
  data: () => ({
    tab: null
  })
};
</script>

<style scoped>
</style>