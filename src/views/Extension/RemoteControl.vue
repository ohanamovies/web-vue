<template>
  <div class="subpage">
    <!-- control buttons -->
    <div
      style="
        position: fixed;
        bottom: 0px;
        background-color: white;
        border-top: 1px solid gray;
        padding: 5px;
        width: 100%;
        z-index: 999999;
      "
    >
      <div style="max-width: 500px; margin: auto">
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
      </div>
      <div style="text-align: center; font-size: 10pt">
        <div style="font-weight: bold">
          <span v-if="connected" style="color: green">Connected</span>
          <span v-else style="color: red">Not connected</span>
        </div>

        <p v-if="error" style="color: red">{{ error }}</p>
      </div>
    </div>
    <section id="main" class="wrapper" style="max-width: 700px; margin: auto">
      <div class="inner">
        <div v-if="fcData">
          <!-- movie data FYI -->
          <div v-if="fcData && fcData.metadata && fcData.metadata.imdb">
            <MoviePopup :imdb="fcData.metadata.imdb" :hideCloseButton="true" />
          </div>

          <!-- scenes -->
          <div style="font-size: 10pt">
            <div
              v-for="(scene, i) of fcData.scenes"
              :key="i"
              style="padding: 5px; margin: 5px; border-top: 1px solid gray"
            >
              <b>Scene #{{ i + 1 }}</b>
              <br />
              <b>Tags:</b> {{ scene.tags.join(', ') }}
              <br />
              <b>Skip:</b> {{ scene.skip }}
            </div>
          </div>
        </div>

        <div style="font-size: 7pt; margin-top: 30px; margin-bottom: 20px">
          <b>[Dev] Messages Received</b>
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
import MoviePopup from '@/components/MoviePopup/MoviePopup.vue'

export default {
  components: {
    MoviePopup,
  },
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
      fcData: false,
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
        this.sendSocketMessage('get-metadata', { target: this.target })
        //this.sendMessageToExtensionContentScript('getfcData')
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
      let m = JSON.parse(msg)
      this.error = ''
      this.messages.push(m)
      if (m.action == 'new-metadata') {
        this.fcData = m.data
      } else if (m.message == 'Internal server error') {
        this.error = 'Ouch. Something went wrong. Try re-scanning the QR code'
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
  mounted() {
    this.connect()
  },
}
</script>

<style scoped>
ul {
  margin: 0px;
}
li {
  padding: 0px;
}
</style>
