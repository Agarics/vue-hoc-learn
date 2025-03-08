import type { DefineComponent } from 'vue'
import { defineComponent, h } from 'vue'
import Card from '../components/card.vue'
import FilterCard from '../components/filter-card.vue'

// 过滤组件的高阶组件
const withFilter = (OriginComponent: DefineComponent<any, any, any>) => {
  return defineComponent({
    setup(_, { slots, attrs }) {
      return () => h(FilterCard, attrs, {
        default: () => [
          h(OriginComponent, attrs, slots)
        ]
      })
    },
  })
}

export const WithFilterCard = withFilter(Card)