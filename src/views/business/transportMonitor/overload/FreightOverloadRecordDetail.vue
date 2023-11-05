<template>
    <div>

        <el-table :data="details.records || []" style="width: 100%">
            <el-table-column prop="monitorName" label="检测点" width="180" />
            <el-table-column prop="bizTime" label="检测时间" width="180" />
            <el-table-column prop="licensePlate" label="车牌号" width="180"/>
            <el-table-column prop="isOverload" label="是否超载" width="180" />
            <el-table-column prop="realWeight" label="载重" width="180" />
            <el-table-column prop="standardWeight" label="荷载重量" width="180" />
            <el-table-column prop="overloadWeight" label="超重量" width="180" />
            <el-table-column prop="overloadPercent" label="超重率" width="180" />
        </el-table>

        <div class="toolbar" style="padding:10px;">
            <el-pagination layout="total, prev, pager, next, jumper" @current-change="refreshPageRequest"
                           :current-page="pageRequest.pageNum" :page-size="pageRequest.pageSize" :total="details.total"
                           style="float:right;">
            </el-pagination>
        </div>

    </div>
</template>

<script>

  import { queryCheckRecord } from "@/api/transport/overload";
  import { ElMessage } from 'element-plus';

    export default {
      name: 'FreightOverloadRecordDetail',
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
          let res = await queryCheckRecord({...this.pageRequest});
          if (res) this.details = res;
          this.details.records = this.details.records.map(item => {
            const newItem = {
              ...item,
              realWeight: item.realWeight.toFixed(2),
              standardWeight: item.standardWeight.toFixed(2),
              overloadWeight: item.isOverload? item.overloadWeight.toFixed(2) : 0,
              overloadPercent: item.isOverload? item.overloadPercent.toFixed(2) + '%' : 0 + '%'
            }
            return newItem;
          });
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
