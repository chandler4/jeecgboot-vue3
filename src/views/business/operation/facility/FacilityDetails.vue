<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";

interface QueryParams {
  facilityName: string,
  facilityType: string,
}

const isEmpty = ref(false)
const monitorDetailDialogVisible = ref(false)
const monitorVideoDialogVisible = ref(false)

const queryParams: QueryParams = reactive({
  facilityName: '',
  facilityType: '',
})

const facilityOptions = ref([
  {
    label: '桥梁',
    value: '1',
  },
  {
    label: '隧道',
    value: '2',
  },
])

onMounted(() => {
  init()
})

function init() {

}

const freewayOperationList = ref([
  {
    facilityCode: 'X123',
    facilityName: '海河隧道',
    facilityType: 1,
    state: 1,
    operationState: 1,
    trafficState: 1,
    managementUnit: 'A单位',
  },
  {
    facilityCode: 'X133',
    facilityName: ' 海河大桥',
    facilityType: 1,
    state: 2,
    operationState: 2,
    trafficState: 2,
    managementUnit: 'B单位',
  },
  {
    facilityCode: 'X143',
    facilityName: '永定新河特大桥（绕城段）',
    facilityType: 1,
    state: 1,
    operationState: 1,
    trafficState: 1,
    managementUnit: 'C单位',
  },
  {
    facilityCode: 'X153',
    facilityName: '永定新河特大桥（长深高速段）',
    facilityType: 1,
    state: 2,
    operationState: 2,
    trafficState: 3,
    managementUnit: 'D单位',
  },
])

const facilityTypeFormatter = (_: any, __: any, cellValue: number) => {
  if (cellValue === 1) {
    return '桥梁'
  } else if (cellValue === 2) {
    return '隧道'
  }
  return ''
}

const stateFormatter = (value: number) => {
  if (value === 1) {
    return '运行'
  } else if (value === 2) {
    return '封闭'
  }
  return ''
}

const operationStateFormatter = (value: number) => {
  if (value === 1) {
    return '正常'
  } else if (value === 2) {
    return '异常'
  }
  return ''
}

const trafficStateTagClass = (value: number) => {
  if (value === 1) {
    return 'success'
  } else if (value === 2) {
    return 'warning'
  } else if (value === 3) {
    return 'danger'
  }
  return ''
}

const trafficStateFormatter = (value: number) => {
  if (value === 1) {
    return '通畅'
  } else if (value === 2) {
    return '预警'
  } else if (value === 3) {
    return '拥堵'
  }
  return ''
}

const handleMonitorDetailDialog = () => {
  monitorDetailDialogVisible.value = true
}

const handleMonitorVideoDialog = () => {
  monitorVideoDialogVisible.value = true
}

</script>

<template>
  <div class="display-area">
    <el-card class="condition-area">
      <el-input v-model="queryParams.facilityName" placeholder="请输入设施名称" clearable class="block" size="large"/>
      <el-select v-model="queryParams.facilityType" clearable placeholder="请选择设施类型" class="block" size="large"
                 style="margin-left: 12px">
        <el-option
            v-for="item in facilityOptions"
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
      <div v-if="isEmpty">
        <el-empty description="哎呦，没查到数据呐，亲"/>
      </div>
      <div v-if="!isEmpty">
        <el-table :data="freewayOperationList"
                  border>
          <el-table-column prop="facilityCode" label="设施编码"/>
          <el-table-column prop="facilityName" label="设施名称" width="200" show-overflow-tooltip/>
          <el-table-column prop="facilityType" :formatter="facilityTypeFormatter" label="设施类型"/>
          <el-table-column prop="state" label="当前状态">
            <template #default="scope">
              <el-tag :type="scope.row.state === 1 ? 'success' : 'danger'" disable-transitions
              >
                <div v-html="stateFormatter(scope.row.state)"></div>
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="operationState" label="运行状态">
            <template #default="scope">
              <el-tag :type="scope.row.operationState === 1 ? 'success' : 'danger'" disable-transitions
              >
                <div v-html="operationStateFormatter(scope.row.operationState)"></div>
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="trafficState" label="当前交通状态">
            <template #default="scope">
              <el-tag :type="trafficStateTagClass(scope.row.trafficState)" disable-transitions
              >
                <div v-html="trafficStateFormatter(scope.row.trafficState)"></div>
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="managementUnit" label="管理单位"/>
          <el-table-column label="操作" width="200" fixed="right" align="center">
            <el-button size="small" type="primary" @click="handleMonitorDetailDialog"
            >监测详情
            </el-button>
            <el-button size="small" type="primary" @click="handleMonitorVideoDialog"
            >监控视频
            </el-button>
          </el-table-column>
        </el-table>
        <div class="pagination-area">
          <el-pagination background layout="prev, pager, next" :total="100"/>
        </div>
      </div>
    </el-card>
  </div>
  <el-dialog
      v-model="monitorDetailDialogVisible"
      title="监测详情"
      width="40%"
      :modal="false"
      destroy-on-close
  >

  </el-dialog>
  <el-dialog
      v-model="monitorVideoDialogVisible"
      title="监控视频"
      width="40%"
      :modal="false"
      destroy-on-close
  >

  </el-dialog>
</template>

<style scoped lang="scss">
.display-area {
  display: flex;
  flex-direction: column;

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
</style>