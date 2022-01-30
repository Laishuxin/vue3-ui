<template>
  <div>
    <button @click="handleShow">show</button>
    <Transition name="fade">
      <div class="demo" v-if="show">
        background
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const show = ref(true)
    return {
      show,
      handleShow() {
        show.value = !show.value
      },
    }
  },
})
</script>

<style scoped>
.demo {
  transition: all 0.3s ease-out;
  width: 500px;
}

.fade-enter-active {
  transform: translateX(-100%);
}
.fade-enter-to {
  transform: translateX(0);
}

.fade-leave-active {
  transform: translateX(0);
}
.fade-leave-to {
  transform: translateX(-100%);
}

.fade-leave-active .fade-enter-active {
  transition: all 1s linear;
}
</style>
