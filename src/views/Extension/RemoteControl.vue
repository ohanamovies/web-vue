<template>
  <div class="subpage">
    <section id="main" class="wrapper" style="max-width: 700px; margin: auto">
      <div class="inner">
        <h1>Target: {{ target }}</h1>
        Connected: {{ connected }}
        <br />
        <p v-if="error" style="color: red">{{ error }}</p>
        <div v-if="movieData">Title: {{ movieData.title }}</div>

        <ul class="actions fit">
          <li><button @click="seekForward(-10000)" class="button fit">-10</button></li>
          <li>
            <button
              @click="sendMessageToExtensionContentScript({ msg: 'play-pause' })"
              class="button special fit"
            >
              <v-icon>mdi-play</v-icon><v-icon>mdi-pause</v-icon>
            </button>
          </li>
          <li><button @click="seekForward(+10000)" class="button fit">+10</button></li>
        </ul>

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
      error: '',
    }
  },
  methods: {
    seekForward(diff) {
      this.sendMessageToExtensionContentScript({ msg: 'seek-diff', diff: diff })
    },
    disconnect() {
      this.socket.close()
    },
    connect() {
      this.socket = new WebSocket(WEBSOCKET_URL)
      this.socket.addEventListener('open', (e) => {
        this.connected = true
        console.log('[alex] WebSocket connected', e)
        this.sendSocketMessage('getMyConnectionId')
        //this.sendMessageToExtensionContentScript('getMovieData')
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
      let data = JSON.parse(msg)
      this.error = ''
      this.messages.push(data)
      if (data.action == 'movie-data') {
        this.movieData = msg.data
      } else if (data.message == 'Internal server error') {
        this.error = 'Ouch. Something went wrong. You sure movie is still there?'
        this.disconnect()
      }
    },
    sendSocketMessage(action, data = null, target = 'server', tries = 0) {
      if (!this.socket) {
        this.connect()
        return this.sendSocketMessage(action, data, target, tries)
      }

      const payload = {
        action: 'message', //ws route
        data: {
          action: action,
          target: target,
          data: data,
        },
      }
      console.log('[alex][ws] sendSocketMessage: ', payload)

      const readyState = this.socket.readyState
      const rs = {
        CONNECTING: 0,
        OPEN: 1,
        CLOSING: 2,
        CLOSED: 3,
      }

      if (tries > 5) {
        console.error('Error. Not able to send message')
        return false
      }

      if (readyState == rs.CLOSING || readyState == rs.CLOSED) {
        this.connect() //connect if not connected
        return this.sendSocketMessage(action, data, target, tries + 1)
      }

      //socket is still connecting. try again in a moment
      if (readyState == rs.CONNECTING) {
        setTimeout(() => {
          this.sendSocketMessage(action, data, target, tries + 1)
        }, 200 * tries)
        return
      }

      //socket is OPEN. Let's send the message
      if (readyState == rs.OPEN) {
        return this.socket.send(JSON.stringify(payload))
      }

      return false
    },
    sendMessageToExtensionContentScript(msg) {
      this.sendSocketMessage('content-script-message', msg, this.target)
    },
  },
}
</script>

<style lang="scss" scoped></style>
