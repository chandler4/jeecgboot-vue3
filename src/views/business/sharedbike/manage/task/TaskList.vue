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
                <el-form-item>
                    <el-button class="fa fa-plus" label="新增" type="primary"
                               @click="addTask">新增任务</el-button>
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
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
                    >编辑</el-button
                    >
                    <el-button
                            size="small"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button
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

        <el-dialog :title="'编辑'" width="80%" v-model="dialogVisible"
                   :close-on-click-modal="false">
            <el-form :model="form" label-width="120px" :size="size"
                     label-position="right">
                <el-form-item label="ID" prop="id" v-if="false">
                    <el-input v-model="form.id" :disabled="true" auto-complete="off"></el-input>
                </el-form-item>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="任务时间" prop="bizTime">
                            <el-date-picker
                                    v-model="form.bizTime"
                                    value-format="YYYY-MM"
                                    type="month"
                                    placeholder="选择月">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="区域" prop="operatorId">
                            <el-select v-model="form.regionId" placeholder="运营区域">
                                <el-option
                                        v-for="region in regions"
                                        :key="region.id"
                                        :label="region.regionName"
                                        :value="region.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="运营企业" prop="companyName">
                            <el-select v-model="form.companyName" placeholder="运营企业">
                                <el-option
                                        v-for="company in companies"
                                        :key="company.id"
                                        :label="company.companyName"
                                        :value="company.companyName"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="单车类型" prop="bikeType">
                            <el-select v-model="form.bikeType" placeholder="单车类型">
                                <el-option label="单车" value="单车" />
                                <el-option label="电单车" value="电单车" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="运营数量" prop="supplyNumber">
                            <el-input v-model="form.supplyNumber" auto-complete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="抽查比例" prop="supplyNumber">
                            <el-input v-model="form.percent" type="number" auto-complete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="检测数量" prop="checkNumber">
                            <el-input v-model="form.checkNumber" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="责任人" prop="operatorId">
                            <el-select v-model="form.operatorId" placeholder="单车类型">
                                <el-option
                                        v-for="user in users"
                                        :key="user.id"
                                        :label="user.cname"
                                        :value="user.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-divider direction="horizontal" content-position="center"/>
            <div class="dialog-footer">
                <el-button :size="size" @click="dialogVisible = false">取消</el-button>
                <el-button :size="size" type="primary" @click="submitForm" :loading="isLoading">
                    确定
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

  import {fetchRegions, fetchCompanys, fetchAllUsers, createTask, editTask, fetchTasks} from '@/api/business/sharedbike/sharedBike'

  export default {
    name: 'TaskList',
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
        isEdit: false,
        isLoading: false,
        form: {
          id: undefined,
          bizTime: undefined,
          companyName: undefined,
          bikeType: undefined,
          supplyNumber: undefined,
          percent: undefined,
          checkNumber: undefined,
          operatorId: undefined,
          regionId: undefined
        },
        filters: {
          cname: undefined,
          region: undefined
        }
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

      addTask: function() {
        this.dialogVisible = true;
        this.isEdit = false;
        this.form = {
          id: undefined,
          bizTime: undefined,
          companyName: undefined,
          bikeType: undefined,
          supplyNumber: undefined,
          percent: undefined,
          checkNumber: undefined,
          operatorId: undefined,
          companyCode: undefined,
          onDutyState: undefined,
          regionId: undefined
        }
      },
      handleEdit: function(index, value) {
        this.form = {
          ...value,
        }
        this.dialogVisible = true;
        this.isEdit = true;
      },
      handleDelete: function(index, value) {
        let param = value;
        //call delete api
      },
      submitForm: async function() {
        let param = {
          ...this.form,
        }

        if (this.form.operatorId) {
          param.onDutyState = "已分配";
        } else {
          param.onDutyState = "未分配";
        }
        // patch companyCode info

        for (let i = 0 ; i < this.companies.length; i++) {
          if (this.form.companyName === this.companies[i].companyName) {
            this.form.companyCode = this.companies[i].companyCode;
          }
        }

        if (!this.isEdit) {
          let res = await createTask(param);
          if (res) {
            this.queryTasks();
          }
        } else {
          let res = await editTask(param);
          if (res) {
            this.queryTasks();
          }
        }

        this.dialogVisible = false;

      }
    },
    mounted() {
      this.init();
    },
  }

</script>

<style lang="scss" scoped>
</style>
