<template>
  <!--<diV>
    <figure class="highcharts-figure">
      <div id="idd" class="container-speedometer"></div>
        <p class="highcharts-description">
            Chart showing use of multiple panes and axis plot bands with a gauge
            series. The chart is updated dynamically every few seconds.
        </p>
    </figure>
  </diV> -->
  <div>
    <highcharts :options="chartOptions" ref="lineCharts" :constructor-type="'chart'"></highcharts>
    <p class="highcharts-description">
        Este gráfico mostra o desempenho da serventia para o movimento em relação as outras serventias de mesma competência
        para o mesmo movimento. O z-score abaixo de zero indica um bom tempo de movimentação, entre zero e um levanta 
        um sinal de alerta em relação ao tempo para conclusão do movimento, já para os valores maiores que um há
        um forte indício de lentidão. 
    </p>
  </div>
  
</template>

<script>
import {Chart} from 'highcharts-vue'
import Highcharts from "highcharts"
import HighchartsMore from "highcharts/highcharts-more"

HighchartsMore(Highcharts)

export default {
  name: "Speedometer",
  props:["options"],
  components: {
    highcharts: Chart 
  },
  watch: {
    options: {
      handler(newOpt) {
        const newChartSeries = [];

        this.chartOptions.series.forEach(function (series, i) {
          newChartSeries.push(Highcharts.merge(
            series,
            newOpt.series[i]
          ));
        });

        this.chartOptions.series = newChartSeries;
      },
      deep: true
    }
  },

  created: function () {
    const newChartSeries = [];
    const options = this.options;

    this.plotOptions.series.forEach(function (series, i) {
      newChartSeries.push(Highcharts.merge(
        series,
        options.series[i]
      ));
    });

    this.chartOptions = Highcharts.merge(this.plotOptions,{
      series: newChartSeries
    });
  },
  data() {
    return {
      chartOptions: null, 
      plotOptions: {
        chart: {
          type: "gauge",
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false,
        },

        title: {
          text: "Medidor de Eficiência ",
        },

        pane: {
          startAngle: -150,
          endAngle: 150,
          background: [
            {
              backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                  [0, "#FFF"],
                  [1, "#333"],
                ],
              },
              borderWidth: 0,
              outerRadius: "109%",
            },
            {
              backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                  [0, "#333"],
                  [1, "#FFF"],
                ],
              },
              borderWidth: 1,
              outerRadius: "107%",
            },
            {
              // default background
            },
            {
              backgroundColor: "#DDD",
              borderWidth: 0,
              outerRadius: "105%",
              innerRadius: "103%",
            },
          ],
        },

        // the value axis
        yAxis: {
          min: -3,
          max: 3,

          minorTickInterval: "auto",
          minorTickWidth: 1,
          minorTickLength: 10,
          minorTickPosition: "inside",
          minorTickColor: "#666",

          tickPixelInterval: 30,
          tickWidth: 2,
          tickPosition: "inside",
          tickLength: 10,
          tickColor: "#666",
          labels: {
            step: 2,
            rotation: "auto",
          },
          title: {
            text: "z-score",
          },
          plotBands: [
            {
              from: -3,
              to: 0,
              color: "#55BF3B", // green
            },
            {
              from: 0,
              to: 1,
              color: "#DDDF0D", // yellow
            },
            {
              from: 1,
              to: 3,
              color: "#DF5353", // red
            },
          ],
        },

        series: [
          {
            name: "Speed",
            data: [],
            tooltip: {
              valueSuffix: " z-score",
            },
          }
        ],
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container-speedometer {
  height: 400px;
}

.highcharts-figure,
.highcharts-data-table table {
  min-width: 310px;
  max-width: 500px;
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
