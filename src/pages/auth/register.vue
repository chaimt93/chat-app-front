<template>
  <q-page class="row justify-center items-center">
    <q-card square bordered class="q-pa-lg shadow-1">
      <h5 class="text-center q-my-md">Registration</h5>
      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input filled v-model="name" type="text" label="Name"/>
          <q-input filled v-model="phone" type="number" label="Phone"/>
          <q-input filled v-model="email" type="email" label="Email"/>
          <q-input filled v-model="password" type="password" label="Password"/>
          <q-input filled v-model="verifyPassword" type="password" label="Verify password"/>
        </q-form>
      </q-card-section>

      <q-card-actions class="q-px-md">
        <q-btn color="primary" class="full-width" label="Create Account" @click="register"/>
      </q-card-actions>
      <q-card-section class="text-center q-pa-none">
        <p class="text-grey-6">Already have an account?
          <span class="go-to-login">
                <router-link to="/login" class="no-decoration">
                login
                </router-link>
              </span>
        </p>
      </q-card-section>
    </q-card>

  </q-page>
</template>

<script>
import {mapActions,mapMutations} from "vuex";

export default {
  name: 'register',
  data() {
    return {
      name: '',
      phone: '',
      email: '',
      password: '',
      verifyPassword: '',
    }
  },
  methods: {
    ...mapActions('user', ['createAccount']),
    ...mapMutations('user', ['setUser']),
    async register() {
      const passwordsOK = this.checkPasswords();
      if (passwordsOK){
        const data = {
          name:this.name,
          phone:'+972' + this.phone.substr(1,9),
          email:this.email,
          password:this.password
        }
        const {success} = await this.createAccount(data);
        if (success) {
          this.$q.notify({type: 'positive', message: 'success!'})
          this.$router.push('/chats')
        }
      }
    },
    checkPasswords() {
      return this.password === this.verifyPassword && this.password.length > 5
    },
  },

}
</script>

<style>
.q-card {
  width: 360px;
}

.go-to-login {
  color: blue;
}
</style>
