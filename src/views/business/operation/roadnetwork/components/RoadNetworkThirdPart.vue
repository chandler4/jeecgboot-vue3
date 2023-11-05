<template>
    <div class="road-network-thirdpart-panel ">
        <div class="thirdpart-row">
            <div class="thirdpart-info">三方上报信息</div>
            <div class="thirdpart-rule">
                ({{ info.uploadtime }})
            </div>
        </div>
        <div class="thirdpart-row">
            <div class="thirdpart-header">上报总数:</div>
            <div class="thirdpart-number">{{ info.total }}</div>
            <div class="thirdpart-header">已核实:</div>
            <div class="thirdpart-number">{{ info.verify }}</div>
        </div>
        <div class="thirdpart-row">
            <div class="thirdpart-header">造成影响:</div>
            <div class="thirdpart-number">{{ info.effect }}</div>
            <div class="thirdpart-header">已结束:</div>
            <div class="thirdpart-number">{{ info.close }}</div>
        </div>
        <div class="thirdpart-row">
            <div class="thirdpart-big-header">累计影响时间:</div>
            <div class="thirdpart-number">{{ info.accumulate }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">

defineProps(['info'])

// const info = reactive({
//     uploadTime: '05-23',
//     total: 10,
//     close: 10,
//     verify: 20,
//     event: 5,
//     accumulate: 2,
//     effect: 12

// })
</script>

<style>
.road-network-thirdpart-panel {
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 4px;
    color: rgb(255, 255, 255);
    width: 15rem;

}

.thirdpart-row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    line-height: 2rem;
}

.thirdpart-header {
    width: 30%;
    margin-left: 5%;
}

.thirdpart-number {
    width: 15%;
    text-align: left;
}

.thirdpart-info {
    font-size: 1.2rem;
    margin-left: 5%;
}

.thirdpart-rule {
    width: 30%;
    font-size: 1.2rem;
    text-align: right;
}
.thirdpart-big-header{
    width: 42%;
    margin-left: 5%;
}
</style>