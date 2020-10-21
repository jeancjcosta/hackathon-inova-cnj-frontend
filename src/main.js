import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import ExpectedProcessDuration from '@/components/ExpectedProcessDuration.vue'
import BottleNeck from '@/components/BottleNeck.vue'
import Performance from'@/components/Performance.vue'
import Highcharts from 'highcharts'
import Speedometer from './components/charts/Speedometer.vue'
import SplitPackedBubbleChart from './components/charts/SplitPackedBubbleChart.vue'
import VueHighcharts from 'vue-highcharts'
import highchartsMore from 'highcharts/highcharts-more'
import ColumnChart from './components/charts/ColumnChart.vue'
import HighchartsVue from 'highcharts-vue'
import MultiChartColumn from './components/charts/MultiChartColumn.vue'

highchartsMore(Highcharts)
Vue.use(VueHighcharts, {Highcharts})
Vue.use(Highcharts)
Vue.use(HighchartsVue);

Vue.config.productionTip = false

Vue.component('expected-process-duration', ExpectedProcessDuration)
Vue.component('bottle-neck', BottleNeck)
Vue.component('performance', Performance)
Vue.component('speedometer', Speedometer)
Vue.component('bubble', SplitPackedBubbleChart)
Vue.component('column', ColumnChart)
Vue.component('multi-chart-column', MultiChartColumn)


new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
