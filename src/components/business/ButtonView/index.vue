<template>
	<div class="button-view">
		<div v-if="!props.noView"
			class='data-view' 
			:style="{display: isShow ? 'block': 'none'}" >
			<slot></slot>
		</div>
		<el-button class="button" @click="clickButton">
			{{props.label}}
		</el-button>
	</div>
</template>

<script setup>
import { ref, getCurrentInstance, defineExpose, onUnmounted } from 'vue';
import { useButtonViewStore } from './buttonViewStore.js';
	
	const props = defineProps(['label', 'noView']);
	const emits = defineEmits(['onShowChange']);
	const isShow = ref(false);
	const buttonViewStore = useButtonViewStore();
	const me = getCurrentInstance();
	const hide = function () {
		isShow.value = false;
		const e = {
			isEvent: false,
		};
		e.label = props.label;
		e.isShow = false;
		emits('onShowChange', e);
	};
	const clickButton = function (e) {
		buttonViewStore.show(me.uid);
		const flag = isShow.value = !isShow.value;
		e.isEvent = true;
		e.label = props.label;
		e.isShow = flag;
		emits('onShowChange', e);
	};
	
	buttonViewStore.register(me);
	defineExpose({
		hide
	});
	onUnmounted(() => {
		buttonViewStore.unRegister(me.uid)
	});
	
</script>

<style lang="scss">
	.button-view {
		position: relative;
		width: 0;
		
		.data-view {
			min-width: 200px;
			min-height: 150px;
			background-color: #fff;
			position: absolute;
			left: 150px;
			border-radius: 4px;
			padding: 12px;
			border: solid 1px black;
		}
		
		.button {
			margin-top: 20px;
			display: block;
			background-color: #00ff00;
			width: 80px;
		}
	}
</style>