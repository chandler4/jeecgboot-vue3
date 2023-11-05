<template>
    <div class="right-vertical-layout">
        <div class="item" v-for="item in items" @click="onClick(item.key)">
            <img src="item.img">
            <div>{{item.name}}</div>
        </div>
    </div>
</template>

<script setup>
  import { ref, defineProps, defineEmits } from 'vue';

  const props = defineProps(['items']);

  let emits = defineEmits(['handleFunctionClick']);

  const items = ref(props.items || []);

  function onClick(key) {
    console.log('click and key: ' + key);
    emits('handleFunctionClick', key);
  }


</script>

<style>
    .right-vertical-layout {
        width: 100px;
        float: right;
        margin-right: 50px;
        display: flex;
        flex-direction: column;

        .item + .item {
            margin-top: 10px;
        }
    }
</style>
