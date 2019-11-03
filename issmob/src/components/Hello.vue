<template>
  <v-container fluid style="background: none;">
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-flex xs12 justify-center>
          <img width="100%" src="../../static/img/image.png" alt="Vuetify.js">
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>

export default {
  created () {
        window.store.state.route_is = 'hello' 

    // someFunction()
  }
}
</script>

