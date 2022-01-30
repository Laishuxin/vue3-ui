<template>
  <div v-if="count" class="my-carousel-dots" @click="handleClick">
    <div
      class="my-carousel-dot"
      :data-index="i - 1"
      :class="{ active: i - 1 === currentIndex }"
      v-for="i in count"
      :key="i"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCarouseInject } from './context'

export default defineComponent({
  props: {
    count: Number,
  },
  setup() {
    const { currentIndex, setCurrentIndex } = useCarouseInject()
    const handleClick = (e: any) => {
      const target = e.target
      let index = target.getAttribute('data-index')
      if (!index) return

      index = Number(index)
      setCurrentIndex(index)
    }
    return { currentIndex, handleClick }
  },
})
</script>

<style lang="scss" scoped>
$size: 16px;
.my-carousel-dots {
  position: absolute;
  display: flex;
  gap: 4px;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50);
}

.my-carousel-dot {
  width: $size;
  height: $size;
  background: white;
  border-radius: 1000px;
  cursor: pointer;
}

.my-carousel-dot.active {
  background: lightgreen;
}
</style>
