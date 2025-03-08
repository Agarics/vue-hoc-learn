<template>
    <div class="card">
      <slot name="content">
        <div class="card-header">
          <h3>{{ config.title || "Card Header" }}</h3>
        </div>
        <slot name="extra" :data="calculatedData" />
        <div class="card-body">
          <slot :data="calculatedData" />
        </div>
      </slot>
    </div>
</template>
<script setup>
const props = defineProps({
  config: {
    type: Object,
    default: () => ({}),
  },
  calculatedData: {
    type: Object,
    default: () => ({}),
  },
  onRefresh: {
    type: Function,
    default: () => {},
  },
})

defineExpose({
  refresh: (...args) => {
    props.onRefresh(...args)
  }
})
</script>
<style scoped>
.card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  background: #fff;
}
.card-body {
  flex: 1;
  position: relative;
}
</style>
