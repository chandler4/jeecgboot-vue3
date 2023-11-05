<template>
    <div>
        <div class="toolbar" style="float:right;padding-top:10px;padding-right:15px;">
            <el-form :inline="true" :model="filters" :size="size">
                <el-form-item>
                    <el-form-item label="运营公司" prop="company">
                        <el-select v-model="filters.companyCode">
                            <el-option
                                    v-for="company in companies"
                                    :key="company.id"
                                    :label="company.companyName"
                                    :value="company.companyCode"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form-item>
                <el-form-item>
                    <el-form-item label="区域" prop="region">
                        <el-select v-model="filters.regionId">
                            <el-option
                                    v-for="region in regions"
                                    :key="region.id"
                                    :label="region.regionName"
                                    :value="region.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form-item>

                <el-form-item>
                    <el-button class="fa fa-search" type="primary"
                               @click="query">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button class="fa fa-reset" label="重置" type="primary"
                               @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="tasks" style="width: 100%">
            <el-table-column prop="bizTime" label="任务期" width="180" />
            <el-table-column prop="regionId" label="运营区域" width="180" :formatter="regionIdFormatter"/>
            <el-table-column prop="companyName" label="运营企业" width="180" />
            <el-table-column prop="bikeType" label="单车类型" width="180"/>
            <el-table-column prop="supplyNumber" label="运营数量" width="180" />
            <el-table-column prop="percent" label="抽查比例" width="180" />
            <el-table-column prop="checkNumber" label="监测数量" width="180" />
            <el-table-column prop="onDutyState" label="分配状态" width="180"/>
            <el-table-column prop="operatorId" label="责任人" width="180" :formatter="operatorFormatter"/>
            <el-table-column align="right" label="操作">
                <template #default="scope">
                    <el-button
                            size="small"
                            type="primary"
                            @click="handleDetail(scope.$index, scope.row)"
                    >检测记录</el-button
                    >
                </template>
            </el-table-column>
        </el-table>

        <div class="toolbar" style="padding:10px;">
            <el-pagination layout="total, prev, pager, next, jumper" @current-change="refreshPageRequest"
                           :current-page="pageRequest.pageNum" :page-size="pageRequest.pageSize" :total="totalSize"
                           style="float:right;">
            </el-pagination>
        </div>

        <el-dialog :title="'任务检测列表'" width="80%" v-model="dialogVisible"
                   :close-on-click-modal="false">
            <el-table :data="records" style="width: 100%">
                <el-table-column prop="createTime" label="检查时间" width="180" />
                <el-table-column prop="checkType" label="监测类型" width="180" />
                <el-table-column prop="checkCount" label="检测数量" width="180"/>
                <el-table-column prop="crossRegionCount" label="跨区域数量" width="180" />
                <el-table-column prop="unregisterCount" label="未登记数量" width="180" />
                <el-table-column prop="operatorId" label="检测人" width="180" :formatter="operatorFormatter"/>
<!--                <el-table-column align="right">-->
<!--                    <template #default="scope">-->
<!--                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"-->
<!--                        >编辑</el-button-->
<!--                        >-->
<!--                        <el-button-->
<!--                                size="small"-->
<!--                                type="danger"-->
<!--                                @click="handleDelete(scope.$index, scope.row)"-->
<!--                        >删除</el-button-->
<!--                        >-->
<!--                    </template>-->
<!--                </el-table-column>-->
            </el-table>

            <div class="toolbar" style="padding:10px;">
                <el-pagination layout="total, prev, pager, next, jumper" @current-change="refreshRecordPageRequest"
                               :current-page="recordPageRequest.pageNum" :page-size="recordPageRequest.pageSize" :total="recordTotalSize"
                               style="float:right;">
                </el-pagination>
            </div>

            <el-divider direction="horizontal" content-position="center"/>
            <div class="dialog-footer">
                <el-button :size="size" @click="dialogVisible = false">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

  import {fetchRegions, fetchCompanys, fetchAllUsers, fetchHistoryTasks as fetchTasks, getRecordsByCondition} from '@/api/business/sharedbike/sharedBike'

  export default {
    name: 'HistoryTask',
    data() {
      return {
        filters: {
          companyCode: undefined,
          regionId: undefined
        },
        pageRequest: {
          pageNum: 1,
          pageSize: 10
        },
        totalSize: 0,
        dialogVisible: false,
        regions: [],
        companies: [],
        users: [],
        tasks: [],
        isLoading: false,
        filters: {
          cname: undefined,
          region: undefined
        },

        taskId: undefined,
        records: [],
        recordTotalSize: 0,
        recordPageRequest: {
          pageNum: 1,
          pageSize: 10
        },
      }
    },
    methods: {
      init: async function(){
        this.companies = await fetchCompanys();
        this.regions = await fetchRegions();
        this.users = await fetchAllUsers();
        this.queryTasks();
      },

      queryTasks: async function() {
        let res = await fetchTasks({...this.pageRequest, ...this.filters});
        debugger
        this.tasks = res?.records;
        this.totalSize = res?.total;
      },

      // 换页刷新
      refreshPageRequest: function (pageNum) {
        this.pageRequest.pageNum = pageNum
        this.queryTasks();
      },

      query: function() {
        this.pageRequest = {
          pageNum: 1,
          pageSize: 10
        }
        this.queryTasks();
      },
      reset: function() {
        this.filters = {
          companyCode: undefined,
          regionId: undefined
        }
        this.pageRequest = {
          pageNum: 1,
          pageSize: 10
        }
        this.queryTasks();
      },
      operatorFormatter: function(_,__,value) {
        for (let i = 0 ; i < this.users.length; i++) {
          if (value === this.users[i].id) {
            return this.users[i].cname;
          }
        }
      },
      regionIdFormatter: function(_,__, value) {
        for (let i = 0 ; i < this.regions.length; i++) {
          if (value === this.regions[i].id) {
            return this.regions[i]?.regionName;
          }
        }
      },

      handleDetail: function(index, value) {
        this.dialogVisible = true;
        this.taskId = value.id;
        this.queryRecords();
      },
      queryRecords: async function() {
        let res = await getRecordsByCondition({...this.recordPageRequest, taskId: this.taskId});
        this.records = res?.records;
        this.recordTotalSize = res?.total;
      },
      refreshRecordPageRequest: function(pageNum) {
        //
        this.recordPageRequest.pageNum = pageNum
        this.queryRecords();
      }
    },
    mounted() {
      this.init();
    },
  }

</script>

<style lang="scss" scoped>
</style>
