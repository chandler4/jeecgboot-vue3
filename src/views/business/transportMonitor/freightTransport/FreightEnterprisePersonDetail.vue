<template>
    <div>
        <div>
            baseInfo
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

  import { fetchEnterprisePerson } from "@/api/business/transport/freight";

    export default {
      name: 'FreightEnterprisePersonDetail',
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
        },
        fetchDataById: function() {
            this.fetchPersonByPageRequest();
        },
        fetchPersonByPageRequest: async function() {
            let res = await fetchEnterprisePerson({...this.personPageRequest, enterpriseId: this.enterpriseId});
            if (res) this.personInfo = res;
        },
        refreshPersonPageRequest: function (pageNum) {
          this.personPageRequest.pageNum = pageNum
          this.fetchPersonByPageRequest();
        },
      },
    }
</script>
