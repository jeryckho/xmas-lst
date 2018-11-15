<template>
  <div class="Feuille">
    <h1>Listes</h1>
    <br>
    <a href="/login">Test 1</a><br>
    <a href="/toto">Test 2</a><br>
    <div v-if="Lists.length">
      <a v-for="list in Lists" :key="list.id" :href="'/'+list.slug">
        {{ list.titre }}
      </a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
const fb = require('../firebaseConfig.js')

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    ...mapState(['Lists'])
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
