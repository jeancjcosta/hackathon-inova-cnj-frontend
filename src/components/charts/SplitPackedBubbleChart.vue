<template>
    
    <figure class="highcharts-figure">
        <div id="container-bubble"></div>
        <p class="highcharts-description">
            Agrupando as serventias por grau de eficiência, onde o tamanho mostra o número de 
            processos registrado na serventia. 
        </p>
    </figure>
     
</template>

<script>
import Highcharts from 'highcharts'
export default {
  name: "BubbleChart",
  props: ["bubbleData"],
  mounted() {
    this.setup()
  },
  methods: {
    setup() {
      Highcharts.chart('container-bubble', {
        chart: {
            type: 'packedbubble',
            height: '100%'
        },
        title: {
            text: 'Visualização da eficiência comparado com a quantidade de processos'
        },
        tooltip: {
            useHTML: true,
            pointFormat: '<b>{point.name}:</b> {point.value} processos</sub>'
        },
        plotOptions: {
            packedbubble: {
                minSize: '20%',
                maxSize: '100%',
                zMin: 0,
                zMax: 1000,
                layoutAlgorithm: {
                    gravitationalConstant: 0.05,
                    splitSeries: true,
                    seriesInteraction: false,
                    dragBetweenSeries: true,
                    parentNodeLimit: true
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    filter: {
                        property: 'y',
                        operator: '>',
                        value: 250
                    },
                    style: {
                        color: 'black',
                        textOutline: 'none',
                        fontWeight: 'normal'
                    }
                }
            }
        },
        series: this.bubbleData
    });
    }
  }
}
</script>
<style scoped>
.highcharts-figure, .highcharts-data-table table {
    min-width: 320px; 
    max-width: 800px;
    margin: 1em auto;
}

.highcharts-data-table table {
	font-family: Verdana, sans-serif;
	border-collapse: collapse;
	border: 1px solid #EBEBEB;
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
.highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
    padding: 0.5em;
}
.highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
}
.highcharts-data-table tr:hover {
    background: #f1f7ff;
}
</style>