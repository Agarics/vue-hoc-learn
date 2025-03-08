<script setup lang="ts">
import CustomCard from './custom-card/index.vue'

const cardList = [
  {
    cardType: 'sam-card',
    config: {
      title: 'sam-card',
      description: 'sam-card description',
    },
  },
  {
    cardType: 'sec-card',
    config: {
      title: 'sec-card',
      description: 'sec-card description',
    },
  },
]
</script>

<template>
  <div class="page-container">
    <div v-for="(card, cardIndex) in cardList" :key="cardIndex" class="chart-container">
      <CustomCard :cardType="card.cardType" :config="card.config" />
    </div>
  </div>
</template>
<style lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background: #fff;
}
</style>
<style lang="scss" scoped>

.page-container{
  display: flex;
  gap: 10px;
}

.chart-container {
  width: 600px;
  height: 500px;
  background: #f6f6f6;
  border-radius: 10px;
  border: 1px solid #ccc;
}
</style>
