<script setup lang="ts">
import {onMounted, ref} from "vue";

onMounted(() => {
  init()
})

function init() {

}

const congestRoadSegList = ref([{
  rank: 1,
  roadSegName: 'G103',
  speedAvg: 22.7,
  congestLength: 12
}, {
  rank: 2,
  roadSegName: 'G103',
  speedAvg: 22.7,
  congestLength: 12
}, {
  rank: 3,
  roadSegName: 'G103',
  speedAvg: 22.7,
  congestLength: 12
}, {
  rank: 4,
  roadSegName: 'G103',
  speedAvg: 22.7,
  congestLength: 12
}, {
  rank: 5,
  roadSegName: 'G103',
  speedAvg: 22.7,
  congestLength: 12
}, {
  rank: 6,
  roadSegName: 'G103',
  speedAvg: 22.7,
  congestLength: 12
}])
</script>

<template>
  <el-card class="card">
    <div class="titleFont">拥堵路段（Top6）</div>
    <el-table :data="congestRoadSegList" border stripe size="small">
      <el-table-column prop="rank" label="排名"/>
      <el-table-column prop="roadSegName" label="路段名称"/>
      <el-table-column prop="speedAvg" label="平均速度（km/h）"/>
      <el-table-column prop="congestLength" label="拥堵里程（km）"/>
    </el-table>
  </el-card>
</template>

<style scoped lang="scss">
.titleFont {
  color: #303133;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 12px;
}
</style>