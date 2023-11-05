<template>
    <div>
        <div>
            baseInfo
        </div>

        <el-table :data="truckInfo.records || []" style="width: 100%">
            <el-table-column prop="lineName" label="道路" width="180" />
            <el-table-column prop="pathName" label="路段" width="180" />
            <el-table-column prop="totalCount" label="总量" width="180"/>
            <el-table-column prop="crossCount" label="过境量" width="180" />
            <el-table-column prop="bizTime" label="经过时间" width="180" />
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

  import { queryTrucksPathInfo } from "@/api/business/transport/freight";

    export default {
      name: 'FreightTruckPathDetail',
      data() {
        return {
          truckPageRequest: {
            pageNum: 1,
            pageSize: 10
          },
          truckInfo: {records: [], total: 0},
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
          let res = await queryTrucksPathInfo();
          if (res) this.truckInfo = res;
        },
        refreshTruckPageRequest: function (pageNum) {
          this.truckPageRequest.pageNum = pageNum
          this.fetchTruckByPageRequest();
        },
      },
      mounted() {
        this.fetchDataById();
      }
    }
</script>
