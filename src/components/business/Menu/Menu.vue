<template>
	<div class="nav-menu">
		<el-menu
			@select="onSelect"
		>
			<MenuItem :list="menuData" />
		</el-menu>
	</div>
</template>

<script lang="ts" setup>
	import { ref,  watch, shallowRef } from 'vue';
	import { useRouter, useRoute} from 'vue-router';
	
	import { routerData } from '@/router/RouterManage'
	import MenuItem from './MenuItem.vue';
	
	const route = useRoute();
	const router = useRouter();
	
	const menuData = ref(routerData);
	
	function onSelect(url: string) {
		const {
			hash,
		} = route;
		
		router.push([url, hash].join(''));
		// console.log(router)
	}

</script >

<style lang="scss">
.nav-menu{
	height: 100%;
}
</style>