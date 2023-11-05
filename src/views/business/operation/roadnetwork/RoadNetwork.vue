<template>
    <div class="control-panel city-road-button-group" style="left: 0.333rem; top:4rem;">
        <el-button type="primary" class="city-road-button" @click="isOverActive = !isOverActive">概览信息</el-button>
        <div :class="{ hidden: isOverActive }">
            <RoadNetworkOverview />
        </div>
        <el-button type="primary" class="city-road-button" @click="isThirdActive = !isThirdActive">三方信息</el-button>
        <div :class="{ hidden: isThirdActive }">
            <RoadNetworkThirdPart :info="thridPart" />
        </div>
    </div>
    <div class="control-select-panel">
        <el-select placeholder="请选择" style="width:100%;">
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="录入员" value="users"></el-option>
        </el-select>
    </div>
    <div class="control-panel control-other-button">
        <el-button type="primary" class="city-road-button" @click="isShowRoadList = true">道路列表</el-button>
        <el-button type="primary" class="city-road-button" @click="isShowCongestion = true">拥堵列表</el-button>
        <el-button type="primary" class="city-road-button" @click="isShowUploadList = true">上报历史</el-button>
    </div>
    <CityRoadRealTime :top="realTop + '%'" :left="realleft + '%'" />
    <CityColorPanel />
    <el-dialog title="路段流量监控列表" v-model="isShowRoadList" @close="onRoadListDialogClose" class="el-cust-dialog-md">
        <div class="el-cust-dialog-contentbox">
            <RoadNetList ref="roadListRef" :source="uploadSource" @on-search="roadListSearch" @export="roadListExport" />
        </div>

    </el-dialog>
    <el-dialog title="拥堵路段信息" v-model="isShowCongestion" @close="onCongestionDialogClose" class="el-cust-dialog-big">
        <div class="el-cust-dialog-contentbox">
            <RoadNetCongestion  ref="congestionRef" :source="uploadSource" @on-search="congestionSearch" @export="congestionExport" />
        </div>

    </el-dialog>
    <el-dialog title="三方上报事件历史信息" @close="onUploadDialogClose" v-model="isShowUploadList" class="el-cust-dialog-big">
        <div class="el-cust-dialog-contentbox">
            <RoadNetUpload ref="uploadRef" :source="uploadSource" @on-search="uploadSearch" @export="uploadExport" />
        </div>

    </el-dialog>
</template>

<script setup lang="ts">
import { CityColorPanel, CityRoadRealTime } from "../cityroad/components";

import { RoadNetworkOverview, RoadNetworkThirdPart, RoadNetList, RoadNetCongestion, RoadNetUpload } from "./components";
import { ref, reactive } from 'vue';
const isOverActive = ref(false);
const isThirdActive = ref(false);
const isShowRoadList = ref(false);
const isShowCongestion = ref(false);
const isShowUploadList = ref(false);
const uploadRef = ref();
const roadListRef = ref();
const congestionRef = ref();
const realTop = ref(15);
const realleft = ref(45);

const uploadSource = reactive([{
    id: 1,
    code: 'a1',
    section: "奉天街",
    type: 1,
    uploadtime: '2023-08-21',
    platform: '滴滴出行',
    check: 1,
    effect: 0,
    position: '20K+201',
    manager: '国务院'
}])

const setRealPostition = () => {
    realTop.value = 45;
    realleft.value = 65;

}
const thridPart = reactive({
    uploadtime: '05-25',
    total: 10,
    close: 10,
    verify: 20,
    event: 5,
    accumulate: 2,
    effect: 12

})

const roadListSearch = (condition: any) => {
    console.info(condition);
}
const roadListExport = (condition: any) => {
    console.info('export ' + condition);
}

const congestionSearch = (condition: any) => {
    console.info(condition);
}
const congestionExport = (condition: any) => {
    console.info('export ' + condition);
}

const uploadSearch = (condition: any) => {
    console.info(condition);
}
const uploadExport = (condition: any) => {
    console.info('export ' + condition);
}
const onUploadDialogClose = () => {
    uploadRef.value.reset();
}
const onRoadListDialogClose = () => {
    roadListRef.value.reset();
}
const onCongestionDialogClose = () => {
    congestionRef.value.reset();
}
</script>

<style>
.el-cust-dialog-big {
    width: 65%;
}

.hidden {
    display: none;
}

.el-table .cell {
    text-align: center;
}

.el-dialog {
    position: relative;
    margin: 0 auto 0px;
    margin-top: 0px !important;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
    box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
    box-sizing: border-box;
    top: 50%;
    left: 0%;
    transform: translate(0%, -50%);
}

.el-dialog__headerbtn {
    position: absolute;
    top: 2px;
    right: 6px;
    padding: 0;
    background: 0 0;
    border: none;
    outline: 0;
    cursor: pointer;
    font-size: 1.2rem;
}

.el-dialog__headerbtn .el-dialog__close {
    color: #fff;
}

.el-dialog__header {
    background-color: #008bf0;
    color: #fefefe;
    padding: 0px 16px 0px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    height: 3rem;
    line-height: 3rem;
    color: #ffffff;
    margin: 0;
}

.el-dialog__title {
    line-height: 1.5rem;
    font-size: 1rem;
    color: #fefefe;
}


.dialog-footer {
    display: flex;
    justify-content: center;
}

.control-select-panel {
    position: absolute;
    left: 15rem;
    top: 2.5rem;
    width: 15rem;
}

.control-other-button {
    background-color: rgba(255, 255, 255, 0) !important;
    position: absolute;
    right: 2rem;
    top: 4rem;
    width: 25%;

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
