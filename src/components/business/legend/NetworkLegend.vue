<script setup lang="ts">

</script>

<template>
  <div class="control-panel city-road-color-group">
    <div class="city-road-color-info">
      <div class="city-road-info-title" >预警点位</div>
      <div class="city-road-color-display"><div class="dot"  style=" background-color: rgb(255, 255, 0);"></div></div>
    </div>
    <div class="city-road-color-info">
      <div class="city-road-info-title">第三方上报</div>
      <div class="city-road-color-display"><div class="dot"  style=" background-color: rgb(20, 220, 255);"></div></div>

    </div>
    <div class="city-road-color-info">
      <div class="city-road-info-title">事故点位</div>
      <div class="city-road-color-display"><div class="dot" style=" background-color: rgb(255, 0, 0);"></div></div>
    </div>
    <div class="city-road-color-info">
      <div class="city-road-info-title">通畅</div>
      <div class="block"  style=" background-color: rgb(16, 148, 69);"></div>
    </div>
    <div class="city-road-color-info">
      <div class="city-road-info-title">基本通畅</div>
      <div class="block"  style=" background-color: rgb(0, 255, 0);"></div>
    </div>
    <div class="city-road-color-info">
      <div class="city-road-info-title">轻度拥堵</div>
      <div class="block"  style=" background-color: rgb(255, 255, 0);"></div>
    </div>
    <div class="city-road-color-info">
      <div class="city-road-info-title">中度拥堵</div>
      <div class="block"  style=" background-color: rgb(246, 118, 20);"></div>
    </div>
    <div class="city-road-color-info">
      <div class="city-road-info-title">重度拥堵</div>
      <div class="block" style=" background-color: rgb(255, 0, 0);;"></div>
    </div>
  </div>
</template>

<style scoped>
.city-road-color-info{
  margin: 0.2rem 0.4rem 0.2rem 0.8rem;
  height: 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;

}
.city-road-color-display{
  width: 25px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
}
.city-road-info-title{
  color: white;
  width: 5rem;
  margin-right: 0.5rem;
  text-align: left;
}
.dot{
  border-radius:50%;
  width: 12px;
  height: 12px;
}
.block{
  width: 25px;
  height: 12px;
}
.city-road-color-group {
  border-radius:4px;
  position: fixed;
  right: 3%;
  bottom: 5%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
}
</style>