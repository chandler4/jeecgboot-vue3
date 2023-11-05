<template>
    <div>
        <div>
            baseInfo
        </div>

        <el-table :data="truckInfo.records || []" style="width: 100%">
            <el-table-column prop="licensePlate" label="车牌号" width="180" />
            <el-table-column prop="allowingWeight" label="载重" width="180" />
            <el-table-column prop="registrationDate" label="注册日期" width="180"/>
            <el-table-column prop="scrapDate" label="报废日期" width="180" />
            <el-table-column prop="driverName" label="驾驶员" width="180" />
        </el-table>

        <div class="toolbar" style="padding:10px;">
            <el-pagination layout="total, prev, pager, next, jumper" @current-change="refreshTruckPageRequest"
                           :current-page="truckPageRequest.pageNum" :page-size="truckPageRequest.pageSize" :total="truckInfo.total"
                           style="float:right;">
            </el-pagination>
        </div>

        <el-table :data="personInfo?.records || []" style="width: 100%">
            <el-table-column prop="name" label="姓名" width="180" />
            <el-table-column prop="sex" label="性别" width="180" />
            <el-table-column prop="telephone" label="电话" width="180"/>
            <el-table-column prop="code" label="编码" width="180" />
        </el-table>

        <div class="toolbar" style="padding:10px;">
            <el-pagination layout="total, prev, pager, next, jumper" @current-change="refreshPersonPageRequest"
                           :current-page="personPageRequest.pageNum" :page-size="personPageRequest.pageSize" :total="personInfo?.total || 0"
                           style="float:right;">
            </el-pagination>
        </div>

    </div>
</template>

<script>

  import { fetchEnterprises, fetchEnterprisePerson, fetchEnterpriseTrucks } from "@/api/business/transport/freight";

    export default {
      name: 'FreightEnterpriseDetailDialog',
      data() {
        return {
          personPageRequest: {
            pageNum: 1,
            pageSize: 10
          },
          personInfo: {records: [], total: 0},
          truckPageRequest: {
            pageNum: 1,
            pageSize: 10
          },
          truckInfo: {records: [], total: 0},
        }
      },
      props: ['enterpriseId', 'baseInfo'],
      watch: {
        enterpriseId: {
          immediate: true,
          handler: function(newValue, oldValue) {
            debugger;
            if (newValue !== oldValue) {
              this.reset();
              this.fetchDataById();
            }
          },
          deep: true
        }
      },
      methods: {
        reset() {
          this.personPageRequest = {
            pageNum: 1,
            pageSize: 10
          };
          this.personInfo = {records: [], total: 0};
          this.truckPageRequest = {
            pageNum: 1,
            pageSize: 10
          };
          this.truckInfo = {records: [], total: 0};
        },
        fetchDataById: function() {
            this.fetchTruckByPageRequest();
            this.fetchPersonByPageRequest();
        },
        fetchPersonByPageRequest: async function() {
            let res = await fetchEnterprisePerson({...this.personPageRequest, enterpriseId: this.enterpriseId});
            if (res) this.personInfo = res;
        },
        fetchTruckByPageRequest: async function() {
          let res = await fetchEnterpriseTrucks({...this.truckPageRequest, enterpriseId: this.enterpriseId});
          if (res) this.truckInfo = res;
        },
        refreshTruckPageRequest: function (pageNum) {
          this.truckPageRequest.pageNum = pageNum
          this.fetchTruckByPageRequest();
        },
        refreshPersonPageRequest: function (pageNum) {
          this.personPageRequest.pageNum = pageNum
          this.fetchPersonByPageRequest();
        },
      },
    }
</script>
