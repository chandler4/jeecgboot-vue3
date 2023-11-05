<template>
	<div class="common-layout" >
		<Head class="head" v-if="!noHead">
		</Head>
		<div class="body">
			<template v-if="noMenu">
				<BmapLayout v-if="isMapLayout">
				</BmapLayout>
				<RouterView v-else />
			</template>
			<template v-else>
				<div class="menu">
					<Menu></Menu>
				</div>
				<div class="main">
					<div class="container">
						<div class="screen-container">
							<BmapLayout v-if="isMapLayout">
							</BmapLayout>
							<RouterView v-else />
						</div>
					</div>
				</div>
			</template>
		</div>	
	</div>  
</template>

<script lang="ts" setup>
	import { ref, watch } from 'vue';
	import { useRoute, useRouter} from 'vue-router';
	import { RouterView } from 'vue-router'
	
	import Head from './Head.vue'
	import Menu from './Menu/Menu.vue'
	import BmapLayout from './BmapLayout.vue'
	
	const route = useRoute();
	const router = useRouter();
	
	const noMenu = ref(false);
	const noHead = ref(false);
	const isMapLayout = ref(false);

	function update() {
		noMenu.value = route.meta?.noMenu || false;
		noHead.value = route.meta?.noHead || false;
		isMapLayout.value = route.meta?.isMapLayout || false;
	}

	router.isReady().then(update);	
	watch(route, update);

	
</script>

<style lang="scss">
	$headHeight: 68px;
	$menuWidth: 200px;
	
	.common-layout {
		position: relative;
		width: 100%;
		height: 100vh;
		
		.head {
			width: 100%;
			height: $headHeight;
			
		}
		
		.head + .body {
			height: calc(100% - $headHeight);
		}
		
		.body {
			height: calc(100%);
			display: flex;
	
			.menu {
				width: $menuWidth;
				height: 100%;
			}
			
			.main {
				width: calc(100% - $menuWidth);
				height: calc(100% - 0px);
	
				.screen-container {
					height: calc(100% );
				}
				
				.container {
					position: relative;
					// margin: 20px;
					margin-bottom: 0;
					width: calc(100% - 0px);
					height: calc(100% - 0px);
					// background-color: #fff;
					// border-radius: 6px;
					// overflow: hidden;
					box-shadow: 0 1px 2px -2px rgba(0, 34, 101, 0.04), 0 3px 6px 0 rgba(0, 34, 101, 0.04), 0 5px 12px 4px rgba(0, 34, 101, 0.04);
				}
			}
		}
	}
</style>