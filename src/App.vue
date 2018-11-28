<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
export default {};
</script>

<style>
body {
	background-image: url(./assets/Bois.jpg);
}
.Feuille {
	position: relative;
	margin-top: 2em;
	margin-left: auto;
	margin-right: auto;
	background-image: url(./assets/Page.gif);
	background-repeat: repeat-y;
	font-family: "Comic Sans MS", arial, monospace;
	line-height: 28px;
	font-size: 20px;
	padding-top: 5px;
	color: #000099;
	text-align: justify;
	padding-left: 112px;
	width: 720px;
	padding-right: 13px;
	min-height: 288mm;
}
.Feuille a:link {
	text-decoration: none;
	color: #000099;
	font-variant: small-caps;
}
.Feuille a:visited {
	text-decoration: none;
	color: #000099;
}
.Feuille a:hover {
	text-decoration: none;
	color: #000099;
	font-style: italic;
}
.Feuille h1 {
	margin-top: 0px;
	text-align: center;
	font-weight: bold;
	margin-bottom: 28px;
}
.Feuille span.SouligneVert {
	border-bottom: 2px solid green;
}
.Feuille span.SouligneRouge {
	border-bottom: 2px solid red;
}
.Feuille span.SouligneNoir {
	border-bottom: 2px solid black;
}
.Feuille span.SouligneBleu {
	border-bottom: 2px solid #000099;
}
.Feuille span.CrayonVert {
	color: green;
}
.Feuille span.CrayonRouge {
	color: red;
}
.Feuille span.CrayonNoir {
	color: black;
}
.Feuille span.CrayonBleu {
	color: #000099;
}
.Feuille div.Stylo {
	text-align: center;
}
.Feuille div.Stylo span {
	text-transform: uppercase;
	font-size: small;
}
.Feuille div.Tache {
	text-align: center;
	position: absolute;
	top: 130px;
	left: 680px;
	opacity: 0.9;
}
.Feuille div.Note {
	border: medium double red;
	padding: 5px;
	text-align: center;
	position: absolute;
	top: 90px;
	left: 80px;
}
.Feuille div.Retour {
	position: absolute;
	top: 55px;
	left: 80px;
	font-size: xx-large;
	letter-spacing: -5px;
}
.Feuille div.Avance {
	position: absolute;
	top: 55px;
	left: 820px;
	font-size: xx-large;
	letter-spacing: -5px;
}
.Feuille img {
	border: 0px;
}
.position-fixed {
	position: fixed !important;
}
.open > .dropdown-menu {
	display: block;
}
.dropdown-menu {
	font-family: "Times New Roman", Georgia, Serif;
	background-clip: padding-box;
	background-color: #fff;
	border: 1px solid rgba(0, 0, 0, 0.15);
	border-radius: 4px;
	box-shadow: 0 6px 12px rgba(0, 0, 0, 0.176);
	display: none;
	float: left;
	font-size: 14px;
	left: 0;
	list-style: outside none none;
	margin: 2px 0 0;
	min-width: 160px;
	padding: 5px 0;
	position: absolute;
	top: 100%;
	z-index: 1000;
}
.dropdown-menu > li > a {
	clear: both;
	color: #333 !important;
	display: block;
	font-weight: normal;
	font-variant: normal !important;
	line-height: 1.42857;
	padding: 3px 20px;
	white-space: nowrap;
}
.dropdown-menu > li > a:hover,
.dropdown-menu > li > a:focus {
	color: #262626;
	text-decoration: none;
	background-color: #f5f5f5;
	font-style: normal;
}
.dropdown-menu > .active > a,
.dropdown-menu > .active > a:hover,
.dropdown-menu > .active > a:focus {
	color: #fff;
	text-decoration: none;
	background-color: #428bca;
	outline: 0;
}
.pointer {
	cursor: pointer;
}
.Kdo {
	position: absolute;
}
.Kdo .ki {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
}
.Kdo .nop {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background-image: url(./assets/Rcroix.svg);
	background-size: 100% 100%;
}
.tache {
	position: fixed;
	top: 20px;
	left: 20px;
	background-image: url(./assets/Tache.gif);
	width: 124px;
	height: 94px;
	cursor: pointer;
}
</style>
