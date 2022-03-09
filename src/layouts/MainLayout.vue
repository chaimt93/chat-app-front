<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <Header class="header"/>
    <q-page-container v-if="showPages" class="no-scroll">
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import Header from './Header'
import { mapActions, mapState} from "vuex";

export default {
  name: 'GoogleNewsLayout',
  components: {Header},
  data() {
    return {
      ready: false,
    }
  },
  created() {
    this.getUser();
  },
  methods: {
    ...mapActions('user', ['getUser'])
  },
  computed: {
    ...mapState('user', ['user']),
    showPages() {
      return this.user !== null || this.$route.meta?.authNotRequired;
    }
  }
}
</script>

<style lang="scss">
.no-scroll {
  overflow: hidden;
}
</style>
