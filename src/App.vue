<template>
  <div id="app">
    <h3>Exemplos de Gráficos</h3>

    <line-chart :data="chartData"></line-chart>

    <button @click="updateChart">Atualizar Dados</button>

    <pie-chart :data="[['Nokia', 150],['Sansung', 120],['Apple',200]]"></pie-chart>
  </div>

</template>

<script>


export default {
  name: 'App',
  data() {
    return {
      chartData: {
        '2020-05-13': 2,
        '2020-05-15': 5,
        '2020-05-17': 4
      }
    }
  },

  methods: {
    updateChart() {
      this.chartData = {
        '2020-05-13': 7,
        '2020-05-15': 9,
        '2020-05-17': 16
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
