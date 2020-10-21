<template>
    
    <figure class="highcharts-figure">
        <div id="container-bubble"></div>
        <p class="highcharts-description">
            This chart shows how packed bubble charts can be grouped by series,
            creating a hierarchy.
        </p>
    </figure>
     
</template>

<script>
import Highcharts from 'highcharts'
export default {
  name: "BubbleChart",
    data() {
    return {
      data: this.value,
    };
  },
  mounted() {
    setTimeout(this.setup(), 3000);
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
            pointFormat: '<b>{point.name}:</b> {point.value}m CO<sub>2</sub>'
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
        series: [{
            name: 'Eficientes',
            data: [
            {
                name: "Moldova",
                value: 7.8
            },
            {
                name: "Latvia",
                value: 7.5
            },
            {
                name: "Cyprus",
                value: 7.2
            }]
        }, {
            name: 'Próximo da Média',
            data: [
            {
                name: "South Africa",
                value: 392.7
            }, {
                name: "Egypt",
                value: 225.1
            }, {
                name: "Algeria",
                value: 141.5
            }]
        }, {
            name: 'Lento nos Movimentos',
            data: [
            {
                name: "Russia",
                value: 1766.4
            },
            {
                name: "Iran",
                value: 618.2
            },
            {
                name: "Korea",
                value: 610.1
            }]
        }]
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