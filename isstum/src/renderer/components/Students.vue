<template>
  <v-layout column justify-center pt-5 mt-5>
    <v-flex>
      <v-form v-model="valid">
        <v-text-field
          v-model="reg"
          :rules="nameRules"
          label="Reg No"
          required
        ></v-text-field>
        <v-btn
          :disabled="!valid"
          @click="createQr(reg,name)"
        >
          <img :src="image1" style="margin-right: 10px;" alt=""> GENERATE CODE
        </v-btn>
        <v-btn
          @click="save"
        >
         <img :src="image" style="margin-right: 10px;" alt=""> SAVE AS PNG
        </v-btn>
      </v-form>
      <v-card><img :src="url" alt=""></v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from 'axios'
import jetpack from 'fs-jetpack'
import QRCode from 'qrcode'
const {dialog} = require('electron').remote

window.qrcode_save_dialog = dialog
export default {
    data () {
      return {
        text: 'some text',
        qrdialog: false,
        errordialog: false,
        image: './static/11.svg',
        image1: './static/15.svg',
        data: [],
        valid: false,
        name: '',
        nameRules: [
          v => !!v || 'Name is required',
          v => v.length <= 20 || 'Name must be less than 10 characters'
        ],
        reg: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ]
      }
    },
    name: 'Welcome',
    computed: {
      img: () => {
        return window.new_qrcode.replace('"','')
      },
      url: () => {
        return `${window.stupid_path}`+'/assets/student.png'
      }
    },
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          axios.post('/api/submit', {
          })
        }
      },
      clear () {
        this.$refs.form.reset()
      },
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      reload () {
        window.location.reload()
      },
      createQr (reg,name) {
        reg = reg.replace('"','')
        const details = reg + ', ' + name
        // const date = new Date()
        // let mapDay = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
        // let index = date.getDay()-1
        // let today = mapDay[index] 
        // let hour = date.getHours()
        // let minutes = date.getMinutes()
        //let fun = Math.floor(_.now() / 1000)
        // console.log(details)
        let fun = reg
        // console.log(code) 
        console.log(reg)
        jetpack.file(window.stupid_path+'/assets/student.png');
        QRCode.toFile(window.stupid_path+'/assets/student.png', fun, {
          color: {
            dark: '#0497AF',  // Blue dots
            light: '#0000' // Transparent background
          }
        }, function (err) {
          if (err) throw err
          console.log('done')
        })
        
        /* axios.post('https://us-central1-safaris-10946.cloudfunctions.net/api/tokens',
        {
          details: fun
        })
        .then (res => {
          console.log(res.data)
          
        }).catch(err => {
          this.errordialog = true
        }) */
        
        this.reload()
        // this.qrdialog = true
        // win.reload();
/*         window.store.state.text = text
        QRCode.toString(JSON.stringify(window.store.state.text), ['svg'], function (err, url) {
          window.store.state.img = url
          console.log(window.store.state.img)
          console.log(window.store.state.text)
          console.log(url)
        }) */
      },
      save() {
        dialog.showSaveDialog({
                title: 'QR CODE',
                defaultPath: '~/Desktop/qr_code.png'
            }, function(result){
              let current_dir = jetpack.cwd()+'\static\students.png'
              console.log(current_dir)
              jetpack.copy(`${window.stupid_path}`+'/assets/student.png', result, { overwrite: true })
              alert(result, 'QR Code Saved Successfully')
            })
      }
    }, 
    created () {
      // console.log(some)
      /* axios.get('https://safaris-10946.firebaseio.com/isstum.json')
      .then(response => {
        let i = 0
        for (response.data.length; i=0; i++) {
          this.data.push(response.data[i].logs)
        }
        console.log(this.data)
      }) */
/*       ClassicEditor
        .create( document.querySelector( '#editor' ) )
        .catch( error => {
            console.error( error );
        } ); */
    }
  }
</script>

<style scoped>
  img {
    margin-left: auto;
    margin-right: auto;
    display: block;
  }
</style>