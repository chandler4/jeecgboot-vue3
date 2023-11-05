<template>
    <div>

        <el-table :data="details.records || []" style="width: 100%">
            <el-table-column prop="deviceId" label="ID" width="180" />
            <el-table-column prop="bizTime" label="最新统计时间" width="180" />
            <el-table-column prop="status" label="在线状态" width="180"/>
            <el-table-column prop="integrity" label="完整性" width="180" />
            <el-table-column prop="abnormality" label="异常性" width="180" />
            <el-table-column prop="immediacy" label="及时性" width="180" />
            <el-table-column prop="totalRecordCount" label="总记录数" width="180" />
            <el-table-column prop="wrongRecordCount" label="错误记录数" width="180" />
        </el-table>

        <div class="toolbar" style="padding:10px;">
            <el-pagination layout="total, prev, pager, next, jumper" @current-change="refreshTruckPageRequest"
                           :current-page="pageRequest.pageNum" :page-size="pageRequest.pageSize" :total="details.total"
                           style="float:right;">
            </el-pagination>
        </div>

    </div>
</template>

<script>

  import { queryDeviceInfo } from "@/api/transport/overload";
  import { ElMessage } from 'element-plus';

    export default {
      name: 'FreightOverloadDeviceDetail',
      data() {
        return {
          pageRequest: {
            pageNum: 1,
            pageSize: 10
          },
          details: {records: [], total: 0}
        }
      },
      methods: {
        reset() {
          this.pageRequest = {
            pageNum: 1,
            pageSize: 10
          };
        },
        fetchData: function() {
            this.fetchDetails();
        },
        fetchDetails: async function() {
          let res = await queryDeviceInfo({...this.pageRequest});
          if (res) this.details = res;
          console.log(this.details);
        },
        refreshPageRequest: function (pageNum) {
          this.pageRequest.pageNum = pageNum
          this.fetchDetails();
        }
      },
      mounted() {
        this.fetchData();
      }
    }
</script>
