<template>
    <div>
<!--        <div>-->
<!--            <div>饼图</div>-->
<!--            <div>柱状图</div>-->
<!--        </div>-->

        <el-table :data="details.records || []" style="width: 100%">
            <el-table-column prop="licensePlate" label="车牌号" width="180" />
            <el-table-column prop="registerArea" label="归属地" width="180" />
            <el-table-column prop="enterpriseName" label="归属公司" width="180"/>
            <el-table-column prop="onlineTime" label="入境/上线时间" width="180" />
            <el-table-column prop="offlineTime" label="出境/下线时间" width="180" />
            <el-table-column prop="periodTime" label="运行时长" width="180" />
            <el-table-column align="right" label="操作">
                <template #default="scope">
                    <el-button size="small" @click="(scope.$index, scope.row)"
                    >轨迹</el-button
                    >
                    <el-button size="small" @click="location(scope.$index, scope.row)"
                    >实时位置</el-button
                    >
                </template>
            </el-table-column>
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

  import { queryTrucksOperatorInfo, queryFreightOperatorDetail } from "@/api/business/transport/freight";
  import { ElMessage } from 'element-plus';

    export default {
      name: 'FreightTruckOperatorDetail',
      data() {
        return {
          pageRequest: {
            pageNum: 1,
            pageSize: 10
          },
          details: {records: [], total: 0},
          baseInfo: {
            localCount: 0,
            otherCount: 0,
            others15: []
          }
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
            this.fetchBaseInfo();
            this.fetchDetails();
        },
        fetchBaseInfo: async function() {
          let res = await queryTrucksOperatorInfo();
          if (res) this.baseInfo = res;
          console.log(this.baseInfo);
        },
        fetchDetails: async function() {
          let res = await queryFreightOperatorDetail({...this.pageRequest});
          if (res) this.details = res;
          console.log(this.details);
        },
        refreshTruckPageRequest: function (pageNum) {
          this.pageRequest.pageNum = pageNum
          this.fetchDetails();
        },
        track: function() {
          ElMessage({
            message: "无数据，暂不支持",
            type: 'info',
            duration: 3000,
          });
        },
        location: function() {
          ElMessage({
            message: "无数据，暂不支持",
            type: 'info',
            duration: 3000,
          });
        }
      },
      mounted() {
        this.fetchData();
      }
    }
</script>
