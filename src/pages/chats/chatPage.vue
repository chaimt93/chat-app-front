<template>
  <q-page>
    <q-card class="all-chats column">
      <chatTabs/>
    </q-card>

    <q-card class="active-chat column">
      <single-chat @file="sendFile"/>
    </q-card>

  </q-page>

</template>

<script>
import {mapActions, mapMutations} from "vuex";
import singleChat from "./singleChat";
import chatTabs from "./chatTabs";
import io from "socket.io-client";
import {setChats} from "src/store/chats/mutations";
export default {
  components:{singleChat,chatTabs},
  name: "chats",
  data(){
    return{
      socket:null,
    }
  },
  async created() {
    await this.initSocketConnection()
  },
  methods:{
    ...mapActions('chats',['socketChatUpdate','updateUsers']),
    ...mapActions('user',['getMyToken']),
    ...mapMutations('chats',['setOtherUsers','setChats']),
    async initSocketConnection(){
      let serverRef = 'localhost:3000' ;
      const token = await this.getMyToken();
      this.socket = io.connect(serverRef, {query: {token}});
      this.socket.emit('NewClient')
      this.setupListeners();
    },
    setupListeners(){
      this.socket.on("getUsers", this.updateUsers);
      this.socket.on("getChat", this.socketChatUpdate);
      this.socket.on("allUsers", this.setOtherUsers);
      this.socket.on("allChats", this.setChats);
    },
    sendFile(data){
      this.socket.emit('sendImg', data)
    }
  }
}
</script>

<style scoped lang="scss">
.all-chats {
  position: absolute;
  left: 0;
  height: 100%;
  width: 30%;
}
.active-chat {
  position: absolute;
  left: 30%;
  height: 100%;
  width: 70%;

}
</style>
