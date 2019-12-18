<template>
	<div class="Feuille">
		<div v-if="slugList">
			<h1 v-html="slugList.titre"></h1>
			<em>(Cliquez sur une image pour voir les détails, clic-droit pour réserver l'élément)</em>
			<br>
			<br>
			<span v-html="slugList.description"></span>
			<br>
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
				<img v-if="kdo.hasimage == 1" class="ki" :src="kdo.image" :alt="kdo.image">
			</div>
		</VueDraggableResizable>
		<SweetModal :title="modal ? 'Item N°'+modal.id : 'Item'" ref="modal">
			<SweetModalTab title="Détails" id="tab1">
				<div v-if="modal">Présence image :
					<input
						type="checkbox"
						name="hasImage"
						id="hasImage"
						v-model="modal.hasimage"
						true-value="1"
						false-value="0"
					>
					<br>Image :
					<input type="url" name="Image" id="Image" v-model="modal.image">
					<br>Lien :
					<input type="url" name="Link" id="Link" v-model="modal.link">
				</div>
			</SweetModalTab>
			<SweetModalTab title="Position" id="tab2">
				<div v-if="modal">{{modal}}</div>
			</SweetModalTab>
			<SweetModalTab title="Status" id="tab3">
				<div v-if="modal">Libre :
					<input
						type="checkbox"
						name="Sts"
						id="Sts"
						v-model="modal.status"
						true-value="1"
						false-value="0"
					>
					<br>
				</div>
			</SweetModalTab>
			<button class="blue" slot="button" @click="onModif">Modifier</button>
			<button class="red" slot="button" @click="onSuppr">Supprimer</button>
			<button slot="button" @click="onClose">Annuler</button>
		</SweetModal>
		<div class="tache" @click="addOne()"></div>
	</div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import VueDraggableResizable from "vue-draggable-resizable";
import { SweetModal, SweetModalTab } from "sweet-modal-vue";
const fb = require("../firebaseConfig.js");

export default {
	name: "Write",
	data() {
		return {
			msg: "Welcome to Your Vue.js App",
			current: null,
			modal: null
		};
	},
	components: { VueDraggableResizable, SweetModal, SweetModalTab },
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
		...mapMutations(["Take", "Free", "setItem", "delItem", "setStyle","addItem"]),
		addOne() {
			this.addItem({
				"hasimage": "0",
				"image": "",
				"link": "",
				"slug": this.$route.params.slug,
				"status": "1",
				"style": "[\"50px\",\"50px\",\"100px\",\"100px\",\"0\"]"
			});
		},
		onModif() {
			this.setItem(this.modal);
			this.$refs.modal.close();
		},
		onSuppr() {
			this.delItem(this.modal);
			this.$refs.modal.close();
		},
		onClose() {
			this.$refs.modal.close();
		},
		onActivated(locals) {
			this.current = locals;
		},
		onCtx(locals) {
			this.current = locals;
			this.modal = { ...locals };
			this.$refs.modal.open("tab1");
		},
		onResized(x, y, width, height, degree) {
			this.setStyle({
				id: this.current.id,
				style: JSON.stringify([
					y + "px",
					x + "px",
					height + "px",
					width + "px",
					degree.toString()
				])
			});
		},
		onDraged(x, y) {
			let style = JSON.parse(this.current.style);
			this.setStyle({
				id: this.current.id,
				style: JSON.stringify([
					y + "px",
					x + "px",
					style[2],
					style[3],
					style[4]
				])
			});
		},
		getPos: function(elt, idx) {
			let style = JSON.parse(elt.style);
			return parseInt(style[idx]);
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
.ki {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	border: 1px solid red;
}
button {
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	-webkit-user-select: none;
	-moz-user-select: none;
	user-select: none;
	cursor: default;
	display: inline-block;
	text-decoration: none;
	outline: 0;
	text-align: center;
	position: relative;
	font-size: 14px;
	font-weight: 600;
	padding-top: 8px;
	padding-bottom: 8px;
	padding-left: 16px;
	padding-right: 16px;
	border-radius: 2px;
	transition: all 0.2s;
	cursor: pointer;
}
button.blue {
	background: #1e88e5;
	border: 1px solid #1468b1;
}
button.red {
	background: #881ee5;
	border: 1px solid #6814b1;
}
</style>
