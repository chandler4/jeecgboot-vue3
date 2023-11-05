<template>
    <div class="road-net-list-search ">
        <el-row :gutter="10">
            <el-col :span="4">
                <el-input placeholder="请输入路段名称" v-model="search.section"></el-input>
            </el-col>
            <el-col :span="8">
                <el-date-picker v-model="search.dateRange" type="daterange" range-separator="至" start-placeholder="起始日期"
                    end-placeholder="结束日期" />
            </el-col>
            <el-col :span="4">
                <el-select placeholder="请选择上报平台" v-model="search.platform" style="width:100%;">
                    <el-option label="百度地图" value="a1"></el-option>
                    <el-option label="高德地图" value="a2"></el-option>
                    <el-option label="腾讯地图" value="a3"></el-option>
                    <el-option label="滴滴出行" value="a4"></el-option>
                    <el-option label="哈罗单车" value="a5"></el-option>
                </el-select>
            </el-col>
            <el-col :span="7" :offset="1">
                <el-button style="width:4rem;" @click="reset">重置</el-button>
                <el-button type="primary" style="width:4rem;" @click="commit"> 查询</el-button>
                <el-button style="width:4rem;" @click="exportFile">导出</el-button>
            </el-col>
        </el-row>
    </div>
    <div class="road-net-list-table ">
        <el-table :data="source" stripe height="250" style="width: 100%">
            <el-table-column prop="code" label="路段编码" width="60" />
            <el-table-column prop="section" label="路段名称" />
            <el-table-column prop="type" label="事件类型" width="60" />
            <el-table-column prop="uploadtime" label="上报日期" width="120" />
            <el-table-column prop="platform" label="上报平台" width="60" />
            <el-table-column prop="check" label="核实状态" width="60" />
            <el-table-column prop="effect" label="影响状态" width="60" />
            <el-table-column prop="position" label="事件位置" />
            <el-table-column prop="manager" label="管理单位" width="100" />
            <el-table-column prop="action" label="操作" width="120">
                <template #default="scope">
                    
                    <el-button link type="primary" size="small" @click="showCCTV(scope.row)">周边监控</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue';

defineProps({
    source: Array<any>,
})
const emit = defineEmits(["onSearch", 'export'])

const reset = () => {
    search.section = null;
    search.platform = null;
    search.dateRange = [null, null];
}
defineExpose({
    reset
})
const search = reactive({
    section: null,
    platform: null,
    dateRange: [null, null],
})
const commit = () => {
    emit('onSearch', search);
}
const exportFile = () => {
    emit('export', search);
}

const showCCTV = (e) => {
    console.log(e);

}
</script>

<style>
.el-date-editor.el-input,
.el-date-editor.el-input__wrapper {
    width: 100%;
}
</style>