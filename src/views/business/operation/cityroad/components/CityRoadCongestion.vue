<template>
    <div class="city-road-congestion-panel ">
        <div class="congestion-row header">
            <div class="congestion-info">拥堵信息</div>
            <div class="congestion-rule">
                <!-- @change="$emit('update:selected', $event.target.value)" -->
                <el-radio-group v-model="counter" @change="radioChange">
                    <el-radio :label="1">严重</el-radio>
                    <el-radio :label="2">中度</el-radio>
                    <el-radio :label="3">轻度</el-radio>
                </el-radio-group>
            </div>
        </div>
        <div class="congestion-row">
            <el-table :data="source" stripe height="250" style="width: 100%">
                <el-table-column prop="section" label="路段名称" />
                <el-table-column prop="speed" label="速度(km/h)" width="100" />
                <el-table-column prop="length" label="拥堵长度(m)" width="120" />
            </el-table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';

const prop = defineProps({
    source: Array<any>,
    selected: Number
})
const emit = defineEmits(['update:selected'])
const counter = ref(prop.selected)

watchEffect(() => {

})
function radioChange(newValue: Number) {
    emit('update:selected', newValue)
}

</script>

<style>
.city-road-congestion-panel {
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 4px;
    color: rgb(255, 255, 255);
    width: 20rem;

}

.congestion-row {
    padding: 0.5rem;
}

.congestion-info {
    font-size: 1.2rem;
    margin-left: 5%;
    width: 35%;
}

.header {
    display: flex;
    flex-direction: row;
}

.congestion-rule {
    width: 70%;
    font-size: 1rem;


}

.el-radio {
    margin-right: 0.4rem;
}
</style>