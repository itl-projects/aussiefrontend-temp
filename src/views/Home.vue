<template>
  <v-app>
    <NavBar />
    <silder />
    <OurMainService />
    <OurMainFeature />
    <ClientReview />
    <Footer />
  </v-app>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar";
import silder from "@/components/HomePage/silder";
import OurMainService from "@/components/HomePage/OurMainService";
import OurMainFeature from "@/components/OurMainFeature";
// import shop from "@/components/HomePage/shop";
import ClientReview from "@/components/HomePage/ClientReview";
import Footer from "@/components/Footer";


export default {
  name: "Home",
  components: {
    NavBar,
    silder,
    OurMainService,
    OurMainFeature,
    // shop,
    ClientReview,
    Footer
  }
};
</script>
