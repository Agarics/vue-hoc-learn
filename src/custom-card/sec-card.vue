<template>
  <CalculateAndFilterCard ref="calculateAndFilterCard" :config="cardConfig">
    <template #extra>
        <div class="card-extra">
          {{ cardConfig.description }}
        </div>
      </template>
      <template #default="{ data }">
        <div>{{ data }}</div>
        <ElButton type="primary" @click="onRefresh">刷新</ElButton>
      </template>
  </CalculateAndFilterCard>
</template>
<script setup lang="ts">
import { ElButton } from 'element-plus'
import { CalculateAndFilterCard } from '../hooks/use-calculate'
import { ref } from 'vue'
const cardConfig = ref({
  title: 'sec-card',
  description: 'sec-card description',
})
const calculateAndFilterCard = ref()

function onRefresh() {
  calculateAndFilterCard.value.refresh()
}
</script>

