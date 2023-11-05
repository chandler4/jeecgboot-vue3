let TRAFFIC_DESCS = ['通畅', '通畅', '通畅', '通畅', '通畅', '通畅', '通畅', '通畅', '通畅', '拥堵'];
let CONGESTION_LEVEL = ['拥堵', '中度拥堵', '严重拥堵'];
let TRAFFIC_TICK = 0;
const baseTrafficInfo = {
    // 交通运行信息
    levelDesc: TRAFFIC_DESCS[TRAFFIC_TICK % 10],
    // 今日拥堵趋势
    todayInfo: {
        //拥堵指数
        congestionIndex: 1.02,
        //拥堵距离
        congestionDistance: 3.3,
        //路网速度
        roadNetworkSpeed: 34
    },
    //上月平均拥堵信息
    lastMonthAvgInfo: {
        congestionIndex: 1.22,
        congestionDistance: 2.3,
        roadNetworkSpeed: 34
    },
    //拥堵路段信息
    congestionSections: [
        {
            // 路段名称
            name: 'XXXX',
            //拥堵类型
            type: '异常拥堵',
            //拥堵时间
            time: 23,
            //拥堵等级
            level: CONGESTION_LEVEL[(TRAFFIC_TICK + Math.random() * 10) % 3]
        },
        {
            name: 'XXXX',
            type: '常规拥堵',
            time: 6,
            level: CONGESTION_LEVEL[(TRAFFIC_TICK + Math.random() * 10) % 3]
        },
        {
            name: 'XXXX',
            type: '高疑似事件拥堵',
            time: 32,
            level: CONGESTION_LEVEL[(TRAFFIC_TICK + Math.random() * 10) % 3]
        },
        {
            name: 'XXXX',
            type: '常规拥堵',
            time: 43,
            level: CONGESTION_LEVEL[(TRAFFIC_TICK + Math.random() * 10) % 3]
        },
        {
            name: 'XXXX',
            type: '高疑似事件拥堵',
            time: 32,
            level: CONGESTION_LEVEL[(TRAFFIC_TICK + Math.random() * 10) % 3]
        },
        {
            name: 'XXXX',
            type: '异常拥堵',
            time: 9,
            level: CONGESTION_LEVEL[(TRAFFIC_TICK + Math.random() * 10) % 3]
        },
        {
            name: 'XXXX',
            type: '高疑似事件拥堵',
            time: 11,
            level: CONGESTION_LEVEL[(TRAFFIC_TICK + Math.random() * 10) % 3]
        },
        {
            name: 'XXXX',
            type: '常规拥堵',
            time: 14,
            level: CONGESTION_LEVEL[(TRAFFIC_TICK + Math.random() * 10) % 3]
        },
        {
            name: 'XXXX',
            type: '高疑似事件拥堵',
            time: 12,
            level: CONGESTION_LEVEL[(TRAFFIC_TICK + Math.random() * 10) % 3]
        },
        {
            name: 'XXXX',
            type: '异常拥堵',
            time: 35,
            level: CONGESTION_LEVEL[(TRAFFIC_TICK + Math.random() * 10) % 3]
        }
    ]
};

let lastTrafficInfo = null;
const buildNewTrafficInfo = () => {
    TRAFFIC_TICK = (TRAFFIC_TICK + 1) % 1000;
    if (lastTrafficInfo == null) {
        lastTrafficInfo = baseTrafficInfo;
    }
    //adjust base info
    // debugger
    lastTrafficInfo.levelDesc = TRAFFIC_DESCS[TRAFFIC_TICK % 10];
    let flag = (Math.random() > 0.5);
    lastTrafficInfo.todayInfo.congestionIndex = parseFloat(Math.abs(lastTrafficInfo.todayInfo.congestionIndex + ( flag? 1 : -1) * Math.random() * 0.1).toFixed(1));
    lastTrafficInfo.todayInfo.congestionDistance = parseFloat(Math.abs(lastTrafficInfo.todayInfo.congestionDistance + (flag ? 1 : -1) * Math.random() * 0.5).toFixed(1));
    lastTrafficInfo.todayInfo.roadNetworkSpeed = parseFloat(Math.abs(lastTrafficInfo.todayInfo.roadNetworkSpeed + (!flag ? 1 : -1) * Math.random() * 5).toFixed(1));

    for (let i = 0; i < lastTrafficInfo?.congestionSections.length; i++) {
        let item = lastTrafficInfo.congestionSections[i];
        item.time = parseFloat(Math.abs(item.time + (flag ? 1 : -1) * Math.floor(Math.random() * 10)).toFixed(0));
        item.level = CONGESTION_LEVEL[(TRAFFIC_TICK + Math.random() * 10) % 3]
    }
    return lastTrafficInfo;
};

export {buildNewTrafficInfo}


