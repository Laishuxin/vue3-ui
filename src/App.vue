<template>
  <div class="container">
    <MyCarousel :initial="2">
      <MyCarouselItem v-for="(item, index) in carousel" :key="index">
        <img :src="item.img" />
      </MyCarouselItem>
    </MyCarousel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { MyCarousel, MyCarouselItem } from './lib/Carousel'
import carousel from './assets/carousel'

export default defineComponent({
  components: {
    MyCarousel,
    MyCarouselItem,
  },
  setup() {
    return {
      carousel,
    }
  },
})
</script>

<style scoped>
.container {
  width: 550px;
  height: 252px;
  margin: auto;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
