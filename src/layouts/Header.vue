<template>
  <div>
    <q-header elevated class="bg-white text-grey-8" height-hint="64">
      <q-toolbar class="GNL__toolbar">

        <q-toolbar-title shrink class="row items-center no-wrap">
          <span class="q-ml-sm primary">chat-app-frontend</span>
        </q-toolbar-title>

        <q-space/>

        <div class="q-gutter-sm row items-center no-wrap" v-if="user">
          <q-btn  color="primary" flat @click="logout"> log out </q-btn>
        </div>
      </q-toolbar>
    </q-header>
  </div>
</template>

<script>

import {mapState, mapMutations, mapActions} from "vuex";

export default {
  name: 'menu',
  props: ['leftDrawerOpen'],
  data() {
    return {
      links1: [
        {icon: 'web', text: 'Top stories'},
        {icon: 'person', text: 'For you'},
        {icon: 'star_border', text: 'Favourites'},
        {icon: 'search', text: 'Saved searches'}
      ],
    }
  },
  methods: {
    ...mapActions('user',['logout']),
  },
  computed:{
    ...mapState('user',['user']),
  }

}
</script>

<style lang="sass">
.GNL

  &__toolbar
    height: 64px

  &__toolbar-input
    width: 55%

</style>
