<template>
	<div>
		<div class="unlock-view-echart">
			<div ref="echartView" class="echart-view"> </div>
		</div>
		<div class='over-view-card' v-if="overview.length">
			<div>
				共享单车概览信息
			</div>
			<el-row v-for="item in overview">
				<el-col :span="12">
					{{item[0]}}：{{item[1]}}{{item[2]}}
				</el-col>
				<el-col :span="12" v-if="item[3]">
					{{item[3]}}：{{item[4]}}{{item[5]}}
				</el-col>
			</el-row>
		</div>
		<div class="parking-table">
			<PageTable :data="parkingArea"
									:pageSize="5"
									:total="22">
			  <el-table-column prop="parkName" label="停车点" width="100px" />
			  <el-table-column prop="name" label="时段内解锁量"  />
			  <el-table-column prop="a" label="时段内还车量" />
				<el-table-column prop="s" label="总数" />
				<el-table-column prop="d" label="排名" />
				<el-table-column prop="f" label="操作" />
			 </PageTable>
		</div>
	</div>
</template>

<script>
	import ButtonView from '@/components/ButtonView/index.vue';
	import PageTable from '@/components/PageTable/index.vue';
	import * as echarts from "echarts";
	import areaData,{ area1, area2, area3, area4 }from '@/utils/areaData.js';

	import {
		getBikeLockODData,
		fetchTodayHourlyUnlockInfo,
		fetchStatisticsInfo,
		fetchRegionStatisticsInfo,
	} from '@/api/sharedbike/sharedBike'

	export default {
		name: 'SharedMobility',
		components: {
			ButtonView,
			PageTable,
		},
		data() {

			const parkingArea = [];

			for(let i = 0;i < 5; i++) {
				parkingArea.push({
					parkName: '停车点' + i
				})
			}

			return {
				positions: [],
				overview: [],
				myView: undefined,
				heatmap: undefined,
				parkingArea,
			}
		},

		methods: {
			doBikeLockODData: async function() {
				let res = await getBikeLockODData();
				// debugger
				if (res) {
					this.positions = res?.positions;
					//format and draw hatmap
					this.drawMap();
				}
			},
			doStatisticsInfo: async function() {
				const {
					companyCount = 0,
						noParkingAreaBikeCount = 0,
						noParkingAreaCount = 0, // ？
						noParkingTimes = 0,
						outParkingAreaBikeCount = 0,
						parkingAreaCount = 0,
						releaseBikeCount = 0,
						releaseElectricBikeCount = 0,
						todayUnlockTimes = 0,
						releaseCount = 0, // ？
				} = await fetchStatisticsInfo();

				this.overview = [
					[
						...['接入平台', companyCount, '家', ],
						...['投放总量', releaseCount, '辆', ],
					],
					[
						...['投放单车', releaseBikeCount, '辆', ],
						...['投放电单车', releaseElectricBikeCount, '辆', ],
					],
					[
						...['停车点位', parkingAreaCount, '辆', ],
						...['停车点外车辆', outParkingAreaBikeCount, '辆', ],
					],
					[
						...['禁停区车辆', noParkingAreaBikeCount, '辆', ],
						...['违停次数', noParkingTimes, '辆', ],
					],
					[
						...['今日累计骑行次数', todayUnlockTimes, '次', ],
						...[null],
					],
				];
			},
			drawMap: function() {
				window.bMapReady.then(({
					map,
					view,
				}) => {
					this.myView = view;

					// map.panTo(new BMapGL.Point(117.71,38.897));

					let data = [];
					for (let i = 0; i < this.positions.length; i++) {
						let item = this.positions[i];

						data.push({
							geometry: {
								type: 'Point',
								coordinates: [item.lat, item.lng]
							},
							properties: {
								count: item.count
							}
						});
					}

					this.heatmap = new mapvgl.HeatmapLayer({
						size: 500, // 单个点绘制大小
						max: 40, // 最大阈值
						height: 0, // 最大高度，默认为0
						unit: "m", // 单位，m:米，px: 像素
						gradient: {
							// 对应比例渐变色
							0.25: "rgba(0, 0, 255, 1)",
							0.55: "rgba(0, 255, 0, 1)",
							0.85: "rgba(255, 255, 0, 1)",
							1: "rgba(255, 0, 0, 1)",
						},
					});

					view.addLayer(this.heatmap);
					this.heatmap.setData(data);

					// 滨海新区
					const {
						polygon,
					} = window.mercatorToLnglat(areaData);
					const allPolygon = new BMapGL.Polygon(polygon, {
						fillOpacity: 0,
						strokeStyle: 'dashed'
					});
					map.addOverlay(allPolygon);

					// let point = new BMapGL.Point(117.626, 38.9);
					// map.centerAndZoom(point, 12.0);
					// map.setTilt(60);
				})
			},
			async doRegionStatisticsInfo(e) {

				this.drawAreaPolygon(true);
				const data = await fetchRegionStatisticsInfo();
				// console.log(data);
				this.drawAreaPolygon(true, data);
			},
			drawAreaPolygon(flag = false, data = []) {

				window.bMapReady.then(({
					map,
				}) => {
					this.areaPolygons?.forEach(areaPolygon => map.removeOverlay(areaPolygon));

					// 删除
					if (!flag) {
						return;
					}

					// 投放区域
					const areaPolygons = [
						[area1, 'green'],
						[area2, 'orange'],
						[area3, 'blue',],
						[area4, 'yellow'],
					].map(([area, fillColor]) => {
						const areaPoints= area.map(([lng,lat]) => new BMapGL.Point(lng, lat))
						const areaPolygon = new BMapGL.Polygon(areaPoints, {
								fillColor,
								fillOpacity: 0.15
						});
						map.addOverlay(areaPolygon);
						return areaPolygon;
					});

					// 数据信息
					const areaData = data.map(item => {
						const {
							centerLng,
							centerlat,
							maxLimit,
							realCount,
							companies,
						} = item;

						const opts = {
							// 指定文本标注所在的地理位置
								position: new BMapGL.Point(centerlat,centerLng, ),
								// 设置文本偏移量
								offset: new BMapGL.Size(-30, -30)
						};
						const text = [
							`最大投放量：${maxLimit}辆`,
							`实际投放量：${realCount}辆`,
							`投放公司：${companies.join('，')}`,
						].join('<br/>');

						const label = new BMapGL.Label(text, opts);

						// 自定义文本标注样式
						label.setStyle({
						    color: '#ffffff',
						    borderRadius: '5px',
						    borderColor: 'transparent',
						    padding: '10px',
						    fontSize: '16px',
								fontWeight: '900',
						    // height: '30px',
						    lineHeight: '40px',
						    fontFamily: '微软雅黑',
								backgroundColor: 'rgba(0,0,200, 0.5)',
						});
						map.addOverlay(label);

						return label;
					});
					// console.log({areaData})
					this.areaPolygons = [...areaPolygons, ...areaData];
				});
			},
			async doTodayHourlyUnlockInfo() {
				const data = await fetchTodayHourlyUnlockInfo();

				const {
					times,
					unlockCount,
					onlineCount,
				} = data

				const echart = echarts.init(this.$refs.echartView);
				echart.setOption({
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: "shadow",
						},
					},
					legend: {
						data: ['未解锁', '在线']
					},
					xAxis: {
						type: 'category',
						data: times
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						name: '未解锁',
						data: unlockCount,
						type: 'line'
					}, {
						name: '在线',
						data: onlineCount,
						type: 'line'
					}]
				});
			},
		},
		mounted() {
			this.doBikeLockODData();
			this.doTodayHourlyUnlockInfo();
			this.doStatisticsInfo();
			this.doRegionStatisticsInfo();
		},
		unmounted() {
			this.myView?.removeLayer(this.heatmap);
			this.drawAreaPolygon(false);
		}
	}
</script>

<style lang="scss" scoped>

	.unlock-view-echart,
	.over-view-card,
	.parking-table {
		background-color: #fff;
		position: absolute;
		right: 10px;
		width: 500px;
		height: 300px;
	}

	.echart-view {
		width: calc(100% - 20px);
		height: calc(100% - 20px);
	}

	.unlock-view-echart {
		padding: 10px;
		top: calc(100vh - 930px - 80px);
	}

	.over-view-card {
		padding: 10px;
		top: calc(100vh - 614px - 80px);
	}
	.parking-table {
		top: calc(100vh - 300px - 80px);
	}

</style>
