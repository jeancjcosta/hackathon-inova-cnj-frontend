import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import ExpectedProcessDuration from '@/components/ExpectedProcessDuration.vue'
import BottleNeck from '@/components/BottleNeck.vue'
import Performance from'@/components/Performance.vue'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import Highcharts from 'highcharts'

Vue.use(Chartkick)
Vue.use(Chartkick.use(Chart))
Vue.use(Chartkick.use(Highcharts))

Vue.config.productionTip = false

Vue.component('expected-process-duration', ExpectedProcessDuration)
Vue.component('bottle-neck', BottleNeck)
Vue.component('performance', Performance)


new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
