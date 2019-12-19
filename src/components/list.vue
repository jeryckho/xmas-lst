<template>
	<div class="Feuille">
		<h1>Listes</h1>
		<br />
		<div v-if="Lists.length" v-for="list in Lists" :key="list.id">
			<a :href="'#/liste/'+list.slug">{{ list.titre }}</a>
			<br />
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
const fb = require("../firebaseConfig.js");

export default {
	name: "List",
	data() {
		return {
			msg: "Welcome to Your Vue.js App"
		};
	},
	computed: {
		...mapState(["Lists", "Details"])
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
