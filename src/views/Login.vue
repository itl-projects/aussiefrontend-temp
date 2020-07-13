<template>
  <div>
    <NavBar />
    <LoginData />
    <Footer />
  </div>
</template>
<script>
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import LoginData from "@/components/LoginPage/LoginData";
export default {
  name: "Login",
  components: {
    NavBar,
    LoginData,
    Footer,
  },
};
</script>
<style scoped></style>
