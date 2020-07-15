<template>
  <div>
    <NavBar />
    <Shop />
    <Footer />
  </div>
</template>
<script>
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Shop from "@/components/Shop/Shop";
export default {
  name: "ShopPage",
  components: {
    NavBar,
    Footer,
    Shop
  },
};
</script>
<style scoped></style>
