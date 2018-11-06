<template>
<v-content>
     <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" @submit.prevent="login">
                  <v-text-field prepend-icon="person" name="username-email" label="Username" type="text" v-model="username" :rules="usernameRules"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="password" :rules="passwordRules" required></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn  @click="login" color="primary">Login</v-btn>
              </v-card-actions>
              <v-alert
                :value="alert_error"
                type="error"
              >
              Username/password invalid
              </v-alert>
            </v-card>
            
          </v-flex>
        </v-layout>
      </v-container>   
</v-content>
</template>
<script>
export default {
    name: "login",
    data () {
      return {
        username: '',
        usernameRules: [
        v => !!v || 'Username is required'
      ],
        password: '',
        passwordRules: [
        v => !!v || 'Password is required'
      ],
        alert_error: false
      }
    },
    methods: {
      login(){
        if(this.$refs.form.validate()){
        this.$store.dispatch('login',{
          username:this.username,
          password:this.password,
        })
        .then(() => {
          this.$router.push('/userlist');
        })
        .catch(()=> {this.alert_error = true});
        }
      }
    },
}
</script>