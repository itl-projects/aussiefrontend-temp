<template>
  <v-app>
    <NavBar />
    <div>
      <v-row class="backgroundClass">
        <v-col sm="5" cols="5">
          <v-card style="display: flex;margin: auto;">
            <v-col class="pa-0">
              <div class="container">
                <div>
                  <h1 class="heading">Find your soul mate with us..</h1>
                  <p
                    class="content"
                  >If someone likes you back, It’s a Match! We invented the double opt-in so that two people will only match when there’s a mutual interest. No stress. No rejection. Just tap through the profiles you’re interested in, chat online with your matches, then step away from your phone, meet up in the real world and spark something new.</p>

                  <p>If someone likes you back, It’s a Match! We invented the double opt-in so that two people will only match when there’s a mutual interest. No stress. No rejection. Just tap through the profiles you’re interested in, chat online with your matches, then step away from your phone, meet up in the real world and spark something new.</p>
                </div>
                <div>
                  <v-btn
                    block
                    class="containerButton"
                    color="#383D43"
                    :to="isLoggedIn ? '/dating-profile' :'/login'"
                  >Login & continue</v-btn>
                </div>
              </div>
            </v-col>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <Footer />
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import authStore from "../store/auth";
import router from "../router";

export default {
  name: "PerfectMatchHome",
  components: {
    NavBar,
    Footer
  },
  data() {
    return {
      isLoggedIn: false
    };
  },
  created() {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
    if (authStore.isSignedIn()) {
      this.isLoggedIn = true;
      if (authStore.userType() == "petowner") router.replace("/owner");
      else if (authStore.userType() == "host") router.replace("/perfect-match");
    } else {
      this.isLoggedIn = false;
    }
  }
};
</script>

<style scoped>
.backgroundClass {
  background: url("https://source.unsplash.com/1600x900/?couple,dating");
  padding: 5%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.container {
  padding: 5%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.heading {
  margin-bottom: 5%;
  color: #383d43;
  font-family: "Poppins", sans-serif;
}

.content {
  color: #383d43;
  font-family: "Roboto", sans-serif;
}
.containerButton {
  color: #fff;
  margin-top: 2%;
}
</style>