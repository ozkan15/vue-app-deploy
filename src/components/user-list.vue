<template>
<v-content>
  <b-table  responsive striped hover :items="users[0]" :fields="fields">
    <template ref="user" slot="action" slot-scope="row">
      <b-button size="sm" @click="deleteUser(row.item._id)" class="mr-2">
       DELETE USER
      </b-button>
    </template>
  </b-table>
</v-content>
</template>

<script>
export default {
    name: 'userList',
    data(){
      return {
        users: [],
        fields:[
          {
            key:'name',
            label:'Name'
          },
          {
            key:'username',
            label:'Username'
          },
          {
            key:'email',
            label:'Email'
          },
          {
            key:'action',
            label:'Action'
          }
        ]
      }
    },
    mounted(){
      
      this.$store.dispatch("list_users").then(docs => {
        this.users.push([...docs]);
      });
    },
    
    methods: {
      deleteUser(id){
        this.$store.dispatch('delete_user',{id:id}).then(()=>{
          this.users = [];
          this.$store.dispatch("list_users",).then(docs => {
          this.users.push([...docs]);
          });
        });
      }
    }
}
</script>

