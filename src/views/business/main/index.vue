<template>
	<div>
		<Head class="head dark-mode" v-if="!props.noHead">
		</Head>
	</div>
	<div :key="pageKey" class="control-panel TrafficInfo" style="left: 20px; top:60px;">
		<div class="module-card dark-mode" >
			<div class="card-head">
				<div class="card-title">交通运行信息</div>
				<div class="card-extend color-green title-2">
					{{trafficInfo.levelDesc}}
				</div>
			</div>
			<div class="card-body" style="height: 140px;">
				<div class="row-layout">
					<div class="row-12 col-layout">
						<div class="col-6 text-center title-2">
							今日
						</div>
						<div class="col-6 text-center">
							拥堵指数
							<div class="text-center">
							{{trafficInfo.todayInfo.congestionIndex}}
							</div>
						</div>
						<div class="col-6 text-center">
							拥堵距离
							<div class="text-center">
							{{trafficInfo.todayInfo.congestionDistance}}
							</div>
						</div>
						<div class="col-6 text-center">
							路网速度
							<div class="text-center">
							{{trafficInfo.todayInfo.roadNetworkSpeed}}
							</div>
						</div>
					</div>
					<div class="row-12 col-layout">
						<div class="col-6 text-center">
							本月
						</div>
						<div class="col-6 text-center">
							{{trafficInfo.lastMonthAvgInfo.congestionIndex}}
						</div>
						<div class="col-6 text-center">
							{{trafficInfo.lastMonthAvgInfo.congestionDistance}}
						</div>
						<div class="col-6 text-center">
							{{trafficInfo.lastMonthAvgInfo.roadNetworkSpeed}}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div :key="pageKey + 1" class="control-panel TrafficInfo" style="left: 20px; top:340px;">
		<div class="module-card dark-mode">
			<div class="card-head">
				<div class="card-title">拥堵预警</div>
			</div>
			<div class="card-body">
				<div>
					<table>
						<thead>
							<tr>
								<th>路段名称</th>
								<th>持续时间</th>
								<th>拥堵类型</th>
								<th>拥堵级别</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item,index in trafficInfo.congestionSections">
								<td>{{item.name}}</td>
								<td>{{item.time}}</td>
								<td>{{item.type}}</td>
								<td>{{item.level}}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import Head from '/@/components/business/Head.vue'
	import {onBeforeUnmount, ref, defineProps} from 'vue';
	import {
		getTrafficInfo,
		getManualInspection,
		getOverloadInfo,
		getTrafficStaticInfo,
		getTrafficTransportInfo,
		getTripModeInfo,
	} from '/@/mock/business/mockApi';

	import rs from '/@/mock/tianjinbinhai.json';


	const props = defineProps(['noHead']);
	console.log(props)

	let myView;
	let grid;
	window.bMapReady.then(({
			map,
			view,
		}) => {
		myView = view;

		grid = new mapvgl.HeatGridLayer({
				max: 80, // 最大阈值
				min: 10, // 最小阈值
				gridSize: 500,
				// style: 'normal',
				gradient: { // 对应比例渐变色
						0: 'rgb(50, 50, 256)',
						0.3: 'rgb(178, 202, 256)',
						1: 'rgb(250, 0, 0)'
				},
				riseTime: 1800, // 楼块初始化升起时间
				maxHeight: 10000, // 最大高度
				minHeight: 200 // 最小高度
		});
		view.addLayer(grid);

		let data = [];
		for (let i = 0; i < rs.length; i++) {
			let item = rs[i];
				data.push({
						geometry: {
								type: 'Point',
								coordinates: [item[0], item[1]]
						},
						properties: {
								count: item[2]
						}
				});
		}
		grid.setData(data);

		let point = new BMapGL.Point(117.626, 38.9);
		map.centerAndZoom(point, 12.0);
		map.setTilt(60);
	})

	const pageKey = ref(0);

	let trafficInfo = {
			congestionSections: [],
			lastMonthAvgInfo: {
				congestionDistance: 0,
				congestionIndex: 0,
				roadNetworkSpeed: 0,
				levelDesc: ''
			},
			todayInfo: {
				congestionDistance: 0,
				congestionIndex: 0,
				roadNetworkSpeed: 0,
			},
		};


		const getData = async () => {

			trafficInfo = await getTrafficInfo();

			pageKey.value++;
		}
		// setInterval(getData,5000);
		getData();


	onBeforeUnmount(() => {
		myView?.removeLayer(grid);
	})

</script>

<style lang="scss" scoped>
	.control-panel.TrafficInfo {
		width: 400px;

	}

	.TrafficInfo {
		table {
			border: solid 1px #eee;
			width: 100%;
			border-collapse: collapse;

			th,
			td {
				border: solid 1px #eee;
			}
		}
	}

</style>
