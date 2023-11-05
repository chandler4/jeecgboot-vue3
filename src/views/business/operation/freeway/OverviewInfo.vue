<script setup lang="ts">
import {onMounted, ref} from "vue";

onMounted(() => {
  init()
})

function init() {

}

const info = ref({
  totalLength: 4000,
  congestLength: 30,
  closeLength: 15,
  freewayEntrance: 30,
  freewayExit: 12,
  trafficIndex: 1.72,
  accessLevel: '通畅'
})
</script>

<template>
  <el-card class="card">
    <el-descriptions
        title="区域内高速概览信息"
        :column="2"
        border
    >
      <el-descriptions-item label="总里程（km）" :span="2">{{ info.totalLength }}
      </el-descriptions-item>
      <el-descriptions-item label="拥堵里程（km）" :span="2">{{ info.congestLength }}</el-descriptions-item>
      <el-descriptions-item label="封闭里程（km）" :span="2">{{ info.closeLength }}</el-descriptions-item>
      <el-descriptions-item label="高速入口">{{ info.freewayEntrance }}</el-descriptions-item>
      <el-descriptions-item label="高速出口">{{ info.freewayExit }}</el-descriptions-item>
      <el-descriptions-item label="交通指数">{{ info.trafficIndex }}</el-descriptions-item>
      <el-descriptions-item label="通行等级">{{ info.accessLevel }}</el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<style lang="scss">
.card {
  margin-left: 10px;
  width: 400px;
  height: 320px;
}
</style>