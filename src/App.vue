<template>
  <v-app>
    <v-toolbar app>
      
    <v-toolbar-title>DEMO</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn v-if="!loggedIn" flat><router-link  class="links" to="/login">LOGIN</router-link></v-btn>
      <v-btn v-if="!loggedIn" flat><router-link class="links" to="/register">REGISTER</router-link></v-btn>
      <v-btn v-if="loggedIn" flat @click="logout">LOGOUT</v-btn>
      <v-btn v-if="loggedIn" flat><router-link class="links" to="/userlist">USERLIST</router-link></v-btn>
    </v-toolbar-items>
    </v-toolbar>

     <v-content>  
       <router-view></router-view>
    </v-content>

     <v-footer height="auto" color="primary lighten-1">
    <v-layout justify-center row wrap>
      <v-btn v-for="link in links" :key="link" color="white" flat round>
        {{ link }}
      </v-btn>
      <v-flex primary lighten-2 py-3 text-xs-center white--text xs12>
        &copy;2018 — <strong>demo</strong>
      </v-flex>
    </v-layout>
  </v-footer>
  </v-app>
</template>

<script>
import login from './components/login';
import register from './components/register';
import userList from './components/user-list';

export default {
  name: 'App',
  components: {
    /* eslint-disable */
    // eslint-disable-next-line
    'app-login': login,
    'app-register': register,
    'app-userdata': userList
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    }
  },
  methods: {
    logout(){
      this.$store.commit('destroyToken');
      this.$router.push('/login');
    }
  }
};
</script>

<style>

</style>

