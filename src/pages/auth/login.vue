<template>
  <q-page class="row justify-center items-center">
    <q-card square bordered class="q-pa-lg shadow-1">
      <h5 class="text-center q-my-md">Login</h5>
      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input filled v-model="email" type="email" label="Email"/>
          <q-input filled v-model="password" type="password" label="Password"/>
        </q-form>
      </q-card-section>
      <q-card-actions class="q-px-md">
        <q-btn color="primary" class="full-width" label="log in" @click="loginActions"/>
      </q-card-actions>
      <q-card-section class="text-center q-pa-none">
        <p class="text-grey-6">
          Dont have an account?
          <span class="go-to-login">
                <router-link to="/register" class="no-decoration">
                register
                </router-link>
              </span>
        </p>

      </q-card-section>
    </q-card>

  </q-page>
</template>

<script>
import {mapActions, mapMutations} from "vuex"

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    ...mapActions('user', ['login']),
    async loginActions() {
      const {success} = await this.login({email: this.email, password: this.password});
      if (success) {
        this.$q.notify({type: 'positive', message: 'welcome!'})
        this.$router.push('/chats')
      }
    }
  }

}
</script>

<style scoped lang="scss">
.q-card {
  width: 360px;
}

.go-to-login {
  color: blue;
}

</style>
