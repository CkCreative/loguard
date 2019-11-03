<template>
  <v-app>
    <v-navigation-drawer
      fixed
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          exact
        >
          <v-list-tile-action>
            <v-icon light v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar flat style="color: white; background-color: #0093B7;" fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" dark></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-chip v-show="netwok_type==='online'" style="color: green;" color="white">{{ netwok_type }}</v-chip>
      <v-chip v-show="netwok_type==='offline'" style="color: red;" color="yellow darken-2">{{ netwok_type }}</v-chip>
    </v-toolbar>
    <v-content style="background: none;">
      <v-card v-show="scanner"  color="transparent" style="overflow: hidden;">
        
        <v-card-text class="text-xs-center">
          <router-view></router-view>
        </v-card-text>
      </v-card>
      <v-card height="100%" v-show="!scanner" >
        <v-container class="ocean">
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
        </v-container>
        <v-card-text class="text-xs-center">Select an Option</v-card-text>
        <v-card-text class="text-xs-center">
          <v-layout column justify-center>
            <v-flex xs12 sm6>
              <v-card>
                <v-card-text>
                  <v-form v-show="route_is === 'hello'">
                    <v-select
                      :items="login_type"
                      v-model="e11"
                      label="Login Type"
                    ></v-select>
                    <v-select
                      :items="login_place"
                      v-model="e12"
                      label="Place"
                    ></v-select>
                    <v-text-field
                      v-model="name"
                      label="Full Name"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="id_no"
                      label="ID Number"
                      required
                    ></v-text-field>
                  </v-form>
                  <v-form v-show="route_is === 'students'">
                    <v-text-field
                      v-model="paper"
                      label="The Unit Name"
                      required
                    ></v-text-field>
                    <v-chip color="cyan" class="white--text">
                      {{ paper }}
                    </v-chip>
                    <v-chip color="cyan" class="white--text">
                      {{ invigilator }}
                    </v-chip>
                    <v-text-field
                      v-model="invigilator"
                      label="Name of the Invigilator"
                      required
                    ></v-text-field>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card-text>
        
      </v-card>
      <v-bottom-nav style="background-color: #0093B7;" fixed :value="e31" :active.sync="e3">
        <v-btn @click.native="getStudentData"  to="/" flat color="white darken-1">
          <span>ENTER DETAILS</span>
          <v-icon>web</v-icon>
        </v-btn>
        <v-btn :disabled="route_is === 'students'"   @click.native="anotherFunction" flat color="white darken-1">
          <span v-show="scanner">CLOSE SCANNER</span>
          <span v-show="!scanner">SCAN TOKEN</span>
          <v-icon>camera</v-icon>
        </v-btn>
      </v-bottom-nav>
      <v-snackbar top multi-line :color="red ? 'red': 'success'" v-model="sending">{{ progress }}
        <v-btn dark flat @click.native="sending = false">X</v-btn>
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import _ from 'lodash'

  export default {
    data () {
      return {
        e3: 1,
        e11: null,
        e12: null,
        name: '',
        login_type: ["Sign In", "Sign Out"],
        login_place: ["KETRACO", "REA", "GDC", "NUCLEAR POWER",],
        paper: '',
        id_no: '',
        invigilator: '',
        snackbar: false,
        e31: true,
        cordova: Vue.cordova,
        clipped: false,
        drawer: false,
        scanner: false,
        url: 'https://us-central1-safaris-10946.cloudfunctions.net/api/isstum',
        items: [{
          icon: 'bubble_chart',
          title: 'To God be the glory...'
        }],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'LoGuard',
        netwok_type: ''
      }
    },
    computed: {
      online: () => {
        return navigator.connection.type;
      },
      red: () => {
        return window.store.state.red;
      },
      data() {
        return this.$store.getters.data
      },
      sending() {
        return this.$store.getters.sending
      },
      received() {
        return this.$store.getters.received
      },
      progress() {
        return this.$store.getters.progress
      },
      route_is () {
        return window.store.state.route_is
      }

    },
    created () {
      var self = this
      if (localStorage.getItem('student_data') != null) {
        window.store.state.student_data = JSON.parse(localStorage.getItem('student_data'))
      }
      else {
        this.getStudentData()
        console.log('Kindly load Student data from the server first...')
      }
      
      // window.paper = this.paper
     //  window.invigilator = this.invigilator
      // window.validateStudents = this.validateStudents()
      this.cordova.on('deviceready', () => {
        self.onDeviceReady()
        // self.someFunction()
      })
      console.log(navigator.connection.effectiveType)
    },
    methods: {
      whenOffline() {
        this.netwok_type = 'offline'
      },
      whenOnline() {
        this.netwok_type = 'online'
      },
      validateStudents (text) {
        if (window.store.state.student_data != null) {
          text = text.replace('"', '')
          let temp_data = window.store.state.student_data
          let sanitized = _.filter(temp_data, o => {return o.balance.replace(',','') <= 0})
          console.log(sanitized)
          sanitized = _.find(sanitized, o => {return o.reg === text})
          console.log(sanitized)
          if (sanitized != null) {
            window.store.state.progress ="Verified! Now sending student's data..."
            axios.post('https://us-central1-safaris-10946.cloudfunctions.net/api/exam', { name: sanitized.name,
            reg: sanitized.reg,
            paper: this.paper,
            invigilator: this.invigilator })
            .then (response => {
              window.store.state.progress = "Data has been successfully sent and saved in the database."
            })
            .catch(err => {
              window.store.state.progress = "There was a problem trying to save the data. Try again."
              console.log(err)
            })
          } else {
            window.store.state.progress = "Not allowed to sit for the exam!"
          }
        }
      },
      getStudentData() {
        // this.data = text
        axios.get('https://safaris-10946.firebaseio.com/students.json')
        .then(response => {
          let studentdata = response.data
          localStorage.setItem('student_data', JSON.stringify(response.data))
          window.store.state.student_data = studentdata 
        })
      },
      onDeviceReady: function () {
        document.addEventListener("offline", this.whenOffline, false);
        document.addEventListener("online", this.whenOnline, false);
        // Handle the device ready event.
        this.cordova.on('pause', this.onPause, false)
        this.cordova.on('resume', this.onResume, false)
        if (this.cordova.device.platform === 'Android') {
          document.addEventListener('backbutton', this.onBackKeyDown, false)
        }   
      },
      someFunction: function () {
        window.paper = '"' + this.paper + '"'
        window.invigilator = '"' + this.invigilator + '"'
        this.scanner = !this.scanner
        if (this.scanner === true) {
          QRScanner.scan(displayContents);
          // alert(this.data);
        
          function displayContents(err, text){
            // this.$store.state.data = text
            if(err){
              // an error occurred, or the scan was canceled (error code `6`)
            } 
            else {
              navigator.vibrate(500)
              const date = new Date()
              let mapDay = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
              let index = date.getDay()
              let today = mapDay[index] 
              // let fun = Math.floor(_.now() / 1000)
              // console.log(fun)
              let posted = '"' + today + ' ' + date.getMonth() + '/'+ date.getDate() + '/'+ date.getFullYear() + ' @ ' + date.getHours() + ':' + date.getMinutes() + ' hrs"'
              // console.log(code)
              window.store.state.red = false
              window.store.state.sending = false
              window.store.state.sending = true
              window.store.state.progress = "Verifying the data for: " +text
              if (window.store.state.student_data != null) {
                let new_text = text.replace('"', '')
                let temp_data = window.store.state.student_data
                let ghost_student = _.find(temp_data, o => {return o.reg === new_text})
                if (ghost_student === undefined) {
                  window.store.state.red = true
                  window.store.state.progress = "Unknown student: " + text
                  // break displayContent
                }
                let sanitized = _.filter(temp_data, o => {return o.balance.replace(',','') <= 0})
                console.log(sanitized)

                sanitized = _.find(sanitized, o => {return o.reg === new_text})
                console.log(sanitized)
                if (sanitized != null) {
                  window.store.state.red = false
                  window.store.state.progress ="Verified! Now sending data for: " + sanitized.name + " Fee balance = "+ sanitized.balance
                  axios.post('https://us-central1-safaris-10946.cloudfunctions.net/api/exam', { name: sanitized.name,
                    reg: sanitized.reg,
                    paper: window.paper,
                    invigilator: window.invigilator,
                    date: posted
                  })
                  .then (response => {
                    window.store.state.sending = false
                    window.store.state.sending = true
                    window.store.state.red = false
                    window.store.state.progress = "Data has been successfully sent and saved to the database."
                    // setTimeout(window.store.state.sending = false, 5000)
                  })
                  .catch(err => {
                    window.store.state.progress = "There was a problem trying to save the data. Try again."
                    console.log(err)
                  })
                } else {
                  // window.store.state.sending = false
                  // window.store.state.sending = true
                  let my_name = _.find(temp_data, o => {return o.reg === new_text})
                  window.store.state.red = true
                  window.store.state.progress = "Not allowed to sit for the exam! Fee balance = " + my_name.balance
                }
              }
              // window.store.commit('addData', text)
              // window.store.state.sending = true
                 // window.store.state.name = text   
              // localStorage.setItem('name', JSON.stringify(text))
              // alert('this.$store.getters.data');
              // The scan completed, display the contents of the QR code:
              // this.sendCode(text);
              // QRScanner.destroy();
            }
          }
          
          // Make the webview transparent so the video preview is visible behind it.
          QRScanner.show();
        }
        else {
          
          QRScanner.destroy(function (status) {
            console.log(status)
          })
          window.store.state.sending = false

        }
        
      },
      anotherFunction: function () {
        this.scanner = !this.scanner
        window.login_type = '"' + this.e11 + '"'
        window.login_place = '"' + this.e12 + '"'
        window.your_name = '"' + this.name + '"'
        window.id_no = '"' + this.id_no + '"'
        if (this.scanner === true) {
          QRScanner.scan(displayContent);
          // alert(this.data);
        
          function displayContent(err, text){
            // this.$store.state.data = text
            if(err){
              // an error occurred, or the scan was canceled (error code `6`)
            } else {
              navigator.vibrate(500)
              const date = new Date()
              let mapDay = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
              let index = date.getDay()
              let today = mapDay[index] 
              let hour = date.getHours()
              let minutes = date.getMinutes()
              let this_month = date.getMonth()+1
              // let fun = Math.floor(_.now() / 1000)
              // console.log(fun)
              let posted = '"' + today + ' ' + this_month + '/'+ date.getDate() + '/'+ date.getFullYear() + ' @ ' + date.getHours() + ':' + date.getMinutes() + ' hrs"'
              // console.log(code)
              window.store.commit('addData', text)
              window.store.state.red = false
              window.store.state.sending = true
              window.store.state.progress = "Sending your data"
              // window.store.state.name = text 
              // window.store.state.name.time = somedata.time   
              // window.store.state.name.validate = somedata.validate
              let now = Math.floor(_.now() / 1000) 
              let checking = parseInt(text.replace('"',''))
              let range = now - checking
              if (range < 30) {
                  axios.post('https://us-central1-safaris-10946.cloudfunctions.net/api/isstum', 
                  { 
                    name: window.your_name,
                    code_created: text,
                    code_used: '"'+ now +'"',
                    date: posted,
                    type: window.login_type,
                    id_np: window.id_no,
                    place: window.login_place
                  })
                .then(response => {
                  let received = JSON.parse(JSON.stringify(response.data));
                  window.store.state.progress = "Data Logged Successfully!"
                  // window.store.state.received.name = received.name;
                  // window.store.state.received.reg = received.reg;
                  // alert('Saved to the Database Successfully')
                })
                .catch(err => {
                  window.store.state.red = true
                  window.store.state.progress = "Error ecountered: Check your network"
                })
              }
              else {
                window.store.state.red = true
                window.store.state.progress = "You are using an expired/invalid token: " + text
              }
              
              // localStorage.setItem('name', JSON.stringify(text))
              
              // alert('this.$store.getters.data');
              // The scan completed, display the contents of the QR code:
              // this.sendCode(text);
              // QRScanner.destroy();
            }
          }
          
          // Make the webview transparent so the video preview is visible behind it.
          QRScanner.show();
        }
        else {
          
          QRScanner.destroy(function (status) {
            console.log(status)
          })
          window.store.state.sending = false

        }
      },
      
      onPause () {
        // Handle the pause lifecycle event.
        console.log('pause')
      },
      onResume () {
        // Handle the resume lifecycle event.
        // SetTimeout required for iOS.
        setTimeout(function () {
          console.log('resume')
        }, 0)
      },
      onBackKeyDown () {
        // Handle the back-button event on Android. By default it will exit the app.
        navigator.app.exitApp()
      }
    }
  }
