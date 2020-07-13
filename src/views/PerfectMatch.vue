<template>
     <v-app>
    <NavBar />
   <silder/>
   <v-container>
<FilterForm v-if="false"/>
   </v-container>
  <div class="mx-5">
       <v-row >
<v-col cols="12" sm="3">
   <ProfileSearch/>
</v-col>
<v-col cols="12" sm="9">
    <MatchProfile/>
</v-col>
   </v-row>
  </div>
    <Footer />
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import silder from "@/components/HomePage/silder";
import ProfileSearch from "@/components/PerfectMatch/ProfileSearch";
import MatchProfile from "@/components/PerfectMatch/MatchProfile";
import FilterForm from "@/components/PerfectMatch/FilterForm";
    export default {
        name:"PerfectMatch",
        components:{ NavBar, Footer,silder,ProfileSearch,FilterForm, MatchProfile}
    }
</script>

<style scoped>

</style>