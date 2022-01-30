<template>
  <div
    class="my-carousel-direction"
    :class="`my-carousel-direction-${direction}`"
    @click="handleClick"
  >
    {{ direction === 'prev' ? '&lt;' : '&gt;' }}
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  props: {
    direction: String,
  },
  setup(props, { emit }) {
    const icon = computed(() => {
      if (props.direction === 'prev') {
        return '&lt;'
      }
      if (props.direction === 'next') {
        return '&gt;'
      }
    })

    const handleClick = () => {
      emit('onClick', props.direction)
    }
    return {
      icon,
      handleClick,
    }
  },
})
</script>

<style lang="scss" scoped>
$size: 18px;
.my-carousel-direction {
  display: flex;
  justify-content: center;
  align-items: center;

  background: lightgray;
  width: $size;
  height: $size;

  cursor: pointer;
  border-radius: 999px;
}
</style>
