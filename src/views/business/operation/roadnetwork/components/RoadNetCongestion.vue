<template>
    <div class="road-net-list-search ">
        <el-row :gutter="10">
            <el-col :span="4">
                <el-input placeholder="请输入路段名称" v-model="search.section"></el-input>
            </el-col>
            <el-col :span="4">
                <el-date-picker v-model="search.date" type="date" placeholder="请选择日期" style="margin-right: 1.5rem;" />
                <!-- <el-input placeholder="请输入路段名称" :value="section"></el-input> -->
            </el-col>
            <el-col :span="4">
                <el-select placeholder="请选择拥堵等级" v-model="search.rank" style="width:100%;">
                    <el-option label="通畅" value="a1"></el-option>
                    <el-option label="拥堵" value="c1"></el-option>
                    <el-option label="严重拥堵" value="s1"></el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select placeholder="请选择统计周期" v-model="search.cycle" style="width:100%;">
                    <el-option label="间隔5分钟" value="a1"></el-option>
                    <el-option label="间隔15分钟" value="c2"></el-option>
                    <el-option label="间隔30分钟" value="s3"></el-option>
                    <el-option label="间隔50分钟" value="s4"></el-option>
                </el-select>
            </el-col>
            <el-col :span="7" :offset="1">
                <el-button style="width:4rem;" @click="reset">重置</el-button>
                <el-button type="primary" style="width:4rem;" @click="commit"> 查询</el-button>
                <el-button style="width:4rem;" @click="exportFile"> 导出</el-button>
            </el-col>
        </el-row>
    </div>
    <div class="road-net-list-table ">
        <el-table :data="source" stripe height="250" style="width: 100%">
            <el-table-column prop="code" label="路段编码" />
            <el-table-column prop="section" label="路段名称" />
            <el-table-column prop="level" label="路段等级" />
            <el-table-column prop="congestion" label="拥堵等级" />
            <el-table-column prop="driveLevel" label="行车等级" />
            <el-table-column prop="flow" label="交通流量" width="100" />
            <el-table-column prop="action" label="操作" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="handleClick(scope.row)">核实</el-button>
                    <el-button link type="primary" size="small" @click="showCCTV(scope.row)">周边监控</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

defineProps({
    source: Array<any>
})

const search = reactive({
    section: null,
    rank: null,
    date: null,
    cycle: null,
})
const reset = () => {
    search.section = null;
    search.rank = null;
    search.date = null;
    search.cycle = null;
}


const emit = defineEmits(["onSearch", 'export'])
defineExpose({
    reset
})
const commit = () => {
    emit('onSearch', search);
}
const exportFile = () => {
    emit('export', search);
}
const handleClick = (e) => {
    console.log(e);

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