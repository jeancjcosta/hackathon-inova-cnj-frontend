<template>
   <div>
    <highcharts :options="chartOptions" ref="lineCharts" :constructor-type="'chart'"></highcharts>
        <p class="highcharts-description">
            Este gráfico mostra os movimentos que demoram mais do que o esperado de uma 
            serventia de acordo com o assunto e classe processual selecionada. O desvio padrão indica
            a dispersção dos dados em relação a média. O z-score indica o numero de desvios padrões distantes da média,
            ou seja, quanto maior o z-score mais demorado é o movimento em relação aos realizados pelas outras
            serventias de mesma competência. 
        </p>
  </div>
</template>

<script>
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";

HighchartsMore(Highcharts);

export default {
  name: "MultiChartColumn",
  props: ["options", "nomes"],
  components: {
    highcharts: Chart,
  },
  watch: {
    options: {
      handler(newOpt) {
        const newChartSeries = [];

        this.chartOptions.series.forEach(function (series, i) {
          newChartSeries.push(Highcharts.merge(series, newOpt.series[i]));
        });

        this.chartOptions.series = newChartSeries;

      
        
      },
      deep: true,
    },
  },

  created: function () {
    const newChartSeries = [];
    const options = this.options;
    const nomes = this.nomes

    this.plotOptions.xAxis.categories = nomes
    this.plotOptions.series.forEach(function (series, i) {
      newChartSeries.push(Highcharts.merge(series, options.series[i]));
    });

    this.chartOptions = Highcharts.merge(this.plotOptions, {
      series: newChartSeries,
    });
  },
  data() {
    return {
      chartOptions: null,
      plotOptions: {
        chart: {
          type: "column",
        },
        title: {
          text:
            "Gráfico das serventias com gargalos para este movimento",
        },
        xAxis: {
          categories: [],//nomes
        },
        yAxis: [
          {
            title: {
              text: "Duração (Em Dias)",
            },
          },
          {
            title: {
              text: "Z-Score",
              style: {
                color: Highcharts.getOptions().colors[4],
              },
            },
            opposite: true,
          },
        ],
        credits: {
          enabled: false,
        },
        series: [
          {
            name: "Média Serventia",
            data: [],
            yAxis: 0,
          },
          {
            name: "Z-Score",
            data: [],
            yAxis: 1,
          },
        ],
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#container-column {
  height: 400px;
}

.highcharts-figure,
.highcharts-data-table table {
  min-width: 310px;
  max-width: 800px;
  margin: 1em auto;
}

.highcharts-data-table table {
  font-family: Verdana, sans-serif;
  border-collapse: collapse;
  border: 1px solid #ebebeb;
  margin: 10px auto;
  text-align: center;
  width: 100%;
  max-width: 500px;
}
.highcharts-data-table caption {
  padding: 1em 0;
  font-size: 1.2em;
  color: #555;
}
.highcharts-data-table th {
  font-weight: 600;
  padding: 0.5em;
}
.highcharts-data-table td,
.highcharts-data-table th,
.highcharts-data-table caption {
  padding: 0.5em;
}
.highcharts-data-table thead tr,
.highcharts-data-table tr:nth-child(even) {
  background: #f8f8f8;
}
.highcharts-data-table tr:hover {
  background: #f1f7ff;
}
</style>
