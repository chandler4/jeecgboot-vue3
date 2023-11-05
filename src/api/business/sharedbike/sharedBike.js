import customFetch from "@/utils/business/fetch";
import {httpPost, httpGet} from '@/utils/business/fetchData';

export const fetchCompanys = () => {
  return httpGet('/business/sharedbike/v1/getCompanyDict');
}
export const fetchRegions = (data) => {
  return customFetch("/business/sharedbike/v1/getOperationRegion", {method: 'Get'})
}
export const fetchTodayHourlyUnlockInfo = (data) => {
  return customFetch("/business/sharedbike/v1/getTodayHourlyUnlockInfo", {method: 'Get'})
}
export const fetchStatisticsInfo = (data) => {
  return customFetch("/business/sharedbike/v1/getStatisticsInfo", {method: 'Get'})
}
export const fetchAllUsers = (data) => {
  return httpPost("/business/sharedbike/v1/fetchAllUsers", data);
}

export const getUserById = (param) => {
  return httpPost("/business/sharedbike/v1/getUser/" + param.id, data);
}
export const fetchRegionStatisticsInfo = (data) => {
  return customFetch("/business/sharedbike/v1/getRegionStatisticsInfo", data, {method: 'Get'});
}
export const fetchUsers = (data) => {
  return httpPost("/business/sharedbike/v1/getUsers", data);
}
export const createUser = (data) => {
  return httpPost("/business/sharedbike/v1/createUser", data);
}

export const editUser = (data) => {
  return httpPost("/business/sharedbike/v1/editUser", data);
}

export const fetchTasks = (data) => {
  return httpPost("/business/sharedbike/v1/getTasks", data);
}

export const fetchHistoryTasks = (data) => {
  return httpPost("/business/sharedbike/v1/getHistoryTasks", data);
}

export const createTask = (data) => {
  return httpPost("/business/sharedbike/v1/createTask", data);
}

export const editTask = (data) => {
  return httpPost("/business/sharedbike/v1/editTask", data);
}

export const getRecordsByCondition = (data) => {
  return httpPost("/business/sharedbike/v1/getRecords", data);
}

export const getBikeLockODData = (data) => {
  return httpPost("/business/sharedbike/v1/queryODData", {status: '开锁'});
}


