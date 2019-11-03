<template>
  <div id="app">
    <v-app light>
      <v-navigation-drawer
        fixed
        :mini-variant="miniVariant"
        :clipped="clipped"
        v-model="drawer"
        app
      >
        <v-list>
          <v-list-tile 
            router
            :to="item.to"
            :key="i"
            v-for="(item, i) in items"
            exact
            active-class="brown--text"
          >
            <v-list-tile-action>
              <img :src="item.icon" alt="">
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar flat extended style="background-color: #0093b7;" fixed app :clipped-left="clipped">
        <v-btn icon flat @click.native.stop="drawer = !drawer">
          <img style="padding-right: 10px; padding-left: 10px;" :src="menu">
        </v-btn>
        <h2 class="white--text">LoGuard</h2>
        <v-layout></v-layout>
        <v-spacer></v-spacer>
        <v-btn icon flat @click.native="minimize"><img mt-3 height="23px" :src="min" alt=""></v-btn>
        <v-btn icon v-show="!maximized" flat @click.native="maximize"><img mt-3 height="23px" :src="max" alt=""></v-btn>
        <v-btn icon v-show="maximized" flat @click.native="maximize"><img mt-3 height="23px" :src="max_max" alt=""></v-btn>
        <v-btn icon flat @click.native="exit"><img mt-3 height="23px" :src="close" alt=""></v-btn>
      </v-toolbar>
      <v-content>
        <v-container fluid fill-height>
          <v-container class="ocean">
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
        </v-container>
          <v-slide-y-transition mode="out-in">
            <router-view></router-view>
          </v-slide-y-transition>
        </v-container>

      </v-content>
      <v-footer class="white--text" style="background-color: #0093b7;" :fixed="fixed" app>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <span>&copy; {{new Date().getFullYear()}} Loguard</span>
        <v-spacer></v-spacer>

      </v-footer>
    </v-app>
  </div>
</template>

<script>
const remote = require('electron').remote;

const app = require('electron').remote.app
window.path_here = __dirname
window.stupid_path = app.getPath('documents')

  export default {
    name: 'isstum',
    data: () => ({
      logo: './static/logo.png',
      wave: './static/wave.svg',
      menu: './static/menu.svg',
      close: './static/close.svg',
      min: './static/min.svg',
      max: './static/max.svg',
      max_max: './static/max-max.svg',
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        { icon: './static/15.svg', title: 'Access Tokens', to: '/' },
        { icon: './static/13.svg', title: 'All Access Logs', to: '/all' }
      ],
      miniVariant: false,
      right: true,
      title: 'ISSTUM',
      maximized: false,
    }),
    computed: {
    },
    methods: {
      exit() {
        const program = remote.getCurrentWindow();
        program.close();
      },
      maximize() {
        const program = remote.getCurrentWindow();
        if (!program.isMaximized()) {
            this.maximized = true
            program.maximize();
          } else {
            this.maximized = false
            program.unmaximize();
          }
      },
      minimize() {
        const program = remote.getCurrentWindow();
        program.minimize();
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
  /* Global CSS */
  html, body {
}

body {
  background: radial-gradient(ellipse at center, #fffeea 0%, #fffeea 35%, #B7E8EB 100%);
  overflow: hidden;
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
