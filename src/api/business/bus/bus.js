import customFetch from "@/utils/fetch";
import {httpPost, httpGet} from '@/utils/fetchData';

// 获取所有线路
export const fetchBusLineList = (data) => {
  return customFetch("/business/busLine/v1/getList", data, {method: 'Get'})
}
// 获取所有站点
export const fetchBusStopList = (data) => {
  return customFetch("/business/busStop/v1/getList", data, {method: 'Get'})
}

// 查询各个站点客量
export const fetchBusStopRidingNum = (data) => {
  return customFetch("/business/busStop/v1/getBusStopRidingNum", data, {method: 'Get'})
}

// 分页获取所有车辆
export const fetchVehicleList = (data) => {
  return customFetch("/business/vehicle/v1/getList",  {data, method: 'Get'})
}




