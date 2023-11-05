<template>
    <div class="control-panel city-road-button-group" style="left: 0.333rem; top:4rem;">
        <el-button type="primary" class="city-road-button" @click="router.back()">返回</el-button>
    </div>
    <div class="control-panel control-other-button">
        <el-button type="primary" class="city-road-button" @click="areaVisible = !areaVisible">显示列表</el-button>
        <el-button type="primary" class="city-road-button" @click="showDialog">添加重点区域</el-button>
    </div>
    <el-dialog title="新增重点区域"   @close="reset" v-model="renderVisible" width="45%">
        <div class="el-cust-dialog-contentbox" style="width: 95%;">
            <el-form :model="form" label-width="80px">
                <el-form-item label="区域名称">
                    <el-input v-model="form.name" placeholder="请输入名称" />
                </el-form-item>
                <el-form-item label="区域类型">
                    <el-radio-group v-model="form.resource">
                        <el-radio label="学校" />
                        <el-radio label="医院" />
                        <el-radio label="车站" />
                        <el-radio label="重大活动场所" />
                        <el-radio label="景区" />
                        <el-radio label="其他" />
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="区域范围">
                    <el-tag v-for="tag in form.region" :key="tag" class="mx-1" closable :disable-transitions="false"
                        @close="handleClose(tag)">
                        {{ tag }}
                    </el-tag>
                    <el-button class="button-new-tag ml-1" size="small">
                        + 新增
                    </el-button>
                </el-form-item>


                <el-form-item label="备注">
                    <el-input v-model="form.desc" type="textarea" />
                </el-form-item>
            </el-form>
        </div>
        <template #footer>
            <div class="dialog-footer">

                <el-button type="primary" @click="renderVisible = false">
                    确认
                </el-button>
                <el-button @click="renderVisible = false">取消</el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog title="重点监控区域列表" v-model="areaVisible" width="35%">
        <div class="el-cust-dialog-contentbox">
            <el-table :data="tableData" stripe height="250" style="width: 100%">
                <el-table-column prop="area" label="区域名称" width="120" center />
                <el-table-column prop="type" label="区域类型" width="80" />
                <el-table-column prop="status" label="交通状态" :formatter="statusFormatter" />
                <el-table-column prop="avg" label="平均交通流量" />
            </el-table>
        </div>

    </el-dialog>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, reactive } from 'vue';
import { PolygonDraw } from 'bmap-draw';

window.bMapReady.then(({scene}) => {

	const polygon = new PolygonDraw(scene, {
			hideTip: true, // 隐藏绘制提示
			isOpen: true,
			labelOptions: {
					borderRadius: '2px',
					background: '#b5d3fb',
					border: '1px solid #b5d3fb',
					color: '#333',
					fontSize: '12px',
					letterSpacing: '0',
					padding: '5px'
			},
			baseOpts: {
					fillColor: '#fff',
					strokeWeight: 5,
					strokeOpacity: 1,
					fillOpacity: 0.2
			}
	});
})


const router = useRouter();
const renderVisible = ref(false);
const areaVisible = ref(false);
const form = reactive({
    name: '',
    region: [],
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '学校',
    desc: '',
})
const showDialog = () => {
    renderVisible.value = true
}
const reset = () => {
    form.name = '';
    form.region = [];
    form.date1 = '';
    form.date2 = '';
    form.delivery = false;
    form.type = [];
    form.resource = '学校';
    form.desc = '';
}



const tableData = [
    {
        area: '塘沽站',
        type: '车站',
        status: 1,
        avg: '45km/h',
    },
    {
        area: '大沽口博物馆',
        type: '景点',
        status: 2,
        avg: '45km/h',
    },
    {
        area: '四十四中学',
        type: '学校',
        status: 3,
        avg: '45km/h',
    },
    {
        area: '天津市人民医院',
        type: '医院',
        status: '2',
        avg: '45km/h',
    },
]
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
const handleClose=(tag:any)=>{
    form.region.splice(tag, 1)
}
</script>

<style>
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

.mx-1 {
    margin-right: 0.4rem;
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
    display: absolute;
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