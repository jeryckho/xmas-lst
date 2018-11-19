<template>
  <div class="Feuille">
    <h1>Liste</h1>  <!-- Titre -->
    <em>(Cliquez sur une image pour voir les détails, clic-droit pour réserver l'élément)</em><br><br>
      <!-- {!! $liste->description !!} --><br>
    <div v-if="Details.length" v-for="kdo in Details" :key="kdo.id" class="Kdo pointer" :style="getStyle(kdo)">
        <a v-if="kdo.hasimage == 1" :href="kdo.link" target="_blank"><img class="ki" :src="kdo.image"></a>
        <img class="ki" src="/static/img/Rcroix.svg" v-show="kdo.status == 0">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
const fb = require('../firebaseConfig.js')

export default {
  name: 'Detail',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    ...mapState(['Lists','Details'])
  },
  methods: {
      getStyle: function(elt) {
          let style = JSON.parse(elt.style);
        return {
      'top':    style[0],
      'left':   style[1],
      'height': style[2],
      'width':  style[3],
      'transform':         'rotate('+style[4]+'deg)',
      '-webkit-transform': 'rotate('+style[4]+'deg)',
      '-ms-transform':     'rotate('+style[4]+'deg)'
        }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
