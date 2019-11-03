<template>
  <v-layout row wrap justify-center id="wrapper">
    <v-flex xs10 class="mt-4 pt-5">
      <v-card :key="whatever">
        <v-card-title class="headline">Access Token</v-card-title>
        <v-divider></v-divider>
          <img color="black" :src="try_to_display_image">
        <v-card-actions class="pt-3 pb-3">
          <v-btn class="link-btn" @click.native="createQr(text)"><img :src="icon" style="margin-right: 10px;" alt=""> refresh TOKEN </v-btn>
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
  const remote = require('electron').remote;
  const elec_app = remote.app;
  const temp_path = elec_app.getPath('documents')
  const fs = require('fs');
  // import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
  let canvas = document.getElementById('canvas')
  
  var the_code_file = upath.join(temp_path, "loguard", "assets", "image.png");
  // window.img = this.img
  export default {
    data () {
      return {
        icon:'./static/14.svg',
        whatever: "",
        text: 'some text',
        try_to_display_image: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAANGSURBVO3BwY0kQQgEwAThIGZgEWbgIBL3rVdJrenZ20UZASIiIiIiIiIiIiIiIiKipQQfsqzBD+pwwcGyBocOF1xY1uDQ4YILyxr8oA4XfEBBqyhoFQWtYnhZhwteZFmDByxrcOhwwaHDBQfLGhw6XHDR4YIXWdbgRQpaRUGrKGgVw5dZ1uCBDhd8kWUNDh0u+IBlDR7ocMEXKWgVBa2ioFUMf1yHCy4sa3DocMFiClpFQasoaBXDH2dZg4sOF1xY1uDQ4YI/TEGrKGgVBa1i+LIOF3xRhwsuLGvwRR0u+EUUtIqCVlHQKoaXWdbgB1nW4NDhgosOFxwsa/CAZQ1+MQWtoqBVFLSKYBnLGnygwwV/mIJWUdAqClpF8CHLGhw6XHBhWYMv6nDBwbIGhw4XHCxrcNHhggvLGhw6XHCwrMEDHS74gIJWUdAqClrF8DLLGhw6XHDR4YKDZQ0OHS64sKzBizpccLCswaHDBb+YglZR0CoKWkXwMssaPNDhggvLGlx0uOBgWYOLDhc8YFmDQ4cLLixrcNHhgoNlDQ4dLviAglZR0CoKWsXwsg4XXFjW4IEOF1xY1uDQ4YILyxocOlxw0eGCC8sa/CIKWkVBqyhoFcF/ZlmDQ4cLDpY1OHS44MKyBhcdLnjAsgYXHS44WNbg0OGCg2UNLjpc8AEFraKgVRS0iuCPs6zBRYcLDpY1eFGHCx6wrMGhwwUvUtAqClpFQasYPmRZgx/U4YIHLGtw6HDBwbIGD3S44AHLGvwgBa2ioFUUtIrgQ5Y1OHS44EWWNTh0uOBgWYOLDhccLGtw0eGCg2UNHuhwwYVlDS46XPABBa2ioFUUtIrhyyxr8ECHCz7Q4YKDZQ0+0OGCg2UNDh0uuLCswaHDBQfLGrxIQasoaBUFrWJYrsMFB8savMiyBocOFxw6XHDR4YIXKWgVBa2ioFUMf1yHCw6WNTh0uODQ4YILyxo80OGCC8saPNDhgg8oaBUFraKgVQxf1uGCH9ThgoNlDQ4dLvhAhwsOljX4RRS0ioJWUdAqhpdZ1uAHWdbg0OGCC8saHDpccNHhggc6XHCwrMGhwwVfpKBVFLSKgoiIiIiIiIiIiIiIiIiI6A/4B04SPfNo69ggAAAAAElFTkSuQmCC`,
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
        return window.try_to_display_image
      },
      url: () => {
        let i = fs.readFileSync(the_code_file).toString('base64')
        return `data:image/png;base64,${i}`
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      reload () {
        window.location.reload()
      },
      createQr(text) {
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
          // jetpack.file(the_code_file);
          /*
          QRCode.toFile(the_code_file, fun, {
            color: {
              dark: '#0497AF',  // Blue dots
              light: '#0000' // Transparent background
            }
          }, function (err) {
            if (err) throw err
            console.log('done')

          })
        this.sending.progress = "done!" */
        QRCode.toDataURL(fun, {
            color: {
              dark: '#0497AF',  // Blue dots
              light: '#0000' // Transparent background
            }
          }, function (err, url) {
            this.try_to_display_image = `${url}`
            // if (err) throw err
            console.log(url)
          }.bind(this))
        
          // this.reload()
          // console.log(i)
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
      this.whatever = ""
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
