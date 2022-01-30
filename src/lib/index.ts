import { Plugin } from 'vue'
import MyCarousel from './Carousel/index.vue'
import MyCarouselItem from './Carousel/item.vue'

const MyUI: Plugin = {
  install(Vue) {
    Vue.component(MyCarousel.name, MyCarousel)
    Vue.component(MyCarouselItem.name, MyCarouselItem)
  },
}

export default MyUI
