<script setup lang="ts">
import {reactive, ref} from "vue";
import FacilityDetail from "@/views/operation/facility/FacilityDetails.vue";
import FacilityInfo from "@/views/operation/facility/FacilityInfo.vue";

interface QueryParams {
  facilityType: string,
}

const queryParams: QueryParams = reactive({
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

const facilityDetailDialogVisible = ref(false)
const facilityInfoDialogVisible = ref(false)
const facilityName = ref('海门大桥')

const handleFacilityDetailDialog = () => {
  facilityDetailDialogVisible.value = true
}

const handleFacilityInfoDialog = () => {
  facilityInfoDialogVisible.value = true
}
</script>

<template>
  <div class="title-area">
    <el-select v-model="queryParams.facilityType" clearable placeholder="请选择设施类型" style="align-items: center;"
               size="large"
    >
      <el-option
          v-for="item in facilityOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
      />
    </el-select>
    <!--  临时按钮  -->
    <el-button size="large" @click="handleFacilityInfoDialog" type="success">设施信息
    </el-button>
    <el-button size="large" @click="handleFacilityDetailDialog" type="success" style="margin-right: 25px">重点设施列表
    </el-button>

  </div>
  <el-dialog
      v-model="facilityDetailDialogVisible"
      title="区域内重点设施列表"
      width="70%"
      :modal="false"
      destroy-on-close
  >
    <FacilityDetail/>
  </el-dialog>
  <el-dialog
      v-model="facilityInfoDialogVisible"
      :title="facilityName + '信息'"
      width="70%"
      :modal="false"
      destroy-on-close
  >
    <FacilityInfo/>
  </el-dialog>
</template>

<style lang="scss">
.title-area {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 25px 0 0 25px;
}

.el-dialog__body {
  padding: 12px;
}
</style>