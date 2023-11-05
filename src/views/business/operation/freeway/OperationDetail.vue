<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();

interface QueryParams {
  freewayName: string,
  date: Date,
  interval: string,
}

interface FreewayOperation {
  freewayCode: string,
  freewayName: string,
  congestLength: number,
  roadLength: number,
  speedAvg: number,
  congestState: number,
  managementUnit: string,
}

const congestTrendDialogVisible = ref(false)
const travelSpeedDialogVisible = ref(false)

const queryParams: QueryParams = reactive({
  freewayName: '',
  date: new Date(),
  interval: '',
})

const intervalOptions = ref([
  {
    label: '1小时',
    value: '1',
  },
  {
    label: '5小时',
    value: '2',
  },
  {
    label: '12小时',
    value: '3',
  },
  {
    label: '24小时',
    value: '4',
  },
])

onMounted(() => {
  init()
})

function init() {

}

const back = () => {
  router.back()
}

const freewayOperationList = ref([
  {
    freewayCode: 'G228',
    freewayName: '滨海绕城高速',
    congestLength: 12,
    roadLength: 30,
    speedAvg: 22.7,
    congestState: 3,
    managementUnit: 'A单位',
  },
  {
    freewayCode: 'G18',
    freewayName: '津石高速',
    congestLength: 12,
    roadLength: 30,
    speedAvg: 22.7,
    congestState: 2,
    managementUnit: 'A单位',
  },
  {
    freewayCode: 'G0111',
    freewayName: '秦滨高速',
    congestLength: 12,
    roadLength: 30,
    speedAvg: 22.7,
    congestState: 0,
    managementUnit: 'A单位',
  },
  {
    freewayCode: 'S027',
    freewayName: '京津高速',
    congestLength: 12,
    roadLength: 30,
    speedAvg: 22.7,
    congestState: 1,
    managementUnit: 'A单位',
  },])

const tableRowClassName = ({row}: { row: FreewayOperation }) => {
  if (row.congestState === 1) {
    return 'success-row'
  } else if (row.congestState === 2) {
    return 'warning-row'
  } else if (row.congestState === 3) {
    return 'danger-row'
  }
  return ''
}

const congestStateFormatter = (_: any, __: any, cellValue: any) => {
  if (cellValue === 1) {
    return '通畅'
  } else if (cellValue === 2) {
    return '预警'
  } else if (cellValue === 3) {
    return '拥堵'
  }
  return '—'
}

const handleCongestTrendDialog = () => {
  congestTrendDialogVisible.value = true
}

const handleTravelSpeedDialog = () => {
  travelSpeedDialogVisible.value = true
}

</script>

<template>
  <div class="display-area">
    <div class="title-area">
      <div style="align-items: center;color: #303133;font-size: 24px;font-weight: 700;">区域内高速路运行信息</div>
      <el-button size="large" type="success" @click="back">返回</el-button>
    </div>
    <el-card class="condition-area">
      <el-input v-model="queryParams.freewayName" placeholder="请输入高速名称" clearable class="block" size="large"/>
      <el-date-picker
          v-model="queryParams.date"
          type="datetime"
          format="YYYY/MM/DD HH:mm:ss"
          placeholder="请输入日期和时间"
          class="block"
          size="large"
          style="margin-left: 12px"
      />
      <el-select v-model="queryParams.interval" clearable placeholder="请选择时间间隔" class="block" size="large"
                 style="margin-left: 12px">
        <el-option
            v-for="item in intervalOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <div class="button-area">
        <el-button size="large">重置</el-button>
        <el-button size="large" type="success">查询</el-button>
        <el-button size="large" type="success">导出</el-button>
      </div>
    </el-card>
    <el-card class="detail-area">
      <div v-if="freewayOperationList.length === 0">
        <el-empty description="哎呦，没查到数据呐，亲"/>
      </div>
      <div v-if="freewayOperationList.length != 0">
        <el-table :data="freewayOperationList"
                  :row-class-name="tableRowClassName"
                  border>
          <el-table-column prop="freewayCode" label="高速编码"/>
          <el-table-column prop="freewayName" label="高速名称"/>
          <el-table-column prop="congestLength" label="拥堵里程（km）"/>
          <el-table-column prop="roadLength" label="道路长度（km）"/>
          <el-table-column prop="speedAvg" label="平均速度（km/h）"/>
          <el-table-column prop="congestState" :formatter="congestStateFormatter" label="拥堵状态"/>
          <el-table-column prop="managementUnit" label="管理单位"/>
          <el-table-column label="操作" width="220" fixed="right" align="center">
            <el-button size="small" type="primary" @click="handleCongestTrendDialog"
            >拥堵趋势
            </el-button
            >
            <el-button size="small" type="primary" @click="handleTravelSpeedDialog"
            >行程速度统计
            </el-button
            >
          </el-table-column>
        </el-table>
        <div class="pagination-area">
          <el-pagination background layout="prev, pager, next" :total="100"/>
        </div>
      </div>
    </el-card>
  </div>
  <el-dialog
      v-model="congestTrendDialogVisible"
      title="拥堵趋势"
      width="50%"
      :modal="false"
      destroy-on-close
  >

  </el-dialog>
  <el-dialog
      v-model="travelSpeedDialogVisible"
      title="行程速度统计"
      width="50%"
      :modal="false"
      destroy-on-close
  >

  </el-dialog>
</template>

<style lang="scss">
.display-area {
  display: flex;
  flex-direction: column;
  padding: 15px;

  .title-area {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
  }

  .condition-area {
    height: 80px;

    .block {
      width: 25%;
    }

    .button-area {
      float: right;
    }
  }

  .detail-area {
    margin-top: 10px;

    .pagination-area {
      float: right;
      margin: 10px 0
    }
  }
}

.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-7);
}

.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-7);
}

.el-table .danger-row {
  --el-table-tr-bg-color: var(--el-color-danger-light-7);
}
</style>