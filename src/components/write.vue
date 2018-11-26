<template>
  <div class="Feuille">
    <div v-if="slugList">
      <h1 v-html="slugList.titre"></h1>
      <em>(Cliquez sur une image pour voir les détails, clic-droit pour réserver l'élément)</em><br><br>
      <span v-html="slugList.description"></span><br>
    </div>
    <VueDraggableResizable 
      v-if="Details.length"
      v-for="kdo in slugDetails"
      :key="kdo.id"
      :y="getPos(kdo,0)"
      :x="getPos(kdo,1)"
      :h="getPos(kdo,2)"
      :w="getPos(kdo,3)"
      :r="getPos(kdo,4)"
      @resizestop="onResized"
      @dragstop="onDraged"
      @activated="onActivated(kdo)"
    >
      <div class="ki" @contextmenu.prevent="onCtx(kdo)">
        <img
          v-if="kdo.hasimage == 1"
          class="ki"
          :src="kdo.image"
          :alt="kdo.image"
        >
      </div>
    </VueDraggableResizable>
    <SweetModal :title="current ? 'Item N°'+current.id : 'Item'" ref="modal">
      <SweetModalTab title="Détails" id="tab1">
        <div v-if="current">
          Présence image : <input type="checkbox" name="hasImage" id="hasImage" v-model="current.hasimage" true-value="1" false-value="0"> <br>
          Image : <input type="url" name="Image" id="Image" v-model="current.image"><br>
          Lien : <input type="url" name="Link" id="Link" v-model="current.link">
        </div>
      </SweetModalTab>
      <SweetModalTab title="Position" id="tab2">
        <div v-if="current">
          {{current}}
        </div>
      </SweetModalTab>
      <SweetModalTab title="Status" id="tab3">
        <div v-if="current">
          Statut : <input type="checkbox" name="Sts" id="Sts" v-model="current.status" true-value="1" false-value="0"> <br>
        </div>
      </SweetModalTab>
    </SweetModal>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import VueDraggableResizable from 'vue-draggable-resizable'
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'
const fb = require('../firebaseConfig.js')

export default {
  name: 'Write',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      current: null
    }
  },
  components: { VueDraggableResizable, SweetModal, SweetModalTab },
  computed: {
    ...mapState(['Lists','Details']),
    slugDetails: function() {
      return this.Details.filter(item => item.slug === this.$route.params.slug)
    },
    slugList: function() {
      const lsts = this.Lists.filter(item => item.slug === this.$route.params.slug);
      return (lsts.length) ? lsts[0] : null;
    },
  },
  methods: {
    ...mapMutations([
      'Take',
      'Free',
      'setStyle'
    ]),
    onActivated(locals) {
      this.current = locals;
    },
    onCtx(locals) {
      this.current = locals;
      this.$refs.modal.open('tab1')
    },
    onResized(x, y, width, height, degree) {
      this.setStyle({ id: this.current.id, style: JSON.stringify([ y+"px", x+"px", height+"px", width+"px", degree.toString() ]) })
    },
    onDraged(x, y) {
      let style = JSON.parse(this.current.style);
      this.setStyle({ id: this.current.id, style: JSON.stringify([ y+"px", x+"px", style[2], style[3], style[4] ])});
    },
    getPos: function(elt,idx) {
      let style = JSON.parse(elt.style);
      return parseInt(style[idx]);
    },
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
.ki {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
}
</style>
