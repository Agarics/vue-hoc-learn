<template>
  <component :is="currentCard" v-bind="$attrs" />
</template>

<script lang="ts" setup>
import { defineAsyncComponent, computed } from 'vue'
import type { Component } from 'vue'

const props = defineProps<{
  cardType: string
  config?: Record<string, any>
}>()

// 预加载并创建异步组件映射
const asyncCards = Object.fromEntries(
  Object.entries(
    import.meta.glob<{ default: Component }>('./*.vue', {
      eager: false,
      import: 'default'
    })
  ).map(([path, loader]) => [
    path.replace('./', '').replace('.vue', ''),
    defineAsyncComponent({
      loader,
      // 使用简单的加载和错误状态显示
      loadingComponent: { template: '<div class="card-loading">加载中...</div>' },
      errorComponent: { template: '<div class="card-error">加载失败</div>' },
      timeout: 3000
    })
  ])
)

// 计算当前要显示的卡片组件
const currentCard = computed(() => 
  asyncCards[props.cardType] || asyncCards['sam-card']
)

// 暴露可用卡片列表
defineExpose({
  availableCards: Object.keys(asyncCards) as string[]
})
</script>

<style scoped>
.card-loading,
.card-error {
  padding: 20px;
  text-align: center;
  border-radius: 4px;
  background: #f5f5f5;
}

.card-error {
  background: #fff2f0;
  color: #ff4d4f;
}
</style>
