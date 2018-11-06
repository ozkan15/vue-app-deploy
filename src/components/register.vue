<template>
<v-content>
        <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Registration Form</v-toolbar-title>
               
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" @submit.prevent="register">
                  <v-text-field prepend-icon="person" name="name" label="Name" type="text" v-model="name" :rules="nameRules"  required></v-text-field>
                  <v-text-field prepend-icon="person" name="username" label="User Name" type="text" v-model="username" :rules="usernameRules" :counter="10" required></v-text-field>
                  <v-text-field prepend-icon="person" name="email" label="Email" type="text" v-model="email" :rules="emailRules" required></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="password" :rules="passwordRules" required></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="register" color="primary">REGISTER</v-btn>
              </v-card-actions>
              <v-alert
                :value="alert_error"
                type="error"
              >
              {{error_type}}
              </v-alert>
              <v-alert
                :value="alert_success"
                type="success"
              >
              Registration successful  <router-link to="/login"> Login Your Account</router-link>
              </v-alert>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>   
</v-content>
</template>
<script>
export default {
  name: 'register',
  data() {
    return {
      name: '',
      nameRules: [
        v => !!v || 'Name is required'
      ],
      username: '',
      usernameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Username must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'email is required'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'password is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      alert_success: false,
      alert_error: false,
      error_type: '',
    };
  },
  methods: {
    register() {
      if(this.$refs.form.validate()){
      this.$store
        .dispatch('register', {
          name: this.name,
          username: this.username,
          email: this.email,
          password: this.password
        })
        .then(() => (this.alert_success = true, this.alert_error = false))
        .catch(
          (error) => {
            this.alert_error = true;
            this.alert_success = false;
            if(error.response.status == 400){
              this.error_type = 'Invalid email'
            } else {
              this.error_type = "User already exist"
            }
          }
        );
      }
    }
  }
};
</script>