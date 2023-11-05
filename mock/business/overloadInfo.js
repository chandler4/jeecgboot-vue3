/*
* 治超模块数据
* */
let lastOverLoadInfo = {
    // 治超车辆总量
    allCount: 1000,
    // 治超未超标车辆数量
    normalCount: 900,
    // 正常车辆比例
    percent: 90
};
let MANUAL_INSPECTION_TICK = 0;
let MAX_MANUAL_INSPECTION_TICK = 1000;
export const buildOverloadInfo = () => {
    MANUAL_INSPECTION_TICK = (MANUAL_INSPECTION_TICK + 10) % MAX_MANUAL_INSPECTION_TICK;
    let randomTrend = Math.random()
    let randomCount = Math.floor(randomTrend * 50);
    let normalCount = randomCount - Math.floor(Math.random() * 0.1);
    lastOverLoadInfo.allCount += randomCount;
    lastOverLoadInfo.normalCount += normalCount;
    lastOverLoadInfo.percent = (lastOverLoadInfo.normalCount * 100 / lastOverLoadInfo.allCount).toFixed(2);
    return lastOverLoadInfo;
}
