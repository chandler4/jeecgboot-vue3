/*
* 交通运输信息
* */
let historyModeInfos = {
    types:[
        {
            type: 'bus',
            typeName: '公交车'
        },
        {
            type: 'taxi',
            typeName: '出租车'
        },
        {
            type: 'carHailing',
            typeName: '网约车'
        },
        {
            type: 'shareBike',
            typeName: '共享单车'
        },
    ],
    bus: [
        5,5,6.5,7,7,7.5,8,6.5,7,8.5,7,6.8,7.2
    ],
    taxi:[
        4,3.5,4,4,4.5,4.4,4.6,4,4,3.5,3,2,2
    ],
    carHailing:[
        2,2.5,3,3,3.5,2.3,2.6,3.5,4,3.1,2.5,2,1.5
    ],
    shareBike:[
        1,1.5,2.1,2,2.5,2.1,2.1,2.5,3,2.1,2.1,1.7,1.1
    ]
}

let flag = false;

export const buildTripModeInfo = () => {
    if (flag) {
        return historyModeInfos;
    }
    historyModeInfos.types[0].modeSum = historyModeInfos.bus.reduce((preValue, value)=>{
        return preValue + value;
    }, 0)
    historyModeInfos.types[1].modeSum = historyModeInfos.taxi.reduce((preValue, value)=>{
        return preValue + value;
    }, 0)
    historyModeInfos.types[2].modeSum = historyModeInfos.carHailing.reduce((preValue, value)=>{
        return preValue + value;
    }, 0)
    historyModeInfos.types[3].modeSum = historyModeInfos.shareBike.reduce((preValue, value)=>{
        return preValue + value;
    }, 0)

    flag = true;
    return historyModeInfos;
};
