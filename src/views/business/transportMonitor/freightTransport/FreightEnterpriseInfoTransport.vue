<template>
    <div>
        企业信息
    </div>
    <div class="truck-table">
        <el-table :data="enterprises" style="width: 100%">
            <el-table-column prop="enterpriseName" label="企业名称" width="180" />
            <el-table-column prop="address" label="企业地址" width="180"/>
            <el-table-column prop="enterpriseAttribute" label="企业性质" width="180" />
            <el-table-column prop="registerTruckCount" label="注册车辆" width="180"/>
            <el-table-column prop="enterprisePersonCount" label="注册人员" width="180" />
            <el-table-column prop="operationsPualificationNumber" label="企业资质证" width="180" />
            <el-table-column prop="operationsPualificationDeadline" label="企业资质到期日期" width="180"/>
            <el-table-column align="right" label="操作">
                <template #default="scope">
                    <el-button size="small" @click="handleEnterpriseTruckDetail(scope.$index, scope.row)"
                    >货车信息</el-button
                    >
                    <el-button size="small" @click="handleEnterprisePersonDetail(scope.$index, scope.row)"
                    >人员信息</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
  export default {
    name: 'FreightEnterpriseInfoTransport',

    data() {
      return {
      }
    },
    props: ['enterprises'],
    emits: ['handleEnterpriseTruckDetail', 'handleEnterprisePersonDetail'],
    methods: {
      init: function(){
      },
      handleEnterpriseTruckDetail: function(index, value) {
        debugger;
        this.$emit('handleEnterpriseTruckDetail', value.enterpriseId);
      },
      handleEnterprisePersonDetail: function(index, value) {
        debugger;
        this.$emit('handleEnterprisePersonDetail', value.enterpriseId);
      }
    },
    mounted() {
      this.init();
    },
  }

</script>

<style lang="scss" scoped>
</style>
