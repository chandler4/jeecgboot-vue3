<template>
		<div class="neu-page-table">
			<el-table :data="data" :="props.tableProps">
			  <slot></slot>
			</el-table>
			<div class="neu-page-table-pagenation">
				<el-pagination 
					layout="prev, pager, next"
					v-model:page-size="pageSize"
					v-model:total="total" 
					v-model:current-page = "pageNum"
					:="props.paginationProps"
					@size-change="onSizeChange"
					@current-change="onCurrentChange"
				/>
			</div>
			
		</div>
</template>

<script setup>
	
	import {ref, defineProps, defineExpose, nextTick } from 'vue';
	
	const props = defineProps([
			'data', 
			'tableProps', 
			
			'pageSize',
			'pageNum',
			'total', 
			
			'paginationProps',
			
			'fetch',
			]);
			
	// const emits = defineEmits ([])
			
	const data= ref([]);
	const total= ref(0);
	const pageNum = ref(1);
	const pageSize = ref(props.pageSize || 10);
	
	
	function onSizeChange() {
		console.log()
	}
	
	function onCurrentChange() {
			doFetch(lastParam);
		nextTick(() => {
		});
		
	}
	
	let lastParam = {};
			
	async function doFetch(param = {}) {
		if (!props.fetch) {
			return;
		}
		
		lastParam = {
			...param,
			pageNum: pageNum.value,
			pageSize: pageSize.value,
		}
		
		const result = await props.fetch(lastParam);
		
		console.log(result);
		
		const {
			records = [],
		} = result || {};
		
		total.value = result.total || 0;
		data.value = records;
		
	}
	
	defineExpose({
		doFetch
	})	
	

	

</script>

<style lang="scss">
	.neu-page-table {
		background-color: #fff;
		position: relative;
		
		.neu-page-table-pagenation {
			display: flex;
			justify-content: end;
		}
	}
</style>