
<template>
  <div id="app">
    <v-container>
      <h1>Desafio 1 CNJ Inova - TEMPO E PRODUTIVIDADE</h1>
      <v-col>
        <v-row>
          <v-btn
            block
            color="secondary"
            depressed
            elevation="1"
            large
            v-for='tab in tabs' :key='tab' @click='chooseTab(tab)'
          >{{tab}}</v-btn>

        </v-row>
        <v-row>
          <keep-alive>
            <component :is="component"></component>
          </keep-alive>
        </v-row>
      </v-col>
    </v-container>
  </div>

</template>

<script>
import axios from 'axios'
//import Treeselect from '@riophae/vue-treeselect'
  // import the styles
//import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  //components: { Treeselect },
  
  name: 'App',
  data() {
    return {
      component: 'bottle-neck',
      tabs: ['Identificação de Gargalos', 'Desempenho da Serventia',  'Expectativa de Tempo de Tramitação'],
      chartData: {
        '2020-05-13': 2,
        '2020-05-15': 5,
        '2020-05-17': 4
      },

      info: null,
      value: [],
      baseUrl: 'http://localhost:8000',
      options1: [ {
        id: 'a',
        label: 'a',
        children: [ {
          id: 'aa',
          label: 'aa',
        }, {
          id: 'ab',
          label: 'ab',
        } ],
      }, {
        id: 'b',
        label: 'b',
      }, {
        id: 'c',
        label: 'c',
      } ],
    }
  },

  methods: {
    updateChart() {
      this.chartData = {
        '2020-05-13': 7,
        '2020-05-15': 9,
        '2020-05-17': 16
      }
    },

    pegarDadosTeste() {
      axios
      .get(this.baseUrl + '/api/score')
      .then(response => {
        this.info = response.data
        console.log(response.data)
      })
    },

    chooseTab(tab) {
      if (tab == 'Identificação de Gargalos') {
        this.component = 'bottle-neck'
      } else if (tab == 'Desempenho da Serventia') {
        this.component = 'performance'
      } else if (tab == 'Expectativa de Tempo de Tramitação') {
        this.component = 'expected-process-duration'
      }
    }
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: rgb(238, 232, 229);
}
</style>
