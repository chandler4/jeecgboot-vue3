<template>
    <div class="road-network-overview-panel ">
        <div class="overview-row">
            <div class="overview-info">概览信息</div>
            <div class="overview-rule">
            </div>
        </div>
        <div class="overview-row">
            <div class="overview-header">路段总数:</div>
            <div class="overview-number">{{ info.total }}</div>
            <div class="overview-header">正常路段:</div>
            <div class="overview-number">{{ info.normal }}</div>
        </div>
        <div class="overview-row">
            <div class="overview-header">拥堵路段:</div>
            <div class="overview-number">{{ info.congestion }}</div>
            <div class="overview-header">预警路段:</div>
            <div class="overview-number">{{ info.warn }}</div>
        </div>
        <div class="overview-row">
            <div class="overview-header">交通事件:</div>
            <div class="overview-number">{{ info.event }}</div>
            <div class="overview-header">道路养护:</div>
            <div class="overview-number">{{ info.congestion }}</div>
        </div>
        <div class="overview-row">
            <div class="overview-header">封闭路段:</div>
            <div class="overview-number">{{ info.close }}</div>
            <div class="overview-header">交通指数:</div>
            <div class="overview-number">{{ info.index }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { reactive } from 'vue';

const info = reactive({
    index: 0,
    close: 10,
    maintenance: 20,
    event: 5,
    congestion: 2,
    warn: 2,
    normal: 5,
    total: 500
})
</script>

<style>
.road-network-overview-panel {
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 4px;
    color: rgb(255, 255, 255);
    width: 15rem;

}

.overview-row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    line-height: 2rem;
}

.overview-header {
    width: 30%;
    margin-left: 5%;
}

.overview-number {
    width: 15%;
    text-align: left;
}

.overview-info {
    font-size: 1.2rem;
    margin-left: 5%;
}

.overview-rule {
    width: 50%;
    font-size: 1rem;
    text-align: right;
}
</style>