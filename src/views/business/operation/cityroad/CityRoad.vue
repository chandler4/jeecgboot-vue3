<template>
    <div class="control-panel city-road-button-group" style="left: 0.333rem; top:4rem;">
        <el-button type="primary" class="city-road-button" @click="isActive = !isActive">基础信息</el-button>
        <div :class="{ hidden: isActive }">
            <CityRoadOverView :info="overView" />
        </div>
        <el-button type="primary" class="city-road-button" @click="isWarmActive = !isWarmActive">预警信息</el-button>
        <div :class="{ hidden: isWarmActive }">
            <CityRoadWarn :source="warnSource" />
        </div>
        <el-button type="primary" class="city-road-button"
            @click="isCongestionActive = !isCongestionActive">拥堵信息</el-button>
        <div :class="{ hidden: isCongestionActive }">
            <CityRoadCongestion :source="CongestionSource" v-model:selected="isCongestionSelected" />
        </div>
        <el-button type="primary" class="city-road-button" @click="push('cityRoadNetwork/importantArea')">重点区域</el-button>

    </div>
    <div class="control-select-panel">
        <el-select placeholder="请选择" style="width:100%;">
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="录入员" value="users"></el-option>
        </el-select>
    </div>
    <CityRoadRealTime :top="realTop + '%'" :left="realleft + '%'" :info="realTime" />
    <CityColorPanel />
</template>

<script setup lang="ts">
import { CityColorPanel, CityRoadOverView, CityRoadRealTime, CityRoadWarn, CityRoadCongestion } from "./components/business/";
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
const { push } = useRouter();
const isActive = ref(true);
const isWarmActive = ref(true);
const isCongestionActive = ref(true);
const realTop = ref(15);
const realleft = ref(45);
const isCongestionSelected = ref(1)

const setRealPostition = () => {
    realTop.value = 45;
    realleft.value = 65;

}
const realTime = reactive({
    index: 1.2,
    describe: "通畅",
    slow: "1km",
    congestion: "8km",
    severe: "5km",
    avg: "145km/h",
    report: 2.3,
})

const warnSource = reactive([{
    index: 1.2,
    section: "通畅",
    duration: 20,
    status: 1,
}])

const CongestionSource = reactive([{
    section: "通畅",
    speed: 20,
    length: 78,
}])
const overView = reactive({
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
.hidden {
    display: none;
}

.control-select-panel {
    position: absolute;
    left: 15%;
    top: 2.5rem;
    width: 15rem;
}

.city-road-button-group {
    background-color: rgba(255, 255, 255, 0) !important;
    /* opacity: 1; */
    display: flex;
    padding: 0 1rem;
    flex-direction: column;
    align-items: flex-start;
}

.city-road-button {
    margin: 0.5rem;
}

.el-button [class*=el-icon]+span {
    margin-left: 0rem;
}
</style>
