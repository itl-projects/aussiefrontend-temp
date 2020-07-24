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
  created(){
    window.scroll({top:0,left: 0, behavior: 'smooth'});
  }
};
</script>
<style scoped></style>
