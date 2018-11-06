import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
  },

  getters: {
    loggedIn(state) {
      return state.token !== null;
    },
  },
  mutations: {
    destroyToken() {
      this.state.token = null;
      localStorage.removeItem('access_token');
    },
  },
  actions: {
    login(context, cridentials) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://localhost:3000/users/login', {
            username: cridentials.username,
            password: cridentials.password,
          })
          .then((response) => {
            const token = response.data.signinToken;
            localStorage.setItem('access_token', token);
            this.state.token = localStorage.getItem('access_token');
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    list_users() {
      return new Promise((resolve, reject) => {
        axios
          .get('http://localhost:3000/users', {
            headers: {
              authentication: `Bearer ${localStorage.getItem('access_token')}`,
              username: localStorage.getItem('user_name'),
            },
          })
          .then((response) => {
            resolve(response.data.users);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    register(context, cridentials) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://localhost:3000/users/register', {
            name: cridentials.name,
            email: cridentials.email,
            username: cridentials.username,
            password: cridentials.password,
          })
          .then(response => resolve(response))
          .catch(error => reject(error));
      });
    },

    delete_user(context, cridentials) {
      return new Promise((resolve, reject) => {
        axios
          .delete('http://localhost:3000/users', {
            headers: {
              authentication: `Bearer ${localStorage.getItem('access_token')}`,
            },
            data: { userId: cridentials.id },
          })
          .then(response => resolve(response))
          .catch(error => reject(error));
      });
    },
  },
});

export default store;
