<template>
  <el-button :size="size" :type="type" :icon="icon"
    :loading="loading" @click="handleClick">
    {{label}}
  </el-button>
</template>

<script>
export default {
  name: 'KtButton',
  emits: ['click'],
  props: {
    label: {  // 按钮显示文本
      type: String,
      default: 'Button'
    },
    icon: {  // 按钮显示图标
      type: String,
      default: ''
    },
    size: {  // 按钮尺寸
      type: String,
      default: 'mini'
    },
    type: {  // 按钮类型
      type: String,
      default: null
    },
    loading: {  // 按钮加载标识
      type: Boolean,
      default: false
    },
    disabled: {  // 按钮是否禁用
      type: Boolean,
      default: false
    },
    perms: {  // 按钮权限标识，外部使用者传入
      type: String,
      default: null
    }
  },
  data() {
    return {
    }
  },
  methods: {
    handleClick: function () {
      // 按钮操作处理函数
      console.log('emit click!');
      this.$emit('click', {})
    }
  }
}
</script>

<style scoped>

</style>
