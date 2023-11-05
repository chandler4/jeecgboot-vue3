import { httpPost } from '@/utils/fetchData'

export const fetchEnterprises = (data) => {
  return httpPost("/business/transport/freight/v1/queryEnterpriseInfo", data);
}

export const fetchEnterprisePerson = (data) => {
  return httpPost("/business/transport/freight/v1/queryPersonelInfoByEnterpriseId", data);
}

export const fetchEnterpriseTrucks = (data) => {
  return httpPost("/business/transport/freight/v1/queryTrucksInfoByEnterpriseId", data);
}

export const queryTrucksPathInfo = (data) => {
  return httpPost("/business/transport/freight/v1/queryTrucksPathInfo", data);
}

export const queryTrucksOperatorInfo = (data) => {
  return httpPost("/business/transport/freight/v1/queryTrucksOperatorInfo", data);
}

export const queryFreightOperatorDetail = (data) => {
  return httpPost("/business/transport/freight/v1/queryFreightOperatorDetail", data);
}
