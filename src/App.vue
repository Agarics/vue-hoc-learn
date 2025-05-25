<script setup lang="ts">
import CustomCard from './custom-card/index.vue'
import CascadarV2 from './components/CascadarV2.vue';
import { reactive, ref } from 'vue';

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

const modelValue = ref()

const list = reactive([
  {
    id: 1,
    name: '选项1',
    children: [
      {
        id: 11,
        name: '选项1-1',
        children: [
          {
            id: 111,
            name: '选项1-1-1',
          },
          {
            id: 112,
            name: '选项1-1-2',
          },
        ],
      },
      {
        id: 12,
        name: '选项1-2',
      },
    ],
  },
  {
    id: 2,
    name: '选项2',
    children: [
      {
        id: 21,
        name: '选项2-1',
      },
      {
        id: 22,
        name: '选项2-2',
      },
    ],
  },
]);

const cascaderRef = ref<any>(null)

const cascadarProps = {
  emitPath: false,
  value: "id",
  label: "name",
}

</script>

<template>
  <div class="page-container">
    <div v-for="(card, cardIndex) in cardList" :key="cardIndex" class="chart-container">
      <CustomCard :cardType="card.cardType" :config="card.config" />
    </div>
  </div>
  <CascadarV2 ref="cascaderRef" v-model="modelValue" defaultExpand filterable :props="cascadarProps" :options="list" />
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
