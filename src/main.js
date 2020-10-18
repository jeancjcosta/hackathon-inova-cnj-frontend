import Vue from  'vue'
import App from './App.vue'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import Vuetify from 'vuetify'
import Highcharts from 'highcharts'
import ExpectedProcessDuration from '@/components/ExpectedProcessDuration.vue'
import BottleNeck from '@/components/BottleNeck.vue'
import Performance from'@/components/Performance.vue'


Vue.use(Vuetify)
Vue.use(Chartkick)
Vue.use(Chartkick.use(Chart))
Vue.use(Chartkick.use(Highcharts))

Vue.config.productionTip = false

Vue.component('expected-process-duration', ExpectedProcessDuration)
Vue.component('bottle-neck', BottleNeck)
Vue.component('performance', Performance)

new Vue({
    render: h => h(App),
}).$mount('#app')


