<template>
  <div>
    <v-card class="pa-0" max-width="100%" outlined>
      <div class="overline pa-4 mb-4 text-center white--text" style="background:#2c7873;">
            <h1>Filter Result</h1>
          </div>

      <v-card-actions class="justify-center">
        <v-btn color="warning" width="100%">Filter</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "FilterForm",
  data: () => ({
    item: 1,
    items: [
      { text: "Real-Time", icon: "mdi-clock" },
      { text: "Audience", icon: "mdi-account" },
      { text: "Conversions", icon: "mdi-flag" }
    ]
  })
};
</script>

<style lang="stylus" scoped></style>