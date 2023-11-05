<script setup lang="ts">
import {computed, onBeforeMount, reactive, ref} from "vue";

interface FacilityInfo {
  facilityLocation?: string,
  facilityType?: number,
  facilityDesignLife?: number,
  facilityBuiltDate?: string,
  structureType?: string,
  technicalGrade?: number,
}

interface Patrol {
  patrolDate: string,
  patrolResult: number,
  patrolUser: string,
}

interface Upkeep {
  upkeepDate: string,
  upkeepResult: number,
  upkeepUser: string,
}

interface Assess {
  assessDate: string,
  assessResult: number,
  assessUser: string,
}

const defaultTab = ref('patrol')
let facilityInfo: FacilityInfo = reactive({})
const monitorDetailDialogVisible = ref(false)
let patrolList: Patrol[] = reactive([])
let upkeepList: Upkeep[] = reactive([])
let assessList: Assess[] = reactive([])

onBeforeMount(() => {
  init()
})

function init() {
  facilityInfo = {
    facilityLocation: '天津市滨海新区海门大桥',
    facilityType: 1,
    facilityDesignLife: 30,
    facilityBuiltDate: '2023/10/01',
    structureType: '悬索',
    technicalGrade: 1,
  }

  patrolList = [
    {
      patrolDate: '2023/09/01',
      patrolResult: 1,
      patrolUser: '张三',
    },
    {
      patrolDate: '2023/09/02',
      patrolResult: 2,
      patrolUser: '李四',
    },
    {
      patrolDate: '2023/09/03',
      patrolResult: 3,
      patrolUser: '王五',
    },
  ]
}

const resultFormatter = (value: number) => {
  if (value === 1) {
    return '正常'
  } else if (value === 2) {
    return '异常'
  }
  return '未知'
}

const handleMonitorDetailDialog = () => {
  monitorDetailDialogVisible.value = true
}

const handleTabChange = (tabName: string) => {
  if (tabName === 'patrol') {
    patrolList = [
      {
        patrolDate: '2023/09/01',
        patrolResult: 1,
        patrolUser: '张三',
      },
      {
        patrolDate: '2023/09/02',
        patrolResult: 2,
        patrolUser: '李四',
      },
      {
        patrolDate: '2023/09/03',
        patrolResult: 3,
        patrolUser: '王五',
      },
    ]
  } else if (tabName === 'upkeep') {
    upkeepList = [
      {
        upkeepDate: '2023/10/01',
        upkeepResult: 1,
        upkeepUser: '大哥',
      },
      {
        upkeepDate: '2023/10/02',
        upkeepResult: 2,
        upkeepUser: '二哥',
      },
      {
        upkeepDate: '2023/10/03',
        upkeepResult: 3,
        upkeepUser: '老六',
      },
    ]
  } else if (tabName === 'assess') {
    assessList = [
      {
        assessDate: '2023/11/01',
        assessResult: 1,
        assessUser: '老赵',
      },
      {
        assessDate: '2023/11/02',
        assessResult: 2,
        assessUser: '老吴',
      },
      {
        assessDate: '2023/11/03',
        assessResult: 3,
        assessUser: '老刘',
      },
    ]
  }

}

const facilityTypeFormatter = computed(() => {
  if (facilityInfo.facilityType === 1) {
    return '桥梁'
  } else if (facilityInfo.facilityType === 2) {
    return '隧道'
  }
  return '未知'
})

const technicalGradeTagType = computed(() => {
  if (facilityInfo.technicalGrade === 1) {
    return 'success'
  } else if (facilityInfo.technicalGrade === 2) {
    return ''
  } else if (facilityInfo.technicalGrade === 3) {
    return 'info'
  } else if (facilityInfo.technicalGrade === 4) {
    return 'warning'
  } else if (facilityInfo.technicalGrade === 5) {
    return 'danger'
  }
})


const technicalGradeFormatter = computed(() => {
  if (facilityInfo.technicalGrade === 1) {
    return '一级'
  } else if (facilityInfo.technicalGrade === 2) {
    return '二级'
  } else if (facilityInfo.technicalGrade === 3) {
    return '三级'
  } else if (facilityInfo.technicalGrade === 4) {
    return '四级'
  } else if (facilityInfo.technicalGrade === 5) {
    return '五级'
  }
})

