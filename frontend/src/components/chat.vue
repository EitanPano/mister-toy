<template>
  <div v-if="isChatOpen" class="chat">
    <button @click="isChatOpen = false">✖</button>
    <h2>Lets Chat About {{ watchedToy }}</h2>

    <ul>
      <li v-for="(msg, idx) in msgs" :key="idx">
        <p class="from">{{msg.from}} :</p>
        <p class="txt">{{msg.txt}}</p>
      </li>
    </ul>
    <hr />
    <form @submit.prevent="sendMsg">
      <input @input="checkIsTyping" type="text" v-model="msg.txt" placeholder="Your msg"/>
      <button>Send</button>
    </form>
  </div>
  <div v-else>
    <button class="btn btn-chat" @click="isChatOpen = true">Toy Chat</button>
  </div>
</template>

<script>
import {socketService} from '@/services/socket.service';

export default {
  data() {
    return {
      isChatOpen: false,
      msg: {from: '', txt: ''},
      msgs: [],
      topic : '',
      isTyping: null
    }
  },
  created() {
    this.topic = this.watchedToy
    this.msg.from = this.username
    socketService.setup();
    socketService.emit('chat topic', this.topic)
    socketService.on('chat addMsg', this.addMsg)
    socketService.on('user typing', this.setIsTyping)
  },
  destroyed() {
    socketService.off('chat addMsg', this.addMsg)
    socketService.terminate();
  },
  computed: {
      username() {
          return this.$store.getters.username || 'Guest'
      },
      watchedToy() {
          return this.$store.getters.watchedToy.name[0].toUpperCase() + this.$store.getters.watchedToy.name.slice(1)
      }
  },
  methods: {
    //   setIsTyping() {
    //       this.isTyping = true
    //       console.log(this.isTyping);
    //   },
    checkIsTyping() {
        if (this.msg.txt) {
            console.log('user typing');
            socketService.emit('user typing', this.username)
        }
    },
    addMsg(msg) {
      this.msgs.push(msg)
    },
    sendMsg() {
      console.log('Sending', this.msg);
      socketService.emit('chat newMsg', this.msg)
      // TODO: next line not needed after connecting to backend
      // this.addMsg(this.msg)
      // setTimeout(()=>this.addMsg({from: 'Dummy', txt: 'Yey'}), 2000)
      this.msg.txt = '';
    },
    changeTopic() {
      socketService.emit('chat topic', this.topic)
    }
  }
}
</script>
