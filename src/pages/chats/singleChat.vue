<template>
  <div class="full-height full-width">
    <div v-if="currentChatUser">
      <div class="chat-header">
        <p class="title"> chat with <strong>{{ currentChatUser.name }}</strong></p>
      </div>
      <div class="messages-area row" ref="messagesArea">
        <div v-for="message of messages" class="col-10">
          <q-chat-message
            v-if="!message.url"
            :name="getName(message)"
            :text="[message.text]"
            :sent="getSent(message)"
            :stamp="getStamp(message.time)"
          />
          <div v-if="message.url" :class="`q-py-sm row justify-${getSent(message) ? 'end' : 'start' }`">
            <p :class="`no-margin col-12 text-${getSent(message) ? 'right' : 'left'} `">{{ getName(message) }}</p>
            <q-img :ref="message.url" :src="message.url" class="chat-img" @click="setOpenImg(message.url)"/>
          </div>
        </div>

      </div>
      <div class="text-area">
        <q-input class="full-width no-margin" dense v-model="messageText" type="text" label="Type anything..." @keypress="sendOnEnter">
          <template v-slot:append>
            <q-btn flat icon="send" color="primary" @click="sendMessage"/>
          </template>
          <template v-slot:prepend>
            <q-btn flat icon="image" color="primary" @click="uploadImage"/>
          </template>
        </q-input>
      </div>

    </div>
    <div v-else>
      <h5 class="absolute-center"> No messages here yet...</h5>
    </div>

  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import uploadImageDialog from "../../components/popups/uploadImageDialog";

export default {
  name: "singleChat",
  data() {
    return {
      messageText: null,
    }
  },
  methods: {
    ...mapActions('chats', ['send_message', 'updateChat']),
    init() {
      if (this.chat) {
        const chat = {...this.chat, unRead: false}
        this.updateChat({chat})
        this.scrollToBottom();
      }
    },
    sendOnEnter({keyCode}){
      if (keyCode===13) this.sendMessage()
    },
    async sendMessage() {
      if (this.messageText) {
        await this.send_message(this.messageText);
        this.messageText = null;
      } else this.$q.notify({type: 'negative', message: 'you didnt write anything!'})
    },
    scrollToBottom() {
      if (this.$refs.messagesArea) {
        setTimeout(() => {
          this.$refs.messagesArea.scroll(0, this.$refs?.messagesArea?.scrollHeight)
        }, 100)
      }
    },
    getSent(message) {
      return message.sender === this.currentChatUser.id
    },
    getStamp(milliseconds) {
      return new Date(milliseconds).toLocaleDateString('he-il')
    },
    getName(message) {
      return this.getSent(message) ? this.currentChatUser.name : this.user.name
    },
    uploadImage() {
      this.$q.dialog({
        component: uploadImageDialog,
        parent: this
      }).onOk(img => {
        const message = {
          sender: this.user.id,
          time: new Date().getTime(),
          chatUser: this.currentChatUser
        }
        this.$emit('file', {message, img})
      })
    },
    setOpenImg(ref) {
      const img = this.$refs[ref].$el;
      if (img.className.includes("largeImg")) img.className = img.className.replace("largeImg", "chat-img");
      else img.className = img.className.replace("chat-img", "largeImg")
    },
  },
  computed: {
    ...mapState('chats', ['currentChatUser', 'chats']),
    ...mapState('user', ['user']),
    chat() {
      return this.chats?.find(c => c.users.includes(this.currentChatUser?.id))
    },
    messages() {
      return this.chat?.messages
    },
  },
  watch: {
    currentChatUser() {
      this.init();
    },
    messages() {
      this.scrollToBottom()
    }
  }
}
</script>

<style scoped lang="scss">
.chat-header {
  height: 5%;
  width: 100%;
  position: absolute;
  top: 0;
  background-color: $primary;
  display: flex;
  justify-content: center;
  align-content: center;

  .title {
    font-size: 28px;
    margin: 0;
    align-self: center;
    color: white;
  }
}

.messages-area {
  height: 90%;
  width: 100%;
  position: absolute;
  top: 5%;
  display: flex;
  justify-content: center;
  align-content: center;
  overflow-y: scroll;
  margin-top: 20px;
  padding-bottom: 35px;

  .chat-img {
    width: 250px;
  }

  .received-ing {
    text-align: left;
  }

  .sent-ing {
    text-align: right;
  }
}

.text-area {
  background-color: $indigo-1;
  border-top: 1px solid $primary;
  height: 5%;
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-content: center;
}

.largeImg {
  width: 60vw !important;
  z-index: 500;
}
</style>
