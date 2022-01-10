<template>
  <div class="subpage">
    <section id="main" class="wrapper" style="max-width: 700px; margin: auto">
      <div class="inner">
        <h1>Target: {{ target }}</h1>
        Connected: {{ connected }}
        <br />
        <div v-if="movieData">Title: {{ movieData.title }}</div>

        <ul class="actions fit">
          <li><button @click="seekForward(-10000)" class="button fit">-10</button></li>
          <li>
            <button
              @click="sendMessageToExtension({ msg: 'play-pause' })"
              class="button special fit"
            >
              <v-icon>mdi-play</v-icon><v-icon>mdi-pause</v-icon>
            </button>
          </li>
          <li><button @click="seekForward(+10000)" class="button fit">+10</button></li>
        </ul>

        <div style="height: 20vh; overflow-y: auto">
          {{ messages }}
        </div>
        <div>
          <ul>
            <li v-for="(m, index) of messages" :key="index">{{ m }}</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
const WEBSOCKET_URL = 'wss://vz7ojh22k6.execute-api.eu-west-1.amazonaws.com/dev'

export default {
  props: {
    target: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      socket: null,
      connected: false,
      messages: [],
      movieData: false,
    }
  },
  methods: {
    seekForward(diff) {
      this.sendMessageToExtension({ msg: 'seek-diff', diff: diff })
    },
    connect() {
      this.socket = new WebSocket(WEBSOCKET_URL)
      this.socket.addEventListener('open', (e) => {
        this.connected = true
        console.log('[alex] WebSocket connected', e)
        this.sendMessageToServer('getMyConnectionId')
        //this.sendMessageToExtension('getMovieData')
      })

      this.socket.addEventListener('close', (e) => {
        this.connected = false
        console.log('[alex] WebSocket disconnected', e)
        this.connected = false
      })

      this.socket.addEventListener('error', (e) => {
        this.connected = false
        console.log('[alex] error', e)
        this.connected = false
      })

      this.socket.addEventListener('message', (e) => {
        console.log('[alex][WEBSOCKET] Message received from server', e)
        //2. Manage here
        this.handleSocketMessage(e.data)
      })
    },
    handleSocketMessage(msg) {
      this.messages.push(msg)
      if (msg.action == 'movie-data') {
        this.movieData = msg.data
      }
    },
    sendMessageToServer(action, data = null) {
      console.log('[alex][ws] sendMessageToServer: ', action, data)
      const payload = {
        action: 'message',
        data: {
          action: action,
          target: this.target,
          data: data,
        },
      }
      if (this.socket) {
        return this.socket.send(JSON.stringify(payload))
      } else {
        return { success: false, error: 'socket is not connected' }
      }
    },
    sendMessageToExtension(msg) {
      if (!this.connected) {
        //connect if not connected :)
        this.connect()
        setTimeout(() => {
          this.sendMessageToExtension(msg)
        }, 1500)
        return
      }
      this.sendMessageToServer('message', msg)
    },
  },
}
</script>

<style lang="scss" scoped></style>
