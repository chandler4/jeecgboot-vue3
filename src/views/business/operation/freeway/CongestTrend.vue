<script setup lang="ts">
import {ref, computed, onMounted} from 'vue'

onMounted(() => {
  init()
})

function init() {

}

const data = ref([
  {time: '00', congestIndex: 8.3},
  {time: '01', congestIndex: 1.3},
  {time: '02', congestIndex: 1.8},
  {time: '03', congestIndex: 6.3},
  {time: '04', congestIndex: 1.3},
  {time: '05', congestIndex: 2.3},
  {time: '06', congestIndex: 1.3},
  {time: '07', congestIndex: 4.3},
  {time: '08', congestIndex: 11.3},
  {time: '09', congestIndex: 3.3},
  {time: '10', congestIndex: 1.3},
  {time: '11', congestIndex: 1.3},
  {time: '12', congestIndex: 6.3},
  {time: '13', congestIndex: 1.3},
  {time: '14', congestIndex: 4.3},
  {time: '15', congestIndex: 5.3},
  {time: '16', congestIndex: 1.3},
  {time: '17', congestIndex: 10.3},
  {time: '18', congestIndex: 1.3},
  {time: '19', congestIndex: 2.3},
  {time: '20', congestIndex: 1.3},
  {time: '21', congestIndex: 3.3},
]);

const option = computed(() => {
  return {
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: data.value.map(e => e.time + '时'),

    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '拥堵指数',
        data: data.value.map(e => e.congestIndex),
        type: 'line',
        smooth: true
      }
    ]
  }
});
</script>

<template>
  <v-charts :init-options="{height:300, width:500}" :option="option"/>
</template>

<style scoped lang="scss">

</style>