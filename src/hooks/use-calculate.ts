import { defineComponent, h, ref } from 'vue'
import { useTimeoutPoll } from "@vueuse/core"
import CalculateStatus from '../components/calculate-status.vue'
import { WithFilterCard } from './use-filter'
import Card from '../components/card.vue'

// 默认计算结果 pending 表示计算中，success 表示计算成功，error 表示计算失败，canceled 表示计算取消
const defaultResult = {
  status: 'pending',
  msg: '计算中...',
  data: {},
}

// 加载数据的高阶组件
const withCalculate = (OriginComponent: any) => {
  return defineComponent({
    setup(_, { slots, attrs, expose }) {
      const { isCalculating, result, cancelCalculate, refreshCalculate, currentConfig } = useCalculate({ config: attrs.config })
      
      // 暴露 refresh 方法
      expose({
        refresh: refreshCalculate
      })

      return () => {
        // 计算中状态：只显示 loading
        if (isCalculating.value) {
          return h(OriginComponent, {
            ...attrs,
            onRefresh: refreshCalculate
          }, {
            content: () => h(CalculateStatus, {
              status: 'pending',
              onCancel: cancelCalculate,
            })
          })
        }
        // 计算成功状态：显示完整内容
        if (result.value.status === 'success') {
          return h(OriginComponent, {
            ...attrs,
            onRefresh: refreshCalculate,
            config: currentConfig,
            calculatedData: result.value.data
          }, slots)
        }

        // 计算失败或取消状态：显示 header 和错误提示
        return h(OriginComponent, {
          ...attrs,
          onRefresh: refreshCalculate,
          config: currentConfig
        }, {
          ...slots,
          default: () => h(CalculateStatus, {
            status: result.value.status,
            description: result.value.msg || '计算失败',
            onRefresh: refreshCalculate,
          })
        })
      }
    },
  })
}

// 加载数据钩子
export function useCalculate({ config }: any) {
  const result = ref(defaultResult)
  const currentConfig = ref(config)
  const { isActive: isCalculating, pause: pauseCalculate, resume: resumeCalculate } = useTimeoutPoll(calculate, 3000, { immediate: true, immediateCallback: true })
  // 计算
  async function calculate() {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      // 如果计算被取消，则不进行结果赋值
      if(result.value.status === 'canceled') return;

      // 计算成功后，结束计算并赋值
      pauseCalculate()
      result.value = {
        status: 'success',
        msg: '计算成功',
        data: { content: '计算成功', list: [1, 2, 3] },
      }
    } catch {
      // 计算失败后，结束计算并赋值
      pauseCalculate()
      result.value = {
        status: 'error',
        msg: '计算失败',
        data: {},
      }
    }
  }

  // 取消计算
  function cancelCalculate() {
    result.value = {
      status: 'canceled',
      msg: '已取消计算',
      data: {},
    }
    pauseCalculate()
  }

  // 刷新计算
  function refreshCalculate(config?: any) {
    if(result.value.status === 'pending') {
      pauseCalculate()
    }
    // 重置计算结果
    result.value = defaultResult
    currentConfig.value = {
      ...currentConfig.value,
      ...config
    }
    console.log('refreshCalculate config', currentConfig.value)
    // 重新开始计算
    resumeCalculate()
  }

  return { result, isCalculating, refreshCalculate,  cancelCalculate, currentConfig }
}

// 加载数据且带过滤组件的高阶组件
export const CalculateAndFilterCard = withCalculate(WithFilterCard)

// 加载数据的高阶组件
export const CalculateCard = withCalculate(Card)