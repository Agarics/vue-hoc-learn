<template>
  <ElCascader
    ref="cascaderRef"
    v-bind="$attrs"
    @focus="handleFocusAction">
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

  expandAll: {
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

function handleFocusAction(event) {
  props.onFocus?.(event);

  const checkedValue = castArray(attrs.modelValue).filter(Boolean);
  // If there is no checkedValue, focus the first node
  if(props.expandAll && checkedValue.length === 0) {
    // cascaderPanelRef.value?.clearCheckedNodes();
    const firstNode = cascaderPanelRef.value?.getFlattedNodes(true)[0];
    
    if (firstNode) {
      firstNode.level > 1 && focusFirstNode(firstNode.level);
    }
  }
}

function focusFirstNode(level) {
  const menuNodes = cascaderPanelRef.value?.$el.querySelectorAll('.el-cascader-menu');
  // popover配置persistent默认为true 聚焦菜单dom节点不会被销毁
  const isFirst = menuNodes.length === 1;
  focusNode(isFirst ? level : 0);
  // 递归展开
  async function focusNode (currentLevel = 1) {
    if(isFirst) {
      if(currentLevel < 2) return;
    } else {
      if(currentLevel > level - 2) return;
    }
    const menuNodes = cascaderPanelRef.value?.$el.querySelectorAll('.el-cascader-menu');
    const firstNode = menuNodes[isFirst ? menuNodes.length - 1 : currentLevel]?.querySelector('.el-cascader-node[tabindex="-1"]');
    firstNode?.click();
    await nextTick();
    
    focusNode(isFirst ? currentLevel - 1 : currentLevel + 1);
  }
}
</script>