</script>

<style>
	body {
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
	}
  .footer{ /* Apply this to v-bottom-nav if necessary. */
    margin-bottom: constant(safe-area-inset-bottom);
    margin-bottom: env(safe-area-inset-bottom);
  }
  .application.theme--light {
    background: none;
    background-color: transparent;
  }

.some-red{
  color: red;
}

.ocean {
  height: 5%;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: #0497AF;
}

.wave {
  background: url(~@/assets/wave.svg) repeat-x;
  position: absolute;
  top: -198px;
  width: 6400px;
  height: 198px;
  -webkit-animation: wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
          animation: wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
  -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
}

.wave:nth-of-type(2) {
  top: -175px;
  -webkit-animation: wave 6s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.125s infinite, swell 6s ease -1.25s infinite;
          animation: wave 6s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.125s infinite, swell 6s ease -1.25s infinite;
  opacity: 1;
}

.wave:nth-of-type(3) {
  top: -155px;
  -webkit-animation: wave 5s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.125s infinite, swell 5s ease -1.25s infinite;
          animation: wave 5s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.125s infinite, swell 5s ease -1.25s infinite;
  opacity: 1;
}

@-webkit-keyframes wave {
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: -1600px;
  }
}

@keyframes wave {
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: -1600px;
  }
}
@-webkit-keyframes swell {
  0%, 100% {
    -webkit-transform: translate3d(0, -25px, 0);
            transform: translate3d(0, -25px, 0);
  }
  50% {
    -webkit-transform: translate3d(0, 5px, 0);
            transform: translate3d(0, 5px, 0);
  }
}
@keyframes swell {
  0%, 100% {
    -webkit-transform: translate3d(0, -25px, 0);
            transform: translate3d(0, -25px, 0);
  }
  50% {
    -webkit-transform: translate3d(0, 5px, 0);
            transform: translate3d(0, 5px, 0);
  }
}
</style>
