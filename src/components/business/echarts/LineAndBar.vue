<template>
	<div ref="echartView" class="echart-view">

	</div>
</template>

<script lang="ts" setup>
	import * as echarts from "echarts";
	import { onMounted, ref } from 'vue'

	const props = defineProps(['data', 'config', 'option']);
	const echartView = ref(null);
	
	const {
		config = {},
		data = [],
		option,
	} = props;

	onMounted(() => {

		const echart = echarts.init(echartView.value);

		if (option) {
			echart.setOption(option);
		} else {

			const {
				xField = 'x',
				barFields = [],
				lineFields = [],
				legendFields = [],
			} = config;
			
			const xData = [];
			data.forEach(item => {
				
			});
			
			echart.setOption({
				xAxis: {
					type: 'category',
					data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
				},
				yAxis: {
					type: 'value'
				},
				series: [
					{
						data: [150, 230, 224, 218, 135, 147, 260],
						type: 'line'
					}
				]
			});
		}
	})
</script>

<style lang="scss">
	.echart-view {
		min-width: 300px;
		min-height: 200px;
	}
</style>