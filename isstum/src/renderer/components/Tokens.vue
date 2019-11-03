<template>
  <v-layout row wrap justify-center id="wrapper">
    <v-flex xs10 class="mt-4 pt-5">
      <v-card>
        <v-card-title class="headline">Access Token</v-card-title>
        <v-divider></v-divider>
          <img color="black" :src="url">
        <v-card-actions class="pt-3 pb-3">
          <v-btn class="link-btn" @click.native="createQr(text)"><img :src="icon" style="margin-right: 10px;" alt=""> refresh TOKEN</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
      <v-dialog v-model="qrdialog">
        <v-card>
          <v-card-text>
            <img :src="url" alt="">
          </v-card-text>
          <v-card-actions>
            <v-btn flat @click.native="qrdialog = !qrdialog">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="errordialog">
        <v-card>
          <v-card-text>
            <v-chip color="red">error!</v-chip>
            Check the internet connection and try again...
          </v-card-text>
          <v-card-actions>
            <v-btn flat @click.native="errordialog = !errordialog">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar bottom color="green" class="white--text" v-model="sending.status" >
        {{ sending.progress }}
      </v-snackbar>
    </v-flex>
  </v-layout>
</template>

<script>
  import SystemInformation from './WelcomeView/SystemInformation'
  //import { getCurrentWindow } from 'electron'
  
  import QRCode from 'qrcode'
  import jetpack from 'fs-jetpack'
  import _ from 'lodash'
  import axios from 'axios'
  import { setTimeout } from 'timers';
  import upath from 'upath'
  // import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
  let canvas = document.getElementById('canvas')
  var the_code_file = upath.join(__dirname, "loguard", "assets", "image.png");
  // window.img = this.img
  export default {
    data () {
      return {
        icon:'./static/14.svg',
        text: 'some text',
        qrdialog: false,
        errordialog: false,
        data: [],
        sending: {
          status: false,
          progress: ''
        }
      }
    },
    name: 'Welcome',
    components: { SystemInformation },
    computed: {
      img() {
        return window.store.state.img
      },
      url: () => {
        return `${the_code_file}`
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      reload () {
        window.location.reload()
      },
      createQr (text) {
        const date = new Date()
        this.sending.status = true
        this.sending.progress = "sending the token to the server"
        let mapDay = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
        let index = date.getDay()-1
        let today = mapDay[index] 
        let hour = date.getHours()
        let minutes = date.getMinutes()
        let fun = Math.floor(_.now() / 1000)
        console.log(fun)
        fun = '"' + fun +'"'
        // console.log(code) 
        axios.post('https://us-central1-safaris-10946.cloudfunctions.net/api/tokens',
        {
          token: fun
        })
        .then (res => {
          this.sending.progress = "token successfully sent to the server..Now generating"
          // console.log(res.data)
          console.log()
          jetpack.file(the_code_file);
          QRCode.toFile(the_code_file, fun, {
            color: {
              dark: '#0497AF',  // Blue dots
              light: '#0000' // Transparent background
            }
          }, function (err) {
            if (err) throw err
            console.log('done')

          })
        this.sending.progress = "done!"
          this.reload()
          // console.log(__dirname)
        }).catch(err => {
          this.errordialog = true
        })
        // this.qrdialog = true
        // win.reload();
/*         window.store.state.text = text
        QRCode.toString(JSON.stringify(window.store.state.text), ['svg'], function (err, url) {
          window.store.state.img = url
          console.log(window.store.state.img)
          console.log(window.store.state.text)
          console.log(url)
        }) */
      }
    }, 
    created () {
      console.log(__dirname)
      console.log(the_code_file)
      try {
        axios.get('https://safaris-10946.firebaseio.com/isstum.json')
        .then(response => {
          let i = 0
          for (response.data.length; i=0; i++) {
            this.data.push(response.data[i].logs)
          }
          console.log(this.data)
        })
      } catch (e) {
        console.log(e)
      }
      
/*       ClassicEditor
        .create( document.querySelector( '#editor' ) )
        .catch( error => {
            console.error( error );
        } ); */
    }
  }
</script>

<style scoped>
  .centered
  {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo
  {
    max-width: 100%;
  }

  .link-btn
  {
    width: 150px;
  }
</style>
