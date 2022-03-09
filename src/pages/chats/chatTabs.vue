<template>
  <div class="full-height full-width ">
    <div v-if="otherUsers.length">
      <div v-for="user of otherUsers" class="chat-tab">
        <q-badge v-if="showBadge(user)" class="absolute-top-right q-mt-sm q-mr-sm" color="red" > New</q-badge>
        <div class="full-width full-height chat-tab-container" @click="openChat(user)">
          <p class="tab-content">{{ user.name }}</p>
        </div>
      </div>
    </div>
    <div v-else class="absolute-center text-center">
      <h4> No one to chat with...</h4>
      <h5> Create another user</h5>
    </div>

  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "singleChat",
  computed: {
    ...mapState('chats', ['otherUsers','chats']),
    ...mapState('user', ['user']),
  },
  methods: {
    ...mapMutations('chats', ['setCurrentChatUser']),
    openChat(user) {
      this.setCurrentChatUser(user)
    },
    showBadge(user){
      const chat = this.chats?.find(c=>c.users.includes(user.id))
      return chat?.unRead && chat.messages[chat.messages.length-1].sender!==this.user.id;
    },
  }
}
</script>

<style scoped lang="scss">
.chat-tab {
  background-color: $indigo-4;
  position: relative;
  width: 100%;
  height: 70px;
  border-bottom: 2px solid black;
}

.chat-tab-container {
  display: flex;
  justify-content: center;
  align-content: center;
}

.tab-content {
  color: white;
  font-size: 25px;
  padding: 0;
  margin: 0;
  align-self: center;
}
</style>
