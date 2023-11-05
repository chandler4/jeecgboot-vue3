<template>
    <div class="content-area">
			<PageTable :fetch="fetchVehicleList" ref="vehicleTable">
				<el-table-column prop="allowingNumber" label="核载人数" />
				<el-table-column prop="allowingWeight" label="核载重量" />
				<el-table-column prop="businessType" label="车辆所属行业" />
				<el-table-column prop="code" label="车辆编码" />
				<el-table-column prop="dangerousGoodsType" label="危险品车辆类型" />
				<el-table-column prop="licensePlate" label="车牌号码" />
				<el-table-column prop="powerType" label="车辆动力类型" />
				<el-table-column prop="registrationDate" label="登记日期" />
				<el-table-column prop="scrapDate" label="报废日期" />
				<el-table-column prop="status" label="车辆状态" />
			</PageTable>
    </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { ref , onMounted} from 'vue'
import PageTable from '@/components/PageTable/index.vue'
import { fetchVehicleList } from '@/api/bus/bus.js';

const vehicleTable = ref(null);

	onMounted(() => {
		vehicleTable.value.doFetch();
	});

</script>

<style lang="scss" scoped>

</style>
