<template>
    <right-vertical-dock :items="items" @handleFunctionClick="handleFunctionClick"></right-vertical-dock>
    <el-dialog style="width: 80%; height:800px;" v-model="dialog.enterpriseInfoDialogVisible">
        <freight-enterprise-info-transport :enterprises="enterprises" @handleEnterprisePersonDetail="handleEnterprisePersonDetail" @handleEnterpriseTruckDetail="handleEnterpriseTruckDetail"></freight-enterprise-info-transport>
    </el-dialog>
    <el-dialog style="width: 80%; height:800px;" v-model="dialog.personDetailDialogVisible">
        <freight-enterprise-person-detail :enterpriseId="enterpriseId"></freight-enterprise-person-detail>
    </el-dialog>
    <el-dialog style="width: 80%; height:800px;" v-model="dialog.truckDetailDialogVisible">
        <freight-enterprise-truck-detail :enterpriseId="enterpriseId"></freight-enterprise-truck-detail>
    </el-dialog>
    <el-dialog style="width: 80%; height:800px;" v-model="dialog.freightTruckPathDetailVisible">
        <freight-truck-path-detail></freight-truck-path-detail>
    </el-dialog>
    <el-dialog style="width: 80%; height:800px;" v-model="dialog.freightTruckOperatorDetailVisible">
        <freight-truck-operator-detail></freight-truck-operator-detail>
    </el-dialog>

</template>

<script>

  import RightVerticalDock from '@/components/business/RightVerticalDock/index.vue';
  import {fetchEnterprises} from "@/api/business/transport/freight";
  import FreightEnterpriseInfoTransport from './FreightEnterpriseInfoTransport.vue';
  // import FreightEnterpriseDetailDialog from './FreightEnterpriseDetailDialog.vue';
  import FreightEnterprisePersonDetail from './FreightEnterprisePersonDetail.vue';
  import FreightEnterpriseTruckDetail from './FreightEnterpriseTruckDetail.vue';

  import FreightTruckPathDetail from './FreightTruckPathDetail.vue';

  import FreightTruckOperatorDetail from './FreightTruckOperatorDetail.vue'

  export default {
    name: 'FreightTransport',
    components: {
      RightVerticalDock,
      FreightEnterpriseInfoTransport,
      FreightEnterprisePersonDetail,
      FreightEnterpriseTruckDetail,
      FreightTruckPathDetail,
      FreightTruckOperatorDetail
    },
    data() {
      return {
        items:[
          {
            name: "业务信息",
            key: "enterpriseInfo",
            img: null
          },
          {
            name: "营运作业",
            key: "work",
            img: null
          },
          {
            name: "通道统计",
            key: "path",
            img: null
          },
          {
            name: "实时位置",
            key: "location",
            img: null
          },
        ],
        dialog: {
          enterpriseInfoDialogVisible: false,
          personDetailDialogVisible: false,
          truckDetailDialogVisible: false,
          freightTruckPathDetailVisible: false,
          freightTruckOperatorDetailVisible: false
        },
        enterprises: [],
        enterpriseId: null,
      }
    },
    methods: {
      init: function(){
      },
      handleFunctionClick: function(key){
        if (key === 'enterpriseInfo') {
          console.log('enterpriseInfoDialogVisible' + ' visible is true!');
          this.dialog.enterpriseInfoDialogVisible = true;
          this.fetchFreightEnterpriseInfo();
        } else if (key === 'path') {
          this.dialog.freightTruckPathDetailVisible = true;
        } else if (key === 'work') {
          this.dialog.freightTruckOperatorDetailVisible = true;
        }
       },
      fetchFreightEnterpriseInfo: async function() {
        if (this.enterprises?.length > 0) return;
        debugger;
        let res = await fetchEnterprises();
        if(res) {
          this.enterprises = res;
          console.log(this.enterprises);
        }
      },
      handleEnterprisePersonDetail(enterpriseId) {
        this.dialog.personDetailDialogVisible = true;
        this.enterpriseId = enterpriseId;
        console.log('enterpriseId: ' + this.enterpriseId);
      },
      handleEnterpriseTruckDetail(enterpriseId) {
        this.dialog.truckDetailDialogVisible = true;
        this.enterpriseId = enterpriseId;
        console.log('enterpriseId: ' + this.enterpriseId);
      }
      // handleDialogClose: function(key) {
      //   this.dialog[key] = false;
      // }

    },
    mounted() {
      this.init();
    },
  }

</script>

<style lang="scss" scoped>
</style>
