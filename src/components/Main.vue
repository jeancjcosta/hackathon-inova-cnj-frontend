<template>
  <v-container>
    <v-row>
      
      <v-btn color="primary" elevation="2" large
        v-for='tab in tabs' :key='tab' @click='chooseTab(tab)'
      >{{tab}}</v-btn>

      <keep-alive>
        <component :is="component"></component>
      </keep-alive>
      
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Main',

    data: () => ({
      component: 'bottle-neck',
      tabs: ['Identificação de Gargalos', 'Desempenho da Serventia',  'Expectativa de Tempo de Tramitação'],
    }),
    
    methods: {
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
