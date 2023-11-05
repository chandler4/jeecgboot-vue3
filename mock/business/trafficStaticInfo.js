/*
* 今日道路巡检情况数据
* */
let lastTrafficStaticInfo = {
    roadDistance: '3003km',
    roadCount: '1580条',
    bridgeDistance: '300km',
    bridgeCount: '600座',
    tunnelDistance: '1km',
    tunnelCount: '2条',
    highWayPercent: 30,
    roadPercent: 56,
    cityRoadPercent: 80
};
export const buildTrafficStaticInfo = () => {
    return lastTrafficStaticInfo;
};
