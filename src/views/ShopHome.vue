<template>
  <div>
    <NavBar />
    <!-- <Shop /> -->
    <router-view></router-view>
    <Footer />
  </div>
</template>
<script>
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
export default {
  name: "ShopPage",
  components: {
    NavBar,
    Footer
  },
  created() {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }
};
</script>
<style scoped></style>
