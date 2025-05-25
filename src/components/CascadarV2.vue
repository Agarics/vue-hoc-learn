<template>
  <ElCascader
    ref="cascaderRef"
    v-bind="$attrs"
    @visible-change="handleVisibleChangeAction">
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name"  />
    </template>
  </ElCascader>
</template>

<script setup>
import { ElCascader } from 'element-plus';
import { castArray } from 'lodash';
import { onMounted, computed, ref, getCurrentInstance, useAttrs, nextTick } from 'vue';

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  onFocus: {
    type: Function,
    default: () => {}
  },
  // 默认展开面板的节点
  defaultExpand: {
    type: Boolean,
    default: false
  },
})

const exposeObj = {}

const cascaderRef = ref(null);

const cascaderPanelRef = computed(() => cascaderRef.value?.cascaderPanelRef);

const vmInstance = getCurrentInstance();

const attrs = useAttrs();

defineExpose(exposeObj);

onMounted(() => {
  Object.entries(cascaderRef.value).forEach(([key, value]) => {
    exposeObj[key] = value;
  });
})

function handleVisibleChangeAction(visible) {
  props.onVisibleChange?.(visible);

  // panel展开处理选中
  if (visible && props.defaultExpand) {
    // 动态加载子节点 不处理默认展开
    if(attrs.props?.lazy) return;
    handleDefaultExpand();
  }
}

// 处理默认展开
async function handleDefaultExpand() {
  const checkedValue = castArray(attrs.modelValue).filter(Boolean);
  // 如果有选中值不处理
  if(checkedValue.length > 0) return;

  await nextTick()
  // 如果没有选中值，默认展开第一个
  const firstNode = cascaderPanelRef.value?.getFlattedNodes(true)?.[0];
  if(!firstNode) return;
  const firstNodeLevel = firstNode.level;
  focusNode(0);

  // 递归展开
  async function focusNode (currentLevel = 1) {
    if(currentLevel > firstNodeLevel - 2) return;
    const menuNodes = cascaderPanelRef.value?.$el.querySelectorAll('.el-cascader-menu');
    const firstNodeEl = menuNodes[currentLevel]?.querySelector('.el-cascader-node[tabindex="-1"]');
    firstNodeEl?.click();

    await nextTick();
    focusNode(currentLevel + 1);
  }
}
</script>