</script>

<template>
  <div class="display-area">
    <el-card class="condition-area">
      <el-descriptions
          :column="9"
          size="large"
      >
        <el-descriptions-item label="设施位置：" :span="3">{{ facilityInfo.facilityLocation }}</el-descriptions-item>
        <el-descriptions-item label="设施类型：">{{ facilityTypeFormatter }}</el-descriptions-item>
        <el-descriptions-item label="设施设计年限：">{{ facilityInfo.facilityDesignLife + '年' }}</el-descriptions-item>
        <el-descriptions-item label="建成时间：">{{ facilityInfo.facilityBuiltDate }}</el-descriptions-item>
        <el-descriptions-item label="结构类型：">{{ facilityInfo.structureType }}</el-descriptions-item>
        <el-descriptions-item label="技术状态：">
          <el-tag :type="technicalGradeTagType" disable-transitions size="large">
            {{ technicalGradeFormatter }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card class="detail-area">
      <el-tabs v-model="defaultTab" @tab-change="handleTabChange">
        <el-tab-pane label="巡查记录" name="patrol">
          <div v-if="patrolList.length === 0">
            <el-empty description="哎呦，没查到数据呐，亲"/>
          </div>
          <div v-if="patrolList.length !=0">
            <el-table :data="patrolList"
                      border>
              <el-table-column prop="patrolDate" label="巡检日期"/>
              <el-table-column prop="patrolResult" label="巡检结果">
                <template #default="scope">
                  <el-tag :type="scope.row.patrolResult === 1 ? 'success' : 'danger'" disable-transitions>
                    <div v-html="resultFormatter(scope.row.patrolResult)"></div>
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="patrolUser" label="巡查人员"/>
              <el-table-column label="操作" fixed="right" align="center" width="100">
                <el-button size="small" type="primary" @click="handleMonitorDetailDialog"
                >详情
                </el-button>
              </el-table-column>
            </el-table>
            <div class="pagination-area">
              <el-pagination background layout="prev, pager, next" :total="100"/>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="维护记录" name="upkeep">
          <div v-if="upkeepList.length === 0">
            <el-empty description="哎呦，没查到数据呐，亲"/>
          </div>
          <div v-if="upkeepList.length !=0">
            <el-table :data="upkeepList"
                      border>
              <el-table-column prop="upkeepDate" label="巡检日期"/>
              <el-table-column prop="upkeepResult" label="巡检结果">
                <template #default="scope">
                  <el-tag :type="scope.row.upkeepResult === 1 ? 'success' : 'danger'" disable-transitions
                  >
                    <div v-html="resultFormatter(scope.row.upkeepResult)"></div>
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="upkeepUser" label="巡查人员"/>
              <el-table-column label="操作" fixed="right" align="center" width="100">
                <el-button size="small" type="primary" @click="handleMonitorDetailDialog"
                >详情
                </el-button>
              </el-table-column>
            </el-table>
            <div class="pagination-area">
              <el-pagination background layout="prev, pager, next" :total="100"/>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="评定记录" name="assess">
          <div v-if="assessList.length === 0">
            <el-empty description="哎呦，没查到数据呐，亲"/>
          </div>
          <div v-if="assessList.length !=0">
            <el-table :data="assessList"
                      border>
              <el-table-column prop="assessDate" label="巡检日期"/>
              <el-table-column prop="assessResult" label="巡检结果">
                <template #default="scope">
                  <el-tag :type="scope.row.assessResult === 1 ? 'success' : 'danger'" disable-transitions
                  >
                    <div v-html="resultFormatter(scope.row.assessResult)"></div>
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="assessUser" label="巡查人员"/>
              <el-table-column label="操作" fixed="right" align="center" width="100">
                <el-button size="small" type="primary" @click="handleMonitorDetailDialog"
                >详情
                </el-button>
              </el-table-column>
            </el-table>
            <div class="pagination-area">
              <el-pagination background layout="prev, pager, next" :total="100"/>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>


    </el-card>
  </div>
  <el-dialog
      v-model="monitorDetailDialogVisible"
      title="详情"
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
    //height: 80px;

    .block {
      width: 25%;
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