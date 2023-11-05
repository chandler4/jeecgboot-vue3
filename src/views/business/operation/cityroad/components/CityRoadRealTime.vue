<template>
    <div class="city-road-realtime-panel .city-road-realtime-panel-position" :style="{ top, left }">
        <div class="realtime-row">
            <div class="realtime-info">实时信息</div>
        </div>
        <div class="realtime-row">
            <div class="realtime-header">拥堵指数:</div>
            <div class="realtime-number">{{ info.index }} ({{ info.describe }})</div>
            <div class="realtime-header short" >缓行距离:</div>
            <div class="realtime-number">{{ info.slow }}</div>
        </div>
        <div class="realtime-row">
            <div class="realtime-header">拥堵距离:</div>
            <div class="realtime-number">{{ info.congestion }}</div>
            <div class="realtime-header short" > 严重拥堵距离:</div>
            <div class="realtime-number">{{ info.severe }}</div>
        </div>
        <div class="realtime-row">
            <div class="realtime-header">路网平均速度:</div>
            <div class="realtime-number">{{ info.avg }}</div>
        </div>
        <div class="realtime-row">
            <div class="realtime-header">拥堵城市报告指数:</div>
            <div class="realtime-number">{{ info.report }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { reactive } from 'vue';
defineProps(['top', 'left','info'])


const info = reactive({
    index: 1.2,
    describe: "通畅",
    slow: "1km",
    congestion: "8km",
    severe: "3km",
    avg: "45km/h",
    report: 2.3,
})

</script>

<style>
.city-road-realtime-panel {
    position: fixed;
    background-color: #7ed6e7;
    border-radius: 4px;
    color: rgb(255, 255, 255);
    width: 27rem;
    padding: 1rem 0;

}

.realtime-row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    line-height: 2rem;
    margin-top: 0.2rem;
}

.realtime-header {
    width: 30%;
    margin-left: 5%;

    text-align: left;
}

.realtime-number {
    width: 15%;
    text-align: left;
}

.short {
    width: 25% !important;
}

.realtime-info {
    font-size: 1.2rem;
    margin-left: 5%;
}

.realtime-rule {
    width: 50%;
    font-size: 1rem;
    text-align: right;
}
</style>