<script setup lang="ts">
import {onMounted, ref} from "vue";
import OverviewInfo from '@/views/operation/freeway/OverviewInfo.vue'
import CongestRoadSegInfo from '@/views/operation/freeway/CongestRoadSegInfo.vue'
import CongestTrend from '@/views/operation/freeway/CongestTrend.vue'
import NetworkLegend from "@/components/legend/NetworkLegend.vue";
import {useRouter} from "vue-router";

const overviewVisible = ref(false)
const congestRoadSegVisible = ref(false)
const congestTrendVisible = ref(false)
const {push} = useRouter();

onMounted(() => {
  init()
})

function init() {

}

function handleOverviewInfo() {
  overviewVisible.value = !overviewVisible.value
}

function handleCongestRoadSegInfo() {
  congestRoadSegVisible.value = !congestRoadSegVisible.value
}

function handleCongestTrend() {
  congestTrendVisible.value = !congestTrendVisible.value
}

function handleOperationDetail() {
  push('freewayNetwork/operationDetail')
}

</script>

<template>
  <div class="button-group-area">
    <el-button class="nav-button" size="large" @click="handleOverviewInfo" type="success">概览信息</el-button>
    <div v-show="overviewVisible">
      <OverviewInfo/>
    </div>
    <el-button class="nav-button" size="large" @click="handleCongestRoadSegInfo" type="success">拥堵信息</el-button>
    <div v-show="congestRoadSegVisible">
      <CongestRoadSegInfo/>
    </div>
    <el-button class="nav-button" size="large" @click="handleCongestTrend" type="success">拥堵趋势</el-button>
    <el-dialog
        v-model="congestTrendVisible"
        title="今日拥堵指数统计（1小时）"
        width="30%"
        :modal="false"
        destroy-on-close
    >
      <CongestTrend/>
    </el-dialog>
    <el-button class="nav-button" size="large" @click="handleOperationDetail" type="success">运行详情</el-button>
    <NetworkLegend/>
  </div>

</template>

<style scoped lang="scss">
.button-group-area {
  display: flex;
  flex-direction: column;
  margin: 15px 0 0 15px;
  width: 110px;
}

.nav-button {
  margin: 10px;
}
</style>