import { httpPost } from '@/utils/fetchData'

export const queryDeviceInfo = (data) => {
  return httpPost("/business/transport/overload/v1/queryDeviceInfo", data);
}

export const queryMonitorPointInfo = (data) => {
  return httpPost("/business/transport/overload/v1/queryMonitorPointInfo", data);
}

export const queryCheckRecord = (data) => {
  return httpPost("/business/transport/overload/v1/queryCheckRecord", data);
}
