<template>
  <div class="filter-card-container">
    <div class="card-filter">
      <ElInput v-model="searchValue" placeholder="请输入内容" />
      <ElButton type="primary" size="small" @click="searchAction">搜索</ElButton>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ElButton, ElInput } from 'element-plus'
import { useAttrs, ref } from 'vue';

const { onRefresh } = useAttrs() as { onRefresh: (params: Record<string, any>) => void, config: Record<string, any> }
const searchValue = ref('')

function searchAction() {
  onRefresh?.({
    searchValue: searchValue.value
  })
}
</script>

<style lang="scss" scoped>
.filter-card-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  .card-filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
}
</style>