import {buildNewTrafficInfo} from './trafficInfo';
import {buildManualInspection} from './manualInspection';
import {buildOverloadInfo} from './overloadInfo';
import {buildTrafficStaticInfo} from "./trafficStaticInfo";
import {buildTrafficTransportInfo} from "./trafficTranportInfo";
import {buildTripModeInfo} from "./triplModeInfo";

//交通运行信息
export const getTrafficInfo = () => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            let trafficInfo = buildNewTrafficInfo();
            resolve(trafficInfo);
        }, 100);
    })
}
//获取人工巡检信息
export const getManualInspection = () => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            let manualInspection = buildManualInspection();
            resolve(manualInspection);
        }, 100);
    })
}
//获取治超信息
export const getOverloadInfo = () => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            let overloadInfo = buildOverloadInfo();
            resolve(overloadInfo);
        }, 100);
    })
}

//获取静态统计信息
export const getTrafficStaticInfo = () => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            let trafficStaticInfo = buildTrafficStaticInfo();
            resolve(trafficStaticInfo);
        }, 100);
    })
}

//获取交通运输信息
export const getTrafficTransportInfo = () => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            let trafficTransportInfo = buildTrafficTransportInfo();
            resolve(trafficTransportInfo);
        }, 100);
    })
}

//获取出行方式信息

export const getTripModeInfo = () => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            let tripModeInfo = buildTripModeInfo();
            resolve(tripModeInfo);
        }, 100);
    })
}

