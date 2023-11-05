<template>
    <right-vertical-dock :items="items" @handleFunctionClick="handleFunctionClick"></right-vertical-dock>
    <el-dialog style="width: 80%; height:800px;" v-model="dialog.dialogVisible">
        <freight-overload-device-detail></freight-overload-device-detail>
    </el-dialog>
    <el-dialog style="width: 80%; height:800px;" v-model="dialog.recordDetailVisible">
        <freight-overload-record-detail></freight-overload-record-detail>
    </el-dialog>
</template>

<script>
  import RightVerticalDock from '@/components/business/RightVerticalDock/index.vue';
  import FreightOverloadDeviceDetail from './FreightOverloadDeviceDetail.vue'
  import FreightOverloadRecordDetail from './FreightOverloadRecordDetail.vue'
  import { queryMonitorPointInfo } from "@/api/business/transport/overload";

  export default {
    name: 'OverLoad',
    components: {
      FreightOverloadDeviceDetail,
      FreightOverloadRecordDetail,
      RightVerticalDock,
    },
    data() {
      return {
        items:[
          {
            name: "设备信息",
            key: "device",
            img: null
          },
          {
            name: "监测点概览",
            key: "monitorPoint",
            img: null
          },
          {
            name: "检测记录",
            key: "record",
            img: null
          },
        ],
        dialog: {
          dialogVisible: false,
          monitorPointVisible: false,
          recordDetailVisible: false,
        },
        monitorPoints: null,
      }
    },
    methods: {
      init: function(){
      },
      handleFunctionClick: async function(key){
        if (key === 'device') {
          this.dialog.dialogVisible = true;
          this.fetchFreightEnterpriseInfo();
        } else if (key === 'monitorPoint') {
          if (!this.monitorPoints) {
            let res = await queryMonitorPointInfo();
            if (res) this.monitorPoints = res;
          }
          this.dialog.monitorPointVisible = !this.dialog.monitorPointVisible;
          this.drawAreaPolygon(this.dialog.monitorPointVisible, this.monitorPoints || []);
        } else if (key === 'record'){
            this.dialog.recordDetailVisible = true;
        }
      },
      drawAreaPolygon(flag = false, data = []) {

        console.log(data);
        window.bMapReady.then(({
                                 map,
                               }) => {

          this.areaPolygons?.forEach(areaPolygon => map.removeOverlay(areaPolygon));

          // 删除
          if (!flag) {
            return;
          }

          // 数据信息
          const areaData = data.map(item => {
            const {
              lng,
              lat,
              type,
              videoFlag,
              address,
              weightLimit,
              heightLimit,
              foundTime
            } = item;

            const opts = {
              // 指定文本标注所在的地理位置
              position: new BMapGL.Point(lng, lat),
              // 设置文本偏移量
              offset: new BMapGL.Size(-30, -30)
            };
            const text = [
              `类别：${type}辆`,
              `视频：${videoFlag}`,
              `地址：${address}`,
              `重量限制：${weightLimit}`,
              `高度限制：${heightLimit}`,
              `创建时间：${foundTime}`,
            ].join('<br/>');

            const label = new BMapGL.Label(text, opts);

            // 自定义文本标注样式
            label.setStyle({
              color: '#ffffff',
              borderRadius: '5px',
              borderColor: 'transparent',
              padding: '10px',
              fontSize: '16px',
              fontWeight: '900',
              // height: '30px',
              lineHeight: '40px',
              fontFamily: '微软雅黑',
              backgroundColor: 'rgba(0,0,200, 0.5)',
            });
            map.addOverlay(label);
            return label;
          });
          this.areaPolygons = [...areaData];
        });
      },

    },
    mounted() {
      this.init();
    },
    unmounted() {
      this.drawAreaPolygon(false);
    }
  }

</script>

<style lang="scss" scoped>
</style>
