<template>
    <div class="road-net-list-search ">
        <el-row :gutter="10">
            <el-col span="4">
                <el-input placeholder="请输入路段名称" v-model="search.section"></el-input>
            </el-col>
            <el-col span="4">
                <el-select placeholder="请选择"  v-model="search.rank" style="width:100%;">
                    <el-option label="通畅" value="a1"></el-option>
                    <el-option label="拥堵" value="c1"></el-option>
                    <el-option label="严重拥堵" value="s1"></el-option>
                </el-select>
            </el-col>
            <el-col :span="8" :offset="1">
                <el-button style="width:4rem;" @click="reset">重置</el-button>
                <el-button type="primary" style="width:4rem;" @click="commit"> 查询</el-button>
                <el-button style="width:4rem;" @click="exportFile">导出</el-button>
            </el-col>
        </el-row>
    </div>
    <div class="road-net-list-table ">
        <el-table :data="source" stripe height="250" style="width: 100%">
            <el-table-column prop="section" label="路段名称" />
            <el-table-column prop="status" label="交通状态" />
            <el-table-column prop="speed" label="平均速度" width="100" />
            <el-table-column prop="length" label="拥堵里程" width="120" />
        </el-table>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
const search = reactive({
    section: null,
    rank: null
})

defineProps({
    source: Array<any>
})
const reset=()=>{
    search.section = null;
    search.rank = null;
}
defineExpose({
    reset
})
const emit = defineEmits(["onSearch", 'export'])

const commit = () => {
    emit('onSearch', search);
}
const exportFile = () => {
    emit('export', search);
}

</script>

<style></style>