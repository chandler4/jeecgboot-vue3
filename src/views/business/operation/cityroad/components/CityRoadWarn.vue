<template>
    <div class="city-road-warm-panel ">
        <div class="warm-row">
            <div class="warm-info">拥堵预警列表</div>
            <div class="warm-rule">

            </div>
        </div>
        <div class="warm-row">
            <el-table :data="source" stripe height="250" style="width: 100%">
                <el-table-column prop="section" label="路段名称"   />
                <el-table-column prop="duration" label="拥堵持续时间(min)" width="90" />
                <el-table-column prop="status" label="拥堵类型" :formatter="statusFormatter"  width="60" />
                <el-table-column prop="index" label="拥堵指数"   width="60"/>
            </el-table>
        </div>
    </div>
</template>

<script setup lang="ts">


defineProps(['source'])
const statusFormatter = (row: any) => {
    let result = "通畅";
    switch (row.status) {
        case 1:
            result = "通畅";
            break
        case 2:
            result = "拥堵";
            break
        case 3:
            result = "严重拥堵";
            break
        default:
            result = "通畅";

    }
    return result;
}
</script>

<style>
.city-road-warm-panel {
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 4px;
    color: rgb(255, 255, 255);
    width: 20rem;

}

.warm-row {
   padding: 0.5rem;
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