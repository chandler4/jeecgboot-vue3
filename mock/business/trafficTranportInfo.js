/*
* 交通运输信息
* */
let baseInfos = [
    {
        type: '公交车',
        registerNum: 1000,
        onLineNum: 800,
        noLoadRate: undefined,
        onLinePercent: 80
    },
    {
        type: '危险品运输',
        registerNum: 80,
        onLineNum: 40,
        noLoadRate: undefined,
        onLinePercent: 50
    },
    {
        type: '出租车',
        registerNum: 880,
        onLineNum: 660,
        noLoadRate: 40,
        onLinePercent: 75
    },
    {
        type: '网约车',
        registerNum: 1000,
        onLineNum: 850,
        noLoadRate: 35,
        onLinePercent: 85
    }
];
let transportInfos = [];
let TRAFFIC_STATIC_INFO_TICK = 0;
let MAX_TRAFFIC_STATIC_INFO_TICK = 1000;
let MAX_MOCK_DATA_SIZE = 30;
for (let i = 0 ; i < MAX_MOCK_DATA_SIZE; i++) {
    let newItem = null;
    if (i == 0) {
        newItem = baseInfos;
    } else {
        newItem = Object.assign({}, transportInfos[i-1]);
        newItem[0].onLineNum += (Math.random() > 0.5 ? 1 : -1) * 5;
        newItem[0].onLinePercent = newItem[0].onLineNum * 100 / newItem[0].registerNum;

        newItem[1].onLineNum += (Math.random() > 0.5 ? 1 : -1) * 5;
        newItem[1].onLinePercent = newItem[1].onLineNum * 100 / newItem[1].registerNum;

        newItem[2].onLineNum += (Math.random() > 0.5 ? 1 : -1) * 5;
        newItem[2].onLinePercent = newItem[2].onLineNum * 100 / newItem[2].registerNum;

        newItem[3].onLineNum += (Math.random() > 0.5 ? 1 : -1) * 5;
        newItem[3].onLinePercent = newItem[3].onLineNum * 100 / newItem[3].registerNum;
    }
    transportInfos[i] = newItem;
}

export const buildTrafficTransportInfo = () => {
    TRAFFIC_STATIC_INFO_TICK = (TRAFFIC_STATIC_INFO_TICK+1) % MAX_TRAFFIC_STATIC_INFO_TICK;
    return transportInfos[TRAFFIC_STATIC_INFO_TICK % MAX_MOCK_DATA_SIZE];
};
