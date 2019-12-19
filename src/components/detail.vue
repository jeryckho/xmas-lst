<template>
	<div class="Feuille">
		<div v-if="slugList">
			<h1 v-html="slugList.titre"></h1>
			<em>(Cliquez sur une image pour voir les détails, clic-droit pour réserver l'élément)</em>
			<br />
			<br />
			<span v-html="slugList.description"></span>
			<br />
		</div>
		<div
			v-if="Details.length"
			v-for="kdo in slugDetails"
			:key="kdo.id"
			class="Kdo pointer"
			:style="getStyle(kdo)"
			@contextmenu.prevent="$refs.ctxMenu.open($event, kdo)"
		>
			<a v-if="kdo.link != ''" :href="kdo.link" target="_blank">
				<img v-if="kdo.hasimage == 1" class="ki" :src="kdo.image" :alt="kdo.image" />
			</a>
			<img v-else-if="kdo.hasimage == 1" class="ki" :src="kdo.image" :alt="kdo.image" />
			<div class="nop" v-show="kdo.status == 0"></div>
		</div>
		<context-menu id="context-menu" ref="ctxMenu" @ctx-open="onCtxOpen">
			<div v-if="current">
				<li
					:class="{'ctx-item':true, disabled:(current.status == 0)}"
					@click="Take(current.id)"
				>Réserver</li>
				<li
					:class="{'ctx-item':true, disabled:(current.status != 0)}"
					@click="Free(current.id)"
				>Libérer</li>
			</div>
		</context-menu>
	</div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import contextMenu from "vue-context-menu";
const fb = require("../firebaseConfig.js");

export default {
	name: "Detail",
	data() {
		return {
			msg: "Welcome to Your Vue.js App",
			current: null
		};
	},
	components: { contextMenu },
	computed: {
		...mapState(["Lists", "Details"]),
		slugDetails: function() {
			return this.Details.filter(item => item.slug === this.$route.params.slug);
		},
		slugList: function() {
			const lsts = this.Lists.filter(
				item => item.slug === this.$route.params.slug
			);
			return lsts.length ? lsts[0] : null;
		}
	},
	methods: {
		...mapMutations(["Take", "Free"]),
		onCtxOpen(locals) {
			this.current = locals;
		},
		getStyle: function(elt) {
			let style = JSON.parse(elt.style);
			return {
				top: style[0],
				left: style[1],
				height: style[2],
				width: style[3],
				transform: "rotate(" + style[4] + "deg)",
				"-webkit-transform": "rotate(" + style[4] + "deg)",
				"-ms-transform": "rotate(" + style[4] + "deg)"
			};
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
