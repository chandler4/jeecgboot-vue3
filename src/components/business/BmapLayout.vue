<template>
	<div class="bg-bmap">
		<BMap />
	</div>
	<div class="business-container">
		<RouterView />
	</div>
</template>

<script lang="ts" setup>
	import BMap from '@/components/business/BMap.vue'
	import { RouterView } from 'vue-router'

</script>

<style lang="scss" >
	.bg-bmap{
		height: 100%;
	}

	.business-container{
		width: 100%;
		height: 0;
		position: absolute;
		z-index: 1;
	}

	.bg-bmap{
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 0;
	}

</style>
