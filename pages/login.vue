<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="../static/m.png" alt="Vue Material Admin" width="120" height="120" />
                  <h1 class="flex my-4 primary--text">Japanese Love Me</h1>
                </div>
                <Notification :message="error" v-if="error" />
                <v-form>
                  <v-text-field
                    append-icon="person"
                    name="login"
                    label="Login"
                    type="text"
                    id="username"
                    v-model="username"
                  ></v-text-field>
                  <v-text-field
                    append-icon="lock"
                    name="password"
                    label="Password"
                    id="password"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn icon>
                  <v-icon color="blue">fa fa-facebook-square fa-lg</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon color="red">fa fa-google fa-lg</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon color="light-blue">fa fa-twitter fa-lg</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="login" :loading="loading">Login</v-btn>
                <!-- <p class="title">{{user.firstName}}</p> -->
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  layout: "default",
  data() {
    // model: {

    //   //hello: "hello word",
    // },
    return {
      loading: false,
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    login() {
      this.loading = true;

      console.log("test");
      this.$store.dispatch("AUTH/login", {
        username: this.username,
        password: this.password,
      });
      setTimeout(() => {
      this.$router.push("/dashboard");
    }, 1000);
    },
  },
  computed: {
    ...mapGetters({
      user: "AUTH/user",
    }),
    
  },
  // mounted() {
  //   console.log(this.user); // I'm text inside the component.
  
  // },
};
</script>
<style scoped lang="css">
#login {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}
</style>
