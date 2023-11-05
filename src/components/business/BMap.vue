<template>
	<div ref="bMap" class="bmap">

	</div>
</template>

<script lang="ts" setup>
	import {onMounted, ref, onBeforeUnmount} from 'vue';
	import * as mapvgl from 'mapvgl';
	import { DrawScene } from 'bmap-draw';

	let res: Function;

	window.bMapReady = new Promise((resolve) => res = resolve);
	window.mapvgl = mapvgl;

	const bMap = ref(null);
	const BMapGL = window.BMapGL;



	let map;
	onMounted(() => {

		map = new BMapGL.Map(bMap.value);

		// 工具
		window.mercatorToLnglat = function(text) {
			let [type = '', center = '', points = ''] = text.split('|');
			const segments = points.split(';');
			// 去掉最后一个空串
			segments.pop();

			const [c1,c2 ] = center.split(';');
			const lnglat1 = map.mercatorToLnglat(...c1.split(','));
			const lnglat2 = map.mercatorToLnglat(...c2.split(','));
			const lng = (lnglat1[0] + lnglat2[0]) / 2;
			const lat = (lnglat1[1] + lnglat2[1]) / 2;

			return {
				center: new window.BMapGL.Point(lng, lat),
				polygon: segments.map((mct) => {
					const pairs = mct.split(',');
					const points = [];
					for (let i = 0;i < pairs.length - 1; i+=2) {
						const [lng, lat] = map.mercatorToLnglat(pairs[i], pairs[i + 1]);
						points.push(new window.BMapGL.Point(lng, lat));
					}
					return points;
				})
			};

		}

		let polygonPoints = [];
		window.clearPolygonPoints = () => {
			polygonPoints = [];
		}
		window.printPolygonPoints = () => {
			console.log(JSON.stringify(polygonPoints, null, 2));
		}
		window.getMapCenter = () => {
			const point = map.getCenter();
			console.log([point.lng ,point.lat ], map.getZoom());
		}

		map.addEventListener('click', function (e) {
			const {
				lng,
				lat
			} = e.latlng;
				console.log([lng,lat]);
				polygonPoints.push([lng, lat]);
		});

		// 沈阳
		// const center = [123.43992373684594, 41.79668070540008];
		// map.centerAndZoom(new BMapGL.Point(...center), 16);

		map.enableScrollWheelZoom();
		map.enablePinchToZoom();
		map.enableRotateGestures();

		// 添加3D控件
		const navi3DCtrl = new BMapGL.NavigationControl3D();
		map.addControl(navi3DCtrl);

		// map.setTilt(60);

		// map.setMapStyleV2({
		// 	styleId: '02891362dfd08897501f48a10883af3a'
		// });

		// 天津滨海新区
		const point = new BMapGL.Point(117.71,38.897);
		map.centerAndZoom(point, 12);

		map.setTilt(30);
		map.setHeading(30);

		const view = new mapvgl.View({
				map: map
		});

		const scene = new DrawScene(map, {
				noLimit: true
		});

		res({
			map,
			view,
			scene,
		})


	});


	onBeforeUnmount(() => {
		map?.destroy();
	})

</script>

<style lang="scss" >
	.bmap{
		width: 100%;
		height:100%;
	}
</style>
