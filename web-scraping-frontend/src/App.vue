<template>
	<div id="app" class="height-vh d-flex flex-direction-column justify-content-space-between">
		<Header />
		<Menu />
		<!-- MAIN CONTENT -->
		<router-view/>
		<Footer />
	</div>
</template>

<script>
import './assets/styles/global.css';

import Header from './modules/Header'
import Menu from './modules/Menu'
import Footer from './modules/Footer'

export default {
	components: {
		Header,
		Menu,
		Footer
	}
}
</script>
