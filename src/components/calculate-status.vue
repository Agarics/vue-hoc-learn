<template>
  <div class="calculate-status">
    <ElEmpty :description="description" :image-size="100">
      <ElButton v-if="status === 'pending'" type="primary" @click="onCancel">取消计算</ElButton>
      <ElButton v-else type="primary" @click="onRefresh">刷新</ElButton>
    </ElEmpty>
  </div>
</template>
<script setup>
import { ElButton, ElEmpty } from 'element-plus'

const props = defineProps({
  status: {
    type: String,
    default: 'pending',
  },
  description: {
    type: String,
    default: '计算中...',
  },
  onCancel: {
    type: Function,
    default: () => {},
  },
  onRefresh: {
    type: Function,
    default: () => {},
  },
})

</script>
<style scoped>
.calculate-loading {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}
.calculate-loading-item {
  width: 100%;
  height: 100px;
  background-color: #f0f0f0;
}
.calculate-loading-item:nth-child(1) {
  width: 100%;
  height: 100px;
  background-color: #f0f0f0;
}
.calculate-loading-item:nth-child(2) {
  width: 100%;
  height: 100px;
  background-color: #f0f0f0;
}
.calculate-loading-item:nth-child(3) {
  width: 100%;
  height: 100px;
  background-color: #f0f0f0;
}
</style>