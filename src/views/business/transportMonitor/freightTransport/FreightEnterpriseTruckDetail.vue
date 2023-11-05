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

    </div>
</template>

<script>

  import { fetchEnterpriseTrucks } from "@/api/business/transport/freight";

    export default {
      name: 'FreightEnterpriseTruckDetail',
      data() {
        return {
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
          this.truckPageRequest = {
            pageNum: 1,
            pageSize: 10
          };
          this.truckInfo = {records: [], total: 0};
        },
        fetchDataById: function() {
            this.fetchTruckByPageRequest();
        },
        fetchTruckByPageRequest: async function() {
          let res = await fetchEnterpriseTrucks({...this.truckPageRequest, enterpriseId: this.enterpriseId});
          if (res) this.truckInfo = res;
        },
        refreshTruckPageRequest: function (pageNum) {
          this.truckPageRequest.pageNum = pageNum
          this.fetchTruckByPageRequest();
        },
      },
    }
</script>
