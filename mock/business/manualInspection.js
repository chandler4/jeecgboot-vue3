/*
* 今日道路巡检情况数据
* */
let allCount = 1000, checkCount = 800;
let lastOverLoadInfo = {
    // 巡查比例
    percent: (checkCount * 100 / allCount).toFixed(2)
};
let OVERLOAD_INFO_TICK = 0;
let MAX_OVERLOAD_INFO_TICK = 1000;
export const buildManualInspection = () => {
    OVERLOAD_INFO_TICK = (OVERLOAD_INFO_TICK + 10) % MAX_OVERLOAD_INFO_TICK;
    let randomTrend = Math.random() * 0.01;
    let randomCount = Math.floor(randomTrend * OVERLOAD_INFO_TICK)/ MAX_OVERLOAD_INFO_TICK;
    checkCount += randomCount;
    if (checkCount > allCount) {
        checkCount = allCount;
    }
    lastOverLoadInfo.percent = (checkCount * 100 / allCount).toFixed(2);
    return lastOverLoadInfo;
};
