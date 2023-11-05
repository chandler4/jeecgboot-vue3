<template>
	<template v-for="item in list">
		<template v-if="!item.meta?.notInMenu">
			<template v-if="Array.isArray(item.children)">
				<el-sub-menu :index="item.fullPath">
					<template #title>
					  {{item.name}}
					</template>
					<MenuItem :list="item.children"></MenuItem>
				</el-sub-menu>
			</template>
			<template v-else>
				<el-menu-item
				@click="onClick"
					:index="item.fullPath">
				{{item.name}}
				</el-menu-item>
			</template>
		</template>
	</template>
</template>

<script lang="ts" setup>
	import { ref, defineProps } from 'vue';

	const props = defineProps(['list']);

	const list = ref(props.list || []);

	function onClick(e) {
	}


</script>

<style>
</style>
